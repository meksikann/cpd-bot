"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTimeStamp = exports.getTime = exports.getDate = exports.getTimeRangeFreeSlots = exports.aggregateCalendarIds = exports.getCalendarId = exports.getDateWithDurationISOString = exports.getQueriedValidTime = undefined;

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _logger = require("../utils/logger");

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calendarsIds = process.env.NODE_ENV == 'production' ? _config2.default.productionCalendarIds : _config2.default.developmentCalendarIds;

function getDateWithDurationISOString(time, duration, unit, isAdd) {
    if (isAdd) {
        return (0, _moment2.default)(time).add(duration, unit).format();
    }

    return (0, _moment2.default)(time).subtract(duration, unit).format();
}

//choose which calendar ID user wants to use.
function getCalendarId(roomName) {
    (0, _logger.logInfo)('process.env.NODE_ENV ', process.env.NODE_ENV);
    (0, _logger.logInfo)('Choose calendar id.Room name: ', roomName);
    var id = void 0;

    switch (roomName) {
        case 'first conference room':
            id = calendarsIds.first_conference_room;
            break;
        case 'second conference room':
            id = calendarsIds.second_conference_room;
            break;
    }

    return id;
}

function aggregateCalendarIds(roomName) {
    var items = [];

    //if room name defined find aggregate data for specified room, else aggregate data for all existing rooms;
    if (roomName) {
        var id = getCalendarId(roomName);
        if (id) {
            items.push({
                "id": id,
                "name": roomName
            });
        }

        return items;
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.entries(calendarsIds)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
                key = _step$value[0],
                value = _step$value[1];

            (0, _logger.logInfo)("generated freebusy* data for " + key + " calendar ");
            items.push({
                "id": value,
                "name": key
            });
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return items;
}

//note: config.minDurationAvailableMin is minimum acceptable time range
function getTimeRangeFreeSlots(start, end, events) {
    var freeSlots = [];
    var startTime = start;
    var endTime = end;

    events.forEach(function (event) {
        var diffMin = (0, _moment2.default)(event.start.dateTime).diff(startTime, 'minutes');

        if (diffMin >= _config2.default.minDurationAvailableMin) {
            freeSlots.push({
                start: startTime,
                end: event.start.dateTime
            });
        }

        startTime = event.end.dateTime;
    });

    //find last free time range
    var lastDiffMin = (0, _moment2.default)(endTime).diff(startTime, 'minutes');

    if (lastDiffMin >= _config2.default.minDurationAvailableMin) {
        freeSlots.push({
            start: startTime,
            end: endTime
        });
    }

    return freeSlots;
}

function getDate(string) {
    if (string) {
        return (0, _moment2.default)(string).format('DD-MM-YYYY');
    }
    return (0, _moment2.default)().format('DD-MM-YYYY');
}

function getTime(string) {
    if (string) {
        return (0, _moment2.default)(string).format('HH:mm');
    }
    return (0, _moment2.default)().format('HH:mm');
}

function getTimeStamp() {
    return _moment2.default.utc().format('YYYY-MM-DD HH:mm:ss');
}

// if asked time passed allready  = set time now.
function getQueriedValidTime(time) {
    if (time && (0, _moment2.default)(time) > (0, _moment2.default)()) {
        console.log('======================>>>>>bigger');
        return time;
    }

    (0, _logger.logInfo)('Passed time requested');
    return new Date().toISOString();
}

exports.getQueriedValidTime = getQueriedValidTime;
exports.getDateWithDurationISOString = getDateWithDurationISOString;
exports.getCalendarId = getCalendarId;
exports.aggregateCalendarIds = aggregateCalendarIds;
exports.getTimeRangeFreeSlots = getTimeRangeFreeSlots;
exports.getDate = getDate;
exports.getTime = getTime;
exports.getTimeStamp = getTimeStamp;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2dlbmVyYWwuanMiXSwibmFtZXMiOlsiY2FsZW5kYXJzSWRzIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiY29uZmlnIiwicHJvZHVjdGlvbkNhbGVuZGFySWRzIiwiZGV2ZWxvcG1lbnRDYWxlbmRhcklkcyIsImdldERhdGVXaXRoRHVyYXRpb25JU09TdHJpbmciLCJ0aW1lIiwiZHVyYXRpb24iLCJ1bml0IiwiaXNBZGQiLCJhZGQiLCJmb3JtYXQiLCJzdWJ0cmFjdCIsImdldENhbGVuZGFySWQiLCJyb29tTmFtZSIsImlkIiwiZmlyc3RfY29uZmVyZW5jZV9yb29tIiwic2Vjb25kX2NvbmZlcmVuY2Vfcm9vbSIsImFnZ3JlZ2F0ZUNhbGVuZGFySWRzIiwiaXRlbXMiLCJwdXNoIiwiT2JqZWN0IiwiZW50cmllcyIsImtleSIsInZhbHVlIiwiZ2V0VGltZVJhbmdlRnJlZVNsb3RzIiwic3RhcnQiLCJlbmQiLCJldmVudHMiLCJmcmVlU2xvdHMiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiZm9yRWFjaCIsImV2ZW50IiwiZGlmZk1pbiIsImRhdGVUaW1lIiwiZGlmZiIsIm1pbkR1cmF0aW9uQXZhaWxhYmxlTWluIiwibGFzdERpZmZNaW4iLCJnZXREYXRlIiwic3RyaW5nIiwiZ2V0VGltZSIsImdldFRpbWVTdGFtcCIsIm1vbWVudCIsInV0YyIsImdldFF1ZXJpZWRWYWxpZFRpbWUiLCJjb25zb2xlIiwibG9nIiwiRGF0ZSIsInRvSVNPU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUdBLElBQUlBLGVBQWVDLFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixJQUF3QixZQUF4QixHQUF1Q0MsaUJBQU9DLHFCQUE5QyxHQUNmRCxpQkFBT0Usc0JBRFg7O0FBR0EsU0FBU0MsNEJBQVQsQ0FBc0NDLElBQXRDLEVBQTRDQyxRQUE1QyxFQUFzREMsSUFBdEQsRUFBNERDLEtBQTVE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Q0FBUDtBQUNIOztBQUVELFNBQVM4QixPQUFULENBQWlCRCxNQUFqQixFQUF5QjtBQUNyQixRQUFJQSxNQUFKLEVBQVk7QUFDUixlQUFPLHNCQUFPQSxNQUFQLEVBQWU3QixNQUFmLENBQXNCLE9BQXRCLENBQVA7QUFDSDtBQUNELFdBQU8sd0JBQVNBLE1BQVQsQ0FBZ0IsT0FBaEIsQ0FBUDtBQUNIOztBQUVELFNBQVMrQixZQUFULEdBQXdCO0FBQ3BCLFdBQU9DLGlCQUFPQyxHQUFQLEdBQWFqQyxNQUFiLENBQW9CLHFCQUFwQixDQUFQO0FBQ0g7O0FBRUQ7QUFDQSxTQUFTa0MsbUJBQVQsQ0FBNkJ2QyxJQUE3QixFQUFtQztBQUMvQixRQUFHQSxRQUFTLHNCQUFPQSxJQUFQLElBQWUsdUJBQTNCLEVBQXNDO0FBQ2xDd0MsZ0JBQVFDLEdBQVIsQ0FBWSxtQ0FBWjtBQUNBLGVBQU96QyxJQUFQO0FBQ0g7O0FBRUQseUJBQVEsdUJBQVI7QUFDQSxXQUFPLElBQUkwQyxJQUFKLEdBQVdDLFdBQVgsRUFBUDtBQUVIOztRQUVPSixtQixHQUFBQSxtQjtRQUFxQnhDLDRCLEdBQUFBLDRCO1FBQThCUSxhLEdBQUFBLGE7UUFBZUssb0IsR0FBQUEsb0I7UUFBc0JPLHFCLEdBQUFBLHFCO1FBQXVCYyxPLEdBQUFBLE87UUFBU0UsTyxHQUFBQSxPO1FBQVNDLFksR0FBQUEsWSIsImZpbGUiOiJnZW5lcmFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtsb2dJbmZvfSBmcm9tIFwiLi4vdXRpbHMvbG9nZ2VyXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi9jb25maWdcIjtcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuXG5sZXQgY2FsZW5kYXJzSWRzID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT0gJ3Byb2R1Y3Rpb24nID8gY29uZmlnLnByb2R1Y3Rpb25DYWxlbmRhcklkcyA6XG4gICAgY29uZmlnLmRldmVsb3BtZW50Q2FsZW5kYXJJZHM7XG5cbmZ1bmN0aW9uIGdldERhdGVXaXRoRHVyYXRpb25JU09TdHJpbmcodGltZSwgZHVyYXRpb24sIHVuaXQsIGlzQWRkKSB7XG4gICAgaWYgKGlzQWRkKSB7XG4gICAgICAgIHJldHVybiBtb21lbnQodGltZSkuYWRkKGR1cmF0aW9uLCB1bml0KS5mb3JtYXQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbW9tZW50KHRpbWUpLnN1YnRyYWN0KGR1cmF0aW9uLCB1bml0KS5mb3JtYXQoKTtcbn1cblxuLy9jaG9vc2Ugd2hpY2ggY2FsZW5kYXIgSUQgdXNlciB3YW50cyB0byB1c2UuXG5mdW5jdGlvbiBnZXRDYWxlbmRhcklkKHJvb21OYW1lKSB7XG4gICAgbG9nSW5mbygncHJvY2Vzcy5lbnYuTk9ERV9FTlYgJywgcHJvY2Vzcy5lbnYuTk9ERV9FTlYpO1xuICAgIGxvZ0luZm8oJ0Nob29zZSBjYWxlbmRhciBpZC5Sb29tIG5hbWU6ICcsIHJvb21OYW1lKTtcbiAgICBsZXQgaWQ7XG5cbiAgICBzd2l0Y2ggKHJvb21OYW1lKSB7XG4gICAgICAgIGNhc2UgJ2ZpcnN0IGNvbmZlcmVuY2Ugcm9vbSc6XG4gICAgICAgICAgICBpZCA9IGNhbGVuZGFyc0lkcy5maXJzdF9jb25mZXJlbmNlX3Jvb207XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc2Vjb25kIGNvbmZlcmVuY2Ugcm9vbSc6XG4gICAgICAgICAgICBpZCA9IGNhbGVuZGFyc0lkcy5zZWNvbmRfY29uZmVyZW5jZV9yb29tO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlkO1xufVxuXG5mdW5jdGlvbiBhZ2dyZWdhdGVDYWxlbmRhcklkcyhyb29tTmFtZSkge1xuICAgIGxldCBpdGVtcyA9IFtdO1xuXG4gICAgLy9pZiByb29tIG5hbWUgZGVmaW5lZCBmaW5kIGFnZ3JlZ2F0ZSBkYXRhIGZvciBzcGVjaWZpZWQgcm9vbSwgZWxzZSBhZ2dyZWdhdGUgZGF0YSBmb3IgYWxsIGV4aXN0aW5nIHJvb21zO1xuICAgIGlmIChyb29tTmFtZSkge1xuICAgICAgICBjb25zdCBpZCA9IGdldENhbGVuZGFySWQocm9vbU5hbWUpO1xuICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIFwiaWRcIjogaWQsXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IHJvb21OYW1lXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGNhbGVuZGFyc0lkcykpIHtcbiAgICAgICAgbG9nSW5mbyhgZ2VuZXJhdGVkIGZyZWVidXN5KiBkYXRhIGZvciAke2tleX0gY2FsZW5kYXIgYCk7XG4gICAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgXCJpZFwiOiB2YWx1ZSxcbiAgICAgICAgICAgIFwibmFtZVwiOiBrZXlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlbXM7XG59XG5cbi8vbm90ZTogY29uZmlnLm1pbkR1cmF0aW9uQXZhaWxhYmxlTWluIGlzIG1pbmltdW0gYWNjZXB0YWJsZSB0aW1lIHJhbmdlXG5mdW5jdGlvbiBnZXRUaW1lUmFuZ2VGcmVlU2xvdHMoc3RhcnQsIGVuZCwgZXZlbnRzKSB7XG4gICAgbGV0IGZyZWVTbG90cyA9IFtdO1xuICAgIGxldCBzdGFydFRpbWUgPSBzdGFydDtcbiAgICBsZXQgZW5kVGltZSA9IGVuZDtcblxuICAgIGV2ZW50cy5mb3JFYWNoKChldmVudCkgPT4ge1xuICAgICAgICBsZXQgZGlmZk1pbiA9IG1vbWVudChldmVudC5zdGFydC5kYXRlVGltZSkuZGlmZihzdGFydFRpbWUsICdtaW51dGVzJyk7XG5cbiAgICAgICAgaWYgKGRpZmZNaW4gPj0gY29uZmlnLm1pbkR1cmF0aW9uQXZhaWxhYmxlTWluKSB7XG4gICAgICAgICAgICBmcmVlU2xvdHMucHVzaChcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBzdGFydFRpbWUsXG4gICAgICAgICAgICAgICAgICAgIGVuZDogZXZlbnQuc3RhcnQuZGF0ZVRpbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICBzdGFydFRpbWUgPSBldmVudC5lbmQuZGF0ZVRpbWU7XG4gICAgfSk7XG5cbiAgICAvL2ZpbmQgbGFzdCBmcmVlIHRpbWUgcmFuZ2VcbiAgICBsZXQgbGFzdERpZmZNaW4gPSBtb21lbnQoZW5kVGltZSkuZGlmZihzdGFydFRpbWUsICdtaW51dGVzJyk7XG5cbiAgICBpZiAobGFzdERpZmZNaW4gPj0gY29uZmlnLm1pbkR1cmF0aW9uQXZhaWxhYmxlTWluKSB7XG4gICAgICAgIGZyZWVTbG90cy5wdXNoKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBzdGFydFRpbWUsXG4gICAgICAgICAgICAgICAgZW5kOiBlbmRUaW1lXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG5cbiAgICByZXR1cm4gZnJlZVNsb3RzO1xufVxuXG5mdW5jdGlvbiBnZXREYXRlKHN0cmluZykge1xuICAgIGlmIChzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG1vbWVudChzdHJpbmcpLmZvcm1hdCgnREQtTU0tWVlZWScpO1xuICAgIH1cbiAgICByZXR1cm4gbW9tZW50KCkuZm9ybWF0KCdERC1NTS1ZWVlZJyk7XG59XG5cbmZ1bmN0aW9uIGdldFRpbWUoc3RyaW5nKSB7XG4gICAgaWYgKHN0cmluZykge1xuICAgICAgICByZXR1cm4gbW9tZW50KHN0cmluZykuZm9ybWF0KCdISDptbScpO1xuICAgIH1cbiAgICByZXR1cm4gbW9tZW50KCkuZm9ybWF0KCdISDptbScpO1xufVxuXG5mdW5jdGlvbiBnZXRUaW1lU3RhbXAoKSB7XG4gICAgcmV0dXJuIG1vbWVudC51dGMoKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcbn1cblxuLy8gaWYgYXNrZWQgdGltZSBwYXNzZWQgYWxscmVhZHkgID0gc2V0IHRpbWUgbm93LlxuZnVuY3Rpb24gZ2V0UXVlcmllZFZhbGlkVGltZSh0aW1lKSB7XG4gICAgaWYodGltZSAmJiAobW9tZW50KHRpbWUpID4gbW9tZW50KCkpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCc9PT09PT09PT09PT09PT09PT09PT09Pj4+Pj5iaWdnZXInKTtcbiAgICAgICAgcmV0dXJuIHRpbWU7XG4gICAgfVxuXG4gICAgbG9nSW5mbygnUGFzc2VkIHRpbWUgcmVxdWVzdGVkJyk7XG4gICAgcmV0dXJuIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcblxufVxuXG5leHBvcnQge2dldFF1ZXJpZWRWYWxpZFRpbWUsIGdldERhdGVXaXRoRHVyYXRpb25JU09TdHJpbmcsIGdldENhbGVuZGFySWQsIGFnZ3JlZ2F0ZUNhbGVuZGFySWRzLCBnZXRUaW1lUmFuZ2VGcmVlU2xvdHMsIGdldERhdGUsIGdldFRpbWUsIGdldFRpbWVTdGFtcCB9XG4iXX0=