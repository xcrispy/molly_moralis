import '../styles/globals.css'
import { grommet, Grommet } from 'grommet';
import 'degen/styles'
import { ChakraProvider } from '@chakra-ui/react'
import {MoralisProvider} from "react-moralis"

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider 
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_ID}
    >
      <Grommet theme={grommet}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Grommet>

    </MoralisProvider>
  )}

export default MyApp
