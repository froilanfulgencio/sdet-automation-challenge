const http = require('node:http');

const posts = [
  { userId: 1, id: 1, title: 'Getting started with Playwright', body: 'Install dependencies and run tests.' },
  { userId: 2, id: 2, title: 'API automation strategy', body: 'Use typed clients and stable test data.' },
];

const html = {
  home: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Playwright Automation Challenge</title>
  </head>
  <body>
    <main>
      <h1>Automation Portal</h1>
      <a href="/docs/intro">Get started</a>
    </main>
  </body>
</html>`,
  docs: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Installation</title>
  </head>
  <body>
    <main>
      <h1>Installation</h1>
      <p>Run npm install and execute Playwright tests.</p>
    </main>
  </body>
</html>`,
};

const send = (res, status, body, contentType) => {
  res.writeHead(status, { 'Content-Type': contentType });
  res.end(body);
};

const server = http.createServer((req, res) => {
  const url = req.url || '/';

  if (url === '/') {
    return send(res, 200, html.home, 'text/html; charset=utf-8');
  }

  if (url === '/docs/intro') {
    return send(res, 200, html.docs, 'text/html; charset=utf-8');
  }

  if (url === '/api/posts') {
    return send(res, 200, JSON.stringify(posts), 'application/json; charset=utf-8');
  }

  if (url.startsWith('/api/posts/')) {
    const id = Number(url.split('/').pop());
    const post = posts.find((item) => item.id === id);

    if (!post) {
      return send(res, 404, JSON.stringify({ message: 'Not found' }), 'application/json; charset=utf-8');
    }

    return send(res, 200, JSON.stringify(post), 'application/json; charset=utf-8');
  }

  return send(res, 404, 'Not found', 'text/plain; charset=utf-8');
});

const port = Number(process.env.PORT || 3000);
server.listen(port, '127.0.0.1');
