import * as React from "react"
import { StoreProvider } from "./src/context/storeContext"
import "./src/styles/global.scss"

export const wrapRootElement = ({ element }) => (
  <StoreProvider>
    {element}
  </StoreProvider>
)