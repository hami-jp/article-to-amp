'use strict';

const assert = require('assert');
const renderer = require('../lib/renderer');

describe('renderer', () => {

  // One item
  it('one item', () => {
    const html =`<!DOCTYPE html>
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

    const expectHtml = `<!DOCTYPE html>
<html>
<body>
  <article><h1>Lorem ipsum dolor sit amet</h1><p>beep booop</p><figure><amp-img width="100" height="100" layout="responsive" src="http://example.com/image.jpg"></amp-img></figure><figure><amp-twitter width="486" height="657" layout="responsive" data-tweetid="697485294531145730" data-cards="hidden"></amp-twitter></figure></article>
</body>
</html>`;

    return renderer(html, 'article').then((res) => {
      assert.equal(res, expectHtml);
    });
  });


  // Multiple items
  it('multiple items', () => {
    const html =`<!DOCTYPE html>
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

    const expectHtml = `<!DOCTYPE html>
<html>
<body>
  <article><h1>Lorem ipsum dolor sit amet</h1><p>beep booop</p><figure><amp-img width="100" height="100" layout="responsive" src="http://example.com/image.jpg"></amp-img></figure><figure><amp-twitter width="486" height="657" layout="responsive" data-tweetid="697485294531145730" data-cards="hidden"></amp-twitter></figure></article>
  <article><h1>Lorem ipsum dolor sit amet</h1><p>beep booop</p><figure><amp-img width="100" height="100" layout="responsive" src="http://example.com/image.jpg"></amp-img></figure><figure><amp-twitter width="486" height="657" layout="responsive" data-tweetid="697485294531145730" data-cards="hidden"></amp-twitter></figure></article>
</body>
</html>`;

    return renderer(html, 'article').then((res) => {
      assert.equal(res, expectHtml);
    });
  });

});