const { OK } = require('./koa-util');
const Service = require('./service');
const WalletService = require('./wallet-service');

function checkHealth(ctx) {
    const response = Service.check();
    return OK(response);
}

async function addData(body, ctx) {
    const response = await Service.add(body);
    return OK(response);
}

async function getData(ctx) {
    const value = ctx.request.query && ctx.request.query.value || '';
    const collection = ctx.params && ctx.params.collection || '';
    const index = ctx.request.query && ctx.request.query.index || '';
    const response = await Service.get(collection, index, value);
    return OK(response);
}

async function updateData(body, ctx) {
    const response = await Service.update(body);
    return OK(response);
}

async function addWallet(body, ctx) {
    const response = await WalletService.add(body);
    return OK(response)
}

async function addTransaction(body, ctx) {
    const response = await WalletService.addTransaction(body);
    return OK(response);
}

module.exports = {
    checkHealth,
    addData,
    getData,
    updateData,
    addWallet,
    addTransaction
}