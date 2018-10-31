import config from '../config/index';
import {logError, logInfo} from "../utils/logger";
import {generalHelper} from  './general';



async function updateDbUserActions(dbData) {
    let db = config.db;
    let findQry = {
        "userId": dbData.userId
    };
    let updateQry = {
        "userId": dbData.userId,
        "last_action_date": generalHelper.getTimeStamp(),
        "last_action": dbData.lastAction
    };

    try {
        const user = await db.users.findOne(findQry);

        if (user) {
            await db.users.update(findQry, {$set: updateQry});
        } else {
            await db.users.insert(updateQry);
        }
        logInfo('User dbData successfully updated');

    } catch (err) {
        logError(err);
        throw err;
    }
}

async function getUserPermissions(userId) {
    let db = config.db;
    let findQry = {
        "userId": userId
    };
    let project = {
        "userId": 1,
        "feature_permissions": 1
    };

    try {
        const user = await db.users.findOne(findQry, project);

        return user;
    } catch (err) {
        logError(err);
        throw err;
    }
}
export {updateDbUserActions, getUserPermissions}
