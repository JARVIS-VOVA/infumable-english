const express = require('express')

const loaders = require('./loaders')
const { SUCCESS, ERROR } = require('./constants/colorsForConsole')

async function startServer() {
  const app = express()

  await loaders({ expressApp: app })

  app.listen(process.env.PORT, err => {
    if (err) {
      console.log(ERROR, '####dkjflksdfjlsdfj index.js ##############################################')
      console.log(ERROR, err)
      return
    }


    // console.log(`🚀 Server ready at ${url}`);
    // console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);

    console.log(SUCCESS, '###################################################')
    console.log(SUCCESS, `🛡️ Server listening on port: ${process.env.PORT} 🛡️`)
    console.log(SUCCESS, '###################################################')
  })
}

startServer()
