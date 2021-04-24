const path = require("path");
const fs = require('fs');
console.log('__dirname', __dirname);
const serverBundle = path.resolve(
  __dirname,
  "../serverDist",
  "vue-ssr-server-bundle.json"
);
const { createBundleRenderer } = require("vue-server-renderer");
const clientManifestPath = path.resolve(
  __dirname,
  "../dist",
  "vue-ssr-client-manifest.json"
);
console.log('clientManifestPath', clientManifestPath, serverBundle);
const clientManifest = require(clientManifestPath);
const express = require("express");
const app = express();

console.log(path.resolve(__dirname, '../public', "index.html"));
const template = fs.readFileSync(
  path.resolve(__dirname, '../public', "index.html"),
  "utf-8"
);
const renderer = createBundleRenderer(serverBundle, {
  template, // 使用HTML模板
  clientManifest, // 将客户端的构建结果清单传入
});

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get("*", function (req, res) {
  renderer.renderToString({}, (err, html) => {
    if (err) {
      res.send("500 server error");
      return;
    }
    res.send(html);
  });
});

// app.get('*', (req, res) => {
//     res.send('hello world')
// })
app.listen(3001)