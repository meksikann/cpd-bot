
function logInfo(data, ...rest) {
    if(process.env.LOGS == 1) {
        typeof data == 'object' ?
            console.log('LOG INFO: \n',data,`\n  ================>,Date: ${new Date()}`)
            : console.log(`LOG INFO: \n${data} \n  ${rest.length ? JSON.stringify(rest) : ''}  \n================>,Date: ${new Date()}`);
    }
}

export {logInfo}
