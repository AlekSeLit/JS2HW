const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  console.log(req.url);
  const publicPath = `./HW1/shop`;
  let body = null;
  try {
    body = fs.readFileSync(`${publicPath}${req.url}`);
  } catch (e) {
    console.log(e);
    body = fs.readFileSync(`${publicPath}/index.html`);
  }
  res.end(body);
});

const port = process.env.PORT || 3333;
server.listen(port);

console.log(`Server started on port ${port}`);
