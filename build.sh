#!/bin/sh
# Build and run standalone utilities.
cd standalone
make 
cp test.txt _test.txt
./dos2unix _test.txt
./dos2unix _test.txt
./unix2dos _test.txt
./unix2dos _test.txt
rm -f _test.txt

# Build and run Node.js module.
cd ../node_js
npm install
npm test
