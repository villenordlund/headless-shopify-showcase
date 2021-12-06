import * as React from "react"
import { graphql } from "gatsby"
import { Layout } from "../../components/layout/layout"
import { ProductTypeFilter } from "../../components/filters/productTypeFilter"
import { ProductListing } from "../../components/listings/productListing"
import { Seo } from "../../components/seo/seo"

export default function Products({
  data: { products },
  pageContext: { productType },
}) {
  return (
    <Layout>
      <Seo title="All Products" />
      <header className="px-4 pt-24">
        <ProductTypeFilter />
        <h1 className="mb-6 pt-6 font-mono font-normal text-md text-white">{productType} ({products.nodes.length} items)</h1>
      </header>
      <ProductListing products={products.nodes} />
    </Layout>
  )
}

export const query = graphql`
  {
    products: allShopifyProduct(
      limit: 24
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`
