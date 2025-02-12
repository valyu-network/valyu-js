# Valyu SDK for Node.js

Connect your AI applications to high-quality proprietary data with Valyu, an AI context engine built by AI Engineers for AI Engineers.

## Why Valyu?

- **Ready-to-use RAG Data**: All data is returned in Markdown format, optimized for AI consumption.
- **Multimodal Support**: Retrieve text, images, and other data types for comprehensive answers.
- **Pay-per-use**: Transparent pricing—you only pay for what you use.
- **Hybrid Search**: Combine proprietary dataset access with web search capabilities.
- **Built for AI**: Designed specifically for Retrieval-Augmented Generation (RAG) applications.

## Installation

Install the Valyu SDK via npm:

```bash
npm install valyu
```

Quick Start
```js
const { Valyu } = require('valyu');

// Initialize the Valyu client (provide your API key)
const valyu = new Valyu("your-api-key");

// Get relevant context for your query
(async () => {
  const response = await valyu.context(
    "Tell me about ancient civilizations", // query
    "proprietary",                         // search_type ("proprietary" or "web")
    5,                                     // num_query: number of queries to generate
    3,                                     // num_results: number of results per query
    10                                     // max_price: maximum price per thousand queries
  );
  console.log(response);
})();
```

