import * as React from "react"
import { StoreContext } from "../../context/storeContext";

export function AddToCart({ variantId, quantity, available, ...props }) {
  const { addVariantToCart } = React.useContext(StoreContext)

  function addToCart(e) {
    e.preventDefault()
    addVariantToCart(variantId, quantity)
  }

  return (
    <button
      type="submit"
      className="button button--white"
      onClick={addToCart}
      {...props}
    >
      {available ? "Add to Cart" : "Out of Stock"}
    </button>
  )
}
