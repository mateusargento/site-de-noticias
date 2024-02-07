import type { AppProps } from 'next/app'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import UserAdminProvider from '@/context/userAdminProvider';
import LGPDAdvice from '@/components/LGPDAdvice'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './styles/globals.css'
import { Nunito_Sans } from 'next/font/google'

const nunito_sans = Nunito_Sans({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Header />
    <div className={nunito_sans.className}>
      <UserAdminProvider>
        <LGPDAdvice />
        <Component {...pageProps} />
        <ToastContainer theme="colored" />
      </UserAdminProvider>
    </div>
    <Footer />
  </>
}
