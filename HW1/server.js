const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  console.log(req.url);
  let body;
for (let i=0;i<=5;i++) {
    switch (req.url) {
        case "/":
          body = fs.readFileSync(`./shop/index.html`);
          break;
        case "/main.js":
          body = fs.readFileSync(`./shop/main.js`);
          break;
        case "/style.css":
          body = fs.readFileSync(`./shop/style.css`);
          break;
        case "/fonts/BebasNeue.ttf":
          body = fs.readFileSync(`./shop/fonts/BebasNeue.ttf`);
          break;
        case "/fonts/Lobster.ttf":
          body = fs.readFileSync(`./shop/fonts/Lobster.ttf`);
          break;
        case "/fonts/opensans.ttf":
          body = fs.readFileSync(`./shop/fonts/opensans.ttf`);
          break;
        case `/img/Layer_${i}.png`:
          body = fs.readFileSync(`./shop/img/Layer_${i}.png`);
          break;
        case `/img/catalog/id${i}.png`:
           body = fs.readFileSync(`./shop/img/catalog/id${i}.png`);
           break;
      }
}
  res.end(body);
});

server.listen(process.env.PORT || 3000);

console.log("Server started");
