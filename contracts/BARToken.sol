// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

/**
 * @title BARToken
 * @dev BankBart Protocol Token - ERC20 token with governance capabilities
 * Total Supply: 100,000,000 BAR
 * 
 * Distribution:
 * - 40% Public Sale (40,000,000 BAR)
 * - 30% DAO Treasury (30,000,000 BAR)
 * - 15% Team (15,000,000 BAR) - locked for 2 years
 * - 10% Marketing/Partnerships (10,000,000 BAR)
 * - 5% Liquidity (5,000,000 BAR)
 */
contract BARToken is ERC20, ERC20Burnable, Ownable, ERC20Permit {
    uint256 public constant TOTAL_SUPPLY = 100_000_000 * 10**18;
    
    uint256 public constant PUBLIC_SALE_ALLOCATION = 40_000_000 * 10**18;
    uint256 public constant DAO_TREASURY_ALLOCATION = 30_000_000 * 10**18;
    uint256 public constant TEAM_ALLOCATION = 15_000_000 * 10**18;
    uint256 public constant MARKETING_ALLOCATION = 10_000_000 * 10**18;
    uint256 public constant LIQUIDITY_ALLOCATION = 5_000_000 * 10**18;
    
    address public saleContract;
    address public daoTreasury;
    address public teamWallet;
    address public marketingWallet;
    address public liquidityWallet;
    
    uint256 public teamUnlockTime;
    bool public teamTokensReleased;
    
    event SaleContractSet(address indexed saleContract);
    event DAOTreasurySet(address indexed daoTreasury);
    event TeamTokensReleased(address indexed teamWallet, uint256 amount);
    
    constructor(
        address _teamWallet,
        address _marketingWallet,
        address _liquidityWallet
    ) ERC20("BankBart Token", "BAR") Ownable(msg.sender) ERC20Permit("BankBart Token") {
        require(_teamWallet != address(0), "Invalid team wallet");
        require(_marketingWallet != address(0), "Invalid marketing wallet");
        require(_liquidityWallet != address(0), "Invalid liquidity wallet");
        
        teamWallet = _teamWallet;
        marketingWallet = _marketingWallet;
        liquidityWallet = _liquidityWallet;
        
        teamUnlockTime = block.timestamp + 730 days;
        teamTokensReleased = false;
        
        _mint(marketingWallet, MARKETING_ALLOCATION);
        _mint(liquidityWallet, LIQUIDITY_ALLOCATION);
    }
    
    function setSaleContract(address _saleContract) external onlyOwner {
        require(_saleContract != address(0), "Invalid sale contract");
        require(saleContract == address(0), "Sale contract already set");
        
        saleContract = _saleContract;
        _mint(_saleContract, PUBLIC_SALE_ALLOCATION);
        
        emit SaleContractSet(_saleContract);
    }
    
    function setDAOTreasury(address _daoTreasury) external onlyOwner {
        require(_daoTreasury != address(0), "Invalid DAO treasury");
        require(daoTreasury == address(0), "DAO treasury already set");
        
        daoTreasury = _daoTreasury;
        _mint(_daoTreasury, DAO_TREASURY_ALLOCATION);
        
        emit DAOTreasurySet(_daoTreasury);
    }
    
    function releaseTeamTokens() external {
        require(block.timestamp >= teamUnlockTime, "Team tokens still locked");
        require(!teamTokensReleased, "Team tokens already released");
        
        teamTokensReleased = true;
        _mint(teamWallet, TEAM_ALLOCATION);
        
        emit TeamTokensReleased(teamWallet, TEAM_ALLOCATION);
    }
    
    function getTeamUnlockTimeRemaining() external view returns (uint256) {
        if (block.timestamp >= teamUnlockTime) {
            return 0;
        }
        return teamUnlockTime - block.timestamp;
    }
}
