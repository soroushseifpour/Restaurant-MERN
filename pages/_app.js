import Layout from '../components/shared/Layout/Layout'
import '../styles/globals.css'
import {Provider} from 'react-redux'
import store from '../store'
function MyApp({ Component, pageProps }) {
  return(
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  ) 
}

export default MyApp