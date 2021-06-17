#!/usr/bin/env bash
set -e
node node_modules/.bin/c-preprocessor --config $1 template/Swaps.sol contracts/Swaps.sol
