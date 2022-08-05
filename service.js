const dbService = require('./db');

function check() {
    let response = {
        success: true,
        message: 'Success',
        response: null
    } 
    return response;
}

async function add(body) {
    let payload = body.payload;
    let collection = body.collection;
    let response = await dbService.execute(dbService.save, collection, payload);
    return {
        success: true,
        response,
        message: 'added successfully'
    }
}

async function get(collection, index, value) {
    let arg = {};
    //value = parseInt(value) !== NaN ? parseInt(value) : value;
    arg[index] = value
    let response = await dbService.execute(dbService.get, collection, arg);
    return {
        success: true,
        response,
        message: 'fetched successfully'
    }
}

async function update(body) {
    let { findArg, updatedFields, collection } = body;
    let response = await dbService.execute(dbService.update, collection, {findArg, updatedFields});
    if(!response) {
        return {
            success: false,
            response: null,
            message: 'failed to update'
        }
    }
    return {
        success: true,
        response,
        message: 'updated successfully'
    }
}

module.exports = {
    check,
    add,
    get,
    update
}