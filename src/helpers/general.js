function getMilisecondsFromminutes(min) {
    return Number(min)* 60000;
}

function getDateISOString(time, duration) {
    return new Date(new Date(time).getTime() + duration).toISOString();
}

export {getMilisecondsFromminutes, getDateISOString}
