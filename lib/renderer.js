'use strict';

const cheerio = require('cheerio');
const htmlToAmp = require('html-to-amp')();

function partsToHTML($, parts) {
  if (!parts) {
    return Promise.resolve();
  }

  const jobs = [];

  parts.each((index, part) => {
    part = $(part);
    jobs.push(
      htmlToAmp(part.html()).then(amp => {
        part.replaceWith(amp);
      })
    );
  });

  return Promise.all(jobs);
}

function renderer(html, selectors) {
  if ( !Array.isArray(selectors) ) {
    selectors = [selectors];
  }
  
  const $ = cheerio.load(html);

  const jobs = selectors.map( selector => partsToHTML($, $(selector)) );

  return Promise.all(jobs).then( () => $.html() );
}

module.exports = renderer;