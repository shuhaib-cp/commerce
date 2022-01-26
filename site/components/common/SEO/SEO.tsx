import Head from 'next/head'
import { FC } from 'react'
import config from '@config/seo_meta.json'

interface OgImage {
  url?: string
  width?: string
  height?: string
  alt?: string
}

interface Props {
  title?: string
  description?: string
  robots?: string
  openGraph?: {
    title?: string
    type?: string
    locale?: string
    description?: string
    site_name?: string
    url?: string
    images?: OgImage[]
  }
}

const ogImage = ({ url, width, height, alt }: OgImage, index: number) => {
  return (
    <>
      <meta key={`og:image${index}`} property="og:image" content={url} />
      <meta
        key={`og:image:width${index}`}
        property="og:image:width"
        content={width}
      />
      <meta
        key={`og:image:height${index}`}
        property="og:image:height"
        content={height}
      />
      <meta
        key={`og:image:alt${index}`}
        property="og:image:alt"
        content={alt}
      />
    </>
  )
}

const SEO: FC<Props> = ({ title, description, openGraph, robots }) => {
  return (
    <Head>
      <title>
        {title ? `${config.titleTemplate.replace(/%s/g, title)}` : config.title}
      </title>
      <meta
        key="description"
        name="description"
        content={description || config.description}
      />
      <meta
        key="og:type"
        property="og:type"
        content={openGraph?.title ?? config.openGraph.title}
      />
      <meta
        key="og:title"
        property="og:title"
        content={
          openGraph?.type ?? config.openGraph.type ?? title ?? config.title
        }
      />
      <meta
        property="og:description"
        content={
          openGraph?.description ??
          config.openGraph.description ??
          description ??
          config.description
        }
      />
      <meta
        key="og:site_name"
        property="og:site_name"
        content={openGraph?.site_name ?? config.openGraph.site_name}
      />
      <meta
        key="og:url"
        property="og:url"
        content={openGraph?.url ?? config.openGraph.url}
      ></meta>
      {openGraph?.locale && (
        <meta key="og:locale" property="og:locale" content={openGraph.locale} />
      )}
      {openGraph?.images?.length
        ? openGraph.images.map((img, index) => ogImage(img, index))
        : ogImage(config.openGraph.images[0], 0)}
      {config.twitter.cardType && (
        <meta
          key="twitter:card"
          name="twitter:card"
          content={config.twitter.cardType}
        />
      )}
      {config.twitter.site && (
        <meta
          key="twitter:site"
          name="twitter:site"
          content={config.twitter.site}
        />
      )}
      {config.twitter.handle && (
        <meta
          key="twitter:creator"
          name="twitter:creator"
          content={config.twitter.handle}
        />
      )}
      <meta key="robots" name="robots" content={robots ?? 'index,follow'} />
      <meta
        key="googlebot"
        name="googlebot"
        content={robots ?? 'index,follow'}
      ></meta>
    </Head>
  )
}

export default SEO
