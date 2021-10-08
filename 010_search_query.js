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
(async function searchProduct() {

  const searchRequest = {
    placement: defaultSearchPlacement,
    branch: defaultBranch,
    query: 'Single', // experiment with other query strings
    visitorId: visitorId,
  };
  const searchResponse = await searchClient.search(searchRequest);
  console.log("Products found: ", searchResponse[0].map(prod => prod.product.title));

})();
// [END search for product by query]

// searchProduct();
