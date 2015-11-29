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

var powm = require('../lib/powm');
var test = require('ava');
var uniq = require('lodash.uniq');

test('default length', function (t) {
	t.is(powm().length, 16);
	t.end();
});

test('specific length', function (t) {
	t.is(powm(8).length, 8);
	t.end();
});

test('length longer than pool length', function (t) {
	t.is(powm(64).length, 64);
	t.end();
});

test('length too short', function (t) {
	t.throws(function () {
		powm(1);
	}, 'Cannot generate password of length 1');
	t.end();
});

test('all three character classes', function (t) {
	var password = powm();
	t.regexTest(/[A-Z]/, password);
	t.regexTest(/[a-z]/, password);
	t.regexTest(/\d/, password);
	t.end();
});

test('does not repeat characters', function (t) {
	t.is(uniq(powm(16).split('')).length, 16);
	t.end();
});

test('repeats characters', function (t) {
	t.not(uniq(powm(64).split('')).length, 64);
	t.end();
});
