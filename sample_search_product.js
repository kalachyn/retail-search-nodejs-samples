/**
 * @fileoverview Description of this file.
 */
const { SearchServiceClient } = require('@google-cloud/retail');

const { defaultBranch, defaultSearchPlacement, createPrimaryAndVariantProductsForSearch, query_phrase, visitorId } = require('./setup_catalog.js');

const searchClient = new SearchServiceClient({ apiEndpoint: 'test-retail.sandbox.googleapis.com' });

// [START search for product by query]
async function searchProduct(query) {
  await createPrimaryAndVariantProductsForSearch();

  const searchRequest = {
    placement: defaultSearchPlacement,
    branch: defaultBranch,
    query: query,
    visitorId: visitorId
  };
  const searchResponse = await searchClient.search(searchRequest);
  console.log('First of the products found: ', searchResponse[0]);

  
}
// [END search for product by query]

searchProduct(query_phrase);