'use strict';

const assert = require('assert');
const fs = require('fs');

const TEST_FILE = 'test123';
const TEST_DATA = 'hello sjs!';


safeUnlink(TEST_FILE);
var f = fs.open(TEST_FILE, 'wb+');
assert(f.fd !== -1);
assert(!f.closed);
f.write(TEST_DATA);
f.flush();
f.close();
assert.equal(f.fd, -1);
assert(f.closed);

f = fs.open(TEST_FILE, 'rb');
var data = f.read();
f.close();
assert.equal(data, TEST_DATA);

f = fs.open(TEST_FILE, 'rb');
var databuf = Buffer(4096);
f.read(databuf);
f.close();
assert.equal(databuf.slice(0, TEST_DATA.length).toString(), TEST_DATA);

safeUnlink(TEST_FILE);

function safeUnlink(path) {
    try {
        fs.unlink(path);
    } catch (e) {
        // ignore
    }
}