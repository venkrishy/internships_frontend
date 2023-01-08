# ♨️ Frontend Internships App


## Key Features

- Fetches internships from https://o66oaaczm7.execute-api.us-east-1.amazonaws.com/parse
- The REST API in turn scrapes internships from github page

## Installation Steps

- First time: Run "yarn install && yarn run build:browser && yarn run start"
- After first run: Run "yarn run start"
- Module not found: Error: Can't resolve '../../dist/stats.json' - Requires webpack to be built so that the stats.json file is created locally.  Run yarn run build:browser