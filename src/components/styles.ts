import { keyframes } from "@stitches/react";
import { styled } from "../styles"
import * as Dialog from '@radix-ui/react-dialog'

export const Container = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  button: {
    position: 'relative',

    lineHeight: '0',
    background: '$gray800',
    border: 'none',
    borderRadius: 8,
    width: '3rem',
    height: '3rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    cursor: 'pointer',

    svg: {
      color: '$gray500',
    },

    span: {
      position: 'absolute',
      top: -10,
      right: -10,
      width: '1.5rem',
      height: '1.5rem',
      backgroundColor: '$green500',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      fontSize: '$sm',
      fontWeight: 'bold',
      color: '$white',
      border: '3px solid $gray900',
      boxSizing: 'content-box',
    }
  }
})

const fadeIn = keyframes({
  'from': { right: -480 },
  'to': { right: 0 },
})

const fadeOut = keyframes({
  'from': { right: 0 },
  'to': { right: -480 },
})

export const CartContainer = styled(Dialog.Content, {
  position: 'fixed',
  top: 0,
  right: -480,
  width: '100%',
  maxWidth: 480,
  height: '100%',
  background: '$gray800',
  boxShadow: '-4px 0 30px 0 rgba(0, 0, 0, .8)',

  display: 'flex',
  flexDirection: 'column',

  padding: '1.5rem 1.5rem 1.5rem 3rem',

  '&[data-state="open"]': {
    animation: `${fadeIn} 300ms ease-in forwards`,
  },

  '&[data-state="closed"]': {
    animation: `${fadeOut} 300ms ease-in forwards`,
  },

  strong: {
    display: 'block',
    fontSize: '$lg',
  },
})

export const CloseMenuButton = styled(Dialog.Close, {
  alignSelf: 'end',
  lineHeight: 0,
  border: 'none',
  background: 'none',
  color: '$gray500',
  cursor: 'pointer',
  marginBottom: '1.5rem',
})

export const BagContainer = styled('div', {
  flex: 1,
  overflowY: 'auto',
  marginBlock: '1.5rem',

  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
})

export const ItemDetails = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1.25rem',

  span: {
    fontSize: '$md',
    lineHeight: 1.6,
  },

  strong: {
    fontSize: '$md',
    lineHeight: 1.6,
  },

  button: {
    lineHeight: 1.6,
    color: '$green500',
    fontWeight: 'bold',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  },
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 100,
  height: 100,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,

  img: {
    objectFit: 'cover',
  }
})

export const CheckoutContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '4rem',

  '> div': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    lineHeight: '1.6',

    div: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      '&.total': {
        'strong:first-child': {
          fontSize: '$md'
        }
      }
    }
  },

  button: {
    height: '4rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    border: 'none',
    borderRadius: 8,

    background: '$green500',
    cursor: 'pointer',

    color: '$white',
    fontSize: '$md',
    fontWeight: 'bold',

    '&:not(:disabled):hover': {
      background: '$green300'
    },

    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    }
  }
})
