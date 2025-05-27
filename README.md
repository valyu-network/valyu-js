# Valyu SDK

**DeepSearch API for AI**

Valyu's Deepsearch API gives AI the context it needs. Integrate trusted, high-quality public and proprietary sources, with full-text multimodal retrieval.

Get **$10 free credits** for the Valyu API when you sign up at [Valyu](https://platform.valyu.network)!

*No credit card required.*

## How does it work?

We do all the heavy lifting for you - through a single API we provide:

- **Academic & Research Content** - Access millions of scholarly papers and textbooks
- **Real-time Web Search** - Get the latest information from across the internet  
- **Structured Financial Data** - Stock prices, market data, and financial metrics
- **Intelligent Reranking** - Results across all sources are automatically sorted by relevance
- **Transparent Pricing** - Pay only for what you use with clear CPM pricing

## Installation

Install the Valyu SDK using npm:

```bash
npm install valyu
```

## Quick Start

Here's what it looks like, make your first query in just 4 lines of code:

```javascript
const { Valyu } = require('valyu');

const valyu = new Valyu("your-api-key-here");

const response = await valyu.search(
  "Implementation details of agentic search-enhanced large reasoning models"
);

console.log(response);

// Feed the results to your AI agent as you would with other search APIs
```

## API Reference

### Search Method

The `search()` method is the core of the Valyu SDK. It accepts a query string as the first parameter, followed by optional configuration parameters.

```javascript
valyu.search(
    query,                                        // Your search query
    {
        searchType: "all",                       // "all", "web", or "proprietary"
        maxNumResults: 10,                       // Maximum results to return (1-20)
        isToolCall: true,                        // Whether this is an AI tool call
        relevanceThreshold: 0.5,                 // Minimum relevance score (0-1)
        maxPrice: 30,                            // Maximum price per thousand queries (CPM)
        includedSources: [],                     // Specific sources to search
        category: null,                          // Category filter
        startDate: null,                         // Start date (YYYY-MM-DD)
        endDate: null                            // End date (YYYY-MM-DD)
    }
)
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `query` | `string` | *required* | The search query string |
| `searchType` | `string` | `"all"` | Search scope: `"all"`, `"web"`, or `"proprietary"` |
| `maxNumResults` | `number` | `10` | Maximum number of results to return (1-20) |
| `isToolCall` | `boolean` | `true` | Whether this is an AI tool call (affects processing) |
| `relevanceThreshold` | `number` | `0.5` | Minimum relevance score for results (0.0-1.0) |
| `maxPrice` | `number` | `30` | Maximum price per thousand queries in CPM |
| `includedSources` | `string[]` | `[]` | Specific data sources or URLs to search |
| `category` | `string` | `null` | Category filter for results |
| `startDate` | `string` | `null` | Start date filter in YYYY-MM-DD format |
| `endDate` | `string` | `null` | End date filter in YYYY-MM-DD format |

### Response Format

The search method returns a `SearchResponse` object with the following structure:

```javascript
{
    success: boolean,                           // Whether the search was successful
    error: string | null,                       // Error message if any
    tx_id: string,                             // Transaction ID for feedback
    query: string,                             // The original query
    results: SearchResult[],                   // List of search results
    results_by_source: {                       // Count of results by source type
        web: number,
        proprietary: number
    },
    total_deduction_pcm: number,               // Cost in CPM
    total_deduction_dollars: number,           // Cost in dollars
    total_characters: number                   // Total characters returned
}
```

Each `SearchResult` contains:

```javascript
{
    title: string,                             // Result title
    url: string,                              // Source URL
    content: string,                          // Full content
    description?: string,                     // Brief description
    source: string,                           // Source identifier
    price: number,                            // Cost for this result
    length: number,                           // Content length in characters
    image_url?: Record<string, string>,       // Associated images
    relevance_score: number,                  // Relevance score (0-1)
    data_type?: string                        // "structured" or "unstructured"
}
```

## Examples

### Basic Search

```javascript
const { Valyu } = require('valyu');

const valyu = new Valyu("your-api-key");

// Simple search across all sources
const response = await valyu.search("What is machine learning?");
console.log(`Found ${response.results.length} results`);
```

### Academic Research

```javascript
// Search academic papers on arXiv
const response = await valyu.search(
  "agentic search-enhanced large reasoning models",
  {
    searchType: "proprietary",
    maxNumResults: 10,
    relevanceThreshold: 0.6,
    includedSources: ["valyu/valyu-arxiv"],
    startDate: "2024-05-01"
  }
);
```

### Web Search with Date Filtering

```javascript
// Search recent web content
const response = await valyu.search(
  "what is claude 4 opus model",
  {
    searchType: "web",
    maxNumResults: 7,
    relevanceThreshold: 0.5,
    startDate: "2024-01-01",
    endDate: "2024-12-31"
  }
);
```

### Hybrid Search

```javascript
// Search both web and proprietary sources
const response = await valyu.search(
    "quantum computing breakthroughs",
    {
        searchType: "all",
        category: "technology",
        relevanceThreshold: 0.6,
        maxPrice: 50
    }
);
```

### Processing Results

```javascript
const response = await valyu.search("climate change solutions");

if (response.success) {
    console.log(`Search cost: $${response.total_deduction_dollars.toFixed(4)}`);
    console.log(`Sources: Web=${response.results_by_source.web}, Proprietary=${response.results_by_source.proprietary}`);
    
    response.results.forEach((result, i) => {
        console.log(`\n${i + 1}. ${result.title}`);
        console.log(`   Source: ${result.source}`);
        console.log(`   Relevance: ${result.relevance_score.toFixed(2)}`);
        console.log(`   Content: ${result.content.substring(0, 200)}...`);
    });
} else {
    console.log(`Search failed: ${response.error}`);
}
```

## Authentication

Set your API key in one of these ways:

1. **Environment variable** (recommended):
   ```bash
   export VALYU_API_KEY="your-api-key-here"
   ```

2. **Direct initialization**:
   ```javascript
   const valyu = new Valyu("your-api-key-here");
   ```

3. **Custom base URL** (for staging/testing):
   ```javascript
   const valyu = new Valyu(
       "your-api-key-here",
       "https://stage.api.valyu.network/v1"
   );
   ```

## Error Handling

The SDK handles errors gracefully and returns structured error responses:

```javascript
const response = await valyu.search("test query");

if (!response.success) {
    console.log(`Error: ${response.error}`);
    console.log(`Transaction ID: ${response.tx_id}`);
} else {
    // Process successful results
    response.results.forEach(result => {
        console.log(result.title);
    });
}
```

## TypeScript Support

The SDK includes full TypeScript support:

```typescript
import { Valyu, SearchOptions, SearchResponse } from 'valyu';

const valyu = new Valyu("your-api-key");

const options: SearchOptions = {
    searchType: "proprietary",
    maxNumResults: 10,
    relevanceThreshold: 0.6
};

const response: SearchResponse = await valyu.search("machine learning", options);
```

## Backward Compatibility

The legacy `context()` method is still supported but deprecated:

```javascript
// Legacy method (deprecated)
const response = await valyu.context(
    "neural networks basics",
    {
        searchType: "all",
        maxNumResults: 5,
        queryRewrite: true,
        similarityThreshold: 0.5,
        dataSources: ["valyu/valyu-arxiv"]
    }
);
```

**Migration from v1 to v2:**
- `context()` → `search()`
- `similarityThreshold` → `relevanceThreshold`
- `dataSources` → `includedSources`
- `queryRewrite` → `isToolCall`
- Default `relevanceThreshold` changed from `0.4` to `0.5`
- Default `maxPrice` changed from `1` to `30`

## Getting Started

1. Sign up for a free account at [Valyu](https://exchange.valyu.network)
2. Get your API key from the dashboard  
3. Install the SDK: `npm install valyu`
4. Start building with the examples above

## Testing

Run the integration tests:

```bash
npm run test:integration
```

Run the v2 API examples:

```bash
node examples/v2-api-examples.js
```

## Support

- **Documentation**: [docs.valyu.network](https://docs.valyu.network)
- **API Reference**: Full parameter documentation above
- **Examples**: Check the `examples/` directory in this repository
- **Issues**: Report bugs on GitHub

## License

This project is licensed under the MIT License.

