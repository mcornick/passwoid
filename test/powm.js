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

import powm from '../lib/powm';
import test from 'ava';
import uniq from 'lodash.uniq';

test('default length', t => {
	t.plan(1);
	t.is(powm().length, 16);
});

test('specific length', t => {
	t.plan(1);
	t.is(powm(8).length, 8);
});

test('length longer than pool length', t => {
	t.plan(1);
	t.is(powm(64).length, 64);
});

test('length too short', t => {
	t.plan(1);
	t.throws(function () {
		powm(1);
	}, 'Cannot generate password of length 1');
});

test('all three character classes', t => {
	t.plan(3);
	const password = powm();
	t.regexTest(/[A-Z]/, password);
	t.regexTest(/[a-z]/, password);
	t.regexTest(/\d/, password);
});

test('does not repeat characters', t => {
	t.plan(1);
	t.is(uniq(powm(16).split('')).length, 16);
});

test('repeats characters', t => {
	t.plan(1);
	t.not(uniq(powm(64).split('')).length, 64);
});
