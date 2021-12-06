import { graphql, useStaticQuery, Link } from "gatsby"
import * as React from "react"
import slugify from "@sindresorhus/slugify"

export function ProductTypeNavigation({ navOpen }) {
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
    <div className={`navbar-menu lg:order-1 lg:block w-full lg:w-2/5 lg-max:text-white text-white transition-opacity duration-300 delay-300 in-expo ${navOpen ? 'lg-max:visible lg-max:opacity-100 lg-max:h-full' : 'lg-max:invisible lg-max:opacity-0 lg-max:h-0'}`}>
      <ul className="-mx-4 lg-max:text-center font-mono font-normal text-lg leading-none">
        <li
          className="block lg:inline-block"
          key="All"
        >
          <Link
            className="px-4 py-1 block lg:inline-block hover:text-gray-500"
            to="/products/"
          >
            <span className="lg:hidden">All</span>
            <span className="lg-max:hidden font-mono font-normal text-md leading-none">Shop</span>
          </Link>
        </li>
        <div className="lg:hidden">
          {productTypes.map((name) => (
            <Link
              className="px-4 py-1 block lg:inline-block hover:text-gray-500"
              key={name}
              to={`/products/${slugify(name)}`}
            >
              {name}
            </Link>
          ))}
        </div>
      </ul>
    </div>
  )
}