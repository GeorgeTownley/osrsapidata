const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// This middleware forwards requests to /api/* to 'https://target-api-service.com/*'
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://secure.runescape.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // this will remove the /api prefix when forwarding to the target
    },
  })
);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
