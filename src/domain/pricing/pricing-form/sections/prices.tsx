import { Product } from "@medusajs/medusa"
import { useAdminPriceListProducts } from "medusa-react"
import * as React from "react"
import Accordion from "../../../../components/organisms/accordion"
import { merge } from "../../details/sections/prices-details/utils"
import ProductPrices from "./product-prices"

type PricesSectionProps = {
  isEdit?: boolean
  id?: string
}

const defaultQueryFilters = {
  limit: 50,
  offset: 0,
}

const PricesSection = ({ isEdit = false, id }: PricesSectionProps) => {
  const { products = [], isLoading } = useAdminPriceListProducts(
    id!,
    defaultQueryFilters,
    {
      enabled: isEdit,
    }
  )

  const [selectedProducts, setSelectedProducts] = React.useState<Product[]>([])
  const mergedProducts = merge(products, selectedProducts)

  return (
    <Accordion.Item
      forceMountContent
      required
      value="prices"
      title="Ceny"
      description="Możesz nadpisać ceny produktów dodanych tutaj"
      tooltip="Define the price overrides for the price list"
    >
      <ProductPrices
        products={mergedProducts}
        isLoading={isLoading}
        setProducts={setSelectedProducts}
        onFileChosen={console.log}
      />
    </Accordion.Item>
  )
}

export default PricesSection
