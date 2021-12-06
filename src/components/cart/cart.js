import * as React from "react"
import { StoreContext } from "../../context/storeContext";
import { LineItem } from "./lineItem";
import { formatPrice } from "../../utils/format-price";

export default function Cart() {
	const { checkout, loading, cartOpen, setCartOpen } = React.useContext(StoreContext);
	const emptyCart = checkout.lineItems.length === 0;

	const handleCheckout = () => {
		window.open(checkout.webUrl)
	};

	return (
		<aside className={`minicart max-w-sm w-full h-full fixed top-0 right-0 z-50 bg-gray-100 shadow-sm transform transition-all overflow-x-hidden overflow-y-auto no-scrollbar flex flex-col ${cartOpen ? "translate-x-0" : "translate-x-full"}`}>
			<header className="mb-8 p-6 flex justify-between z-50 bg-gray-100 sticky left-0 top-0 font-mono font-normal text-md leading-none">
				<div className="">Cart</div>
				<button onClick={() => setCartOpen(!cartOpen)} className="focus:outline-none">Close</button>
			</header>

			{emptyCart ? (
				<h5 className="p-6 font-mono font-normal text-md leading-none text-center">Your cart is empty</h5>
			) : (
				<>
					<div className="px-6 w-full">
						{checkout.lineItems.map((item) => (
							<LineItem item={item} key={item.id} />
						))}
					</div>
					<footer className="mt-auto p-6 w-full bg-gray-100 sticky left-0 bottom-0">
						<div className="pt-2 border-t border-black font-mono font-normal text-md leading-none">
							<p className="mb-4">Your shipping costs will be calculated at checkout.</p>

							<div className="pb-6 flex justify-between">
								<span className="uppercase">Total</span>
								<span>
									{formatPrice(
										checkout.totalPriceV2.currencyCode,
										checkout.totalPriceV2.amount
									)}
								</span>
							</div>

							<div>
								<button
									className="button button--black button--wide focus:outline-none"
									onClick={handleCheckout}
									disabled={loading}
								>
									Checkout
								</button>
							</div>
						</div>
					</footer>
				</>
			)}
		</aside>
	)
}