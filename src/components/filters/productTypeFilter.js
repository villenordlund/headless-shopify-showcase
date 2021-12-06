import * as React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import slugify from "@sindresorhus/slugify"

export function ProductTypeFilter() {
  const {
    allShopifyProduct: { productTypes },
  } = useStaticQuery(graphql`
    query {
      allShopifyProduct {
        productTypes: distinct(field: productType)
      }
    }
  `)

  return (
    <nav>
      <ul className="-mx-3 text-white font-mono font-normal text-md uppercase flex overflow-x-scroll overflow-y-hidden no-scrollbar w-full">
        <li
          key="All"
          className="flex-shrink-0"
        >
          <Link
            className="p-3 whitespace-nowrap hover:underline"
            activeClassName="underline"
            to="/products/"
          >
            All
          </Link>
        </li>
        {productTypes.map((name) => (
          <li
            key="All"
            className="flex-shrink-0"
          >
            <Link
              className="p-5 whitespace-nowrap hover:underline"
              activeClassName="underline"
              to={`/products/${slugify(name)}`}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}