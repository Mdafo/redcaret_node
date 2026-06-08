const axios = require('axios');
const{PUSH_URL,PUSH_TYPE}=require('../../config/common_config');
// const API_URL = 'http://192.168.1.25/bolt_master_api/affiliate/affiliate_api.php';
// const API_TYPE = 'affiliate_api.php?action=add_affiliate_lead';

const checkApiAvailability = async () => {
    try {
      // console.log(PUSH_TYPE,'PUSH_URL');
      // return false;
        const response = await axios.get(PUSH_URL, { timeout: 5000 });
        return response.status >= 200 && response.status < 300;
    } catch {
        return false;
    }
};

const postAWSOrders = async (apiKey, jsonPayload) => {
    try {
        const response = await axios.post(`${PUSH_URL}?action=add_affiliate_lead`, jsonPayload, {
            headers: {
                'Api-Key': apiKey
            },
            timeout: 10000
        });
        return response.data;
    } catch (err) {
        console.error("Error sending lead:", err.message);
        return null;
    }
};

module.exports = {
    checkApiAvailability,
    postAWSOrders,
    PUSH_TYPE
};

