'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateDbUserActions = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var updateDbUserActions = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dbData) {
        var findQry, updateQry, user;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        findQry = {
                            "userId": dbData.userId
                        };
                        updateQry = {
                            "userId": dbData.userId,
                            "last_action_date": (0, _general.getTimeStamp)(),
                            "last_action": dbData.lastAction
                        };
                        _context.prev = 2;
                        _context.next = 5;
                        return db.users.findOne(findQry);

                    case 5:
                        user = _context.sent;

                        if (!user) {
                            _context.next = 11;
                            break;
                        }

                        _context.next = 9;
                        return db.users.update(findQry, updateQry);

                    case 9:
                        _context.next = 13;
                        break;

                    case 11:
                        _context.next = 13;
                        return db.users.insert(updateQry);

                    case 13:
                        (0, _logger.logInfo)('User dbData successfully updated');

                        _context.next = 20;
                        break;

                    case 16:
                        _context.prev = 16;
                        _context.t0 = _context['catch'](2);

                        (0, _logger.logError)(_context.t0);
                        throw _context.t0;

                    case 20:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[2, 16]]);
    }));

    return function updateDbUserActions(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _index = require('../config/index');

var _index2 = _interopRequireDefault(_index);

var _logger = require('../utils/logger');

var _general = require('./general');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = _index2.default.db;

exports.updateDbUserActions = updateDbUserActions;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2RhdGFiYXNlLXF1ZXJpZXMuanMiXSwibmFtZXMiOlsiZGJEYXRhIiwiZmluZFFyeSIsInVzZXJJZCIsInVwZGF0ZVFyeSIsImxhc3RBY3Rpb24iLCJkYiIsInVzZXJzIiwiZmluZE9uZSIsInVzZXIiLCJ1cGRhdGUiLCJpbnNlcnQiLCJ1cGRhdGVEYlVzZXJBY3Rpb25zIiwiY29uZmlnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O3dGQU1BLGlCQUFtQ0EsTUFBbkM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1FDLCtCQURSLEdBQ2tCO0FBQ1Ysc0NBQVVELE9BQU9FO0FBRFAseUJBRGxCO0FBSVFDLGlDQUpSLEdBSW9CO0FBQ1osc0NBQVVILE9BQU9FLE1BREw7QUFFWixnREFBb0IsNEJBRlI7QUFHWiwyQ0FBZUYsT0FBT0k7QUFIVix5QkFKcEI7QUFBQTtBQUFBO0FBQUEsK0JBVzJCQyxHQUFHQyxLQUFILENBQVNDLE9BQVQsQ0FBaUJOLE9BQWpCLENBWDNCOztBQUFBO0FBV2NPLDRCQVhkOztBQUFBLDZCQWFZQSxJQWJaO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsK0JBY2tCSCxHQUFHQyxLQUFILENBQVNHLE1BQVQsQ0FBZ0JSLE9BQWhCLEVBQXlCRSxTQUF6QixDQWRsQjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLCtCQWdCa0JFLEdBQUdDLEtBQUgsQ0FBU0ksTUFBVCxDQUFnQlAsU0FBaEIsQ0FoQmxCOztBQUFBO0FBa0JRLDZDQUFRLGtDQUFSOztBQWxCUjtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFxQlE7QUFyQlI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSzs7b0JBQWVRLG1COzs7OztBQU5mOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFJTixLQUFLTyxnQkFBT1AsRUFBaEI7O1FBMkJRTSxtQixHQUFBQSxtQiIsImZpbGUiOiJkYXRhYmFzZS1xdWVyaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcvaW5kZXgnO1xuaW1wb3J0IHtsb2dFcnJvciwgbG9nSW5mb30gZnJvbSBcIi4uL3V0aWxzL2xvZ2dlclwiO1xuaW1wb3J0IHtnZXRUaW1lU3RhbXB9IGZyb20gICcuL2dlbmVyYWwnO1xuXG5sZXQgZGIgPSBjb25maWcuZGI7XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZURiVXNlckFjdGlvbnMoZGJEYXRhKSB7XG4gICAgbGV0IGZpbmRRcnkgPSB7XG4gICAgICAgIFwidXNlcklkXCI6IGRiRGF0YS51c2VySWRcbiAgICB9O1xuICAgIGxldCB1cGRhdGVRcnkgPSB7XG4gICAgICAgIFwidXNlcklkXCI6IGRiRGF0YS51c2VySWQsXG4gICAgICAgIFwibGFzdF9hY3Rpb25fZGF0ZVwiOiBnZXRUaW1lU3RhbXAoKSxcbiAgICAgICAgXCJsYXN0X2FjdGlvblwiOiBkYkRhdGEubGFzdEFjdGlvblxuICAgIH07XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgZGIudXNlcnMuZmluZE9uZShmaW5kUXJ5KTtcblxuICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgYXdhaXQgZGIudXNlcnMudXBkYXRlKGZpbmRRcnksIHVwZGF0ZVFyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCBkYi51c2Vycy5pbnNlcnQodXBkYXRlUXJ5KTtcbiAgICAgICAgfVxuICAgICAgICBsb2dJbmZvKCdVc2VyIGRiRGF0YSBzdWNjZXNzZnVsbHkgdXBkYXRlZCcpO1xuXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ0Vycm9yKGVycik7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG59XG5leHBvcnQge3VwZGF0ZURiVXNlckFjdGlvbnN9XG4iXX0=