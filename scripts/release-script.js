const { execSync } = require("child_process");
const packageJson = require("../package.json");

const args = process.argv.slice(2);
const fromVersion = packageJson.version;
let versionType = "";

if (args.includes("major") || args.includes("ma")) {
  versionType = "major";
} else if (args.includes("minor") || args.includes("mi")) {
  versionType = "minor";
} else if (args.includes("patch") || args.includes("p")) {
  versionType = "patch";
} else {
  console.error("Error: Please specify a version level");
  console.error("Usage: npm run release -- [major|minor|patch]");
  process.exit(1);
}

function execute(command) {
  execSync(command, { stdio: "inherit" });
}

execute(`npm version ${versionType} -m "Release(%s)"`);
console.info(`Releasing a new ${versionType} version`);
console.info(`  v${fromVersion} -> v${packageJson.version}`);
execute("git push --follow-tags");
execute("npm run deploy");
