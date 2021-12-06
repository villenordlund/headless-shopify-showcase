import React, { useState } from 'react'
import { Link } from "gatsby"
import { StoreContext } from "../../context/storeContext"
import CartLink from '../cart/cartLink'
import { ProductTypeNavigation } from '../navigation/productTypeNavigation'

export default function Header() {
  const { checkout } = React.useContext(StoreContext)

  const items = checkout ? checkout.lineItems : []

  const quantity = items.reduce((total, item) => {
    return total + item.quantity
  }, 0);

  const [navOpen, setNavOpen] = useState(false);
  const toggleNavigation = () => {
    setNavOpen(!navOpen)
  };

  return (
    <header className={`flex items-center fixed top-0 left-0 w-full h-16 z-50 border-b border-white bg-black transform transition-all duration-300 in-expo ${navOpen ? 'lg-max:h-full bg-black' : 'bg-white'}`}>
      <nav className="px-4 flex flex-wrap items-center justify-between w-full small-text text-black">
        <div className="lg-max:absolute lg-max:top-0 lg-max:left-0 lg:order-2 w-auto lg:w-1/5 h-16 lg:text-center flex items-center justify-center">
          <Link to="/" className="px-4 py-6 text-white font-mono font-normal text-md leading-none">
            SiteName
          </Link>
        </div>

        <div className="block lg:hidden">
          <CartLink quantity={quantity} />

          <button className="site-header__toggle-navigation absolute top-0 -right-2 z-40 w-16 h-16 flex items-center justify-center cursor-pointer lg:hidden focus:outline-none" onClick={toggleNavigation}>
            {navOpen
              ? <svg className="h-6 w-6 fill-current text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>

              : <svg className="block h-6 w-6 fill-current text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            }
            <span className="sr-only">Open and close menu</span>
          </button>
        </div>

        <ProductTypeNavigation navOpen={navOpen} />

        <div className="navbar-menu hidden lg:order-3 lg:block w-full lg:w-2/5 lg:text-right">
          <CartLink quantity={quantity} />
        </div>
      </nav>
    </header >
  )
}