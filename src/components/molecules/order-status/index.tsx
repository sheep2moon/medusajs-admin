import React from "react"
import StatusIndicator from "../../fundamentals/status-indicator"

type PaymentStatusProps = {
  paymentStatus: string
}

type FulfillmentStatusProps = {
  fulfillmentStatus: string
}

type OrderStatusProps = {
  orderStatus: string
}

type ReturnStatusProps = {
  returnStatus: string
}

type RefundStatusProps = {
  refundStatus: string
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ paymentStatus }) => {
  switch (paymentStatus) {
    case "captured":
      return <StatusIndicator title="Zapłacone" variant="success" />
    case "awaiting":
      return <StatusIndicator title="Oczekuje" variant="default" />
    case "not_paid":
      return <StatusIndicator title="Nie zapłacone" variant="default" />
    case "canceled":
      return <StatusIndicator title="Anulowane" variant="danger" />
    case "requires_action":
      return <StatusIndicator title="Konieczność działania" variant="danger" />
    default:
      return null
  }
}

const OrderStatus: React.FC<OrderStatusProps> = ({ orderStatus }) => {
  switch (orderStatus) {
    case "completed":
      return <StatusIndicator title="Zakończone" variant="success" />
    case "pending":
      return <StatusIndicator title="Przetwarzane" variant="default" />
    case "canceled":
      return <StatusIndicator title="Anulowane" variant="danger" />
    case "requires_action":
      return <StatusIndicator title="Odrzucone" variant="danger" />
    default:
      return null
  }
}

const FulfillmentStatus: React.FC<FulfillmentStatusProps> = ({
  fulfillmentStatus,
}) => {
  switch (fulfillmentStatus) {
    case "shipped":
      return <StatusIndicator title="Dostarczone" variant="success" />
    case "fulfilled":
      return <StatusIndicator title="Zrealizowane" variant="warning" />
    case "canceled":
      return <StatusIndicator title="Anulowane" variant="danger" />
    case "partially_fulfilled":
      return (
        <StatusIndicator title="Częściowo zrealizowane" variant="warning" />
      )
    case "not_fulfilled":
      return <StatusIndicator title="Nie zrealizowane" variant="default" />
    case "requires_action":
      return <StatusIndicator title="Konieczność działania" variant="danger" />
    default:
      return null
  }
}

const ReturnStatus: React.FC<ReturnStatusProps> = ({ returnStatus }) => {
  switch (returnStatus) {
    case "received":
      return <StatusIndicator title="Otrzymano" variant="success" />
    case "requested":
      return <StatusIndicator title="Wysłano żądanie" variant="default" />
    case "canceled":
      return <StatusIndicator title="Anulowano" variant="danger" />
    case "requires_action":
      return <StatusIndicator title="Konieczność działania" variant="danger" />
    default:
      return null
  }
}

const RefundStatus: React.FC<RefundStatusProps> = ({ refundStatus }) => {
  switch (refundStatus) {
    case "na":
      return <StatusIndicator title="Brak danych" variant="default" />
    case "not_refunded":
      return <StatusIndicator title="Nie zwrócono" variant="default" />
    case "refunded":
      return <StatusIndicator title="Zwrócono" variant="success" />
    default:
      return null
  }
}

export {
  PaymentStatus,
  OrderStatus,
  FulfillmentStatus,
  ReturnStatus,
  RefundStatus,
}
