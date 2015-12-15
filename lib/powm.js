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

'use strict';

var defaultPool = function (length) {
  var alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  var repeats = parseInt((length - 1) / alphabet.length, 10) + 1;
  var pool = [];
  for (var i = 1; i <= repeats; i++) {
    pool = pool.concat(alphabet.split(''));
  }
  return pool;
};

var randomCharacter = function (pool) {
  var index = Math.floor(Math.random() * pool.length);
  var character = pool[index];
  pool.splice(index, 1);
  return character;
};

var acceptable = function (pw) {
  return pw.match(/[A-Z]/) && pw.match(/[a-z]/) && pw.match(/\d/);
};

var generatePassword = function (pool, length) {
  var results = [];
  for (var i = 1; i <= length; i++) {
    results.push(randomCharacter(pool));
  }
  return results.join('');
};

module.exports = function (length) {
  if (typeof length === 'undefined') {
    length = 16;
  }
  if (length < 3) {
    throw new Error('Cannot generate password of length ' + length);
  } else {
    var password = '';
    while (!acceptable(password)) {
      var currentPool = defaultPool(length);
      password = generatePassword(currentPool, length);
    }
    return password;
  }
};
