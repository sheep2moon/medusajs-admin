import React from "react"
import { Controller } from "react-hook-form"
import Accordion from "../../../../components/organisms/accordion"
import RadioGroup from "../../../../components/organisms/radio-group"
import { usePriceListForm } from "../form/pricing-form-context"
import { PriceListType } from "../types"

const Type = () => {
  const { control } = usePriceListForm()

  return (
    <Accordion.Item
      forceMountContent
      required
      value="type"
      title="Typ cennika"
      description="Wybierz typ cennika"
      tooltip="Przy nadpisaniu cen, użytkownik nie widzi, że cena jest zniżkowa."
    >
      <Controller
        name="type"
        control={control}
        rules={{ required: true }}
        render={({ onChange, value }) => {
          return (
            <RadioGroup.Root
              value={value}
              onValueChange={onChange}
              className="flex items-center gap-base group-radix-state-open:mt-5 accordion-margin-transition"
            >
              <RadioGroup.Item
                value={PriceListType.SALE}
                className="flex-1"
                label="Wyprzedaż"
                description="Użyj jeśli tworzysz cennik wyprzedaży."
              />
              <RadioGroup.Item
                value={PriceListType.OVERRIDE}
                className="flex-1"
                label="Nadpisanie"
                description="Użyj aby nadpisać ceny."
              />
            </RadioGroup.Root>
          )
        }}
      />
    </Accordion.Item>
  )
}

export default Type
