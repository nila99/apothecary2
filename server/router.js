const dotenv = require('dotenv');
dotenv.config();
var sourceFile = require('../server.js');

async function postData(ctx, next){
  if (ctx.request.body) {
    ctx.body = ctx.request.body;
    // console.log('****** the response status is ', ctx.status);
    // console.log("****** the response body", ctx.body);
    // console.log("****** the ctx.request", ctx.request);
    // console.log("****** the ctx.response", ctx.response);
    console.log("*** exported token ****", sourceFile.exportToken);

    userId = ctx.body.userId;
    Age = ctx.body.Age;

    const UPDATE_CUSTOMER = `
      mutation {
        customerUpdate(input: {
        id: "gid://shopify/Customer/`+ userId +`",  
        metafields: 
          [{
            namespace: "global", key: "Age", value:"`+ Age +`", valueType: STRING
          }]
        }) 
        {
          customer {
            id
            firstName
            metafields(first: 20) {
              edges {
                node {
                  namespace
                  key
                  value
                  valueType
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
      `;

    const Url = `admin/api/2019-07/graphql.json`;
    const options = {
      credentials: 'include',
      headers: {
        //'X-Shopify-Access-Token': sourceFile.exportToken,
        // actually better to hardcode token so dont have to re-install 
        // every time i push an update
        'X-Shopify-Access-Token': "16d763729640742c7ec12ea99b7db4a7",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: UPDATE_CUSTOMER })
    };
    console.log('The options are', options);
    const optionsWithPost = { ...options, method: 'POST' };
    fetch(
      `https://${process.env.SHOP_NAME}.myshopify.com/${Url}`,
      optionsWithPost
    )
      .then(response => response.json())
      .then(data => console.log('data returned:', data));
  } else {
    await next();
  } 
}
module.exports = postData;
