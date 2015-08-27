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

var powm = require('../lib/powm')
var chai = require('chai')

describe('powm', function () {
  it('should create a password of default length', function () {
    chai.expect(
      powm().length
    ).to.equal(16)
  })

  it('should create a password of specific length', function () {
    chai.expect(
      powm(8).length
    ).to.equal(8)
  })

  it('should throw an error when length is too short', function () {
    chai.expect(function () {
      powm(1)
    }).to.throw('Cannot generate password of length 1')
  })

  it('should throw an error when length is too long', function () {
    chai.expect(function () {
      powm(100)
    }).to.throw('Cannot generate password of length 100')
  })
})
