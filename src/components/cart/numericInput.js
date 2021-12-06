import * as React from "react"

export function NumericInput({
  onIncrement,
  onDecrement,
  className,
  disabled,
  ...props
}) {
  return (
    <div>
      <div className="small-text h-full inline-flex items-center">
        <button
          className="w-6 px-2 hover:text-black"
          disabled={disabled}
          aria-label="Decrement"
          onClick={onIncrement}
        >
          <span>+</span>
        </button>
        <input
          disabled={disabled}
          type="numeric"
          className="w-10 m-0 px-2 py-2 focus:ring-transparent bg-transparent focus:outline-none text-center"
          {...props}
        />

        <button
          className="w-6 py-2 px-2"
          disabled={disabled}
          aria-label="Increment"
          onClick={onDecrement}
        >
          <span>-</span>
        </button>
      </div>
    </div>
  )
}


