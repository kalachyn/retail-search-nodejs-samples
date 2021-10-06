/**
 * @fileoverview Search products by a substring and a filter.
 */
const { SearchServiceClient } = require("@google-cloud/retail");

const {
  cleanUpCatalog,
  defaultBranch,
  defaultSearchPlacement,
  createPrimaryAndVariantProductsForSearch,
  query_phrase,
  visitorId,
} = require("./setup_catalog.js");

const searchClient = new SearchServiceClient({
  apiEndpoint: "test-retail.sandbox.googleapis.com",
});

// [START search for product defining page size]
async function searchProductWithPageSize() {
  await createPrimaryAndVariantProductsForSearch(); // TODO: remove when a sample database is setup

  const tryPageSize = 2;
  const searchRequest = {
    branch: defaultBranch,
    pageSize: tryPageSize, // try different page sizes, including those over 100
    placement: defaultSearchPlacement,
    query: query_phrase, // experiment with other query strings
    visitorId: visitorId,
  };
  const searchResponse = await searchClient.search(searchRequest);
  console.log(`First of the products found at the page size of ${tryPageSize}:\n`, searchResponse[0]);

  await cleanUpCatalog();  // TODO: remove when a sample database is setup
}
// [END search for product defining page size]

searchProductWithPageSize();
