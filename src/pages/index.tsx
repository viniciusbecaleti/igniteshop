import { MouseEvent, useContext } from "react";
import Image from "next/image";
import { GetStaticProps } from "next";
import { useKeenSlider } from 'keen-slider/react'
import Stripe from "stripe";
import { stripe } from "../libs/stripe";
import Link from "next/link";
import Head from "next/head";
import { Handbag } from "phosphor-react";

import { CartContext } from "../contexts/CartContext";

import 'keen-slider/keen-slider.min.css'
import { Container, Product } from "../styles/pages/Home";
import { currencyFormatter } from "../utils/formatter";
import { DefaultLayout } from "../layouts/DefaultLayout";

interface Product {
  id: string
  name: string
  imageUrl: string
  price: number
  defaultPriceId: string
}

interface HomeProps {
  products: Product[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    }
  })

  const { addItemToCart } = useContext(CartContext)

  function handleAddProductToCart(event: MouseEvent<HTMLButtonElement>, product: Product) {
    event.stopPropagation()
    addItemToCart(product)
  }

  return (
    <DefaultLayout>
      <Head>
        <title>Ignite Shop</title>
      </Head>

      <Container ref={sliderRef} className="keen-slider">
        {products.map(product => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Product
              className="keen-slider__slide"
            >
              <Image
                src={product.imageUrl}
                width={520}
                height={480}
                alt=""
              />

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{currencyFormatter.format(product.price)}</span>
                </div>

                <button
                  type="button"
                  onClick={(event) => handleAddProductToCart(event, product)}
                >
                  <Handbag size={32} weight='bold' />
                </button>
              </footer>
            </Product>
          </Link>
        ))}
      </Container>
    </DefaultLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount! / 100,
      defaultPriceId: price.id
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 horas
  }
}
