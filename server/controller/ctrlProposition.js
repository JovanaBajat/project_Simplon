const SQL = require('sql-template-strings');
const client = require('../db');
const moment = require('moment');

const getPropositions = async function (userId) {
    const query = SQL`
    WITH pro_likes AS (
        SELECT
            vot.*
        FROM
            proposition_pro as pro
            INNER JOIN vote_vot vot ON vot.pro_id = pro.pro_id
    )
    SELECT 
        pro.*,
        usr.*,
        JSON_AGG(pl.*) AS votes
    FROM
        proposition_pro as pro
        INNER JOIN user_usr as usr ON pro.usr_id = usr.usr_id
        LEFT OUTER JOIN pro_likes pl ON pl.pro_id = pro.pro_id
    GROUP BY 
        pro.pro_id,
        usr.usr_id
    `
    const queryResults = await client.query(query)

    const formattedPropositions = queryResults.rows.map(proposition => {
        const didUserVoteForThisProposition = proposition.votes.findIndex(vote =>{ 
            if (vote === null) {
                return false
            }
            return vote.usr_id === userId
        }) !== -1

        if (!didUserVoteForThisProposition) {
            return {...proposition, likes: 0, dislikes: 0, votes: []}
        }
        
        let likes = 0
        let dislikes = 0
        proposition.votes.forEach(vote => {
            if (vote === null) {
                return
            }
            // Si vot_value === true alors c'est un like sinon dislike
            vote.vot_value === true ? likes++ : dislikes++
        })
        return { ...proposition, likes, dislikes }
    })
    
    return formattedPropositions
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

const editProp = async function (id, propInfos) {
    const query = SQL`
    UPDATE 
        proposition_pro
    SET
        pro_title = ${propInfos.title},
        pro_description = ${propInfos.description}
    WHERE 
        pro_id = ${id}
        RETURNING *
    `
    const queryResults = await client.query(query)
        
    return queryResults

}
const deleteProposition = async function (id) {
    const deleteQuery = SQL`
        DELETE FROM proposition_pro WHERE pro_id = ${id}
    `
    await client.query(deleteQuery)

}

const editPropStatus = async function (id, propInfos) {
    const query = SQL`
    UPDATE 
        proposition_pro
    SET
        pro_status = ${propInfos.status}
    WHERE 
        pro_id = ${id}
        RETURNING *
    `
    const queryResults = await client.query(query)
        
    return queryResults

}


module.exports = { getPropositions, addProposition, deleteProposition, editProp, editPropStatus }
