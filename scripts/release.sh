#!/bin/bash

set -e

PACKAGE_JSON="package.json"
FROM_VERSION=$(jq -r '.version' $PACKAGE_JSON)
VERSION_TYPE=""

if [[ " $@ " =~ " major " ]] || [[ " $@ " =~ " ma " ]]; then
  VERSION_TYPE="major"
elif [[ " $@ " =~ " minor " ]] || [[ " $@ " =~ " mi " ]]; then
  VERSION_TYPE="minor"
elif [[ " $@ " =~ " patch " ]] || [[ " $@ " =~ " p " ]]; then
  VERSION_TYPE="patch"
else
  echo "Error: Please specify a version level"
  echo "Usage: npm run release -- [major|minor|patch]"
  exit 1
fi

npm run test
echo "Tests passed successfully!"

npm version $VERSION_TYPE -m "Release(%s)"
echo "Releasing a new $VERSION_TYPE version"
TO_VERSION=$(jq -r '.version' $PACKAGE_JSON)
echo "v$FROM_VERSION -> v$TO_VERSION"
git push --follow-tags
echo "Version $TO_VERSION released successfully!"

npm run deploy
echo "Project deployed successfully!"