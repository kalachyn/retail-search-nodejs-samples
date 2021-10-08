/**
 * @fileoverview Search products by a substring and a filter.
 */
const { SearchServiceClient } = require("@google-cloud/retail");

const {
  defaultBranch,
  defaultSearchPlacement,
  query_phrase,
  visitorId,
} = require("./setup_catalog.js");

const searchClient = new SearchServiceClient({
  apiEndpoint: "test-retail.sandbox.googleapis.com",
});

const sampleFilter = 'colorFamily: ANY("black")'; // experiment with filters
const sampleQuery = 'Nest'; // experiment with other query strings

// [START search for product using filter]
async function searchProductWithFilter() {
  const searchRequest = {
    branch: defaultBranch,
    filter: sampleFilter,
    placement: defaultSearchPlacement,
    query: sampleQuery,
    visitorId: visitorId,
  };

  const searchResponse = await searchClient.search(searchRequest);
  const results = searchResponse[0];
  console.log(
    `First 10 out of ${results.length} products found with filter:\n`,
    results
      .slice(0, 10)
      .map((result, i) => `${i + 1}: ${result.product.title}`)
  );
}
// [END search for product using filter]

searchProductWithFilter();
