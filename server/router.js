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
    skintype = ctx.body.skintype;
    conditions = ctx.body.conditions;
    conditions_other = ctx.body.conditions_other;
    pimples = ctx.body.pimples;
    goals = ctx.body.goals;
    routine = ctx.body.routine;
    product = ctx.body.product;
    price = ctx.body.price;
    preferences = ctx.body.preferences;
    preferences_other = ctx.body.preferences_other;

    const UPDATE_CUSTOMER = `
      mutation {
        customerUpdate(input: {
        id: "gid://shopify/Customer/`+ userId +`",  
        metafields: 
          [{
            namespace: "global", key: "Age", value:"`+ Age +`", valueType: STRING
          },
          {
            namespace: "global", key: "skintype", value:"`+ skintype +`", valueType: STRING
          },
          {
            namespace: "global", key: "conditions", value:"`+ conditions +`", valueType: STRING
          },
          {
            namespace: "global", key: "conditions_other", value:"`+ conditions_other +`", valueType: STRING
          },
          {
            namespace: "global", key: "pimples", value:"`+ pimples +`", valueType: STRING
          },
          {
            namespace: "global", key: "goals", value:"`+ goals +`", valueType: STRING
          },
          {
            namespace: "global", key: "routine", value:"`+ routine +`", valueType: STRING
          },
          {
            namespace: "global", key: "product", value:"`+ product +`", valueType: STRING
          },
          {
            namespace: "global", key: "price", value:"`+ price +`", valueType: STRING
          },
          {
            namespace: "global", key: "preferences", value:"`+ preferences +`", valueType: STRING
          },
          {
            namespace: "global", key: "preferences_other", value:"`+ preferences_other +`", valueType: STRING
          }
          ]
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

    const Url = `admin/api/2020-04/graphql.json`;
    const options = {
      credentials: 'include',
      headers: {
        //'X-Shopify-Access-Token': sourceFile.exportToken,
        // actually better to hardcode token so dont have to re-install 
        // every time i push an update
        'X-Shopify-Access-Token': sourceFile.exportToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: UPDATE_CUSTOMER })
    };
    console.log('The options are', options);
    const optionsWithPost = { ...options, method: 'POST' };
    fetch(
      `https://apothecarytest.myshopify.com/admin/api/2020-04/graphql.json`,
      optionsWithPost
    )
      .then(response => response.json())
      .then(data => console.log('data returned:', data));
  } else {
    await next();
  } 
}
module.exports = postData;
