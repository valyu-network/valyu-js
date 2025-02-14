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
   * @param {number} [max_num_results=10] - The maximum number of results to return.
   * @param {boolean} [query_rewrite=true] - Whether to rewrite the query to improve search quality.
   * @param {number} [similarity_threshold=0.4] - The similarity threshold to not return results below.
   * @param {number} [max_price=1] - The maximum price (per thousand queries) to spend on the search.
   * @param {string[]} [data_sources] - Optional list of data sources.
   *
   * @returns {Promise<SearchResponse>} The search response.
   */
  async context(
    query,
    search_type,
    max_num_results = 10,
    query_rewrite = true,
    similarity_threshold = 0.4,
    max_price = 1,
    data_sources
  ) {
    try {
      const payload = {
        query,
        search_type,
        max_num_results,
        query_rewrite,
        similarity_threshold,
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

      if (!response.status || response.status < 200 || response.status >= 300) {
        return {
          success: false,
          error: response.data?.error,
          tx_id: null,
          query,
          results: [],
          results_by_source: { web: 0, proprietary: 0 },
          total_deduction_pcm: 0.0,
          total_deduction_dollars: 0.0,
          total_characters: 0
        };
      }

      return response.data;
    } catch (e) {
      return {
        success: false,
        error: e.message,
        tx_id: null,
        query,
        results: [],
        results_by_source: { web: 0, proprietary: 0 },
        total_deduction_pcm: 0.0,
        total_deduction_dollars: 0.0,
        total_characters: 0
      };
    }
  }

  /**
   * Send feedback about a previous search response.
   *
   * @param {string} tx_id - The transaction ID from a previous search response
   * @param {string} feedback - Feedback message about the search results
   * @param {"very good"|"good"|"bad"|"very bad"} sentiment - The sentiment of the feedback
   * @returns {Promise<Object>} Response containing success status and optional error message
   */
  async feedback(tx_id, feedback, sentiment) {
    try {
      const payload = {
        tx_id,
        feedback,
        sentiment: sentiment.toLowerCase()
      };

      const response = await axios.post(
        `${this.baseUrl}/feedback`,
        payload,
        { headers: this.headers }
      );

      return response.data;
    } catch (e) {
      return {
        success: false,
        error: e.message
      };
    }
  }
}

module.exports = { Valyu };
