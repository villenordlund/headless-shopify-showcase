import * as React from "react"
import { graphql } from "gatsby"
import { Layout } from "../components/layout/layout"
import { Hero } from "../components/hero/hero"
import { CollectionListing } from "../components/listings/collectionListing"

export default function IndexPage(props) {
  return (
    <Layout>
      <Hero />
      <CollectionListing collections={props.data.allShopifyCollection.nodes} />
    </Layout>
  )
}

export const query = graphql`
  {
    allShopifyCollection {
      nodes {
        id
        handle
        title
        description
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`