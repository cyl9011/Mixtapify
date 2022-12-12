const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/auth/**",
    createProxyMiddleware({
      target: "https://sounds-around-us.herokuapp.com",
    })
  );
  app.use(
    "/api/**",
    createProxyMiddleware({
      target: "https://sounds-around-us.herokuapp.com",
    })
  );
};
