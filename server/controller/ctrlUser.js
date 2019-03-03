const SQL = require('sql-template-strings');
const client = require('../db');
const Moment = require('moment');
const bcrypt = require('bcrypt');

const getUserFromEmail = async function (email) {
    const query = SQL`
    SELECT 
        *
    FROM
        user_usr
    WHERE 
    user_usr.usr_email = ${email}
    `
    const queryResults = await client.query(query)
    if (queryResults.rows.length) {
        return queryResults.rows[0];
    }
    return null;
}
const encryptPassword = function (password) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const generatePassword = () => {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    console.log('retVal ----', retVal);
    return retVal;
}

const insertNewUser = async function (newUser) {

    const query = SQL`
    INSERT INTO user_usr (
        usr_firstname,
        usr_lastname,
        usr_email,
        usr_job,
        usr_password,
        usr_is_admin,
        usr_photo,
        usr_infos
    ) VALUES (
        ${newUser.firstname},
        ${newUser.lastname},
        ${newUser.email},
        ${newUser.job},
        ${newUser.encryptedPassword},
        ${newUser.isAdmin},
        ${newUser.photo},
        ${newUser.infos}
        )
        `
        const queryResults = await client.query(query)
        
        return queryResults
}

const verifyUser = async function (credentials) {
    const query = SQL`
    SELECT 
        *
    FROM
        user_usr
    WHERE 
        usr_email = ${credentials.email}
    `
    const queryResults = await client.query(query)
    const retrievedUser = queryResults.rows[0];

    if (!retrievedUser) {
        throw new Error('Credentials incorrect');
    }
    // comparing retrieved user password with credentials one
    const pwdIsMatching = bcrypt.compareSync(credentials.password, retrievedUser.usr_password); 

    if (pwdIsMatching) {
        return true
    } else {
        return false
    }
}

const getUsers = async function () {
    const query = SQL`
    SELECT 
        *
    FROM
        user_usr
    `
    const queryResults = await client.query(query)

    return queryResults
}

const editUser = async function (id, userInfos) {
    const query = SQL`
    UPDATE 
        user_usr
    SET
        usr_firstname = ${userInfos.firstname},
        usr_lastname = ${userInfos.lastname},
        usr_job = ${userInfos.job},
        usr_email = ${userInfos.email},
        usr_photo = ${userInfos.photo},
        usr_infos = ${userInfos.infos}
    WHERE 
        usr_id = ${id}
        RETURNING *
    `
    const queryResults = await client.query(query)
        
    return queryResults

}

const getUserById = async function (id) {
    const query = SQL`
    SELECT 
        *
    FROM
        user_usr
    WHERE 
        usr_id = ${id}
    `
    const queryResults = await client.query(query)

    return queryResults.rows[0]
}

const deleteUser= async function (id) {
    const deleteQuery = SQL`
        DELETE FROM user_usr WHERE usr_id = ${id}
    `
    await client.query(deleteQuery)

}

module.exports = { getUserFromEmail, encryptPassword, insertNewUser, verifyUser, editUser, getUsers, getUserById, generatePassword, deleteUser }
