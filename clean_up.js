/**
 * @fileoverview Search products by a substring.
 */
const { SearchServiceClient } = require("@google-cloud/retail");

const {
  cleanUpCatalog,
  defaultBranch,
  defaultSearchPlacement,
  deleteProduct,
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
    query: "Maxi Dummy", // experiment with other query strings
    visitorId: visitorId,
  };
  const searchResponse = await searchClient.search(searchRequest);
  for (const prod of searchResponse[0]) {
    const { product } = prod;
    console.log(product.title, product.name);
    try {
      await deleteProduct(product.name);
    } catch (e) {
      console.error(e);
    }
  }
})();
// [END search for product by query]

// searchProduct();
