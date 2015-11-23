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

function defaultPool(length) {
	const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
	const repeats = parseInt((length - 1) / alphabet.length, 10) + 1;
	let pool = [];
	for (let i = 1; i <= repeats; i++) {
		pool = pool.concat(alphabet.split(''));
	}
	return pool;
}

function randomCharacter(pool) {
	const index = Math.floor(Math.random() * pool.length);
	const character = pool[index];
	pool.splice(index, 1);
	return character;
}

function acceptable(pw) {
	return pw.match(/[A-Z]/) && pw.match(/[a-z]/) && pw.match(/\d/);
}

function generatePassword(pool, length) {
	let results = [];
	for (let i = 1; i <= length; i++) {
		results.push(randomCharacter(pool));
	}
	return results.join('');
}

export default function (length = 16) {
	if (length < 3) {
		throw new Error('Cannot generate password of length ' + length);
	} else {
		let password = '';
		while (!acceptable(password)) {
			let currentPool = defaultPool(length);
			password = generatePassword(currentPool, length);
		}
		return password;
	}
}
