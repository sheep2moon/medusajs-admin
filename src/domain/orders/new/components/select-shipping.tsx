import React, { useContext, useEffect } from "react"
import Button from "../../../../components/fundamentals/button"
import AlertIcon from "../../../../components/fundamentals/icons/alert-icon"
import TrashIcon from "../../../../components/fundamentals/icons/trash-icon"
import { SteppedContext } from "../../../../components/molecules/modal/stepped-modal"
import Select from "../../../../components/molecules/select"
import CurrencyInput from "../../../../components/organisms/currency-input"
import { extractOptionPrice } from "../../../../utils/prices"

const SelectShippingMethod = ({
  shippingOptions,
  handleOptionSelect,
  shippingOption,
  showCustomPrice,
  setShowCustomPrice,
  setCustomOptionPrice,
  customOptionPrice,
  region,
}) => {
  const { disableNextPage, enableNextPage } = useContext(SteppedContext)

  useEffect(() => {
    if (!shippingOption) {
      disableNextPage()
    }
  }, [])

  return (
    <div className="min-h-[705px]">
      <span className="inter-base-semibold">
        Metoda dostawy{" "}
        <span className="inter-base-regular text-grey-50">
          (Do {region.name})
        </span>
      </span>

      {!shippingOptions?.length ? (
        <div className="inter-small-regular mt-6 p-4 text-orange-50 bg-orange-5 rounded-rounded flex text-grey-50">
          <div className="h-full mr-3">
            <AlertIcon size={20} />
          </div>
          <div className="flex flex-col">
            <span className="inter-small-semibold">Uwaga!</span>
            Nie masz żadnych opcji realizacji zamówienia bez dostawy.
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <Select
            label="Wybierz metodę dostawy"
            onChange={(so) => {
              handleOptionSelect(so)
              enableNextPage()
            }}
            value={
              shippingOption
                ? {
                    value: shippingOption.id,
                    label: `${shippingOption.name} - ${extractOptionPrice(
                      shippingOption.amount,
                      region
                    )}`,
                  }
                : null
            } //
            options={
              shippingOptions?.map((so) => ({
                value: so.id,
                label: `${so.name} - ${extractOptionPrice(so.amount, region)}`,
              })) || []
            }
          />
          <div className="mt-4">
            {!showCustomPrice && (
              <div className="w-full flex justify-end">
                <Button
                  variant="ghost"
                  size="small"
                  className="w-[125px] border border-grey-20"
                  disabled={!shippingOption}
                  onClick={() => setShowCustomPrice(true)}
                >
                  Ustaw własną cenę
                </Button>
              </div>
            )}
            {showCustomPrice && (
              <div className="flex items-center">
                <div className="w-full">
                  <CurrencyInput
                    readOnly
                    size="small"
                    currentCurrency={region.currency_code}
                  >
                    <CurrencyInput.AmountInput
                      label="Własna cena"
                      value={customOptionPrice}
                      onChange={(value) => setCustomOptionPrice(value)}
                    />
                  </CurrencyInput>
                </div>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => setShowCustomPrice(false)}
                  className="ml-8 text-grey-40 w-8 h-8"
                >
                  <TrashIcon size={20} />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SelectShippingMethod
