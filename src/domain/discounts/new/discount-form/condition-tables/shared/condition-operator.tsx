import React from "react"
import RadioGroup from "../../../../../../components/organisms/radio-group"
import { DiscountConditionOperator } from "../../../../types"

type ConditionOperatorProps = {
  value: "in" | "not_in"
  onChange: (value: DiscountConditionOperator) => void
}

const ConditionOperator: React.FC<ConditionOperatorProps> = ({
  value,
  onChange,
}) => {
  return (
    <RadioGroup.Root
      value={value}
      onValueChange={onChange}
      className="grid grid-cols-2 gap-base mb-4"
    >
      <RadioGroup.Item
        className="w-full"
        label="Wybrane"
        value={DiscountConditionOperator.IN}
        description="Zastosowane do wybranych przedmiotów."
      />
      <RadioGroup.Item
        className="w-full"
        label="Poza wybranymi"
        value={DiscountConditionOperator.NOT_IN}
        description="Zastosowane do wszystkich przedmiotów poza wybranymi."
      />
    </RadioGroup.Root>
  )
}

export default ConditionOperator
