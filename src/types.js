// src/types.js

/**
 * @typedef {"web" | "proprietary"} SearchType
 */

/**
 * @typedef {Object} SearchResult
 * @property {string} title
 * @property {string} url
 * @property {string} content
 * @property {string} [description]
 * @property {string} source
 * @property {number} price
 * @property {number} length
 * @property {number} relevance_score
 */

/**
 * @typedef {Object} ResultsBySource
 * @property {number} web
 * @property {number} proprietary
 */

/**
 * @typedef {Object} SearchResponse
 * @property {boolean} success
 * @property {string} [error]
 * @property {string} tx_id
 * @property {string} query
 * @property {SearchResult[]} results
 * @property {ResultsBySource} results_by_source
 * @property {number} total_deduction_pcm
 * @property {number} total_deduction_dollars
 * @property {number} total_characters
 */
