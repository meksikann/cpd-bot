const axios = require('axios');
var request = require('request');
const appendSlotUrl = 'http://localhost:5002/conversations/default/tracker/events';
''
// curl -XPOST http://localhost:5005/conversations/default/tracker/events -d \
//     '[{"event": "slot", "name": "cuisine", "value": "mexican"},{"event": "action", "name": "action_listen"}]' | python -mjson.tool

async function appendNewSlots(slots) {
    // console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',slots[0])
    // // var jsonDataObj = {'mes': 'hey dude', 'yo': ['im here', 'and here']};
    // return request.post({
    //     url: appendSlotUrl,
    //     data: slots[0],
    //     json: true
    // })

    const res = await axios.post(appendSlotUrl,{"body":slots[0]});

    return res.data;
}

export {appendNewSlots}
