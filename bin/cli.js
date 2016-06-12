#!/usr/bin/env node

'use strict';

const pathFn = require('path');
const meow = require('meow');
const scriptName = 'a2amp';

const cli = meow(`
  Usage:
    $ ${scriptName} [INPUT] [OUTPUT] [options]
  
  Options:
    -i, --input     input file path supported glob pattern. default value is '**/*.html'
    -o, --output    output file path supported path variables (\$dirname, \$filename, \$basename, and \$extname).
                    default value is '\$dirname/amp/\$filename'
    -e, --exclude   exclude this glob pattern from input file paths
    -w, --overwrite overwrite input file. default value is 'false'
    -c, --encoding  input file encoding. default value is 'utf8'
    -s, --selector  selector of articles. default value is 'article'

    -h, --help      print usage information
    -v, --version   show version info and exit
`, {
  alias: {
    h: 'help',
    i: 'input',
    o: 'output',
    w: 'overwrite',
    c: 'encoding',
    e: 'exclude',
    s: 'selector',
    v: 'version'
  },
  '--': true
});

const argv = cli.flags;

const options = {
  input: argv.input || cli.input[0] || '**/*.html',
  output: argv.output || cli.input.length > 1 && cli.input[1] || '$dirname/amp/$filename',
  overwrite: argv.overwrite || false,
  encoding: argv.encoding || 'utf8',
  selector: argv.selector || 'article'
};

const globOptions = {
  ignore: argv.exclude
};

if (argv.help) {

  //
  // Print help
  //

  cli.showHelp();

} else if (argv.version) {

  //
  // Print version
  //

  console.log( cli.pkg.version );

} else {

  //
  // Convert
  //

  const fs = require('fs-promise');
  const glob = require('glob-promise');
  const renderer = require('../lib/renderer');

  glob(options.input, globOptions)
    .then(inputPaths => {

      inputPaths.forEach(inputPath => {
        let outputPath = inputPath;
        if (!options.overwrite) {
          const pathElements = {
            dirname: pathFn.dirname(inputPath),
            extname: pathFn.extname(inputPath),
            filename: pathFn.basename(inputPath)
          };
          pathElements.basename = pathFn.basename(inputPath, pathElements.extname);
          outputPath = options.output;

          for(const i in pathElements) {
            outputPath = outputPath.replace(`\$${i}`, pathElements[i]);
          }
        }

        fs.readFile(inputPath, { encoding: options.encoding })
          .then(html => renderer(html, options.selector))
          .then(amp => fs.outputFile(outputPath, amp))
          .then(
            () => console.log(`${inputPath} => ${outputPath}`),
            err => console.error(err.message)
          );
      });

    }, err => {
      console.error(err.message);
    });

}
