import * as React from "react"
import { CollectionBanner } from "../banners/collectionBanner"

export function CollectionListing({ collections }) {
  return (
    <section className="px-4">
      {collections.map((collection, index) => {
        let position = ''
        let margin = ''

        if (index % 2 === 0) { position = 'ml-auto' } else { position = 'flex-row-reverse' }
        if (index % 2 === 0) { margin = null } else { margin = 'md:ml-auto' }

        return (
          <CollectionBanner
            key={collection.id}
            collection={collection}
            index={index}
            position={position}
            margin={margin}
          />
        )
      })}
    </section>
  )
}