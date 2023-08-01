import { useState } from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import Stripe from "stripe"
import { stripe } from "../../libs/stripe"
import Image from "next/image"
import { useRouter } from "next/router"
import axios from "axios"

import { Container, ContainerSkeleton, Details, ImageContainer } from "../../styles/pages/Product"
import Head from "next/head"

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    defaultPriceId: string
    description: string
  }
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  const { isFallback } = useRouter()

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckoutSession(false)
      alert("Falha ao redirecionar ao checkout")
    }
  }

  if (isFallback) {
    return (
      <ContainerSkeleton>
        <div />
        <div />
      </ContainerSkeleton>
    )
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <Container>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <Details>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>
          <button
            type="button"
            onClick={handleBuyProduct}
            disabled={isCreatingCheckoutSession}
          >
            Comprar agora
          </button>
        </Details>
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          productId: 'prod_NGRWBbtbktg1pe'
        }
      }
    ],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<any, { productId: string }> = async ({ params }) => {
  const { productId } = params

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-br', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount! / 100),
        defaultPriceId: price.id,
        description: product.description
      },
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}