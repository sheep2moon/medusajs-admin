import { RouteComponentProps } from "@reach/router"
import { useAdminCustomer } from "medusa-react"
import moment from "moment"
import React, { useState } from "react"
import Avatar from "../../../components/atoms/avatar"
import Spinner from "../../../components/atoms/spinner"
import EditIcon from "../../../components/fundamentals/icons/edit-icon"
import TrashIcon from "../../../components/fundamentals/icons/trash-icon"
import StatusDot from "../../../components/fundamentals/status-indicator"
import Actionables from "../../../components/molecules/actionables"
import Breadcrumb from "../../../components/molecules/breadcrumb"
import BodyCard from "../../../components/organisms/body-card"
import RawJSON from "../../../components/organisms/raw-json"
import CustomerOrdersTable from "../../../components/templates/customer-orders-table"
import EditCustomerModal from "./edit"

type CustomerDetailProps = {
  id: string
} & RouteComponentProps

const CustomerDetail: React.FC<CustomerDetailProps> = ({ id }) => {
  const { customer, isLoading } = useAdminCustomer(id, {})
  const [showEdit, setShowEdit] = useState(false)

  const customerName = () => {
    if (customer?.first_name && customer?.last_name) {
      return `${customer.first_name} ${customer.last_name}`
    } else {
      return customer?.email
    }
  }

  const actions = [
    {
      label: "Edytuj",
      onClick: () => setShowEdit(true),
      icon: <EditIcon size={20} />,
    },
    {
      label: "Usuń (jeszcze nie działa)",
      onClick: () => console.log("TODO: delete customer"),
      variant: "danger",
      icon: <TrashIcon size={20} />,
    },
  ]

  return (
    <div>
      <Breadcrumb
        currentPage={"Szczególy klienta"}
        previousBreadcrumb={"Klienci"}
        previousRoute="/a/customers"
      />
      <BodyCard className={"h-auto w-full pt-[100px] mb-4 relative"}>
        <div className="h-[120px] w-full absolute top-0 right-0 left-0 bg-gradient-to-b from-fuschia-20 z-0" />
        <div className="flex flex-col grow overflow-y-auto">
          <div className="w-[64px] h-[64px] mb-4">
            <Avatar
              user={customer}
              font="inter-2xlarge-semibold"
              color="bg-fuschia-40"
            />
          </div>
          <div className="flex items-center justify-between">
            <h1 className="inter-xlarge-semibold text-grey-90 truncate max-w-[50%]">
              {customerName()}
            </h1>
            <Actionables actions={actions} />
          </div>
          <h3 className="inter-small-regular pt-1.5 text-grey-50">
            {customer?.email}
          </h3>
        </div>
        <div className="flex mt-6 space-x-6 divide-x">
          <div className="flex flex-col">
            <div className="inter-smaller-regular text-grey-50 mb-1">
              Stworzono
            </div>
            <div>{moment(customer?.created_at).format("DD MMM YYYY")}</div>
          </div>
          <div className="flex flex-col pl-6">
            <div className="inter-smaller-regular text-grey-50 mb-1">Phone</div>
            <div className="truncate max-w-[200px]">
              {customer?.phone || "N/A"}
            </div>
          </div>
          <div className="flex flex-col pl-6">
            <div className="inter-smaller-regular text-grey-50 mb-1">
              Zamówienia
            </div>
            <div>{customer?.orders.length}</div>
          </div>
          <div className="flex flex-col pl-6 h-100">
            <div className="inter-smaller-regular text-grey-50 mb-1">User</div>
            <div className="flex justify-center items-center h-50">
              <StatusDot
                variant={customer?.has_account ? "success" : "danger"}
                title={customer?.has_account ? "True" : "False"}
              />
            </div>
          </div>
        </div>
      </BodyCard>
      <BodyCard
        title={`Zamówienia (${customer?.orders.length})`}
        subtitle="Przegląd zamówień klienta"
      >
        {isLoading || !customer ? (
          <div className="w-full pt-2xlarge flex items-center justify-center">
            <Spinner size={"large"} variant={"secondary"} />
          </div>
        ) : (
          <div className="flex grow  flex-col pt-2 mt-large">
            <CustomerOrdersTable customerId={customer.id} />
          </div>
        )}
      </BodyCard>
      <div className="mt-large">
        <RawJSON data={customer} title="klient-raw" />
      </div>

      {showEdit && (
        <EditCustomerModal
          customer={customer}
          handleClose={() => setShowEdit(false)}
        />
      )}
    </div>
  )
}

export default CustomerDetail
