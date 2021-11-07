// import React from 'react'
// import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
// import { BrowserRouter } from 'react-router-dom'

// import SwitchRoute from './SwitchRoute'
// import store from './store/configStore'
// import TsApp from './ts/TsApp'

// const App = () => (
//   <Provider store={store}>
//     <BrowserRouter>
//       <SwitchRoute />
//     </BrowserRouter>
//   </Provider>
// )

// ReactDOM.render(<App />, document.getElementById('root'))



import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './ts/store'
import TsApp from './ts/TsApp'

ReactDOM.render(
  <Provider store={ store }>
    <TsApp />
  </Provider>,
  document.getElementById('root')
);
