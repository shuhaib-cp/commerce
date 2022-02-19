import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import usePrice from '@framework/product/use-price'
import { Button, Text, Rating, Collapse, useUI } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import { CurrencyCode } from '../../../../packages/bigcommerce/schema'

interface ProductSidebarProps {
  product: Product
  className?: string
}

const ProductSidebar: FC<ProductSidebarProps> = ({ product, className }) => {
  const addItem = useAddItem()
  const { openSidebar } = useUI()
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })
  
  const variant = getProductVariant(product, selectedOptions)
  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0]?.id),
      })
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }
console.log(product.sku)
  return (
    <div className={className}>
      <div className='text-3xl font-bold'>{product.name}</div>
     <div className='text-2xl font-bold text-green'>{`${price} ${product.price?.currencyCode}`}</div>
    <div>{product.sku}</div>
      <ProductOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      {/* <Text
        className="pb-4 break-words w-full max-w-xl"
        html={product.descriptionHtml || product.description}
      /> */}
      <div className="flex flex-row justify-between items-center">
        <Rating value={4} />
        <div className="text-accent-6 pr-1 font-medium text-sm">38 reviews</div>
      </div>
      <div>
      {process.env.COMMERCE_CART_ENABLED && (
      <button aria-label="Add to Cart"
      type="button"
         
         onClick={addToCart}
         
         disabled={variant?.availableForSale === false}
      className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm rounded-md text-white uppercase w-72">{variant?.availableForSale === false
             ? 'Not Available'
             : 'Add To Cart'}</button>
      )}
      
      </div>
      <div className="mt-6">
        <Collapse title="Care">
          This is a limited edition production run. Printing starts when the
          drop ends.
        </Collapse>
        <Collapse title="Details">
          This is a limited edition production run. Printing starts when the
          drop ends.Reminder: Bad Boys For Life.Shipping may take 10+ days due
          to COVID-19.
        </Collapse>
      </div>
    </div>
  )
}

export default ProductSidebar
