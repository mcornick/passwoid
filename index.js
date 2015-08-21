#! /usr/bin/env node

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
