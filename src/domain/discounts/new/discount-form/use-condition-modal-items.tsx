import React, { useContext, useMemo } from "react"
import { LayeredModalContext } from "../../../../components/molecules/modal/layered-modal"
import { DiscountConditionType } from "../../types"
import AddCollectionConditionSelector from "./condition-tables/add-condition-tables/collections"
import AddCustomerGroupConditionSelector from "./condition-tables/add-condition-tables/customer-groups"
import AddProductConditionSelector from "./condition-tables/add-condition-tables/products"
import AddTagConditionSelector from "./condition-tables/add-condition-tables/tags"
import AddTypeConditionSelector from "./condition-tables/add-condition-tables/types"
import DetailsCollectionConditionSelector from "./condition-tables/details-condition-tables/collections"
import DetailsCustomerGroupConditionSelector from "./condition-tables/details-condition-tables/customer-groups"
import DetailsProductConditionSelector from "./condition-tables/details-condition-tables/products"
import DetailsTagConditionSelector from "./condition-tables/details-condition-tables/tags"
import DetailsTypeConditionSelector from "./condition-tables/details-condition-tables/types"

export type ConditionItem = {
  label: string
  value: DiscountConditionType
  description: string
  onClick: () => void
}

type UseConditionModalItemsProps = {
  onClose: () => void
  isDetails?: boolean
}

const useConditionModalItems = ({
  isDetails,
  onClose,
}: UseConditionModalItemsProps) => {
  const layeredModalContext = useContext(LayeredModalContext)

  const items: ConditionItem[] = useMemo(
    () => [
      {
        label: "Produkt",
        value: DiscountConditionType.PRODUCTS,
        description: "Tylko dla wybranych produktów",
        onClick: () =>
          layeredModalContext.push({
            title: "Wybierz produkty",
            onBack: () => layeredModalContext.pop(),
            view: isDetails ? (
              <DetailsProductConditionSelector onClose={onClose} />
            ) : (
              <AddProductConditionSelector onClose={onClose} />
            ),
          }),
      },
      {
        label: "Grupa klientów",
        value: DiscountConditionType.CUSTOMER_GROUPS,
        description: "Tylko dla wybranych grup klientów",
        onClick: () => {
          layeredModalContext.push({
            title: "Wybierz grupy",
            onBack: () => layeredModalContext.pop(),
            view: isDetails ? (
              <DetailsCustomerGroupConditionSelector onClose={onClose} />
            ) : (
              <AddCustomerGroupConditionSelector onClose={onClose} />
            ),
          })
        },
      },
      {
        label: "Tag",
        value: DiscountConditionType.PRODUCT_TAGS,
        description: "Tylko dla wybranych tagów",
        onClick: () =>
          layeredModalContext.push({
            title: "Wybierz tagi",
            onBack: () => layeredModalContext.pop(),
            view: isDetails ? (
              <DetailsTagConditionSelector onClose={onClose} />
            ) : (
              <AddTagConditionSelector onClose={onClose} />
            ),
          }),
      },
      {
        label: "Kolekcje",
        value: DiscountConditionType.PRODUCT_COLLECTIONS,
        description: "Tylko dla wybranych kolekcji",
        onClick: () =>
          layeredModalContext.push({
            title: "Wybierz kolekcje",
            onBack: () => layeredModalContext.pop(),
            view: isDetails ? (
              <DetailsCollectionConditionSelector onClose={onClose} />
            ) : (
              <AddCollectionConditionSelector onClose={onClose} />
            ),
          }),
      },
      {
        label: "Typ",
        value: DiscountConditionType.PRODUCT_TYPES,
        description: "Tylko dla wybranych typów produktów",
        onClick: () =>
          layeredModalContext.push({
            title: "Wybierz typy",
            onBack: () => layeredModalContext.pop(),
            view: isDetails ? (
              <DetailsTypeConditionSelector onClose={onClose} />
            ) : (
              <AddTypeConditionSelector onClose={onClose} />
            ),
          }),
      },
    ],
    [isDetails]
  )

  return items
}

export default useConditionModalItems
