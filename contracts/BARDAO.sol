// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title BARDAO
 * @dev Decentralized Autonomous Organization for BancBart Protocol
 * 
 * Governance Rules:
 * - 1 BAR = 1 vote
 * - Quorum: 10% of total supply required
 * - Voting period: 7 days
 * - Proposal types: Fund allocation, partnerships, protocol changes
 */
contract BARDAO is Ownable, ReentrancyGuard {
    IERC20 public barToken;
    
    uint256 public constant VOTING_PERIOD = 7 days;
    uint256 public constant QUORUM_PERCENTAGE = 10;
    uint256 public constant PROPOSAL_THRESHOLD = 100_000 * 10**18;
    
    enum ProposalState { Pending, Active, Defeated, Succeeded, Executed, Cancelled }
    enum ProposalType { FundAllocation, Partnership, ProtocolChange, Other }
    
    struct Proposal {
        uint256 id;
        address proposer;
        ProposalType proposalType;
        string title;
        string description;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 abstainVotes;
        uint256 startTime;
        uint256 endTime;
        bool executed;
        bool cancelled;
        bytes callData;
        address targetContract;
        uint256 value;
    }
    
    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(uint256 => mapping(address => uint256)) public voteWeight;
    
    uint256 public treasuryBalance;
    
    event ProposalCreated(
        uint256 indexed proposalId,
        address indexed proposer,
        ProposalType proposalType,
        string title,
        uint256 startTime,
        uint256 endTime
    );
    
    event VoteCast(
        uint256 indexed proposalId,
        address indexed voter,
        uint8 support,
        uint256 weight
    );
    
    event ProposalExecuted(uint256 indexed proposalId);
    event ProposalCancelled(uint256 indexed proposalId);
    event TreasuryFunded(address indexed from, uint256 amount);
    event TreasuryWithdrawn(address indexed to, uint256 amount);
    
    constructor(address _barToken) Ownable(msg.sender) {
        require(_barToken != address(0), "Invalid token address");
        barToken = IERC20(_barToken);
    }
    
    receive() external payable {
        treasuryBalance += msg.value;
        emit TreasuryFunded(msg.sender, msg.value);
    }
    
    function createProposal(
        ProposalType _type,
        string calldata _title,
        string calldata _description,
        address _targetContract,
        bytes calldata _callData,
        uint256 _value
    ) external returns (uint256) {
        require(
            barToken.balanceOf(msg.sender) >= PROPOSAL_THRESHOLD,
            "Insufficient tokens to propose"
        );
        require(bytes(_title).length > 0, "Title required");
        require(bytes(_description).length > 0, "Description required");
        
        proposalCount++;
        uint256 proposalId = proposalCount;
        
        Proposal storage proposal = proposals[proposalId];
        proposal.id = proposalId;
        proposal.proposer = msg.sender;
        proposal.proposalType = _type;
        proposal.title = _title;
        proposal.description = _description;
        proposal.startTime = block.timestamp;
        proposal.endTime = block.timestamp + VOTING_PERIOD;
        proposal.targetContract = _targetContract;
        proposal.callData = _callData;
        proposal.value = _value;
        
        emit ProposalCreated(
            proposalId,
            msg.sender,
            _type,
            _title,
            proposal.startTime,
            proposal.endTime
        );
        
        return proposalId;
    }
    
    function vote(uint256 proposalId, uint8 support) external nonReentrant {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal");
        Proposal storage proposal = proposals[proposalId];
        
        require(block.timestamp >= proposal.startTime, "Voting not started");
        require(block.timestamp <= proposal.endTime, "Voting ended");
        require(!hasVoted[proposalId][msg.sender], "Already voted");
        require(!proposal.cancelled, "Proposal cancelled");
        
        uint256 weight = barToken.balanceOf(msg.sender);
        require(weight > 0, "No voting power");
        
        hasVoted[proposalId][msg.sender] = true;
        voteWeight[proposalId][msg.sender] = weight;
        
        if (support == 0) {
            proposal.againstVotes += weight;
        } else if (support == 1) {
            proposal.forVotes += weight;
        } else {
            proposal.abstainVotes += weight;
        }
        
        emit VoteCast(proposalId, msg.sender, support, weight);
    }
    
    function executeProposal(uint256 proposalId) external nonReentrant {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal");
        Proposal storage proposal = proposals[proposalId];
        
        require(block.timestamp > proposal.endTime, "Voting not ended");
        require(!proposal.executed, "Already executed");
        require(!proposal.cancelled, "Proposal cancelled");
        require(getProposalState(proposalId) == ProposalState.Succeeded, "Proposal not succeeded");
        
        proposal.executed = true;
        
        if (proposal.targetContract != address(0) && proposal.callData.length > 0) {
            require(proposal.value <= treasuryBalance, "Insufficient treasury");
            treasuryBalance -= proposal.value;
            
            (bool success, ) = proposal.targetContract.call{value: proposal.value}(proposal.callData);
            require(success, "Execution failed");
        }
        
        emit ProposalExecuted(proposalId);
    }
    
    function cancelProposal(uint256 proposalId) external {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal");
        Proposal storage proposal = proposals[proposalId];
        
        require(
            msg.sender == proposal.proposer || msg.sender == owner(),
            "Not authorized"
        );
        require(!proposal.executed, "Already executed");
        require(!proposal.cancelled, "Already cancelled");
        
        proposal.cancelled = true;
        emit ProposalCancelled(proposalId);
    }
    
    function getProposalState(uint256 proposalId) public view returns (ProposalState) {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal");
        Proposal storage proposal = proposals[proposalId];
        
        if (proposal.cancelled) return ProposalState.Cancelled;
        if (proposal.executed) return ProposalState.Executed;
        if (block.timestamp < proposal.startTime) return ProposalState.Pending;
        if (block.timestamp <= proposal.endTime) return ProposalState.Active;
        
        uint256 totalSupply = barToken.totalSupply();
        uint256 quorum = (totalSupply * QUORUM_PERCENTAGE) / 100;
        uint256 totalVotes = proposal.forVotes + proposal.againstVotes + proposal.abstainVotes;
        
        if (totalVotes < quorum) return ProposalState.Defeated;
        if (proposal.forVotes > proposal.againstVotes) return ProposalState.Succeeded;
        
        return ProposalState.Defeated;
    }
    
    function getProposal(uint256 proposalId) external view returns (
        uint256 id,
        address proposer,
        ProposalType proposalType,
        string memory title,
        string memory description,
        uint256 forVotes,
        uint256 againstVotes,
        uint256 abstainVotes,
        uint256 startTime,
        uint256 endTime,
        ProposalState state
    ) {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal");
        Proposal storage p = proposals[proposalId];
        
        return (
            p.id,
            p.proposer,
            p.proposalType,
            p.title,
            p.description,
            p.forVotes,
            p.againstVotes,
            p.abstainVotes,
            p.startTime,
            p.endTime,
            getProposalState(proposalId)
        );
    }
    
    function getVotingPower(address account) external view returns (uint256) {
        return barToken.balanceOf(account);
    }
    
    function hasUserVoted(uint256 proposalId, address voter) external view returns (bool) {
        return hasVoted[proposalId][voter];
    }
    
    function getUserVoteWeight(uint256 proposalId, address voter) external view returns (uint256) {
        return voteWeight[proposalId][voter];
    }
    
    function withdrawTreasury(address payable to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid address");
        require(amount <= treasuryBalance, "Insufficient balance");
        
        treasuryBalance -= amount;
        (bool success, ) = to.call{value: amount}("");
        require(success, "Transfer failed");
        
        emit TreasuryWithdrawn(to, amount);
    }
    
    function getActiveProposals() external view returns (uint256[] memory) {
        uint256 activeCount = 0;
        
        for (uint256 i = 1; i <= proposalCount; i++) {
            if (getProposalState(i) == ProposalState.Active) {
                activeCount++;
            }
        }
        
        uint256[] memory activeIds = new uint256[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 1; i <= proposalCount; i++) {
            if (getProposalState(i) == ProposalState.Active) {
                activeIds[index] = i;
                index++;
            }
        }
        
        return activeIds;
    }
}
