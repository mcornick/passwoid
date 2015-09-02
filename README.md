# powm

[![npm version](https://badge.fury.io/js/powm.svg)](http://badge.fury.io/js/powm)
[![Build Status](https://travis-ci.org/markcornick/powm.svg?branch=master)](https://travis-ci.org/markcornick/powm)
[![Coverage Status](https://coveralls.io/repos/markcornick/powm/badge.svg?branch=master&service=github)](https://coveralls.io/github/markcornick/powm?branch=master)
[![Code Climate](https://codeclimate.com/github/markcornick/powm/badges/gpa.svg)](https://codeclimate.com/github/markcornick/powm)

powm generates reasonably secure passwords. That's it; that's all it does.

Passwords are chosen from the set of all upper-case letters except I and O, all
lower-case letters except l, and the digits 2 through 9. 0 and O are not used to
avoid confusion with each other when passwords are displayed in sans-serif
fonts. I, l, and 1 are not used for the same reason. Passwords are guaranteed to
contain at least one upper-case letter, one lower-case letter, and one number,
and to not repeat any characters.

The default length is 16. The minimum length is 3, because a shorter password
would not satisfy the requirement to use all three classes of characters. The
maximum length is 57, because a longer password would not satisfy the
requirement to not repeat any characters.

powm is based on [pwm](https://github.com/markcornick/pwm), my Ruby
implementation of a similar concept. powm differs from pwm in that powm enforces
the no-repeated-characters requirement, but pwm does not. (The name change is
because "pwm" was already taken as a package name on npm.)

## Installation

powm can be used either as a command-line utility, or programatically from your
own code.

```bash
$ npm install --global powm # for command-line usage
$ npm install --save powm   # for programatic usage
```

## Command-Line Usage

```bash
$ powm
h6ECtbDZPnRddHV7
$ powm 8
XdWod8f8
$ powm 100
/usr/local/lib/node_modules/powm/lib/powm.js:45
    throw new Error('Cannot generate password of length ' + length);
          ^
Error: Cannot generate password of length 100
[...]
```

## Programmatic Usage

```js
var powm = require('powm');

powm();    // returns a password of the default length (16)
powm(8);   // returns a password of length 8
powm(128); // throws Error: Cannot generate password of length 128
```
