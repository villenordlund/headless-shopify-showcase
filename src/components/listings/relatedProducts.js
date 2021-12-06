import * as React from "react"
import { ProductCard } from "../cards/productCard"

export default function RelatedProducts({ products }) {
  return (
    <section className="mt-2 px-px">
      <header className="py-4">
        <h3 className="font-mono font-normal text-md leading-none text-white text-center">Related products</h3>
      </header>
      <div className="flex flex-wrap">
        {
          products.nodes.map(product => (
            <div className="mb-6 xxs:px-px w-full xxs:w-6/12 md:w-3/12 xl:w-3/12">
              <ProductCard key={product.id} product={product} />
            </div>
          ))
        }
      </div>
    </section >
  )
}