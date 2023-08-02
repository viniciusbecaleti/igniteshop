import { useContext, useState } from "react"
import Image from "next/image"
import { Handbag, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import axios from "axios"
import { BagContainer, CartContainer, CheckoutContainer, CloseMenuButton, Container, ImageContainer, ItemDetails } from './styles'
import logoImg from "../assets/logo.svg"
import { CartContext } from "../contexts/CartContext"
import { currencyFormatter } from "../utils/formatter"

export function Header() {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  const { cartItems, removeItemFromCart } = useContext(CartContext)

  const amount = cartItems.reduce((sum, item) => sum + item.price, 0)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const priceIds = cartItems.map(cartItem => cartItem.defaultPriceId)

      const response = await axios.post("/api/checkout", {
        priceIds: priceIds
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckoutSession(false)
      console.log(`Falha ao redirecionar ao checkout: ${error}`)
    }
  }

  return (
    <>
      <Container>
        <Image
          src={logoImg}
          width={130}
          height={52}
          alt=""
        />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              type='button'
            >
              <Handbag size={24} weight='bold' />
              <span>{cartItems.length}</span>
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <CartContainer>
              <CloseMenuButton>
                <X size={24} weight="bold" />
              </CloseMenuButton>

              <Dialog.Title>
                <strong>Sacola de compras</strong>
              </Dialog.Title>

              <BagContainer>
                {cartItems.map(item => (
                  <ItemDetails key={item.id}>
                    <ImageContainer>
                      <Image src={item.imageUrl} width={100} height={100} alt="" />
                    </ImageContainer>

                    <div>
                      <span>{item.name}</span>
                      <strong>{currencyFormatter.format(item.price)}</strong>
                      <button
                        type="button"
                        onClick={() => removeItemFromCart(item.id)}
                      >
                        Remover
                      </button>
                    </div>
                  </ItemDetails>
                ))}
              </BagContainer>

              <CheckoutContainer>
                <div>
                  <div>
                    <span>Quantidade</span>
                    <span>{cartItems.length} itens</span>
                  </div>

                  <div className="total">
                    <strong>Valor total</strong>
                    <strong>{currencyFormatter.format(amount)}</strong>
                  </div>
                </div>

                <button
                  type='button'
                  disabled={amount === 0 || isCreatingCheckoutSession}
                  onClick={handleBuyProduct}
                >
                  Finalizar compra
                </button>
              </CheckoutContainer>
            </CartContainer>
          </Dialog.Portal>
        </Dialog.Root>
      </Container>
    </>
  )
}
