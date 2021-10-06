/**
 * @fileoverview Search products by a substring.
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

// [START search for product by query]
async function searchProduct() {
  await createPrimaryAndVariantProductsForSearch(); // TODO: remove when a sample database is setup

  const searchRequest = {
    placement: defaultSearchPlacement,
    branch: defaultBranch,
    query: query_phrase, // experiment with other query strings
    visitorId: visitorId,
  };
  const searchResponse = await searchClient.search(searchRequest);
  console.log("First of the products found: ", searchResponse[0]);

  await cleanUpCatalog(); // TODO: remove when a sample database is setup
}
// [END search for product by query]

searchProduct();
