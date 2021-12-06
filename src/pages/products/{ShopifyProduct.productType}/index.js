import * as React from "react"
import { graphql } from "gatsby"
import { Layout } from "../../../components/layout/layout"
import { ProductTypeFilter } from "../../../components/filters/productTypeFilter"
import { Seo } from "../../../components/seo/seo"
import { ProductListing } from "../../../components/listings/productListing"

export default function ProductTypeIndex({
  data: { products },
  pageContext: { productType },
}) {
  return (
    <Layout>
      <div>
        <Seo title={`Category: ${productType}`} />
        <header className="px-4 pt-24">
          <ProductTypeFilter />
          <h1 className="mb-6 pt-6 font-mono font-normal text-md text-white">{productType} ({products.nodes.length} items)</h1>
        </header>
        <ProductListing products={products.nodes} />
      </div>
    </Layout >
  )
}

export const query = graphql`
  query($productType: String!) {
    products: allShopifyProduct(
      filter: { productType: { eq: $productType } }
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
