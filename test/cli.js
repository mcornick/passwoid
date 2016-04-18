// Copyright 2015, 2016 Mark Cornick
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

var test = require('ava');
var stream = require('mock-utf8-stream');
var cli = require('../lib/cli');

test('default length', function (t) {
  var stdout = new stream.MockWritableStream();
  stdout.startCapture();
  cli({argv: ['node', 'bin.js'], stdout: stdout});
  t.is(stdout.capturedData.trim().length, 16);
});

test('specific length', function (t) {
  var stdout = new stream.MockWritableStream();
  stdout.startCapture();
  cli({argv: ['node', 'bin.js', 8], stdout: stdout});
  t.is(stdout.capturedData.trim().length, 8);
});

test('bogus length', function (t) {
  var stdout = new stream.MockWritableStream();
  stdout.startCapture();
  cli({argv: ['node', 'bin.js', 'pants'], stdout: stdout});
  t.is(stdout.capturedData.trim().length, 16);
});

test('length too short', function (t) {
  var stdout = new stream.MockWritableStream();
  stdout.startCapture();
  t.throws(function () {
    cli({argv: ['node', 'bin.js', 1], stdout: stdout});
  }, 'Cannot generate password of length 1');
});
