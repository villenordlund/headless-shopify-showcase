import * as React from "react"

export function Hero() {
  return (
    <section className="px-4 pt-32 pb-16 md:py-48 text-center text-white">
      <div className="mx-auto max-w-xl">
        <p className="mb-2 font-mono font-normal text-md sm:text-lg leading-tight uppercase tracking-wider">Shopify + Gatsby</p>
        <h1 className="mb-4 font-mono font-semiBold text-2xl sm:text-7xl leading-tight">Modern eCommerce <br />with headless Shopify</h1>
        <p className="xs:px-24 mb-10 px-6 font-mono font-normal text-sm lg:text-md leading-snug">This is a showcase how to buid a headless ecommerce website with <a href="https://www.shopify.com/">Shopify</a> and <a href="https://www.gatsbyjs.com/">Gatsby</a>.</p>
        <a className="button button--white" href="https://shopify-showcase.netlify.app/products">Take a look around</a>
      </div>
    </section>
  )
}