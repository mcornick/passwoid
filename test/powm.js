// Copyright (c) 2015 Mark Cornick <mark@markcornick.com>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
