#!/bin/bash

# Navigate to the deployment directory
cd /home/site/wwwroot

# Remove the existing node_modules directory
rm -rf node_modules

# Extract the node_modules directory from the deployment package
tar -xzf node_modules.tar.gz -C /home/site/wwwroot

# Set the NODE_PATH and PATH environment variables
export NODE_PATH="/home/site/wwwroot/node_modules":$NODE_PATH
export PATH=/home/site/wwwroot/node_modules/.bin:$PATH

# Run the application
node dist/bundle.mjs
