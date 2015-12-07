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

'use strict'

var powm = require('../lib/powm')
var test = require('ava')
var uniq = require('lodash.uniq')

test('default length', function (t) {
  t.is(powm().length, 16)
})

test('specific length', function (t) {
  t.is(powm(8).length, 8)
})

test('length longer than pool length', function (t) {
  t.is(powm(64).length, 64)
})

test('length too short', function (t) {
  t.throws(function () {
    powm(1)
  }, 'Cannot generate password of length 1')
})

test('all three character classes', function (t) {
  var password = powm()
  t.regexTest(/[A-Z]/, password)
  t.regexTest(/[a-z]/, password)
  t.regexTest(/\d/, password)
})

test('does not repeat characters', function (t) {
  t.is(uniq(powm(16).split('')).length, 16)
})

test('repeats characters', function (t) {
  t.not(uniq(powm(64).split('')).length, 64)
})

test('passwords are not identical', function (t) {
  var password1 = powm()
  var password2 = powm()
  t.not(password1, password2)
})
