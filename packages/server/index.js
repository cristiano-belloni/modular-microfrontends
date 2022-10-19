const { readdirSync } = require('fs');
const { join } = require('path');
const { execSync } = require('child_process');

const cors = require('cors');
const express = require('express');
const { ensureDirSync } = require('fs-extra');
const serveStatic = require('serve-static');

const app = express();
app.set('root', join(
  execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim(),
  'dist',
));

ensureDirSync(app.get('root'));

app.use(cors());
app.use(serveStatic(app.get('root')));
app.get('/', (req, res) => {
  const output = readdirSync(app.get('root'))
    .filter(dir => /^[a-z\-\d]+$/.test(dir))
    .map(dir => ({
      name: dir.replace(/-/, ' '),
      root: `${req.url}${dir}`,
      manifest: `${req.url}${dir}/package.json`,
    }));

  res.send(output);
});

app.listen(process.env.PORT || 5000);
