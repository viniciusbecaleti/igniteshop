import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { GetServerSideProps } from "next";
import { stripe } from "../libs/stripe";
import Head from "next/head";
import { Container, Gallery, ImageContainer } from "../styles/pages/Success";
import logoImg from "../assets/logo.svg"

interface SuccessProps {
  customerName: string
  products: {
    imageUrl: string
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <Container>
        <Image
          src={logoImg}
          width={130}
          height={52}
          alt=""
        />

        <Gallery>
          {products.map(product => (
            <ImageContainer key={product.imageUrl}>
              <Image src={product.imageUrl} width="130" height="130" alt="" />
            </ImageContainer>
          ))}
        </Gallery>

        <h1>Compra efetuada!</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {products.length} camiseta{products.length > 1 && 's'} já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name

  const products = session.line_items.data.map(item => {
    const product = item.price.product as Stripe.Product

    return {
      imageUrl: product.images[0]
    }
  })

  return {
    props: {
      customerName,
      products
    }
  }
}
