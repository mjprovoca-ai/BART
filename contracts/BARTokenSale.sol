// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title BARTokenSale
 * @dev Token sale contract with three phases: Seed, Private, Public
 * 
 * Phase 1 - Seed Sale:
 * - Price: $0.01 per BAR
 * - Allocation: 10,000,000 BAR
 * - Target: $100,000
 * 
 * Phase 2 - Private Sale:
 * - Price: $0.025 per BAR
 * - Allocation: 15,000,000 BAR
 * - Target: $375,000
 * 
 * Phase 3 - Public Sale:
 * - Price: $0.05 per BAR
 * - Allocation: 15,000,000 BAR
 * - Target: $750,000
 */
contract BARTokenSale is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    
    enum SalePhase { NotStarted, Seed, Private, Public, Ended }
    
    IERC20 public barToken;
    
    uint256 public constant SEED_PRICE = 0.00001 ether;
    uint256 public constant PRIVATE_PRICE = 0.000025 ether;
    uint256 public constant PUBLIC_PRICE = 0.00005 ether;
    
    uint256 public constant SEED_ALLOCATION = 10_000_000 * 10**18;
    uint256 public constant PRIVATE_ALLOCATION = 15_000_000 * 10**18;
    uint256 public constant PUBLIC_ALLOCATION = 15_000_000 * 10**18;
    
    uint256 public constant MIN_PURCHASE = 100 * 10**18;
    uint256 public constant MAX_PURCHASE_SEED = 1_000_000 * 10**18;
    uint256 public constant MAX_PURCHASE_PRIVATE = 500_000 * 10**18;
    uint256 public constant MAX_PURCHASE_PUBLIC = 100_000 * 10**18;
    
    SalePhase public currentPhase;
    
    uint256 public seedSold;
    uint256 public privateSold;
    uint256 public publicSold;
    
    uint256 public totalRaised;
    
    mapping(address => uint256) public seedPurchases;
    mapping(address => uint256) public privatePurchases;
    mapping(address => uint256) public publicPurchases;
    mapping(address => bool) public whitelisted;
    
    bool public whitelistRequired;
    
    event TokensPurchased(
        address indexed buyer,
        SalePhase phase,
        uint256 amount,
        uint256 cost
    );
    event PhaseChanged(SalePhase newPhase);
    event FundsWithdrawn(address indexed to, uint256 amount);
    event WhitelistUpdated(address indexed account, bool status);
    
    constructor(address _barToken) Ownable(msg.sender) {
        require(_barToken != address(0), "Invalid token address");
        barToken = IERC20(_barToken);
        currentPhase = SalePhase.NotStarted;
        whitelistRequired = true;
    }
    
    modifier onlyDuringPhase(SalePhase phase) {
        require(currentPhase == phase, "Invalid sale phase");
        _;
    }
    
    function setWhitelistRequired(bool _required) external onlyOwner {
        whitelistRequired = _required;
    }
    
    function setWhitelist(address[] calldata accounts, bool status) external onlyOwner {
        for (uint256 i = 0; i < accounts.length; i++) {
            whitelisted[accounts[i]] = status;
            emit WhitelistUpdated(accounts[i], status);
        }
    }
    
    function startSeedSale() external onlyOwner {
        require(currentPhase == SalePhase.NotStarted, "Sale already started");
        currentPhase = SalePhase.Seed;
        emit PhaseChanged(SalePhase.Seed);
    }
    
    function startPrivateSale() external onlyOwner {
        require(currentPhase == SalePhase.Seed, "Must complete seed phase");
        currentPhase = SalePhase.Private;
        emit PhaseChanged(SalePhase.Private);
    }
    
    function startPublicSale() external onlyOwner {
        require(currentPhase == SalePhase.Private, "Must complete private phase");
        currentPhase = SalePhase.Public;
        whitelistRequired = false;
        emit PhaseChanged(SalePhase.Public);
    }
    
    function endSale() external onlyOwner {
        require(currentPhase != SalePhase.NotStarted && currentPhase != SalePhase.Ended, "Invalid state");
        currentPhase = SalePhase.Ended;
        emit PhaseChanged(SalePhase.Ended);
    }
    
    function buyTokens() external payable nonReentrant {
        require(currentPhase != SalePhase.NotStarted && currentPhase != SalePhase.Ended, "Sale not active");
        require(msg.value > 0, "Must send ETH");
        
        if (whitelistRequired) {
            require(whitelisted[msg.sender], "Not whitelisted");
        }
        
        uint256 price = getCurrentPrice();
        uint256 tokenAmount = (msg.value * 10**18) / price;
        
        require(tokenAmount >= MIN_PURCHASE, "Below minimum purchase");
        
        uint256 maxPurchase = getMaxPurchase();
        uint256 previousPurchase = getPreviousPurchase(msg.sender);
        require(previousPurchase + tokenAmount <= maxPurchase, "Exceeds max purchase");
        
        uint256 available = getAvailableTokens();
        require(tokenAmount <= available, "Insufficient tokens available");
        
        _recordPurchase(msg.sender, tokenAmount);
        totalRaised += msg.value;
        
        barToken.safeTransfer(msg.sender, tokenAmount);
        
        emit TokensPurchased(msg.sender, currentPhase, tokenAmount, msg.value);
    }
    
    function getCurrentPrice() public view returns (uint256) {
        if (currentPhase == SalePhase.Seed) return SEED_PRICE;
        if (currentPhase == SalePhase.Private) return PRIVATE_PRICE;
        if (currentPhase == SalePhase.Public) return PUBLIC_PRICE;
        revert("No active sale");
    }
    
    function getMaxPurchase() public view returns (uint256) {
        if (currentPhase == SalePhase.Seed) return MAX_PURCHASE_SEED;
        if (currentPhase == SalePhase.Private) return MAX_PURCHASE_PRIVATE;
        if (currentPhase == SalePhase.Public) return MAX_PURCHASE_PUBLIC;
        return 0;
    }
    
    function getAvailableTokens() public view returns (uint256) {
        if (currentPhase == SalePhase.Seed) return SEED_ALLOCATION - seedSold;
        if (currentPhase == SalePhase.Private) return PRIVATE_ALLOCATION - privateSold;
        if (currentPhase == SalePhase.Public) return PUBLIC_ALLOCATION - publicSold;
        return 0;
    }
    
    function getPreviousPurchase(address buyer) public view returns (uint256) {
        if (currentPhase == SalePhase.Seed) return seedPurchases[buyer];
        if (currentPhase == SalePhase.Private) return privatePurchases[buyer];
        if (currentPhase == SalePhase.Public) return publicPurchases[buyer];
        return 0;
    }
    
    function _recordPurchase(address buyer, uint256 amount) internal {
        if (currentPhase == SalePhase.Seed) {
            seedPurchases[buyer] += amount;
            seedSold += amount;
        } else if (currentPhase == SalePhase.Private) {
            privatePurchases[buyer] += amount;
            privateSold += amount;
        } else if (currentPhase == SalePhase.Public) {
            publicPurchases[buyer] += amount;
            publicSold += amount;
        }
    }
    
    function withdrawFunds(address payable to) external onlyOwner {
        require(to != address(0), "Invalid address");
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = to.call{value: balance}("");
        require(success, "Transfer failed");
        
        emit FundsWithdrawn(to, balance);
    }
    
    function withdrawUnsoldTokens(address to) external onlyOwner {
        require(currentPhase == SalePhase.Ended, "Sale not ended");
        require(to != address(0), "Invalid address");
        
        uint256 balance = barToken.balanceOf(address(this));
        if (balance > 0) {
            barToken.safeTransfer(to, balance);
        }
    }
    
    function getSaleStats() external view returns (
        SalePhase phase,
        uint256 raised,
        uint256 seedTokensSold,
        uint256 privateTokensSold,
        uint256 publicTokensSold,
        uint256 available
    ) {
        return (
            currentPhase,
            totalRaised,
            seedSold,
            privateSold,
            publicSold,
            getAvailableTokens()
        );
    }
}
