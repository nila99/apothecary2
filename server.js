require('isomorphic-fetch');
const dotenv = require('dotenv');
dotenv.config();
const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-body');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');
const Router = require('koa-router');
const postData = require('./server/router');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;
let myToken = '123';

app.prepare().then(() => {
	const server = new Koa();
  const router = new Router();
  server.use(cors());
  server.use(session(server));
  server.keys = [SHOPIFY_API_SECRET_KEY];

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['write_customers'],
      afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set('shopOrigin', shop, { httpOnly: false });
        ctx.cookies.set('accessToken', accessToken);
        myToken = accessToken;
        module.exports.exportToken = myToken;
        console.log("*** myToken *** : ", myToken);
        ctx.redirect('/');
      },
    }),
  );

  server.use(graphQLProxy({version: ApiVersion.October19}));

  server.use(verifyRequest());
  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
    return
  });

  server.use(router.allowedMethods());
  server.use(router.routes());
  
  router.use(bodyParser());
  router.post('/formSubmit', postData);

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
    myPort = port;
  });
});