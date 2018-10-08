'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.botPerformAction = exports.botGenerateUtter = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var botPerformAction = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var dbData, data, response;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        (0, _logger.logInfo)('Got perform Action request: ' + req.body.next_action);
                        dbData = {
                            db: req.db,
                            lastAction: req.body.next_action,
                            userId: req.body.sender_id
                        };
                        data = {
                            senderId: req.body.sender_id || defaultUser,
                            nextAction: req.body.next_action,
                            slots: req.body.tracker.slots
                        };
                        response = {};
                        _context.prev = 4;
                        _context.next = 7;
                        return (0, _actionProcessor.processActionIntent)(data);

                    case 7:
                        response.events = _context.sent;

                        response.responses = [];

                        (0, _logger.logInfo)('Events sent ', response.events);

                        (0, _databaseQueries.updateDbUserActions)(dbData);
                        res.send(response);
                        _context.next = 18;
                        break;

                    case 14:
                        _context.prev = 14;
                        _context.t0 = _context['catch'](4);

                        (0, _logger.logError)(_context.t0);
                        res.send(_context.t0);

                    case 18:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[4, 14]]);
    }));

    return function botPerformAction(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var _formatMessages = require('./helpers/format-messages');

var _logger = require('./utils/logger');

var _actionProcessor = require('./helpers/actionProcessor');

var _databaseQueries = require('./helpers/database-queries');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultUser = 'default-user';

function botGenerateUtter(req, res) {
    (0, _logger.logInfo)('Got generate Utter request.Utter template: ' + req.body.template + '.');
    // logInfo('Slots: ',req.body.tracker.slots);
    console.log(req.body.tracker.latest_message.intent);
    var dbData = {
        db: req.db,
        lastAction: req.body.template,
        userId: req.body.tracker.sender_id
    };
    var data = {
        senderId: req.body.tracker.sender_id || defaultUser,
        template: req.body.template,
        slots: req.body.tracker.slots
    };

    try {
        var utterance = (0, _formatMessages.generateBotResponse)(data);
        (0, _databaseQueries.updateDbUserActions)(dbData);

        res.send({
            "text": utterance.text,
            "buttons": [],
            "image": utterance.image,
            "elements": [],
            "attachments": []
        });
    } catch (err) {
        (0, _logger.logError)(err);
        res.send(err);
    }
}

exports.botGenerateUtter = botGenerateUtter;
exports.botPerformAction = botPerformAction;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ib3QuanMiXSwibmFtZXMiOlsicmVxIiwicmVzIiwiYm9keSIsIm5leHRfYWN0aW9uIiwiZGJEYXRhIiwiZGIiLCJsYXN0QWN0aW9uIiwidXNlcklkIiwic2VuZGVyX2lkIiwiZGF0YSIsInNlbmRlcklkIiwiZGVmYXVsdFVzZXIiLCJuZXh0QWN0aW9uIiwic2xvdHMiLCJ0cmFja2VyIiwicmVzcG9uc2UiLCJldmVudHMiLCJyZXNwb25zZXMiLCJzZW5kIiwiYm90UGVyZm9ybUFjdGlvbiIsImJvdEdlbmVyYXRlVXR0ZXIiLCJ0ZW1wbGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJsYXRlc3RfbWVzc2FnZSIsImludGVudCIsInV0dGVyYW5jZSIsInRleHQiLCJpbWFnZSIsImVyciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozt3RkF3Q0EsaUJBQWdDQSxHQUFoQyxFQUFxQ0MsR0FBckM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0ksOEVBQXVDRCxJQUFJRSxJQUFKLENBQVNDLFdBQWhEO0FBQ0lDLDhCQUZSLEdBRWlCO0FBQ1RDLGdDQUFJTCxJQUFJSyxFQURDO0FBRVRDLHdDQUFZTixJQUFJRSxJQUFKLENBQVNDLFdBRlo7QUFHVEksb0NBQVFQLElBQUlFLElBQUosQ0FBU007QUFIUix5QkFGakI7QUFPVUMsNEJBUFYsR0FPaUI7QUFDVEMsc0NBQVVWLElBQUlFLElBQUosQ0FBU00sU0FBVCxJQUFzQkcsV0FEdkI7QUFFVEMsd0NBQVlaLElBQUlFLElBQUosQ0FBU0MsV0FGWjtBQUdUVSxtQ0FBT2IsSUFBSUUsSUFBSixDQUFTWSxPQUFULENBQWlCRDtBQUhmLHlCQVBqQjtBQVlRRSxnQ0FaUixHQVltQixFQVpuQjtBQUFBO0FBQUE7QUFBQSwrQkFlZ0MsMENBQW9CTixJQUFwQixDQWZoQzs7QUFBQTtBQWVRTSxpQ0FBU0MsTUFmakI7O0FBZ0JRRCxpQ0FBU0UsU0FBVCxHQUFxQixFQUFyQjs7QUFFQSw2Q0FBUSxjQUFSLEVBQXdCRixTQUFTQyxNQUFqQzs7QUFFQSxrRUFBb0JaLE1BQXBCO0FBQ0FILDRCQUFJaUIsSUFBSixDQUFTSCxRQUFUO0FBckJSO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQXVCUTtBQUNBZCw0QkFBSWlCLElBQUo7O0FBeEJSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEs7O29CQUFlQyxnQjs7Ozs7QUF4Q2Y7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNUixjQUFjLGNBQXBCOztBQUVBLFNBQVNTLGdCQUFULENBQTBCcEIsR0FBMUIsRUFBK0JDLEdBQS9CLEVBQW9DO0FBQ2hDLHlFQUFzREQsSUFBSUUsSUFBSixDQUFTbUIsUUFBL0Q7QUFDQTtBQUNBQyxZQUFRQyxHQUFSLENBQVl2QixJQUFJRSxJQUFKLENBQVNZLE9BQVQsQ0FBaUJVLGNBQWpCLENBQWdDQyxNQUE1QztBQUNBLFFBQUlyQixTQUFTO0FBQ1RDLFlBQUlMLElBQUlLLEVBREM7QUFFVEMsb0JBQVlOLElBQUlFLElBQUosQ0FBU21CLFFBRlo7QUFHVGQsZ0JBQVFQLElBQUlFLElBQUosQ0FBU1ksT0FBVCxDQUFpQk47QUFIaEIsS0FBYjtBQUtBLFFBQU1DLE9BQU87QUFDVEMsa0JBQVVWLElBQUlFLElBQUosQ0FBU1ksT0FBVCxDQUFpQk4sU0FBakIsSUFBOEJHLFdBRC9CO0FBRVRVLGtCQUFVckIsSUFBSUUsSUFBSixDQUFTbUIsUUFGVjtBQUdUUixlQUFPYixJQUFJRSxJQUFKLENBQVNZLE9BQVQsQ0FBaUJEO0FBSGYsS0FBYjs7QUFNQSxRQUFJO0FBQ0EsWUFBTWEsWUFBWSx5Q0FBb0JqQixJQUFwQixDQUFsQjtBQUNBLGtEQUFvQkwsTUFBcEI7O0FBRUFILFlBQUlpQixJQUFKLENBQVM7QUFDTCxvQkFBUVEsVUFBVUMsSUFEYjtBQUVMLHVCQUFXLEVBRk47QUFHTCxxQkFBU0QsVUFBVUUsS0FIZDtBQUlMLHdCQUFZLEVBSlA7QUFLTCwyQkFBZTtBQUxWLFNBQVQ7QUFPSCxLQVhELENBV0UsT0FBT0MsR0FBUCxFQUFZO0FBQ1YsOEJBQVNBLEdBQVQ7QUFDQTVCLFlBQUlpQixJQUFKLENBQVNXLEdBQVQ7QUFDSDtBQUVKOztRQWdDT1QsZ0IsR0FBQUEsZ0I7UUFBa0JELGdCLEdBQUFBLGdCIiwiZmlsZSI6ImJvdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Z2VuZXJhdGVCb3RSZXNwb25zZX0gZnJvbSAnLi9oZWxwZXJzL2Zvcm1hdC1tZXNzYWdlcyc7XG5pbXBvcnQge2xvZ0Vycm9yLCBsb2dJbmZvfSBmcm9tICcuL3V0aWxzL2xvZ2dlcic7XG5pbXBvcnQge3Byb2Nlc3NBY3Rpb25JbnRlbnR9IGZyb20gJy4vaGVscGVycy9hY3Rpb25Qcm9jZXNzb3InO1xuaW1wb3J0IHt1cGRhdGVEYlVzZXJBY3Rpb25zfSBmcm9tICcuL2hlbHBlcnMvZGF0YWJhc2UtcXVlcmllcyc7XG5cbmNvbnN0IGRlZmF1bHRVc2VyID0gJ2RlZmF1bHQtdXNlcic7XG5cbmZ1bmN0aW9uIGJvdEdlbmVyYXRlVXR0ZXIocmVxLCByZXMpIHtcbiAgICBsb2dJbmZvKGBHb3QgZ2VuZXJhdGUgVXR0ZXIgcmVxdWVzdC5VdHRlciB0ZW1wbGF0ZTogJHtyZXEuYm9keS50ZW1wbGF0ZX0uYCk7XG4gICAgLy8gbG9nSW5mbygnU2xvdHM6ICcscmVxLmJvZHkudHJhY2tlci5zbG90cyk7XG4gICAgY29uc29sZS5sb2cocmVxLmJvZHkudHJhY2tlci5sYXRlc3RfbWVzc2FnZS5pbnRlbnQpXG4gICAgbGV0IGRiRGF0YSA9IHtcbiAgICAgICAgZGI6IHJlcS5kYixcbiAgICAgICAgbGFzdEFjdGlvbjogcmVxLmJvZHkudGVtcGxhdGUsXG4gICAgICAgIHVzZXJJZDogcmVxLmJvZHkudHJhY2tlci5zZW5kZXJfaWRcbiAgICB9O1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHNlbmRlcklkOiByZXEuYm9keS50cmFja2VyLnNlbmRlcl9pZCB8fCBkZWZhdWx0VXNlcixcbiAgICAgICAgdGVtcGxhdGU6IHJlcS5ib2R5LnRlbXBsYXRlLFxuICAgICAgICBzbG90czogcmVxLmJvZHkudHJhY2tlci5zbG90c1xuICAgIH07XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB1dHRlcmFuY2UgPSBnZW5lcmF0ZUJvdFJlc3BvbnNlKGRhdGEpO1xuICAgICAgICB1cGRhdGVEYlVzZXJBY3Rpb25zKGRiRGF0YSk7XG5cbiAgICAgICAgcmVzLnNlbmQoe1xuICAgICAgICAgICAgXCJ0ZXh0XCI6IHV0dGVyYW5jZS50ZXh0LFxuICAgICAgICAgICAgXCJidXR0b25zXCI6IFtdLFxuICAgICAgICAgICAgXCJpbWFnZVwiOiB1dHRlcmFuY2UuaW1hZ2UsXG4gICAgICAgICAgICBcImVsZW1lbnRzXCI6IFtdLFxuICAgICAgICAgICAgXCJhdHRhY2htZW50c1wiOiBbXVxuICAgICAgICB9KVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dFcnJvcihlcnIpO1xuICAgICAgICByZXMuc2VuZChlcnIpO1xuICAgIH1cblxufVxuXG5hc3luYyBmdW5jdGlvbiBib3RQZXJmb3JtQWN0aW9uKHJlcSwgcmVzKSB7XG4gICAgbG9nSW5mbyhgR290IHBlcmZvcm0gQWN0aW9uIHJlcXVlc3Q6ICR7cmVxLmJvZHkubmV4dF9hY3Rpb259YCk7XG4gICAgbGV0IGRiRGF0YSA9IHtcbiAgICAgICAgZGI6IHJlcS5kYixcbiAgICAgICAgbGFzdEFjdGlvbjogcmVxLmJvZHkubmV4dF9hY3Rpb24sXG4gICAgICAgIHVzZXJJZDogcmVxLmJvZHkuc2VuZGVyX2lkXG4gICAgfTtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBzZW5kZXJJZDogcmVxLmJvZHkuc2VuZGVyX2lkIHx8IGRlZmF1bHRVc2VyLFxuICAgICAgICBuZXh0QWN0aW9uOiByZXEuYm9keS5uZXh0X2FjdGlvbixcbiAgICAgICAgc2xvdHM6IHJlcS5ib2R5LnRyYWNrZXIuc2xvdHNcbiAgICB9O1xuICAgIGxldCByZXNwb25zZSA9IHt9O1xuXG4gICAgdHJ5IHtcbiAgICAgICAgcmVzcG9uc2UuZXZlbnRzID0gYXdhaXQgcHJvY2Vzc0FjdGlvbkludGVudChkYXRhKTtcbiAgICAgICAgcmVzcG9uc2UucmVzcG9uc2VzID0gW107XG5cbiAgICAgICAgbG9nSW5mbygnRXZlbnRzIHNlbnQgJywgcmVzcG9uc2UuZXZlbnRzKTtcblxuICAgICAgICB1cGRhdGVEYlVzZXJBY3Rpb25zKGRiRGF0YSk7XG4gICAgICAgIHJlcy5zZW5kKHJlc3BvbnNlKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nRXJyb3IoZXJyKTtcbiAgICAgICAgcmVzLnNlbmQoZXJyKTtcbiAgICB9XG59XG5cblxuXG5leHBvcnQge2JvdEdlbmVyYXRlVXR0ZXIsIGJvdFBlcmZvcm1BY3Rpb259XG4iXX0=