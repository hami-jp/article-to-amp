# article-to-amp [![Build Status](https://travis-ci.org/hami-jp/article-to-amp.svg?branch=master)](https://travis-ci.org/hami-jp/article-to-amp)

NPM module to transform articles of the HTML page to amp.

## Install

```sh
$ npm i -g hami-jp/a2amp
```

## CLI

```sh
  Usage:
    $ a2amp [INPUT] [OUTPUT] [options]

  Options:
    -i, --input     input file path supported glob pattern. default value is '**/*.html'
    -o, --output    output file path supported path variables ($dirname, $filename, $basename, and $extname).
                    default value is '$dirname/amp/$filename'
    -e, --exclude   exclude this glob pattern from input file paths
    -w, --overwrite overwrite input file. default value is 'false'
    -c, --encoding  input file encoding. default value is 'utf8'
    -s, --selector  selector of articles. default value is 'article'

    -h, --help      print usage information
    -v, --version   show version info and exit
```

## API

```js
const articleToAmp = require('article-to-amp');

const html = `<!DOCTYPE html>
<html>
<body>
  <article>
    <h1>Lorem ipsum dolor sit amet</h1>
    <p>beep booop</p>
    <img src="http://example.com/image.jpg" width="100" height="100" />
    <blockquote class="twitter-tweet" data-lang="en">
      <p lang="en" dir="ltr">
        <a href="https://t.co/kt1c5RWajI">https://t.co/kt1c5RWajI</a>’s <a href="https://twitter.com/david_bjorklund">@david_bjorklund</a> published 2 node modules to convert HTML snippets to <a href="https://twitter.com/AMPhtml">@amphtml</a><a href="https://t.co/yB5KMDijh6">https://t.co/yB5KMDijh6</a>
      </p>
      &mdash; Malte Ubl (@cramforce) <a href="https://twitter.com/cramforce/status/697485294531145730">February 10, 2016</a>
    </blockquote>
    <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
  </article>
</body>
</html>`;

const selectors = ['article']; // String or Array

articleToAmp(html, selectors)
  .then((amp) => {
    console.log(amp);
  });
```

## Dependencies

* [html-to-amp](https://github.com/micnews/html-to-amp)
* [cheerio](https://github.com/cheeriojs/cheerio)
* [fs-promise](https://github.com/kevinbeaty/fs-promise)
* [glob-promise](https://github.com/ahmadnassri/glob-promise)
* [meow](https://github.com/sindresorhus/meow)
