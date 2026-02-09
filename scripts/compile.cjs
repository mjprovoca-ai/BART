const solc = require("solc");
const fs = require("fs");
const path = require("path");

function findImport(importPath) {
  const ozPath = path.resolve("node_modules", importPath);
  if (fs.existsSync(ozPath)) {
    return { contents: fs.readFileSync(ozPath, "utf8") };
  }
  return { error: "File not found: " + importPath };
}

const contracts = ["BARToken.sol", "BARDAO.sol", "BARTokenSale.sol"];
const sources = {};

for (const name of contracts) {
  const filePath = path.resolve("contracts", name);
  sources[name] = { content: fs.readFileSync(filePath, "utf8") };
}

const input = {
  language: "Solidity",
  sources,
  settings: {
    viaIR: true,
    optimizer: { enabled: true, runs: 200 },
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode.object"],
      },
    },
  },
};

console.log("Compiling contracts...");
const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImport }));

if (output.errors) {
  const errors = output.errors.filter((e) => e.severity === "error");
  if (errors.length > 0) {
    console.error("Compilation errors:");
    errors.forEach((e) => console.error(e.formattedMessage));
    process.exit(1);
  }
  const warnings = output.errors.filter((e) => e.severity === "warning");
  if (warnings.length > 0) {
    console.log(`${warnings.length} warning(s) (non-blocking)`);
  }
}

const artifactsDir = path.resolve("artifacts");
if (!fs.existsSync(artifactsDir)) fs.mkdirSync(artifactsDir, { recursive: true });

const compiled = {};

for (const [fileName, fileContracts] of Object.entries(output.contracts || {})) {
  for (const [contractName, contractData] of Object.entries(fileContracts)) {
    const artifact = {
      contractName,
      abi: contractData.abi,
      bytecode: "0x" + contractData.evm.bytecode.object,
    };
    
    const artifactPath = path.join(artifactsDir, `${contractName}.json`);
    fs.writeFileSync(artifactPath, JSON.stringify(artifact, null, 2));
    compiled[contractName] = artifact;
    console.log(`  ${contractName} -> ${artifactPath}`);
  }
}

console.log("\nCompilation complete! Artifacts saved to ./artifacts/");
