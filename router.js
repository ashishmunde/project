const Router = require('koa-router');
const { wrapHandlerModule } = require('./koa-util')
const handler = wrapHandlerModule(require('./handler'))

const router = new Router({
    prefix: '/api'
});

router.get('/health', handler.checkHealth);
// router.post('/add-data', handler.addData);
router.get('/fetch-data/:collection', handler.getData);
// router.post('/update-data', handler.updateData);

router.post('/wallet/add', handler.addWallet)
router.post('/wallet-transaction/add', handler.addTransaction)

module.exports = router;