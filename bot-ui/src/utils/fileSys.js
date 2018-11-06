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

function writeFileSync(path, data) {
    return new Promise((resolve, reject)=>{
        fs.writeFile(path, data, (err) => {
            if (err) {
                reject(err)
            };
            console.log('Token stored to ', path);
            resolve(data);
        });
    });
}

export {readFileSync, writeFileSync}
