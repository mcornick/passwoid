// Copyright (c) 2015 Mark Cornick <mark@markcornick.com>
//
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
// REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
// AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
// INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
// LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
// OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
// PERFORMANCE OF THIS SOFTWARE.

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
