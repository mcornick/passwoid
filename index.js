#!/usr/bin/env node

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

var pool = function () {
  return 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789'.split('')
}

var randomCharacter = function (pool) {
  var index = Math.floor(Math.random() * pool.length)
  var character = pool[index]
  pool.splice(index, 1)
  return character
}

var acceptable = function (pw) {
  return pw.match(/[A-Z]/) && pw.match(/[a-z]/) && pw.match(/\d/)
}

var BadLengthException = function (length) {
  this.message = 'Cannot generate password of length ' + length
  this.name = 'BadLengthException'
}

var password = function (length) {
  if (length == null) {
    length = 16
  }
  if (length < 3 || length > pool().length) {
    throw new BadLengthException(length)
  } else {
    var pw = ''
    while (!acceptable(pw)) {
      var currentPool = pool()
      pw = ((function () {
        var results = []
        for (var i = 1; i <= length; i++) {
          results.push(randomCharacter(currentPool))
        }
        return results.join('')
      })())
    }
    return pw
  }
}

var requestedLength = parseInt(process.argv[2], 10)
if (isNaN(requestedLength)) {
  requestedLength = 16
}

try {
  console.log(password(requestedLength))
} catch (e) {
  console.log(e.message)
  process.exit(1)
}
