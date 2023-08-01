import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { GetServerSideProps } from "next";
import { stripe } from "../libs/stripe";

import { Container, ImageContainer } from "../styles/pages/Success";
import Head from "next/head";

interface SuccessProps {
  customerName: string
  product: {
    name: string,
    imageUrl: string
  }
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <Container>
        <h1>Compra efetuada</h1>

        <ImageContainer>
          <Image src={product.imageUrl} width="120" height="110" alt="" />
        </ImageContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa. 
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.sessionId) {
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
  
  const product = session.line_items.data[0].price.product as Stripe.Product
  const productName = product.name
  const productImage = product.images[0]
  
  return {
    props: {
      customerName,
      product: {
        name: productName,
        imageUrl: productImage
      }
    }
  }
}