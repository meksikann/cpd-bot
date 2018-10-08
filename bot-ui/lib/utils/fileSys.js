'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var fs = require('fs');
function readFileSync(path) {
    return new Promise(function (res, rej) {
        fs.readFile(path, function (err, data) {
            if (err) {
                rej(err);
            } else {
                res(data);
            }
        });
    });
}

exports.readFileSync = readFileSync;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9maWxlU3lzLmpzIl0sIm5hbWVzIjpbImZzIiwicmVxdWlyZSIsInJlYWRGaWxlU3luYyIsInBhdGgiLCJQcm9taXNlIiwicmVzIiwicmVqIiwicmVhZEZpbGUiLCJlcnIiLCJkYXRhIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQU1BLEtBQUtDLFFBQVEsSUFBUixDQUFYO0FBQ0EsU0FBU0MsWUFBVCxDQUFzQkMsSUFBdEIsRUFBNEI7QUFDeEIsV0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDN0JOLFdBQUdPLFFBQUgsQ0FBWUosSUFBWixFQUFrQixVQUFDSyxHQUFELEVBQU1DLElBQU4sRUFBZTtBQUM3QixnQkFBSUQsR0FBSixFQUFTO0FBQ0xGLG9CQUFJRSxHQUFKO0FBQ0gsYUFGRCxNQUVPO0FBQ0hILG9CQUFJSSxJQUFKO0FBQ0g7QUFDSixTQU5EO0FBT0gsS0FSTSxDQUFQO0FBU0g7O1FBRU9QLFksR0FBQUEsWSIsImZpbGUiOiJmaWxlU3lzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuZnVuY3Rpb24gcmVhZEZpbGVTeW5jKHBhdGgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgIGZzLnJlYWRGaWxlKHBhdGgsIChlcnIsIGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWooZXJyKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXMoZGF0YSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5leHBvcnQge3JlYWRGaWxlU3luY31cbiJdfQ==