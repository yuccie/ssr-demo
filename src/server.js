const path = require("path");
const fs = require('fs');

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

const clientManifest = require(clientManifestPath);
const express = require("express");
const app = express();


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
    // 将url传递给render
    const ctx = {
        url: req.url,
    }
    renderer.renderToString(ctx, (err, html) => {
        if (err) {
            console.log('err', err)
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