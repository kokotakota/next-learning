import Head from 'next/head'
import { AppProps, AppContext } from "next/app"

import DefaultLayout from 'components/DefaultLayout'
import CssBaseLine from '@mui/material/CssBaseline'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from 'store'

import { useDispatch } from 'react-redux'
import { userSlice } from 'store/user'

type AppPropsWithInitialProps = AppProps & {
  user: {
    id?: string,
    name?: string
  }
}

function AppWrapper (context: AppPropsWithInitialProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App {...context} />
      </PersistGate>
    </Provider>
  )
}

function App ({ Component, pageProps, user }: AppPropsWithInitialProps) {
  // storeの更新
  const dispatch = useDispatch()
  dispatch(userSlice.actions.setUser(user))

  return (
    <>
      <Head>
        <title>タイトル</title>
        <meta name="description" content="Next.jsプロジェクト" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      </Head>
      <CssBaseLine />
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </>
  )
}

AppWrapper.getInitialProps = async ({ ctx }: AppContext) => {
  const { req, res, pathname } = ctx
  return { user: { id: 'test', name: 'テスト' } }
}

export default AppWrapper