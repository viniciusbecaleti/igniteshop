import type { AppProps } from 'next/app'
import Image from 'next/image'
import { globalStyles } from '../styles/global'

globalStyles()

import logoImg from "../assets/logo.svg"
import { Container, Header } from '../styles/pages/App'

export default function App({ Component, pageProps }: AppProps) {  
  return (
    <Container>
      <Header>
        <Image
          src={logoImg}
          width={130}
          height={52}
          alt=""
        />
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}