'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logError = exports.logInfo = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var winston = require('winston');

var logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'rasa-bot.log' })]
});

function logInfo(data) {
    if (process.env.LOGS == 1) {
        for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            rest[_key - 1] = arguments[_key];
        }

        var message = (typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) == 'object' ? '\n            ' + data + ',\n             =====================================================>,Date: ' + new Date() : data + '\n             ' + (rest.length ? JSON.stringify(rest) : '') + '\n             =========================================>,Date: ' + new Date();

        logger.log({
            level: 'info',
            message: message
        });
    }
}

function logError(err) {
    logger.log('error', err);
}

exports.logInfo = logInfo;
exports.logError = logError;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sb2dnZXIuanMiXSwibmFtZXMiOlsid2luc3RvbiIsInJlcXVpcmUiLCJsb2dnZXIiLCJjcmVhdGVMb2dnZXIiLCJsZXZlbCIsImZvcm1hdCIsInNpbXBsZSIsInRyYW5zcG9ydHMiLCJDb25zb2xlIiwiRmlsZSIsImZpbGVuYW1lIiwibG9nSW5mbyIsImRhdGEiLCJwcm9jZXNzIiwiZW52IiwiTE9HUyIsInJlc3QiLCJtZXNzYWdlIiwiRGF0ZSIsImxlbmd0aCIsIkpTT04iLCJzdHJpbmdpZnkiLCJsb2ciLCJsb2dFcnJvciIsImVyciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLFVBQVVDLFFBQVEsU0FBUixDQUFoQjs7QUFFQSxJQUFNQyxTQUFTRixRQUFRRyxZQUFSLENBQXFCO0FBQ2hDQyxXQUFPLE1BRHlCO0FBRWhDQyxZQUFRTCxRQUFRSyxNQUFSLENBQWVDLE1BQWYsRUFGd0I7QUFHaENDLGdCQUFZLENBQ1IsSUFBSVAsUUFBUU8sVUFBUixDQUFtQkMsT0FBdkIsRUFEUSxFQUVSLElBQUlSLFFBQVFPLFVBQVIsQ0FBbUJFLElBQXZCLENBQTRCLEVBQUVDLFVBQVUsY0FBWixFQUE1QixDQUZRO0FBSG9CLENBQXJCLENBQWY7O0FBU0EsU0FBU0MsT0FBVCxDQUFpQkMsSUFBakIsRUFBZ0M7QUFDNUIsUUFBR0MsUUFBUUMsR0FBUixDQUFZQyxJQUFaLElBQW9CLENBQXZCLEVBQTBCO0FBQUEsMENBREpDLElBQ0k7QUFESkEsZ0JBQ0k7QUFBQTs7QUFDdEIsWUFBTUMsVUFBVSxRQUFPTCxJQUFQLHVEQUFPQSxJQUFQLE1BQWUsUUFBZixzQkFFVkEsSUFGVSxxRkFHb0QsSUFBSU0sSUFBSixFQUhwRCxHQUlQTixJQUpPLHdCQUtUSSxLQUFLRyxNQUFMLEdBQWNDLEtBQUtDLFNBQUwsQ0FBZUwsSUFBZixDQUFkLEdBQXFDLEVBTDVCLHlFQU13QyxJQUFJRSxJQUFKLEVBTnhEOztBQVFBaEIsZUFBT29CLEdBQVAsQ0FBVztBQUNQbEIsbUJBQU8sTUFEQTtBQUVQYSxxQkFBU0E7QUFGRixTQUFYO0FBSUg7QUFDSjs7QUFFRCxTQUFTTSxRQUFULENBQWtCQyxHQUFsQixFQUF1QjtBQUNuQnRCLFdBQU9vQixHQUFQLENBQVcsT0FBWCxFQUFvQkUsR0FBcEI7QUFDSDs7UUFHT2IsTyxHQUFBQSxPO1FBQVNZLFEsR0FBQUEsUSIsImZpbGUiOiJsb2dnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB3aW5zdG9uID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5jb25zdCBsb2dnZXIgPSB3aW5zdG9uLmNyZWF0ZUxvZ2dlcih7XG4gICAgbGV2ZWw6ICdpbmZvJyxcbiAgICBmb3JtYXQ6IHdpbnN0b24uZm9ybWF0LnNpbXBsZSgpLFxuICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKCksXG4gICAgICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuRmlsZSh7IGZpbGVuYW1lOiAncmFzYS1ib3QubG9nJyB9KVxuICAgIF1cbn0pO1xuXG5mdW5jdGlvbiBsb2dJbmZvKGRhdGEsIC4uLnJlc3QpIHtcbiAgICBpZihwcm9jZXNzLmVudi5MT0dTID09IDEpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHR5cGVvZiBkYXRhID09ICdvYmplY3QnID9cbiAgICAgICAgICAgIGBcbiAgICAgICAgICAgICR7ZGF0YX0sXG4gICAgICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0+LERhdGU6ICR7bmV3IERhdGUoKX1gXG4gICAgICAgICAgICA6IGAke2RhdGF9XG4gICAgICAgICAgICAgJHtyZXN0Lmxlbmd0aCA/IEpTT04uc3RyaW5naWZ5KHJlc3QpIDogJyd9XG4gICAgICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0+LERhdGU6ICR7bmV3IERhdGUoKX1gO1xuXG4gICAgICAgIGxvZ2dlci5sb2coe1xuICAgICAgICAgICAgbGV2ZWw6ICdpbmZvJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBsb2dFcnJvcihlcnIpIHtcbiAgICBsb2dnZXIubG9nKCdlcnJvcicsIGVycik7XG59XG5cblxuZXhwb3J0IHtsb2dJbmZvLCBsb2dFcnJvciB9XG4iXX0=