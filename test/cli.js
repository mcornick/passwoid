// Copyright (c) 2015 Mark Cornick <mark@markcornick.com>
//
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED 'AS IS' AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
// REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
// AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
// INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
// LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
// OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
// PERFORMANCE OF THIS SOFTWARE.

/* eslint-env mocha */

import chai from 'chai';
import cli from '../lib/cli';
import stream from 'mock-utf8-stream';

const testCli = options => {
	const stdout = new stream.MockWritableStream();
	stdout.startCapture();
	cli({
		argv: options.argv,
		stdout: stdout
	});
	chai.expect(stdout.capturedData.trim().length).to.equal(options.length);
};

describe('cli', () => {
	it('given no length, creates a password of default length', () => {
		testCli({
			argv: ['node', 'bin.js'],
			length: 16
		});
	});

	it('given a specific length, creates a password of that length', () => {
		testCli({
			argv: ['node', 'bin.js', 8],
			length: 8
		});
	});

	it('given a bogus length, creates a password of default length', () => {
		testCli({
			argv: ['node', 'bin.js', 'pants'],
			length: 16
		});
	});

	it('given a too-short length, throws an error', () => {
		chai.expect(() => {
			cli({
				argv: ['node', 'bin.js', 1],
				stdout: new stream.MockWritableStream()
			});
		}).to.throw('Cannot generate password of length 1');
	});
});
