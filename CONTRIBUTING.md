# Contributing

Thanks for helping grow the n8n crypto workflow library!

## How to add a workflow
1. Export your workflow from n8n as a `.json` file.  
2. Place it in the `/workflows` folder.  
3. Name the file in **lowercase with hyphens** (example: `price-alert.json`, `swap-1inch.json`).  
4. Open a Pull Request with:
   - A short one-line description of what your workflow does (in the PR text).  
   - Any setup requirements (e.g., “needs RPC URL”, “requires AFK Crypto API key”).  

## Guidelines
- Keep file names **short and descriptive**.  
- No sensitive data or API keys in the JSON.  
- Workflows are provided *as-is* and may contain errors. Please mention risks if funds can move.  

## Example
PR title:  
`Add workflow: price-alert.json`  

PR description:  
Triggers when SOL price crosses a threshold and sends Telegram alert.
Requires: RPC_URL, CoinGecko API key.
Risk: Low — does not move funds.