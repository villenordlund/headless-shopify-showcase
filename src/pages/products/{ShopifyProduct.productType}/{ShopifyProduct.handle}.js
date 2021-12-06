import * as React from "react"
import { graphql } from "gatsby"
import { Layout } from "../../../components/layout/layout"
import { GatsbyImage } from 'gatsby-plugin-image'
import isEqual from "lodash.isequal"
import { getSrc } from "gatsby-plugin-image"
import { StoreContext } from "../../../context/storeContext"
import { AddToCart } from "../../../components/cart/addToCart"
import RelatedProducts from "../../../components/listings/relatedProducts"
import { formatPrice } from "../../../utils/format-price"
import { Seo } from "../../../components/seo/seo"


export default function Product({ data: { product, suggestions } }) {
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRangeV2,
    title,
    description,
    images,
    images: [firstImage],
  } = product

  const { client } = React.useContext(StoreContext)
  const [variant, setVariant] = React.useState({ ...initialVariant })
  const [quantity] = React.useState(1)
  const productVariant = client.product.helpers.variantForOptions(product, variant) || variant
  const [available, setAvailable] = React.useState(productVariant.availableForSale)

  const checkAvailablity = React.useCallback(
    (productId) => {
      client.product.fetch(productId).then((fetchedProduct) => {
        const result =
          fetchedProduct?.variants.filter(
            (variant) => variant.id === productVariant.storefrontId
          ) ?? []

        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [productVariant.storefrontId, client.product]
  )

  const handleClick = (optionIndex, value) => {
    const currentOptions = [...variant.selectedOptions]

    currentOptions[optionIndex] = {
      ...currentOptions[optionIndex],
      value,
    }

    const selectedVariant = variants.find((variant) => {
      return isEqual(currentOptions, variant.selectedOptions)
    })

    setVariant({ ...selectedVariant })
  }

  React.useEffect(() => {
    checkAvailablity(product.storefrontId)
  }, [productVariant.storefrontId, checkAvailablity, product.storefrontId])

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    variant.price
  )

  const hasImages = images.length > 0
  const hasRelatedItems = suggestions.nodes.length > 0

  return (
    <Layout>
      {firstImage ? (
        <Seo
          title={title}
          description={description}
          image={getSrc(firstImage.gatsbyImageData)}
        />
      ) : undefined}
      <div className="pt-16 md:grid md:grid-cols-12 items-start">
        {hasImages &&
          <div className="md:col-span-6 lg:col-span-6">
            <section className="h-full md:flex">
              <div className="flex md:flex-col overflow-x-scroll md-max:overflow-y-hidden md:overflow-y-scroll no-scrollbar w-full min-h-full relative">
                {images.map((image) => {
                  return (
                    <div className="w-8/12 sm:w-5/12 md:w-full flex-shrink-0">
                      <figure className="md-max:mr-px md:mb-px">
                        <GatsbyImage
                          image={image.localFile.childImageSharp.gatsbyImageData}
                        />
                      </figure>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        }
        <div className="px-4 py-12 md:col-span-6 lg:col-span-6 sticky top-0 md:h-screen w-full flex flex-col items-center justify-center">
          <div className="max-w-lg flex flex-col items-center text-white">
            <div className="mb-2 flex lg-max:flex-col lg:justify-between lg:items-baseline">
              <h1 className="lg:mr-6 font-mono font-normal text-lg lg:text-xl">{title}</h1>
              <h2 className="lg-max:mx-auto font-mono font-normal text-lg"><span>{price}</span></h2>
            </div>

            <p className="mb-6 lg:px-12 font-mono font-normal text-sm text-center">{description}</p>

            {
              options.map(({ id, name, values }, optionIndex) => (
                <div key={id}>
                  <div className="mb-4 font-mono font-normal text-md uppercase leading-none text-center">Choose {name}</div>
                  <div className="flex flex-wrap w-full">
                    {values.map(value => {
                      const isActive = variant.selectedOptions[optionIndex].value === value;
                      return (
                        <div
                          className={`mb-1 mr-1 w-12 h-10 px-4 flex items-center justify-center cursor-pointer font-mono font-normal text-md border ${isActive ? 'border-white' : 'hover:border-white border-transparent'}`}
                          key={`${id}-${value}`}
                          active={variant.selectedOptions[optionIndex].value === value}
                          onClick={() => handleClick(optionIndex, value)}
                        >
                          <span className="small-text">{value}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

              ))
            }

            <div className="mt-6 flex justify-center">
              <AddToCart
                variantId={productVariant.storefrontId}
                quantity={quantity}
                available={available}
              />
            </div>
          </div>
        </div>
      </div>
      {hasRelatedItems &&
        <RelatedProducts products={suggestions} />
      }
    </Layout>
  )
}

export const query = graphql`
  query($id: String!, $productType: String!) {
    product: shopifyProduct(id: { eq: $id }) {
      title
      description
      productType
      productTypeSlug: gatsbyPath(
        filePath: "/products/{ShopifyProduct.productType}"
      )
      tags
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      storefrontId
      images {
        localFile {
          childImageSharp {
            gatsbyImageData
            id
          }
        }
      }
      variants {
        id
        availableForSale
        storefrontId
        title
        price
        selectedOptions {
          name
          value
        }
      }
      options {
        name
        values
        id
      }
    }
    suggestions: allShopifyProduct(
      limit: 4
      filter: { productType: { eq: $productType }, id: { ne: $id } }
    ) {
      nodes {
        ...ProductCard
      }
    }
  }
`
