import config from '../config/index';
import {logError, logInfo} from "../utils/logger";
import {getTimeStamp} from  './general';



async function updateDbUserActions(dbData) {
    let db = config.db;
    let findQry = {
        "userId": dbData.userId
    };
    let updateQry = {
        "userId": dbData.userId,
        "last_action_date": getTimeStamp(),
        "last_action": dbData.lastAction
    };

    try {
        const user = await db.users.findOne(findQry);

        if (user) {
            await db.users.update(findQry, updateQry);
        } else {
            await db.users.insert(updateQry);
        }
        logInfo('User dbData successfully updated');

    } catch (err) {
        logError(err);
        throw err;
    }
}
export {updateDbUserActions}
