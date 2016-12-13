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
const uniq = require('lodash.uniq');
const passwoid = require('../lib/passwoid');

describe('passwoid', () => {
  it('default length', () => {
    chai.expect(
      passwoid().length
    ).to.equal(16);
  });

  it('specific length', () => {
    chai.expect(
      passwoid(8).length
    ).to.equal(8);
  });

  it('length longer than pool length', () => {
    chai.expect(
      passwoid(64).length
    ).to.equal(64);
  });

  it('length too short', () => {
    chai.expect(() => {
      passwoid(1);
    }).to.throw('Cannot generate password of length 1');
  });

  it('all three character classes', () => {
    chai.expect(
      passwoid()
    ).to.match(/[A-Z]/).and
      .to.match(/[a-z]/).and
      .to.match(/\d/);
  });

  it('does not repeat characters', () => {
    chai.expect(
      uniq(passwoid(16).split('')).length
    ).to.equal(16);
  });

  it('repeats characters', () => {
    chai.expect(
      uniq(passwoid(64).split('')).length
    ).not.to.equal(64);
  });

  it('passwords are not identical', () => {
    const password1 = passwoid();
    const password2 = passwoid();
    chai.expect(password1).not.to.equal(password2);
  });
});
