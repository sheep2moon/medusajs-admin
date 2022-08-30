import React from "react"
import InputField from "../../../../components/molecules/input"
import Accordion from "../../../../components/organisms/accordion"
import { usePriceListForm } from "../form/pricing-form-context"

const General = () => {
  const { register } = usePriceListForm()

  return (
    <Accordion.Item
      forceMountContent
      required
      title="Ogólne"
      tooltip="Ogólne informacje o liście cen."
      value="general"
    >
      <div className="flex flex-col gap-y-small group-radix-state-open:mt-5 accordion-margin-transition">
        <InputField
          label="Nazwa"
          name="name"
          required
          placeholder="Black Friday..."
          ref={register({ required: "Nazwa jest wymagana" })}
        />
        <InputField
          label="Opis"
          name="description"
          required
          placeholder="Z okazji międzynarodowego święta wyprzedaży..."
          ref={register({ required: "Opis jest wymagany" })}
        />
      </div>
    </Accordion.Item>
  )
}

export default General
