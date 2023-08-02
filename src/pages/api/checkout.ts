// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../libs/stripe'

interface Item {
  price: string,
  quantity: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    })
  }

  const priceIds: string[] = req.body.priceIds

  const items: Item[] = priceIds.map(priceId => ({ price: priceId, quantity: 1 }))

  if (!priceIds) {
    return res.status(400).json({
      error: 'Price not found'
    })
  }

  const successUrl = `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_PUBLIC_URL}/`


  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: items,
    success_url: successUrl,
    cancel_url: cancelUrl
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}
