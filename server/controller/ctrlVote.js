const SQL = require('sql-template-strings');
const client = require('../db');

const insertLike = async function (like) {
    const query = SQL`
    INSERT INTO vote_vot (usr_id, vot_value, pro_id)
    VALUES (${like.usr_id}, ${like.vot_value}, ${like.pro_id}) 
    RETURNING *
    `
    const queryResults = await client.query(query)
    return queryResults.rows[0];
}

const getLikes = async function (userId) {
    const query = SQL`
    SELECT 
        *
    FROM
        vote_vot as vot 
        INNER JOIN proposition_pro as pro ON pro.pro_id = vot.pro_id
    `
    const queryResults = await client.query(query)

    return queryResults
}

module.exports = { insertLike, getLikes }
