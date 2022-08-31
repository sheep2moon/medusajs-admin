import clsx from "clsx"
import React from "react"
import { Controller, useWatch } from "react-hook-form"
import RadioGroup from "../../../../../components/organisms/radio-group"
import { DiscountRuleType } from "../../../types"
import { useDiscountForm } from "../form/discount-form-context"

const PromotionType = () => {
  const { control } = useDiscountForm()

  const regions = useWatch({
    control,
    name: "regions",
  })

  return (
    <Controller
      name="rule.type"
      control={control}
      rules={{ required: true }}
      render={({ onChange, value }) => {
        return (
          <RadioGroup.Root
            value={value}
            onValueChange={onChange}
            className={clsx("flex items-center gap-base mt-base px-1")}
          >
            <RadioGroup.Item
              value={DiscountRuleType.PERCENTAGE}
              className="flex-1"
              label="Procent"
              description={"Zniżka na zamówienie w %"}
            />
            <RadioGroup.Item
              value={DiscountRuleType.FIXED}
              className="flex-1"
              label="Konkretna wartość"
              description={"Zniżka na pewną wartość"}
              disabled={Array.isArray(regions) && regions.length > 1}
              disabledTooltip="Możesz wybrać tylko jeden region"
            />
            <RadioGroup.Item
              value={DiscountRuleType.FREE_SHIPPING}
              className="flex-1"
              label="Darmowa dostawa"
              description={"Nadpisz cenę dostawy"}
            />
          </RadioGroup.Root>
        )
      }}
    />
  )
}

export default PromotionType
