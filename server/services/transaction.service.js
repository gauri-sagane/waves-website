const { Transaction } = require('../models/transaction');
const { User } = require('../models/user');
var fetch = require('node-fetch');
require('dotenv').config();
let clientId = process.env.PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const addTransaction = async(req) => {
    try{        
        const accessToken = await generateAccessToken();

        const res = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${req.body.orderID}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        
        const order = await handleResponse(res);
        
        const transaction = new Transaction({
            userID: req.user._id,
            userEmail: req.user.email,
            orderId: req.body.orderID,
            orderData: order,
        });
        await transaction.save();

        const user = await User.findOneAndUpdate(
            {_id:req.user._id},
            {
                "$push": {
                    history: [
                        {
                            transactionId: transaction._id,
                            date: transaction.date,
                            orderID: req.body.orderID,
                            amount: transaction.orderData[0].purchase_units[0].amount.value,
                            items:  transaction.orderData[0].purchase_units[0].items
                        }
                    ]
                }
            },
            { new : true }
        )
        
        return user;
        
    }catch(error){
        throw error;
    }
}

async function generateAccessToken() {
    const base = "https://api-m.sandbox.paypal.com";
    const auth = Buffer.from(clientId + ":" + clientSecret).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "post",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    const jsonData = await handleResponse(response);
    return jsonData.access_token;
  }
  
  
  async function handleResponse(response) {
    if (response.status === 200 || response.status === 201) {
      return response.json();
    }
  
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

module.exports = {
    addTransaction
}