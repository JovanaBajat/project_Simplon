const SQL = require('sql-template-strings');
const client = require('../db');
const moment = require('moment');

const getPropositions = async function () {
    const query = SQL`
    SELECT 
        *
    FROM
        proposition_pro
    `
    const queryResults = await client.query(query)

    return queryResults
}
 

const addProposition = async function (proposition) {
    const timestamp = moment();
    // 1 - status accepted, 2 - status refused, 3 - status pending
    const STATUS_PENDING = 3;
    const insertQuery = SQL`
    INSERT INTO proposition_pro (
        usr_id,
        pro_title, 
        pro_description,
        pro_timestamp, 
        pro_status

    ) values (
        ${proposition.usr_id}, 
        ${proposition.title}, 
        ${proposition.description}, 
        ${timestamp}, 
        ${STATUS_PENDING}
    )
    `
    await client.query(insertQuery)

}
const deleteProposition = async function (id) {
    const deleteQuery = SQL`
        DELETE FROM proposition_pro WHERE pro_id = ${id}
    `
    await client.query(deleteQuery)

}


module.exports = { getPropositions, addProposition, deleteProposition }
