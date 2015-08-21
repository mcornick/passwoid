# powm

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

## Installation and Usage

```bash
$ npm install -g powm
[...]
$ powm
h6ECtbDZPnRddHV7
$ echo $?
0
$ powm 8
XdWod8f8
$ echo $?
0
$ powm 2
Cannot generate password of length 2
$ echo $?
1
$ powm 100
Cannot generate password of length 100
$ echo $?
1
```

## Author/License

Mark Cornick <mark@markcornick.com>; licensed under the ISC license (please see
the header in index.js.)
