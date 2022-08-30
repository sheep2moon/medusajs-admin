import { Discount } from "@medusajs/medusa"
import { useAdminDiscount, useAdminDiscountRemoveCondition } from "medusa-react"
import React from "react"
import TrashIcon from "../../../../components/fundamentals/icons/trash-icon"
import { ActionType } from "../../../../components/molecules/actionables"
import useNotification from "../../../../hooks/use-notification"
import { getErrorMessage } from "../../../../utils/error-messages"
import { DiscountConditionType } from "../../types"

export const useDiscountConditions = (discount: Discount) => {
  const { refetch } = useAdminDiscount(discount.id)
  const { mutate } = useAdminDiscountRemoveCondition(discount.id)
  const notification = useNotification()

  const removeCondition = (conditionId: string) => {
    mutate(conditionId, {
      onSuccess: () => {
        notification("Sukces", "Warunek usunięty", "success")
        refetch()
      },
      onError: (error) => {
        notification("Błąd", getErrorMessage(error), "error")
      },
    })
  }

  const itemized = discount.rule.conditions.map((condition) => ({
    type: condition.type,
    title: getTitle(condition.type),
    description: getDescription(condition.type),
    actions: [
      {
        label: "Usuń warunek",
        icon: <TrashIcon size={16} />,
        variant: "danger",
        onClick: () => removeCondition(condition.id),
      },
    ] as ActionType[],
  }))

  return itemized
}

const getTitle = (type: DiscountConditionType) => {
  switch (type) {
    case DiscountConditionType.PRODUCTS:
      return "Produkt"
    case DiscountConditionType.PRODUCT_COLLECTIONS:
      return "Kolekcja"
    case DiscountConditionType.PRODUCT_TAGS:
      return "Tag"
    case DiscountConditionType.PRODUCT_TYPES:
      return "Typ"
    case DiscountConditionType.CUSTOMER_GROUPS:
      return "Grupa klientów"
  }
}

const getDescription = (type: DiscountConditionType) => {
  switch (type) {
    case DiscountConditionType.PRODUCTS:
      return "Zniżka zastosowana do wybranych produktów"
    case DiscountConditionType.PRODUCT_COLLECTIONS:
      return "Zniżka zastosowana do wybranych kolekcji"
    case DiscountConditionType.PRODUCT_TAGS:
      return "Zniżka zastosowana do wybranych tagów"
    case DiscountConditionType.PRODUCT_TYPES:
      return "Zniżka zastosowana do wybranych typów produktu"
    case DiscountConditionType.CUSTOMER_GROUPS:
      return "Zniżka zastosowana do wybranych grup klientów"
  }
}
