import React from "react"
import Modal from "../../../../components/molecules/modal"
import { DiscountConditionType } from "../../types"
import EditCollectionConditionSelector from "./condition-tables/edit-condition-tables/collections"
import EditCustomerGroupConditionSelector from "./condition-tables/edit-condition-tables/customer-groups"
import EditProductConditionSelector from "./condition-tables/edit-condition-tables/products"
import EditTagConditionSelector from "./condition-tables/edit-condition-tables/tags"
import EditTypeConditionSelector from "./condition-tables/edit-condition-tables/types"

type EditConditionsModalProps = {
  onClose: () => void
  view: DiscountConditionType
}

const EditConditionsModal: React.FC<EditConditionsModalProps> = ({
  onClose,
  view,
}) => {
  return (
    <Modal open handleClose={onClose}>
      <Modal.Header handleClose={onClose}>
        <h1 className="inter-xlarge-semibold">Edit {getTitle(view)}</h1>
      </Modal.Header>
      <Modal.Body>
        <Content view={view} onClose={onClose} />
      </Modal.Body>
    </Modal>
  )
}

const getTitle = (view: DiscountConditionType) => {
  switch (view) {
    case DiscountConditionType.PRODUCTS:
      return "produkty"
    case DiscountConditionType.CUSTOMER_GROUPS:
      return "grupy"
    case DiscountConditionType.PRODUCT_TAGS:
      return "tagi"
    case DiscountConditionType.PRODUCT_COLLECTIONS:
      return "kolekcje"
    case DiscountConditionType.PRODUCT_TYPES:
      return "typy"
  }
}

const Content = ({ view, onClose }: EditConditionsModalProps) => {
  switch (view) {
    case DiscountConditionType.PRODUCTS:
      return <EditProductConditionSelector onClose={onClose} />
    case DiscountConditionType.CUSTOMER_GROUPS:
      return <EditCustomerGroupConditionSelector onClose={onClose} />
    case DiscountConditionType.PRODUCT_COLLECTIONS:
      return <EditCollectionConditionSelector onClose={onClose} />
    case DiscountConditionType.PRODUCT_TAGS:
      return <EditTagConditionSelector onClose={onClose} />
    case DiscountConditionType.PRODUCT_TYPES:
      return <EditTypeConditionSelector onClose={onClose} />
  }
}

export default EditConditionsModal
