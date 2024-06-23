import '@/styles/globals.css'
import { ThemeProvider } from '@material-tailwind/react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <main className={`${poppins.variable} font-poppins`}>
      <ThemeProvider>
        {getLayout(<Component {...pageProps} />)}
        <ToastContainer />
      </ThemeProvider>
    </main>

  )
}
