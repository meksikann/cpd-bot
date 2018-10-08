'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.botSayInFestival = undefined;

var _logger = require('../utils/logger');

var say = require('say');

function botSayInFestival(opts) {
    var message = opts.message;
    var session = opts.session;
    var voices = ['voice_don_diphone', 'voice_ked_diphone', 'voice_kal_diphone', 'voice_rab_diphone'];

    (0, _logger.logInfo)('enable speech: ', process.env.ENABLE_SPEECH);

    // use speech synthesis if enabled ********************************
    if (process.env.ENABLE_SPEECH == 1) {
        if (opts.callback) {
            say.speak(message, null, null, function (err) {
                if (err) {
                    return console.log(err);
                }

                opts.callback();
            });
        } else {
            say.speak(message, voices[1], null, function (err) {
                if (err) {
                    return (0, _logger.logError)(err);
                }
            });
        }

        if (opts.expectingInput && session) {
            var msg = new builder.Message(session).speak(message).inputHint(builder.InputHint.expectingInput);
            session.send(msg);
        }

        return;
    }

    // if speech synthesis not enabled just run the callback
    if (opts.callback) {
        opts.callback();
    }
}

exports.botSayInFestival = botSayInFestival;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL3R0cy1zeW50aGVzaXMuanMiXSwibmFtZXMiOlsic2F5IiwicmVxdWlyZSIsImJvdFNheUluRmVzdGl2YWwiLCJvcHRzIiwibWVzc2FnZSIsInNlc3Npb24iLCJ2b2ljZXMiLCJwcm9jZXNzIiwiZW52IiwiRU5BQkxFX1NQRUVDSCIsImNhbGxiYWNrIiwic3BlYWsiLCJlcnIiLCJjb25zb2xlIiwibG9nIiwiZXhwZWN0aW5nSW5wdXQiLCJtc2ciLCJidWlsZGVyIiwiTWVzc2FnZSIsImlucHV0SGludCIsIklucHV0SGludCIsInNlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQSxJQUFNQSxNQUFNQyxRQUFRLEtBQVIsQ0FBWjs7QUFFQSxTQUFTQyxnQkFBVCxDQUEwQkMsSUFBMUIsRUFBZ0M7QUFDNUIsUUFBTUMsVUFBVUQsS0FBS0MsT0FBckI7QUFDQSxRQUFNQyxVQUFVRixLQUFLRSxPQUFyQjtBQUNBLFFBQU1DLFNBQVMsQ0FDWCxtQkFEVyxFQUVYLG1CQUZXLEVBR1gsbUJBSFcsRUFJWCxtQkFKVyxDQUFmOztBQU9BLHlCQUFRLGlCQUFSLEVBQTJCQyxRQUFRQyxHQUFSLENBQVlDLGFBQXZDOztBQUVBO0FBQ0EsUUFBR0YsUUFBUUMsR0FBUixDQUFZQyxhQUFaLElBQTZCLENBQWhDLEVBQW1DO0FBQy9CLFlBQUlOLEtBQUtPLFFBQVQsRUFBbUI7QUFDZlYsZ0JBQUlXLEtBQUosQ0FBVVAsT0FBVixFQUFtQixJQUFuQixFQUF5QixJQUF6QixFQUErQixVQUFDUSxHQUFELEVBQVM7QUFDcEMsb0JBQUlBLEdBQUosRUFBUztBQUNMLDJCQUFPQyxRQUFRQyxHQUFSLENBQVlGLEdBQVosQ0FBUDtBQUNIOztBQUVEVCxxQkFBS08sUUFBTDtBQUNILGFBTkQ7QUFPSCxTQVJELE1BUU87QUFDSFYsZ0JBQUlXLEtBQUosQ0FBVVAsT0FBVixFQUFtQkUsT0FBTyxDQUFQLENBQW5CLEVBQThCLElBQTlCLEVBQW9DLFVBQUNNLEdBQUQsRUFBUztBQUN6QyxvQkFBR0EsR0FBSCxFQUFRO0FBQ0osMkJBQU8sc0JBQVNBLEdBQVQsQ0FBUDtBQUNIO0FBQ0osYUFKRDtBQUtIOztBQUVELFlBQUdULEtBQUtZLGNBQUwsSUFBdUJWLE9BQTFCLEVBQW1DO0FBQy9CLGdCQUFJVyxNQUFNLElBQUlDLFFBQVFDLE9BQVosQ0FBb0JiLE9BQXBCLEVBQ0xNLEtBREssQ0FDQ1AsT0FERCxFQUVMZSxTQUZLLENBRUtGLFFBQVFHLFNBQVIsQ0FBa0JMLGNBRnZCLENBQVY7QUFHQVYsb0JBQVFnQixJQUFSLENBQWFMLEdBQWI7QUFDSDs7QUFFRDtBQUNIOztBQUdEO0FBQ0EsUUFBSWIsS0FBS08sUUFBVCxFQUFtQjtBQUNmUCxhQUFLTyxRQUFMO0FBQ0g7QUFDSjs7UUFFT1IsZ0IsR0FBQUEsZ0IiLCJmaWxlIjoidHRzLXN5bnRoZXNpcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7bG9nSW5mbywgbG9nRXJyb3J9IGZyb20gXCIuLi91dGlscy9sb2dnZXJcIjtcblxuY29uc3Qgc2F5ID0gcmVxdWlyZSgnc2F5Jyk7XG5cbmZ1bmN0aW9uIGJvdFNheUluRmVzdGl2YWwob3B0cykge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBvcHRzLm1lc3NhZ2U7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IG9wdHMuc2Vzc2lvbjtcbiAgICBjb25zdCB2b2ljZXMgPSBbXG4gICAgICAgICd2b2ljZV9kb25fZGlwaG9uZScsXG4gICAgICAgICd2b2ljZV9rZWRfZGlwaG9uZScsXG4gICAgICAgICd2b2ljZV9rYWxfZGlwaG9uZScsXG4gICAgICAgICd2b2ljZV9yYWJfZGlwaG9uZSdcbiAgICBdO1xuXG4gICAgbG9nSW5mbygnZW5hYmxlIHNwZWVjaDogJywgcHJvY2Vzcy5lbnYuRU5BQkxFX1NQRUVDSCk7XG5cbiAgICAvLyB1c2Ugc3BlZWNoIHN5bnRoZXNpcyBpZiBlbmFibGVkICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgaWYocHJvY2Vzcy5lbnYuRU5BQkxFX1NQRUVDSCA9PSAxKSB7XG4gICAgICAgIGlmIChvcHRzLmNhbGxiYWNrKSB7XG4gICAgICAgICAgICBzYXkuc3BlYWsobWVzc2FnZSwgbnVsbCwgbnVsbCwgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgb3B0cy5jYWxsYmFjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzYXkuc3BlYWsobWVzc2FnZSwgdm9pY2VzWzFdLCBudWxsLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsb2dFcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0cy5leHBlY3RpbmdJbnB1dCAmJiBzZXNzaW9uKSB7XG4gICAgICAgICAgICBsZXQgbXNnID0gbmV3IGJ1aWxkZXIuTWVzc2FnZShzZXNzaW9uKVxuICAgICAgICAgICAgICAgIC5zcGVhayhtZXNzYWdlKVxuICAgICAgICAgICAgICAgIC5pbnB1dEhpbnQoYnVpbGRlci5JbnB1dEhpbnQuZXhwZWN0aW5nSW5wdXQpO1xuICAgICAgICAgICAgc2Vzc2lvbi5zZW5kKG1zZylcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cblxuICAgIC8vIGlmIHNwZWVjaCBzeW50aGVzaXMgbm90IGVuYWJsZWQganVzdCBydW4gdGhlIGNhbGxiYWNrXG4gICAgaWYgKG9wdHMuY2FsbGJhY2spIHtcbiAgICAgICAgb3B0cy5jYWxsYmFjaygpO1xuICAgIH1cbn1cblxuZXhwb3J0IHtib3RTYXlJbkZlc3RpdmFsfVxuIl19