import { styled } from "..";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  maxWidth: 1180,
  minHeight: '100vh',
  margin: '0 auto',
  padding: '1.5rem',

  h1: {
    fontSize: '$2xl',
    color: '$gray100'
  },

  p: {
    fontSize: '$xl',
    lineHeight: 1.6,
    color: '$gray300',
    textAlign: 'center',

    maxWidth: 590,

    marginTop: '2rem',
  },

  a: {
    display: 'block',
    color: '$green500',
    fontSize: '$lg',
    fontWeight: 'bold',
    textDecoration: 'none',

    marginTop: '5rem',

    '&:hover': {
      color: '$green300',
    }
  }
})

export const Gallery = styled('div', {
  display: 'flex',
  marginTop: 100,
  marginBottom: '3rem',
})

export const ImageContainer = styled('div', {
  width: 140,
  height: 140,
  borderRadius: '50%',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  boxShadow: '0 0 60px 0 rgba(0, 0, 0, .8)',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },

  '&:not(:first-child)': {
    position: 'relative',
    marginLeft: -50,
  }
})
