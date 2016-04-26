'use strict'

const dos2unix = require('./dos2unix').dos2unix
let converted = dos2unix('dos2unix.js', {feedback: true, write: false})
console.log(converted)
