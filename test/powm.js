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

/* eslint-env mocha */

import chai from 'chai';
import powm from '../lib/powm';
import uniq from 'lodash.uniq';

describe('powm', () => {
	it('creates a password of default length', () => {
		chai.expect(
			powm().length
		).to.equal(16);
	});

	it('creates a password of specific length', () => {
		chai.expect(
			powm(8).length
		).to.equal(8);
	});

	it('creates a password longer than the pool of characters', () => {
		chai.expect(
			powm(64).length
		).to.equal(64);
	});

	it('throws an error when length is too short', () => {
		chai.expect(() => {
			powm(1);
		}).to.throw('Cannot generate password of length 1');
	});

	it('does not throw an error when length is longer than pool', () => {
		chai.expect(() => {
			powm(64);
		}).not.to.throw();
	});

	it('creates a password with all three character classes', () => {
		chai.expect(
			powm()
		).to.match(/[A-Z]/).and
			.to.match(/[a-z]/).and
			.to.match(/\d/);
	});

	it('does not repeat characters if length is <= that of pool', () => {
		chai.expect(
			uniq(powm(16).split('')).length
		).to.equal(16);
	});

	it('repeats characters if length is > that of pool', () => {
		chai.expect(
			uniq(powm(64).split('')).length
		).not.to.equal(64);
	});
});
