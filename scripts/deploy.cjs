const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

async function main() {
  const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;
  if (!PRIVATE_KEY) {
    console.error("ERROR: Set DEPLOYER_PRIVATE_KEY environment variable");
    process.exit(1);
  }

  const RPC_URL = "https://sepolia.base.org";
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  console.log("=".repeat(60));
  console.log("BartBank Protocol - Deploy to Base Sepolia");
  console.log("=".repeat(60));
  console.log("Deployer:", wallet.address);

  const balance = await provider.getBalance(wallet.address);
  console.log("Balance:", ethers.formatEther(balance), "ETH");
  
  if (balance === 0n) {
    console.error("\nERROR: No ETH balance. Get testnet ETH from:");
    console.error("  https://www.base.org/faucet");
    console.error("  https://faucet.quicknode.com/base/sepolia");
    process.exit(1);
  }
  console.log("");

  function loadArtifact(name) {
    const artifact = JSON.parse(fs.readFileSync(path.resolve("artifacts", `${name}.json`), "utf8"));
    return { abi: artifact.abi, bytecode: artifact.bytecode };
  }

  const teamWallet = wallet.address;
  const marketingWallet = wallet.address;
  const liquidityWallet = wallet.address;

  console.log("[1/3] Deploying BARToken...");
  const barTokenArtifact = loadArtifact("BARToken");
  const BARTokenFactory = new ethers.ContractFactory(barTokenArtifact.abi, barTokenArtifact.bytecode, wallet);
  const barToken = await BARTokenFactory.deploy(teamWallet, marketingWallet, liquidityWallet);
  await barToken.waitForDeployment();
  const barTokenAddress = await barToken.getAddress();
  console.log("  BARToken deployed at:", barTokenAddress);

  console.log("[2/3] Deploying BARDAO...");
  const barDAOArtifact = loadArtifact("BARDAO");
  const BARDAOFactory = new ethers.ContractFactory(barDAOArtifact.abi, barDAOArtifact.bytecode, wallet);
  const barDAO = await BARDAOFactory.deploy(barTokenAddress);
  await barDAO.waitForDeployment();
  const barDAOAddress = await barDAO.getAddress();
  console.log("  BARDAO deployed at:", barDAOAddress);

  console.log("[3/3] Deploying BARTokenSale...");
  const barSaleArtifact = loadArtifact("BARTokenSale");
  const BARSaleFactory = new ethers.ContractFactory(barSaleArtifact.abi, barSaleArtifact.bytecode, wallet);
  const barSale = await BARSaleFactory.deploy(barTokenAddress);
  await barSale.waitForDeployment();
  const barSaleAddress = await barSale.getAddress();
  console.log("  BARTokenSale deployed at:", barSaleAddress);

  console.log("");
  console.log("Configuring contracts...");

  console.log("  Setting sale contract on BARToken...");
  const tx1 = await barToken.setSaleContract(barSaleAddress);
  await tx1.wait();
  console.log("  Done! 40M BAR minted to sale contract");

  console.log("  Setting DAO treasury on BARToken...");
  const tx2 = await barToken.setDAOTreasury(barDAOAddress);
  await tx2.wait();
  console.log("  Done! 30M BAR minted to DAO treasury");

  console.log("");
  console.log("=".repeat(60));
  console.log("DEPLOY COMPLETE!");
  console.log("=".repeat(60));
  console.log("");
  console.log("Contract Addresses (Base Sepolia - Chain ID 84532):");
  console.log("  BARToken:     ", barTokenAddress);
  console.log("  BARDAO:       ", barDAOAddress);
  console.log("  BARTokenSale: ", barSaleAddress);
  console.log("");

  const configContent = `import { base, baseSepolia } from 'wagmi/chains';

export const SUPPORTED_CHAIN = baseSepolia;

export const CONTRACT_ADDRESSES = {
  [baseSepolia.id]: {
    barToken: '${barTokenAddress}' as \`0x\${string}\`,
    barSale: '${barSaleAddress}' as \`0x\${string}\`,
    barDAO: '${barDAOAddress}' as \`0x\${string}\`,
  },
  [base.id]: {
    barToken: '0x0000000000000000000000000000000000000000' as \`0x\${string}\`,
    barSale: '0x0000000000000000000000000000000000000000' as \`0x\${string}\`,
    barDAO: '0x0000000000000000000000000000000000000000' as \`0x\${string}\`,
  },
} as const;

export const SALE_PHASES = {
  0: 'NotStarted',
  1: 'Seed',
  2: 'Private',
  3: 'Public',
  4: 'Ended',
} as const;

export const PROPOSAL_STATES = {
  0: 'Pending',
  1: 'Active',
  2: 'Defeated',
  3: 'Succeeded',
  4: 'Executed',
  5: 'Cancelled',
} as const;

export const PROPOSAL_TYPES = {
  0: 'FundAllocation',
  1: 'Partnership',
  2: 'ProtocolChange',
  3: 'Other',
} as const;

export const TOKENOMICS = {
  totalSupply: 100_000_000,
  publicSale: 40_000_000,
  daoTreasury: 30_000_000,
  team: 15_000_000,
  marketing: 10_000_000,
  liquidity: 5_000_000,
  
  seedAllocation: 10_000_000,
  privateAllocation: 15_000_000,
  publicAllocation: 15_000_000,
  
  seedPrice: 0.01,
  privatePrice: 0.025,
  publicPrice: 0.05,
  
  seedTarget: 100_000,
  privateTarget: 375_000,
  publicTarget: 750_000,
} as const;

export function getContractAddress(chainId: number, contract: 'barToken' | 'barSale' | 'barDAO') {
  const addresses = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES];
  if (!addresses) {
    throw new Error(\`Unsupported chain ID: \${chainId}\`);
  }
  return addresses[contract];
}

export function isContractDeployed(chainId: number): boolean {
  const addresses = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES];
  if (!addresses) return false;
  return addresses.barToken !== '0x0000000000000000000000000000000000000000';
}
`;

  fs.writeFileSync(path.resolve("client/src/contracts/config.ts"), configContent);
  console.log("config.ts updated with deployed addresses!");
  
  const deployInfo = {
    network: "Base Sepolia",
    chainId: 84532,
    deployer: wallet.address,
    timestamp: new Date().toISOString(),
    contracts: {
      barToken: barTokenAddress,
      barDAO: barDAOAddress,
      barSale: barSaleAddress,
    },
  };
  fs.writeFileSync(path.resolve("artifacts/deploy-info.json"), JSON.stringify(deployInfo, null, 2));
  console.log("Deploy info saved to artifacts/deploy-info.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deploy failed:", error.message || error);
    process.exit(1);
  });
