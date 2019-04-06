#!/bin/sh

set -e
export GITHUB_TOKEN=$PAT
sh -c "node /index.js"
