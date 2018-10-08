'use strict';

var _logger = require('./utils/logger');

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _general = require('./constants/general');

var _bot = require('./bot.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//setup builder global variable
var express = require('express');
var monk = require('monk');

require('dotenv').config();

var db = monk('localhost:27017/cpd-bot');
var server = express();
var port = 8282;

server.use(_bodyParser2.default.urlencoded({ extended: false }));
server.use(_bodyParser2.default.json());

server.use(function (req, res, next) {
    req.db = db;
    next();
});
//setup server
server.listen(port, function () {
    (0, _logger.logInfo)('Bot action server ' + _general.generalConstants.serverResponseMessages.listening + ' port ' + port);
});

// perform bot actions
server.post('/webhook', _bot.botPerformAction);
// generate bot messages
server.post('/nlg', _bot.botGenerateUtter);

// simple request for balancer
server.post('/', function (req, res, next) {
    res.send(_httpStatusCodes2.default.OK);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiZXhwcmVzcyIsInJlcXVpcmUiLCJtb25rIiwiY29uZmlnIiwiZGIiLCJzZXJ2ZXIiLCJwb3J0IiwidXNlIiwiYm9keVBhcnNlciIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsImpzb24iLCJyZXEiLCJyZXMiLCJuZXh0IiwibGlzdGVuIiwiZ2VuZXJhbENvbnN0YW50cyIsInNlcnZlclJlc3BvbnNlTWVzc2FnZXMiLCJsaXN0ZW5pbmciLCJwb3N0IiwiYm90UGVyZm9ybUFjdGlvbiIsImJvdEdlbmVyYXRlVXR0ZXIiLCJzZW5kIiwiSHR0cFN0YXR1cyIsIk9LIl0sIm1hcHBpbmdzIjoiOztBQUdBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQVBBO0FBQ0EsSUFBSUEsVUFBVUMsUUFBUSxTQUFSLENBQWQ7QUFDQSxJQUFJQyxPQUFPRCxRQUFRLE1BQVIsQ0FBWDs7QUFNQUEsUUFBUSxRQUFSLEVBQWtCRSxNQUFsQjs7QUFFQSxJQUFJQyxLQUFLRixLQUFLLHlCQUFMLENBQVQ7QUFDQSxJQUFNRyxTQUFTTCxTQUFmO0FBQ0EsSUFBTU0sT0FBTyxJQUFiOztBQUVBRCxPQUFPRSxHQUFQLENBQVdDLHFCQUFXQyxVQUFYLENBQXNCLEVBQUNDLFVBQVUsS0FBWCxFQUF0QixDQUFYO0FBQ0FMLE9BQU9FLEdBQVAsQ0FBV0MscUJBQVdHLElBQVgsRUFBWDs7QUFFQU4sT0FBT0UsR0FBUCxDQUFXLFVBQVVLLEdBQVYsRUFBZUMsR0FBZixFQUFvQkMsSUFBcEIsRUFBMEI7QUFDakNGLFFBQUlSLEVBQUosR0FBU0EsRUFBVDtBQUNBVTtBQUNILENBSEQ7QUFJQTtBQUNBVCxPQUFPVSxNQUFQLENBQWNULElBQWQsRUFBb0IsWUFBTTtBQUN0QixnREFBNkJVLDBCQUFpQkMsc0JBQWpCLENBQXdDQyxTQUFyRSxjQUF1RlosSUFBdkY7QUFDSCxDQUZEOztBQUlBO0FBQ0FELE9BQU9jLElBQVAsQ0FBWSxVQUFaLEVBQXdCQyxxQkFBeEI7QUFDQTtBQUNBZixPQUFPYyxJQUFQLENBQVksTUFBWixFQUFvQkUscUJBQXBCOztBQUVBO0FBQ0FoQixPQUFPYyxJQUFQLENBQVksR0FBWixFQUFpQixVQUFDUCxHQUFELEVBQU1DLEdBQU4sRUFBV0MsSUFBWCxFQUFvQjtBQUNqQ0QsUUFBSVMsSUFBSixDQUFTQywwQkFBV0MsRUFBcEI7QUFDSCxDQUZEIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vc2V0dXAgYnVpbGRlciBnbG9iYWwgdmFyaWFibGVcbmxldCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xubGV0IG1vbmsgPSByZXF1aXJlKCdtb25rJyk7XG5pbXBvcnQge2xvZ0luZm99IGZyb20gXCIuL3V0aWxzL2xvZ2dlclwiO1xuaW1wb3J0IEh0dHBTdGF0dXMgZnJvbSAnaHR0cC1zdGF0dXMtY29kZXMnXG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQge2dlbmVyYWxDb25zdGFudHN9IGZyb20gJy4vY29uc3RhbnRzL2dlbmVyYWwnO1xuaW1wb3J0IHtib3RHZW5lcmF0ZVV0dGVyLCBib3RQZXJmb3JtQWN0aW9ufSBmcm9tICcuL2JvdC5qcyc7XG5yZXF1aXJlKCdkb3RlbnYnKS5jb25maWcoKTtcblxubGV0IGRiID0gbW9uaygnbG9jYWxob3N0OjI3MDE3L2NwZC1ib3QnKTtcbmNvbnN0IHNlcnZlciA9IGV4cHJlc3MoKTtcbmNvbnN0IHBvcnQgPSA4MjgyO1xuXG5zZXJ2ZXIudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7ZXh0ZW5kZWQ6IGZhbHNlfSkpO1xuc2VydmVyLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5cbnNlcnZlci51c2UoZnVuY3Rpb24gKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgcmVxLmRiID0gZGI7XG4gICAgbmV4dCgpO1xufSk7XG4vL3NldHVwIHNlcnZlclxuc2VydmVyLmxpc3Rlbihwb3J0LCAoKSA9PiB7XG4gICAgbG9nSW5mbyhgQm90IGFjdGlvbiBzZXJ2ZXIgJHtnZW5lcmFsQ29uc3RhbnRzLnNlcnZlclJlc3BvbnNlTWVzc2FnZXMubGlzdGVuaW5nfSBwb3J0ICR7cG9ydH1gKTtcbn0pO1xuXG4vLyBwZXJmb3JtIGJvdCBhY3Rpb25zXG5zZXJ2ZXIucG9zdCgnL3dlYmhvb2snLCBib3RQZXJmb3JtQWN0aW9uKTtcbi8vIGdlbmVyYXRlIGJvdCBtZXNzYWdlc1xuc2VydmVyLnBvc3QoJy9ubGcnLCBib3RHZW5lcmF0ZVV0dGVyKTtcblxuLy8gc2ltcGxlIHJlcXVlc3QgZm9yIGJhbGFuY2VyXG5zZXJ2ZXIucG9zdCgnLycsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHJlcy5zZW5kKEh0dHBTdGF0dXMuT0spXG59KTtcbiJdfQ==