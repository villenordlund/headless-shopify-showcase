import * as React from "react";
import { StoreContext } from "../../context/storeContext";

export default function CartLink({ quantity }) {
	const { cartOpen, setCartOpen } = React.useContext(StoreContext)

	return (
		<button onClick={() => setCartOpen(!cartOpen)} onKeyDown={() => setCartOpen(!cartOpen)} className="lg-max:absolute lg-max:top-0 lg-max:right-12 lg:inline-block lg:mt-0 flex items-center cursor-pointer">
			<span className="py-6 font-mono font-normal text-md text-white hover:text-gray-900">
				Cart({quantity})
			</span>
		</button>
	);
}