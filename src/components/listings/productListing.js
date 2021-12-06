import * as React from "react"
import { ProductCard } from "../cards/productCard"

// To optimize LCP we mark the first product card as eager so the image gets loaded faste
export function ProductListing({ products }) {
  return (
    <section className="px-4">
      <div className="flex flex-wrap">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="mb-6 xxs:px-px w-full xxs:w-6/12 xs:w-4/12 sm:w-3/12 flex-shrink-0"
          >
            <ProductCard product={product} eager={index === 0} />
          </div>
        ))}
      </div>
    </section>
  )
}
