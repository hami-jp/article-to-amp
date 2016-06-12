'use strict';

const assert = require('assert');
const exec = require('child_process').exec;
const fs = require('fs-promise');

describe('cli', () => {

  it('version', done => {
    const pkg = require('../package.json');
    exec('node bin/cli.js -v', (err, stdout, stderr) => {
      assert.equal(stdout.replace(/\n/, ''), pkg.version);
      done();
    });
  });

  it('convert', done => {
    const inputPath = 'test/test.html';
    const outputPath = 'test/test-amp.html';
    const expectHtml = `<!DOCTYPE html>
<html>
<body>
  <article><h1>Lorem ipsum dolor sit amet</h1><p>beep booop</p><figure><amp-img width="100" height="100" layout="responsive" src="http://example.com/image.jpg"></amp-img></figure><figure><amp-twitter width="486" height="657" layout="responsive" data-tweetid="697485294531145730" data-cards="hidden"></amp-twitter></figure></article>
</body>
</html>`;

    new Promise((resolve, reject) => {
      exec(`node bin/cli.js -i ${inputPath} -o \$dirname/\$basename-amp.html`, (err, stdout, stderr) => {
        if (err) return reject(err);
        return resolve(stdout);
      });
    })
    .then(() => fs.readFile(outputPath, { encoding: 'utf8' }))
    .then(res => {
      assert.equal(res, expectHtml);
      done();
    }, err => {
      console.error(err.message);
      done();
    });
    
  });

});