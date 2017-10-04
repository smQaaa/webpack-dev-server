'use strict';

// const should = require('should');
const { test } = require('ava');
// const helper = require('./lib/helper');
const server = require('./lib/server');
const config = require('./fixtures/simple/webpack.config');

// describe('Lazy', () => {
//   afterEach(helper.close);
//
//   it('without filename option it should throw an error', () => {
//     should.throws(() => {
//       helper.start(config, {
//         lazy: true
//       });
//     }, /'filename' option must be set/);
//   });
//
//   it('with filename option should not throw an error', (done) => {
//     helper.start(config, {
//       lazy: true,
//       filename: 'bundle.js'
//     }, done);
//   });
// });


test('missing filename option should throw', (t) => {
  const promise = server.start(config, {
    lazy: true
  });

  return t.throws(promise).then((error) => {
    t.regex(error.message, /'filename' option must be set/i);
  });
});

test('existing filename option should not throw', (t) => {
  const promise = server.start(config, {
    filename: 'bundle.js',
    lazy: true
  });

  return t.notThrows(promise);
});
