const { execSync } = require("child_process");

const args = process.argv.slice(2);
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

console.log(`Releasing a ${versionType} version...`);
execSync(`npm version ${versionType} -m "Release version %s"`, {
  stdio: "inherit",
});
execSync("npm run ci-deploy", { stdio: "inherit" });
