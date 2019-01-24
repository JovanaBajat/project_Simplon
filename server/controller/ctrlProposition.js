const SQL = require('sql-template-strings');
const client = require('../db');
const Moment = require('moment');

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
    // 1 - status accepted, 2 - status refused, 3 - status pending
    const STATUS_PENDING = 3;
    const insertQuery = SQL`
    INSERT INTO proposition_pro (
        pro_title, 
        pro_description,
        usr_id,
        pro_timestamp, 
        pro_status

    ) values (
        ${proposition.title}, 
        ${proposition.description}, 
        ${proposition.author}, 
        ${Moment.now()}, 
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
