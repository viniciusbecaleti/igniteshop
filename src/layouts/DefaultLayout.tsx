import { ReactNode } from "react"
import { Container } from "./styles"
import { Header } from "../components/Header"

interface LayoutProps {
  children: ReactNode
}

export function DefaultLayout({ children }: LayoutProps) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  )
}
