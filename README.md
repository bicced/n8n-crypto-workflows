# n8n Crypto Workflows — Open Source Web3 Automations

[![GitHub stars](https://img.shields.io/github/stars/bicced/n8n-crypto-workflows?style=social)](https://github.com/bicced/n8n-crypto-workflows)
[![License: MIT](https://img.shields.io/github/license/bicced/n8n-crypto-workflows)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![Built for n8n](https://img.shields.io/badge/Built%20for-n8n-0a6cff?logo=n8n&logoColor=white)](https://n8n.io)

![n8n-crypto-workflows](https://github.com/user-attachments/assets/b06c6925-9126-418c-8741-baa842e62d6a)

If this project helps you, please ⭐ [Star the repo](https://github.com/bicced/n8n-crypto-workflows) and share it.

Community-maintained collection of ready-to-import **n8n crypto workflows** for Web3, DeFi, and on-chain automation. Every workflow is a **JSON template** you can import into your own n8n instance.

Useful for: alerts, wallet operations, token approvals, scheduled transfers, trade quotes, and social notifications (Telegram, Discord, X/Twitter).

---

## Table of Contents
- [Why n8n Crypto Workflows?](#why-n8n-crypto-workflows)
- [Quick Start](#quick-start)
- [Templates](#templates)
- [Verification Checklist](#verification-checklist)
- [Contributing](#contributing)
- [License](#license)
- [Legal & Risk Notice](#legal--risk-notice)

---

## Why n8n Crypto Workflows?
- Automate common crypto tasks using battle-tested n8n nodes and HTTP calls
- Mix on-chain actions with off-chain notifications and AI triggers
- Use as templates for your own custom automations

Some workflows optionally use APIs from providers such as [CoinGecko](https://www.coingecko.com/), [Jupiter](https://jup.ag/), [AFKCrypto](https://www.afkcrypto.com), and others. Requirements are noted per workflow.

---

## Quick Start
1) Clone or download this repository.  
2) In n8n, create a new workflow and simply copy and paste JSON code from [`/workflows`](./workflows) into your n8n workflow.  
3) Fill in credentials and environment variables (API keys, RPC URLs, secrets).  
4) Run with small values or on testnets first.  
5) Review logs and add timeouts/retries where appropriate.

Tip: Search for “n8n crypto workflows” to find this repo again.

---

## Templates
All templates live in [`/workflows`](./workflows). File names describe the purpose.

<img width="899" height="452" alt="workflow-screenshot" src="https://github.com/user-attachments/assets/e8c4eef5-d0c8-417d-9dc7-3396ca208e12" />

### Featured templates
- [`solana-transfer-with-telegram-notification-template.json`](./workflows/solana-transfer-with-telegram-notification-template.json) — Solana transfer with Telegram message.
- [`evm-token-approval-template.json`](./workflows/evm-token-approval-template.json) — Approve a spender for ERC‑20 token allowance.
- [`simple-ai-solana-trading-bot-template.json`](./workflows/simple-ai-solana-trading-bot-template.json) — Minimal AI-triggered Solana trading example.
- [`resilient-sol-sender-template.json`](./workflows/resilient-sol-sender-template.json) — SOL transfer with basic resiliency (retries/backoff patterns).
- [`get-crypto-trade-quote-template.json`](./workflows/get-crypto-trade-quote-template.json) — Fetch an indicative trade quote from an aggregator/API.
- [`daily-sol-price-telegram-reporter-template.json`](./workflows/daily-sol-price-telegram-reporter-template.json) — Report SOL price to Telegram on a schedule.

### Browse all templates
- Explore the full list in [`/workflows`](./workflows)
- Use repository search with keywords such as: `n8n crypto workflows`, `solana`, `evm`, `telegram`, `discord`, `x-twitter`, `approval`, `transfer`, `quote`

If you publish a blog or video about these templates, please include a link to this repo with the phrase “n8n crypto workflows” so others can discover them.

---

## Verification Checklist
Before enabling any workflow with funds or production credentials:

- Confirm node parameters and environment variables are set correctly
- Validate addresses, chain IDs, token decimals, and slippage settings
- Add timeouts and bounded retries where requests may fail
- Log critical steps and verify success conditions, not just request completion
- Start with testnets or dust amounts; progressively increase only after review
- Ensure your jurisdiction permits the actions you automate

---

## 🤝 Contributing
Want to add or improve an **n8n crypto workflow**?

- Fork this repository
- Add your `.json` file under `/workflows`
- Use lowercase-with-hyphens for filenames (e.g., `token-swap.json`)
- Open a PR describing what it does, dependencies, and required credentials
- Note any third-party services used (e.g., AFKCrypto, CoinGecko, Jupiter)

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

---

## 📜 License
MIT — see [LICENSE](./LICENSE). For additional risk disclosures, see [DISCLAIMER.md](./DISCLAIMER.md).

---

## Legal & Risk Notice
These templates are provided by the community on an **AS IS** basis, with **no warranties** of any kind, express or implied. They may contain mistakes or incomplete logic. By using them, you agree that:

- You are solely responsible for reviewing, testing, securing, and operating any workflow
- You will verify behavior on testnets or with trivial amounts before real usage
- You accept all risks, including but not limited to loss of funds or access
- This is **not financial advice** and **no liability** is assumed for any outcome

See also: [DISCLAIMER.md](./DISCLAIMER.md).

Trademarks: “n8n” is a trademark of n8n GmbH; all other names belong to their owners.

Maintained by the community; originally initiated by AFKCrypto.

<!-- SEO: n8n crypto workflows, n8n crypto automation, n8n web3 workflows, n8n DeFi templates, n8n solana, n8n ethereum, n8n wallet automations, n8n crypto AI trading bot -->
