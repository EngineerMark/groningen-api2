const { query } = require('./helpers/db');
const { GetUsers, GetUser } = require('./helpers/osu');
const User = require('./helpers/user');
const users = require('./users.json');

const UPDATE_RATE = 60 * 5; // seconds

function RunLoop(){
    setTimeout(Loop, UPDATE_RATE * 1000);
    Loop();
}
module.exports = RunLoop;

async function Loop(){
    try{
        await UpdateUsers();
    }catch(e){
        console.log(e);
    }
}

async function UpdateUsers(){
    //clone users
    const users_clone = JSON.parse(JSON.stringify(users));

    //split into chunks of 50, only contains user ids
    const osu_users = [];
    while(users_clone.length > 0){
        const _user = users_clone.pop();
        console.log(`[UserUpdater] Updating user ${_user.id}`);
        const osu_user = await GetUser(_user.id, 'osu', 'id');
        const user_obj = new User(osu_user, _user.groninger);
        osu_users.push(user_obj);
    }


    //the sql columns match exactly that of the user object
    //insert or update all users
    const columns = Object.keys(osu_users[0]);
    const insert_values = osu_users.map(Object.values).map(user=>"('"+user.join("','")+"')").join(',');
    const update_values = columns.map(col=>`${col}=VALUES(${col})`).join(',');
    const query_str = `
        INSERT INTO groningen_users (${columns.join(',')})
        VALUES ${insert_values}
        ON DUPLICATE KEY UPDATE
        ${update_values}
    `;

    await query(query_str);
}