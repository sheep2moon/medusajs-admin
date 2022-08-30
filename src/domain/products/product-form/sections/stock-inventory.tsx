import React from "react"
import { Controller } from "react-hook-form"
import Checkbox from "../../../../components/atoms/checkbox"
import IconTooltip from "../../../../components/molecules/icon-tooltip"
import Input from "../../../../components/molecules/input"
import Select from "../../../../components/molecules/select"
import BodyCard from "../../../../components/organisms/body-card"
import { countries as countryData } from "../../../../utils/countries"
import { numberOrNull } from "../../../../utils/form-helpers"
import { useProductForm } from "../form/product-form-context"

const StockAndInventory = () => {
  const { isVariantsView, register, control } = useProductForm()
  const countryOptions = countryData.map((c) => ({
    label: c.name,
    value: c.name,
  }))

  return (
    <BodyCard title="Dane Magazynowe" subtitle="">
      <div className="mt-large">
        {!isVariantsView && (
          <>
            <div className="flex items-center mb-base">
              <h6 className="inter-base-semibold text-grey-90 mr-1.5">
                General
              </h6>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-large">
              <Input
                label="Numer jednostki magazynowej (SKU)"
                name="sku"
                placeholder="SUN-G, JK1234..."
                ref={register}
              />
              <Input
                label="Kod kreskowy (EAN)"
                name="ean"
                placeholder="1231231231234..."
                ref={register}
              />
              <Input
                label="Dostępna ilość"
                name="inventory_quantity"
                type="number"
                placeholder="100"
                ref={register({ setValueAs: numberOrNull })}
              />
              <Input
                label="Materiał"
                name="material"
                ref={register}
                placeholder="Wełna..."
              />
            </div>
          </>
        )}
        {!isVariantsView && (
          <div className="flex items-center gap-4 mb-xlarge">
            <div className="flex item-center gap-x-1.5">
              <Checkbox
                name="manage_inventory"
                label="Zarządzaj magazynem"
                ref={register}
              />
              <IconTooltip
                content={
                  "Jeżeli zaznaczone, sklep będzie regulował ilość na podstawie zamówień i zwrotów."
                }
              />
            </div>
            <div className="flex item-center gap-x-1.5">
              <Checkbox
                name="allow_backorder"
                ref={register}
                label="Zezwól na zamawianie przy ilości 0"
              />
              <IconTooltip
                content={
                  "Klient będzie mógł zamówić ten produkt nawet gdy ilość w magazynie wynosić będzie 0."
                }
              />
            </div>
          </div>
        )}
        <div className="flex items-center mb-base">
          <h6 className="inter-base-semibold text-grey-90 mr-1.5">Wymiary</h6>
        </div>
        <div className="flex gap-x-8">
          <div className="flex-1 grid grid-cols-2 gap-x-2 gap-y-4 mb-large">
            <Input
              type="number"
              label="Wysokość"
              name="height"
              ref={register({ setValueAs: numberOrNull })}
              min={0}
              placeholder="100..."
            />
            <Input
              type="number"
              label="Szerokość"
              name="width"
              ref={register({ setValueAs: numberOrNull })}
              placeholder="100..."
              min={0}
            />
            <Input
              type="number"
              label="Długość"
              name="length"
              ref={register({ setValueAs: numberOrNull })}
              placeholder="100..."
              min={0}
            />
            <Input
              type="number"
              label="Waga"
              name="weight"
              ref={register({ setValueAs: numberOrNull })}
              placeholder="100..."
              min={0}
            />
          </div>
          <div className="flex-1 grid grid-cols-2 gap-x-2 gap-y-4 mb-large">
            <Input
              label="Kod MID"
              name="mid_code"
              ref={register}
              placeholder="100..."
            />
            <Input
              label="Kod HS"
              name="hs_code"
              ref={register}
              placeholder="100..."
            />
            <Controller
              control={control}
              name="origin_country"
              render={({ onChange, value }) => {
                return (
                  <Select
                    enableSearch
                    label="Kraj pochodzenia"
                    placeholder="Wybierz kraj"
                    options={countryOptions}
                    value={value}
                    onChange={onChange}
                  />
                )
              }}
            />
          </div>
        </div>
      </div>
    </BodyCard>
  )
}

export default StockAndInventory
