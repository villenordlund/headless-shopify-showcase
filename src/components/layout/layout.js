import * as React from "react"
import Header from "../header/header"
import Cart from '../cart/cart'
import { Footer } from "../footer/footer"
import { Seo } from "../seo/seo"

export function Layout({ children }) {
  return (
    <div className="bg-black min-h-full flex flex-col">
      <Seo />
      <Header />
      <main className="flex-grow">{children}</main>
      <Cart />
      <Footer />
    </div>
  )
}
