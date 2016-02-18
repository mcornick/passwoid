// Copyright 2015 Mark Cornick
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

var powm = require('../lib/powm');
var chai = require('chai');
var uniq = require('lodash.uniq');

describe('powm', function () {
  it('default length', function () {
    chai.expect(
      powm().length
    ).to.equal(16);
  });

  it('specific length', function () {
    chai.expect(
      powm(8).length
    ).to.equal(8);
  });

  it('length longer than pool length', function () {
    chai.expect(
      powm(64).length
    ).to.equal(64);
  });

  it('length too short', function () {
    chai.expect(function () {
      powm(1);
    }).to.throw('Cannot generate password of length 1');
  });

  it('all three character classes', function () {
    chai.expect(
      powm()
    ).to.match(/[A-Z]/).and
      .to.match(/[a-z]/).and
      .to.match(/\d/);
  });

  it('does not repeat characters', function () {
    chai.expect(
      uniq(powm(16).split('')).length
    ).to.equal(16);
  });

  it('repeats characters', function () {
    chai.expect(
      uniq(powm(64).split('')).length
    ).not.to.equal(64);
  });

  it('passwords are not identical', function () {
    var password1 = powm();
    var password2 = powm();
    chai.expect(password1).not.to.equal(password2);
  });
});
