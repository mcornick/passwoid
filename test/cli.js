// Copyright (c) 2015 Mark Cornick <mark@markcornick.com>
//
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED 'AS IS' AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
// REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
// AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
// INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
// LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
// OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
// PERFORMANCE OF THIS SOFTWARE.

'use strict';

var cli = require('../lib/cli');
var test = require('ava');
var stream = require('mock-utf8-stream');

test.beforeEach(function (t) {
  t.context.stdout = new stream.MockWritableStream();
  t.context.stdout.startCapture();
  t.end();
});

test('default length', function (t) {
  t.plan(1);
  cli({argv: ['node', 'bin.js'], stdout: t.context.stdout});
  t.is(t.context.stdout.capturedData.trim().length, 16);
});

test('specific length', function (t) {
  t.plan(1);
  cli({argv: ['node', 'bin.js', 8], stdout: t.context.stdout});
  t.is(t.context.stdout.capturedData.trim().length, 8);
});

test('bogus length', function (t) {
  t.plan(1);
  cli({argv: ['node', 'bin.js', 'pants'], stdout: t.context.stdout});
  t.is(t.context.stdout.capturedData.trim().length, 16);
});

test('length too short', function (t) {
  t.plan(1);
  t.throws(function () {
    cli({argv: ['node', 'bin.js', 1], stdout: t.context.stdout});
  }, 'Cannot generate password of length 1');
});
