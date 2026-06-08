const {sequelize1,sequelize2} = require('../../config/db_connection');
const { QueryTypes } = require('sequelize');
const logApiAvailability = async (API_TYPE,flag) => {
//     const query = `
//     INSERT INTO tbl_api_availability (api_type, api_availability_flag, api_availability_datetime)
//     VALUES (?, ?, NOW())
// `;

// const replacements = [API_TYPE, flag];

// // Log the raw query and the replacements
// console.log('Executing SQL:', query);
// console.log('With replacements:', replacements);
//    return false;
         await sequelize1.query(
        `INSERT INTO tbl_api_availability (api_type, api_availability_flag, api_availability_datetime)
         VALUES (?, ?, NOW())`,
        {
            replacements: [API_TYPE, flag],
            type: QueryTypes.INSERT
        }
    );
};

const logApiAvailabilityFail = async (API_TYPE,flag) => {
    await sequelize1.query(
        `INSERT INTO tbl_api_availability_fail_log (api_type, api_availability_flag, api_availability_datetime)
         VALUES (?, ?, NOW())`,
        {
            replacements: [API_TYPE, flag],
            type: QueryTypes.INSERT
        }
    );
};

const fetchPendingAWSOrder = async () => {
    return await sequelize1.query(
        `SELECT id, api_key, json_format 
         FROM affiliate_whatsapp_lead 
         WHERE bolt_receiving_flag = 0`,
        { type: QueryTypes.SELECT }
    );
};

// const updateLeadStatus = async (leadId, flag, message) => {
//     await sequelize1.query(
//         `UPDATE affiliate_whatsapp_lead
//          SET bolt_receiving_flag = ?, 
//              bolt_receiving_datetime = NOW(),
//              bolt_receiving_message = ?,
//              api_availability_datetime = NOW(),
//              api_availability = 1
//          WHERE id = ?`,
//         {
//             replacements: [flag, message, leadId],
//             type: QueryTypes.UPDATE
//         }
//     );
// };

const updateLeadStatus = async (leadId, flag, message) => {
    const query = `
        UPDATE affiliate_whatsapp_lead
        SET bolt_receiving_flag = '${flag}', 
            bolt_receiving_datetime = NOW(),
            bolt_receiving_message = '${message}',
            api_availability_datetime = NOW(),
            api_availability = 1
        WHERE id = ${leadId};
    `;

    console.log("Executing SQL:", query);

    await sequelize1.query(query, {
        type: QueryTypes.UPDATE
    });
};


module.exports = {
    logApiAvailability,
    logApiAvailabilityFail,
    fetchPendingAWSOrder,
    updateLeadStatus
};
