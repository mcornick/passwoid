# powm

powm very simply generates reasonably secure passwords. That's it; that's
all it does.

Passwords are chosen from the set of all upper-case letters except I and
O, all lower-case letters except l, and the digits 2 through 9. 0 and O
are not used to avoid confusion with each other. I, l, and 1 are not
used for the same reason.

Passwords are guaranteed to contain at least one upper-case letter, one
lower-case letter, and one number, and to not repeat any characters.

## Usage

Call powm from the command line:

```bash
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

The default length is 16. The minimum length is 3, because a shorter password
would not satisfy the requirement to use all three classes of characters. The
maximum length is 57, because a longer password would not satisfy the
requirement to not repeat any characters.

## Author/License

Mark Cornick <mark@markcornick.com>; licensed under the ISC license (please
see the header in index.js.)
