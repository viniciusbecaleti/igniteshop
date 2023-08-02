import { useContext, useState } from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import Stripe from "stripe"
import { stripe } from "../../libs/stripe"
import Image from "next/image"
import { useRouter } from "next/router"
import axios from "axios"

import { Container, ContainerSkeleton, Details, ImageContainer } from "../../styles/pages/Product"
import Head from "next/head"
import { CartContext } from "../../contexts/CartContext"
import { currencyFormatter } from "../../utils/formatter"
import { DefaultLayout } from "../../layouts/DefaultLayout"

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    defaultPriceId: string
    description: string
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()

  const { addItemToCart } = useContext(CartContext)

  if (isFallback) {
    return (
      <ContainerSkeleton>
        <div />
        <div />
      </ContainerSkeleton>
    )
  }

  return (
    <DefaultLayout>
      <Head>
        <title>{`${product.name} | Ignite Shop`}</title>
      </Head>

      <Container>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <Details>
          <h1>{product.name}</h1>
          <span>{currencyFormatter.format(product.price)}</span>
          <p>{product.description}</p>
          <button
            type="button"
            onClick={() => addItemToCart(product)}
          >
            Colocar na sacola
          </button>
        </Details>
      </Container>
    </DefaultLayout>
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
        price: price.unit_amount! / 100,
        defaultPriceId: price.id,
        description: product.description
      },
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}
