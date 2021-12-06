import * as React from "react"
import debounce from "lodash.debounce"
import { StoreContext } from "../../context/storeContext";
import { formatPrice } from "../../utils/format-price"
import { GatsbyImage } from "gatsby-plugin-image"
import { getShopifyImage } from "gatsby-source-shopify"
import { NumericInput } from "./numericInput"


export function LineItem({ item }) {
  const {
    removeLineItem,
    checkout,
    updateLineItem,
  } = React.useContext(StoreContext)
  const [quantity, setQuantity] = React.useState(item.quantity)

  const variantImage = {
    ...item.variant?.image,
    originalSrc: item.variant?.image.src,
  }

  const subtotal = formatPrice(
    item.variant.priceV2.currencyCode,
    Number(item.variant.priceV2.amount) * quantity
  )

  const handleRemove = () => {
    removeLineItem(checkout.id, item.id)
  }

  const uli = debounce(
    (value) => updateLineItem(checkout.id, item.id, value),
    300
  )
  // eslint-disable-next-line
  const debouncedUli = React.useCallback((value) => uli(value), [])

  const handleQuantityChange = (value) => {
    if (value !== "" && Number(value) < 1) {
      return
    }
    setQuantity(value)
    if (Number(value) >= 1) {
      debouncedUli(value)
    }
  }

  function doIncrement() {
    handleQuantityChange(Number(quantity || 0) + 1)
  }

  function doDecrement() {
    handleQuantityChange(Number(quantity || 0) - 1)
  }

  const image = React.useMemo(
    () =>
      getShopifyImage({
        image: variantImage,
        layout: "constrained",
        width: 240,
        height: 336,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [variantImage.src]
  )

  return (
    <div className="mb-6 flex flex-wrap items-center">
      {image && (
        <div className="w-16">
          <figure className="relative ar-box ar-box-1-1">
            <GatsbyImage
              key={variantImage.src}
              image={image}
              imgStyle={{ objectFit: 'cover', position: 'absolute', width: '100%', height: '100%' }}
              alt={variantImage.altText ?? item.variant.title}
            />
          </figure>
        </div>
      )}
      <div className="pl-4 flex-1 font-mono font-normal text-md leading-none">
        <div
          key={item.variant.id}
          className="flex-1"
        >
          <div className="pb-2 border-b border-black">
            <h6 className="mb-1">{item.title}</h6>
            <div className="mb-2 capitalize">{item.variant.title === "Default Title" ? "" : item.variant.title}</div>
            <div className="">{subtotal}</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center">
          <NumericInput
            value={quantity}
            aria-label="Quantity"
            onIncrement={doIncrement}
            onDecrement={doDecrement}
            onChange={(e) => handleQuantityChange(e.currentTarget.value)}
          />

          <div className="ml-4">
            <button className="small-text" onClick={handleRemove}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
