'use strict';

const assert = require('assert');
const os = require('os');
const path = require('path');


var p = os.pipe();
var rfd = p[0];
var wfd = p[1];
os.cloexec(wfd, false);
var pid = os.fork();

if (pid == 0) {
    // child
    os.execve(system.executable,
              [system.executable, path.join(path.dirname(__file__), 'helper1.js')],
              {PARENT_FD: wfd, SJS_PATH: system.env.SJS_PATH});
    assert(false);
} else {
    // parent
    var data = os.read(rfd);
    assert.equal(data, "HELLO");
    var r = os.waitpid(pid);
    assert.equal(r.pid, pid);
    assert(os.WIFEXITED(r.status));
    assert.equal(os.WEXITSTATUS(r.status), 0);
}
