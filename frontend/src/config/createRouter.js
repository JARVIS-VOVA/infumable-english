import createRouter from 'router5'
import browserPlugin from 'router5/plugins/browser'

import routes from './routes'

const options = {
  defaultRoute: 'home'
}

const router = createRouter(routes, options)
  .usePlugin(
    browserPlugin({
      useHash: true
    })
  )

export default router
