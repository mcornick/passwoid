# Maintenance Mode

passwoid is feature-complete and no longer under active development. Pull requests will be ignored.

# passwoid

passwoid generates reasonably secure passwords. That's it; that's all it does.

The passwords generated by passwoid are strings of random characters. Passwords are chosen from the set of all upper-case letters except I and O, all lower-case letters except l, and the digits 2 through 9. 0 and O are not used to avoid confusion with each other when passwords are displayed in sans-serif fonts. I, l, and 1 are not used for the same reason. Passwords are guaranteed to contain at least one upper-case letter, one lower-case letter, and one number.

The default length is 16. The minimum length is 3, because a shorter password would not satisfy the requirement to use all three classes of characters. passwoid will create a password of any length of 3 or greater, and guarantees that passwords will not repeat any characters if the requested length is 57 or less.

## Installation

```bash
# for programmatic usage
npm install --save passwoid
# for command-line usage
npm install --global passwoid
# or use npx (see below)
```

## Programmatic Usage

```js
var passwoid = require("passwoid");

passwoid(); // returns a password of the default length (16)
passwoid(8); // returns a password of length 8
passwoid(1); // throws Error: Cannot generate password of length 1
```

## Command-Line Usage With Global Install

```bash
$ passwoid
h6ECtbDZPnRddHV7
$ passwoid 8
XdWod8f8
$ passwoid 1
/usr/local/lib/node_modules/passwoid/lib/passwoid.js:51
    throw new Error('Cannot generate password of length ' + length);
    ^
Error: Cannot generate password of length 1
[...]
```

## Command-Line Usage With `npx`

```bash
$ npx -q passwoid
FPw4Mebtx6Nq7vj8
$ npx -q passwoid 8
mpr29ZoF
$ npx -q passwoid 1
Cannot generate password of length 1
```

## License

passwoid is available as open source under the terms of the [Apache License](http://www.apache.org/licenses/LICENSE-2.0) version 2.0.
