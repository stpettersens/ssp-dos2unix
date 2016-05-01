### ssp-dos2unix
> :end: A dos2unix implementation.

[![Build Status](https://travis-ci.org/stpettersens/ssp-dos2unix.png?branch=master)](https://travis-ci.org/stpettersens/ssp-dos2unix)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)
[![npm version](https://badge.fury.io/js/ssp-dos2unix.svg)](http://npmjs.com/package/ssp-dos2unix)

##### Install:

    $ npm install ssp-dos2unix

##### Usage:
```js
'use strict'
const dos2unix = require('dos2unix').dos2unix

let converted = dos2unix('README.md', {native: false, feedback: true, writable: false})
console.log(converted) // Returned text as string without any carriage returns (\r).
// If you use writable as true, returns 0 instead of text.
```

##### Options:

Omittable options object with following allowable parameters:

* `native` (Boolean) - Force use of native module (cannot be used with write: false).
* `feedback` (Boolean) - Display feedback (*"File already has UNIX line endings..."*).
* `writable` (Boolean) - Write change to file rather than return as string.

All options are false if omitted except for writable which is true.
