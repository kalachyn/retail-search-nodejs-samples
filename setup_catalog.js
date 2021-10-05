/**
 * @fileoverview A utility class to create dummy products. Will be obsolete once
 * a demo catalog is setup to acoompany the samples.
 */
const {ProductServiceClient} = require('@google-cloud/retail');
const {v4: uuidV4} = require('uuid');

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

const parentPath = `projects/${projectId}/locations/${location}/catalogs/${
    catalog}/branches/${branch}`;

const options = { apiEndpoint };

// [START create product service client]
const productClient = new ProductServiceClient(options);
// [END create product service client]



// [START create product]
async function createProduct(id, productToCreate) {
  const createdProduct = await productClient.createProduct(
      {parent: defaultBranch, productId: id, product: productToCreate});
  return createdProduct[0];
}
// [END create product]

// [START delete product]
async function deleteProduct(name) {
  await productClient.deleteProduct({name: name});
  console.info('deleted product:' + name);
}
// [END delete product]


// [START create primary and related variant products for search]
async createPrimaryAndVariantProductsForSearch(primaryProduct, variantProduct) {
  createProduct(uuidV4(), primaryProduct)
      .then(createdProduct => {
        createdPrimaryProduct = createdProduct;
        console.info(
            'Created primary product: \n%s',
            JSON.stringify(createdProduct, null, 2));
        variantProduct.primaryProductId = createdPrimaryProduct.id;
        createProduct(uuidV4(), variantProduct).then(createdVarProduct => {
          createdVariantProduct = createdVarProduct;
          console.info(
              'Created variant product: \n%s',
              JSON.stringify(createdVarProduct, null, 2));
        });
      })
      // wait for created products get indexed for search
      .then(await sleep(INDEXING_DELAY_MS))
      .catch(printError);
}
// [END create primary and related variant products for search]
}


export function mockSetup() {
  console.log('Mock setup');
}
