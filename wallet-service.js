const dbService = require('./db');
var ObjectID = require('mongodb').ObjectID

async function add(body) {
    let { name, amount, collection } = body;
    let payload = {
        name,
        amount
    }
    let response = await dbService.execute(dbService.save, collection, payload);
    if(!response) {
        return {
            success: false,
            response: null,
            message: 'Failed to add wallet'
        }
    }
    return {
        success: true,
        response,
        message: 'Successfully added wallet'
    }
}

async function addTransaction(body) {
    let { id, amount, description, collection } = body;
    let objId = new ObjectID(id);
    payload = {
        _id: objId
    }
    let dbResponse = await dbService.execute(dbService.get, collection, payload);
    if(!dbResponse || !dbResponse.length) {
        return {
            success: false,
            response: null,
            message: 'Failed to fetch wallet'
        }
    }
    let wallet = dbResponse[0];
    if(amount + wallet.amount < 0) {
        return {
            success: false,
            response: null,
            message: 'Insufficient balance'
        }
    }
    let updatedFields = {
        amount: amount + wallet.amount
    }
    let findArg = payload;
    let updateResponse = await dbService.execute(dbService.update, collection, { findArg, updatedFields });
    if(!updateResponse) {
        return {
            success: false,
            response: null,
            message: 'Failed to update wallet'
        }
    }
    let transactionPayload = {
        amount: Math.abs(amount),
        crDr: amount < 0 ? 'dr' : 'cr',
        description,
        transationTime: new Date().toISOString()
    }
    let transactionResponse = await dbService.execute(dbService.save, 'walletTransaction', transactionPayload);
    if(!transactionResponse) {
        //log
    }
    return {
        success: true,
        response: updateResponse,
        message: amount < 0 ? 'Debited Successfully' : 'Credited Successfully'
    }
}

module.exports = {
    add,
    addTransaction
}