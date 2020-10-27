#!/usr/bin/env bash

set -euxo pipefail
yarn run lint
yarn run test:e2e:chrome --headless

