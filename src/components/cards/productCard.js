import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { formatPrice } from "../../utils/format-price"

export function ProductCard({ product, eager }) {
  const {
    title,
    priceRangeV2,
    slug,
    featuredImage,
    variants,
  } = product

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    priceRangeV2.minVariantPrice.amount,
  )

  const image = getImage(featuredImage?.localFile.childImageSharp.gatsbyImageData)

  return (
    <Link
      className="group"
      to={slug}
      aria-label={`View ${title} product page`}
    >
      {image &&
        <figure className="mb-2 block relative overflow-hidden ar-box ar-box-5-7">
          <GatsbyImage
            style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
            image={image}
            alt={title}
            loading={eager ? "eager" : "lazy"}
          />

          {variants[0].compareAtPrice &&
            <div className="mt-2 mr-2 lg:mt-4 lg:mr-4 p-3 h-12 w-12 lg:h-16 lg:w-16 absolute top-0 right-0 text-sm xs:text-md text-white bg-black rounded-full flex items-center justify-center">
              <span>-{parseFloat((variants[0].compareAtPrice - priceRangeV2.minVariantPrice.amount) * 100 / variants[0].compareAtPrice).toFixed()}%</span>
            </div>
          }
        </figure>
      }

      <div className="xl:flex text-white">
        <div className="px-2 flex-auto">
          <h3 className="font-mono font-normal text-sm lg:text-md uppercase">{title}</h3>
        </div>

        <p class="mb-0 px-2 flex-1 font-mono font-normal text-sm lg:text-md xl:text-right">
          <span className="block">{price}</span>
          {variants[0].compareAtPrice &&
            <s className="block">{parseFloat(variants[0].compareAtPrice).toFixed(2)}€</s>
          }
        </p>
      </div>
    </Link>
  )
}

export const query = graphql`
  fragment ProductCard on ShopifyProduct {
    id
    title
    slug: gatsbyPath(
      filePath: "/products/{ShopifyProduct.productType}/{ShopifyProduct.handle}"
    )
    featuredImage {
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
    priceRangeV2 {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants {
      compareAtPrice
    }
  }
`
