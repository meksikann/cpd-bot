
function logInfo(data) {
    if(process.env.LOGS) {
        console.log(`LOG INFO: ${data} =====>,Date: ${new Date()}`);
    }
}

export {logInfo}
