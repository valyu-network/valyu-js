// src/api.js

const axios = require('axios');

/**
 * Valyu API Client.
 */
class Valyu {
  /**
   * Initialize the Valyu client.
   *
   * @param {string} [apiKey] - The API key to use for the client.
   *   If not provided, the environment variable `VALYU_API_KEY` is used.
   * @param {string} [baseUrl="https://api.valyu.network/v1"] - The base URL for the Valyu API.
   *
   * @throws {Error} If no API key is provided.
   */
  constructor(apiKey, baseUrl = "https://api.valyu.network/v1") {
    if (!apiKey) {
      apiKey = process.env.VALYU_API_KEY;
      if (!apiKey) {
        throw new Error("VALYU_API_KEY is not set");
      }
    }
    this.baseUrl = baseUrl;
    this.headers = {
      "Content-Type": "application/json",
      "x-api-key": apiKey
    };
  }

  /**
   * Fetch context from the Valyu API.
   *
   * @param {string} query - The query to search for.
   * @param {"web"|"proprietary"} search_type - The type of search to perform.
   * @param {number} [num_query=10] - The number of queries to run.
   * @param {number} [num_results=10] - The number of results to return per query.
   * @param {number} [max_price=1] - The maximum price (per thousand queries) to spend on the search.
   * @param {string[]} [data_sources] - Optional list of data sources.
   *
   * @returns {Promise<SearchResponse>} The search response.
   */
  async context(query, search_type, num_query = 10, num_results = 10, max_price = 1, data_sources) {
    try {
      const payload = {
        query,
        search_type,
        num_query,
        num_results,
        max_price
      };

      if (data_sources !== undefined) {
        payload.data_sources = data_sources;
      }

      const response = await axios.post(
        `${this.baseUrl}/knowledge`,
        payload,
        { headers: this.headers }
      );

      // If the HTTP status code is not in the 200 range, return an error response.
      if (response.status < 200 || response.status >= 300) {
        return {
          success: false,
          error: response.data.error,
          query,
          results: [],
          results_by_source: { web: 0, proprietary: 0 },
          total_deduction_pcm: 0.0,
          total_deduction_dollars: 0.0,
          total_characters: 0
        };
      }

      // Otherwise, return the data as-is (assuming it matches the expected SearchResponse format)
      return response.data;
    } catch (e) {
      return {
        success: false,
        error: e.message,
        query,
        results: [],
        results_by_source: { web: 0, proprietary: 0 },
        total_deduction_pcm: 0.0,
        total_deduction_dollars: 0.0,
        total_characters: 0
      };
    }
  }
}

module.exports = { Valyu };
