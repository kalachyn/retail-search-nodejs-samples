/**
 * @fileoverview A utility class to create dummy products. Will be obsolete once
 * a demo catalog is setup to acoompany the samples.
 */
const { ProductServiceClient } = require('@google-cloud/retail');
const { v4: uuidV4 } = require('uuid');

// Requires a credentials file to be referenced through the following
// environment variable
process.env['GOOGLE_APPLICATION_CREDENTIALS'] = './sa.json';

// [START config to replace with your values]
const apiEndpoint = 'test-retail.sandbox.googleapis.com';
const branch = 'default_branch';
const catalog = 'default_catalog';
const location = 'global';
const projectId = 1038874412926;
// [END config to replace with your values]

const parentPath = `projects/${projectId}/locations/${location}/catalogs/${catalog}/branches/${branch}`;

const options = { apiEndpoint };

// [START create product service client]
const productClient = new ProductServiceClient(options);
// [END create product service client]


const defaultCatalog = `projects/${projectId}/locations/${location}/catalogs/${catalog}`;
const defaultSearchPlacement = `${defaultCatalog}/placements/default_search`;
const defaultBranch = `${defaultCatalog}/branches/${branch}`;
const visitorId = 'visitor';

const query_phrase = `Dummy Product ${Date.now()}`;
const DUMMY_CATEGORY = 'dummies > speakers & displays';



const priceInfoPrimary = {
  price: 20.0,
  originalPrice: 25.0,
  cost: 10.0,
  currencyCode: 'USD'
};

const colorInfoPrimary = {
  colorFamilies: ['black'],
  colors: ['carbon']
};

const fulfillmentInfoPrimary = {
  type: 'pickup-in-store',
  placeIds: ['store1', 'store2']
};

const fulfillmentInfoVariant = {
  type: 'pickup-in-store',
  placeIds: ['store2']
};

const fieldMask = {
  paths: ['name', 'title', 'price_info', 'color_info', 'brands']
};





// [START example primary product]
const primaryProductToCreate = {
  title: `Maxi ${query_phrase}`,
  type: 'PRIMARY',
  categories: [DUMMY_CATEGORY],
  brands: ['Google'],
  uri: 'http://www.test-uri.com',
  priceInfo: priceInfoPrimary,
  colorInfo: colorInfoPrimary,
  fulfillmentInfo: [fulfillmentInfoPrimary],
  retrievableFields: fieldMask
};

let createdPrimaryProduct;
// [END example primary product]

// [START example variant product]
const variantProductToCreate = {
  title: `Maxi ${query_phrase} variant`,
  type: 'VARIANT',
  categories: [DUMMY_CATEGORY],
  brands: ['Google'],
  uri: 'http://www.test-uri.com',
  fulfillmentInfo: [fulfillmentInfoVariant],
  retrievableFields: fieldMask
};
let createdVariantProduct;

// [END example variant product]

const INDEXING_DELAY_MS = 5000;

function printError(error) {
  console.log('Error: ', JSON.stringify(error, null, 2));
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}



// [START create product]
async function createProduct(id, productToCreate) {
  const createdProduct = await productClient.createProduct(
    { parent: defaultBranch, productId: id, product: productToCreate });
  return createdProduct[0];
}
// [END create product]

// [START delete product]
async function deleteProduct(name) {
  await productClient.deleteProduct({ name: name });
  console.info('deleted product:' + name);
}
// [END delete product]


// [START create primary and related variant products for search]
async function createPrimaryAndVariantProductsForSearch() {
  createProduct(uuidV4(), primaryProductToCreate)
    .then(createdProduct => {
      createdPrimaryProduct = createdProduct;
      console.info('Created primary product: ', createdProduct.name);
      const variantProduct = { ...variantProductToCreate };
      variantProduct.primaryProductId = createdPrimaryProduct.id;
      createProduct(uuidV4(), variantProduct).then(createdVarProduct => {
        createdVariantProduct = createdVarProduct;
        console.info('Created variant product: ', createdVarProduct.name);
      });
    })
    // wait for created products get indexed for search
    .then(await sleep(INDEXING_DELAY_MS))
    .catch(printError);
}
// [END create primary and related variant products for search]



function mockSetup() {
  console.log('Mock setup');
}

module.exports = {
  createPrimaryAndVariantProductsForSearch,
  defaultBranch,
  defaultSearchPlacement,
  mockSetup,
  query_phrase,
  visitorId,
};