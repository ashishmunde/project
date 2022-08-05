const _ = require('ramda')

const HTTPResponse = (status, body) => {
    return {
        status,
        body: body ? body : null
    }
}

// to return response with status 200
const OK = (response) => {
    return HTTPResponse(200, response)
}

function wrapHandler(handler) {
    return async (ctx, next) => {
      try {
        const body = ctx.request.body;
        let response =  ctx.request.method == 'POST' ? await handler(body, ctx, await next()) : await handler(ctx, await next())
        if(response) {
          for (const key in response)
            ctx[key] = response[key]
        }
      } 
      catch (err) {
        console.log('error: ', err)
        ctx.status = err.statusCode || 500
        ctx.body = {
          success: false,
          message: err.message,
        }
      }
    }
  }
  
  
  const wrapHandlerModule = (module) =>  _.fromPairs( _.map(([name, fun]) => [name, wrapHandler(fun)], _.toPairs(module)))
  

module.exports = {
    OK,
    wrapHandlerModule
}