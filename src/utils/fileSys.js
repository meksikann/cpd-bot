const fs = require('fs');
function readFileSync(path) {
    return new Promise((res, rej) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                rej(err)
            } else {
                res(data)
            }
        })
    })
}

export {readFileSync}
