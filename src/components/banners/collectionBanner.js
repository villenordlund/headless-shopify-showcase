import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

export function CollectionBanner({ collection, position, margin }) {

  return (
    <div className={`mb-10 text-white flex flex-wrap ${position}`}>
      <div className="w-full md:w-8/12">
        {collection.image &&
          <figure className="block relative overflow-hidden ar-box ar-box-4-5">
            <GatsbyImage
              style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
              image={collection.image.localFile.childImageSharp.gatsbyImageData}
              alt=""
            />
          </figure>
        }
      </div>
      <div className="py-6 md:p-6 w-full md:w-4/12 md:sticky md:top-24 md:self-start md-max:text-center">
        <div className={`md-max:mx-auto flex flex-col h-full max-w-md font-mono font-normal ${margin}`}>
          {collection.title &&
            <h2 className="mb-2 text-lg lg:text-xl xl:text-3xl leading-tight">{collection.title}</h2>
          }
          {collection.description &&
            <p className="text-sm leading-snug">{collection.description}</p>
          }

          <Link
            className="mt-6 text-sm uppercase underline hover:no-underline"
            to={`/products/${collection.handle}`}
          >
            Shop {collection.title}
          </Link>
        </div>

      </div>
    </div >
  )
}