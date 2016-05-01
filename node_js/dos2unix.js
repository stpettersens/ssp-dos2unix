/*
dos2unix implementation with Node.js.
Copyright 2016 Sam Saint-Pettersen.

Released under the MIT License;
see LICENSE file.
*/

'use strict'

const fs = require('fs')

let USE_NATIVE = false

let native = null
try {
  native = require('./build/Release/dos2unix')
  USE_NATIVE = true
} catch (e) {
  USE_NATIVE = false
}

function isAscii (contents) {
  let ascii = true
  for (let i = 0; i < contents.length; i++) {
    if (contents.charCodeAt(i) > 127) {
      ascii = false
      break
    }
  }
  return ascii
}

function isDOS_eol (contents) {
  let dos_eol = false
  for (let i = 0; i < contents.length; i++) {
    if (contents.charAt(i) === '\r') {
      dos_eol = true
      break
    }
  }
  return dos_eol
}

function toUnixLineEndings (contents) {
  let ucontents = []
  for (let i = 0; i < contents.length; i++) {
    if (contents.charAt(i) !== '\r') {
      ucontents.push(contents.charAt(i))
    }
  }
  return ucontents.join('')
}

module.exports.dos2unix = function (filename, options) {
  if (options && options.native !== undefined) {
    USE_NATIVE = options.native
    if (native === null && USE_NATIVE) {
      USE_NATIVE = false
      console.warn(
      'dos2unix: Falling back to pure JS implementation ( native: ', USE_NATIVE, ')')
    }
  }

  let feedback = false
  if (options && options.feedback !== undefined) {
    feedback = options.feedback
  }

  let write = true
  if (options && options.write !== undefined) {
    write = options.write
    if (!write) {
      USE_NATIVE = false
    }
  }

  if (USE_NATIVE && native) {
    native.dos2unix(filename, feedback ? 1 : 0)
  } else {
    let message = 'dos2unix: File already has UNIX line endings or is binary.'
    let contents = fs.readFileSync(filename, 'utf8').toString()
    if (isAscii(contents) && isDOS_eol(contents)) {
      let converted = toUnixLineEndings(contents)
      if (write) {
        fs.writeFileSync(filename, converted, 'utf8', 'wb')
        return 0
      } else {
        if (feedback) {
          console.warn(message)
        }
        return converted
      }
    } else if (feedback) {
      console.warn(message)
    }
  }
  return 1
}
