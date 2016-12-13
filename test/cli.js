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
/* eslint-env mocha */

'use strict';

const chai = require('chai');
const stream = require('mock-utf8-stream');
const cli = require('../lib/cli');

describe('passwoid', () => {
  it('default length', () => {
    const stdout = new stream.MockWritableStream();
    stdout.startCapture();
    cli({argv: ['node', 'bin.js'], stdout});
    chai.expect(
      stdout.capturedData.trim().length
    ).to.equal(16);
  });

  it('specific length', () => {
    const stdout = new stream.MockWritableStream();
    stdout.startCapture();
    cli({argv: ['node', 'bin.js', 8], stdout});
    chai.expect(
      stdout.capturedData.trim().length
    ).to.equal(8);
  });

  it('bogus length', () => {
    const stdout = new stream.MockWritableStream();
    stdout.startCapture();
    cli({argv: ['node', 'bin.js', 'pants'], stdout});
    chai.expect(
      stdout.capturedData.trim().length
    ).to.equal(16);
  });

  it('length too short', () => {
    const stdout = new stream.MockWritableStream();
    stdout.startCapture();
    chai.expect(() => {
      cli({argv: ['node', 'bin.js', 1], stdout});
    }).to.throw('Cannot generate password of length 1');
  });
});
