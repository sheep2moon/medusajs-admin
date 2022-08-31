import { Discount } from "@medusajs/medusa"
import { useAdminRegions, useAdminUpdateDiscount } from "medusa-react"
import React, { useEffect, useMemo } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"
import Button from "../../../../components/fundamentals/button"
import InputField from "../../../../components/molecules/input"
import Modal from "../../../../components/molecules/modal"
import Select from "../../../../components/molecules/select"
import Textarea from "../../../../components/molecules/textarea"
import CurrencyInput from "../../../../components/organisms/currency-input"
import useNotification from "../../../../hooks/use-notification"
import { Option } from "../../../../types/shared"
import { getErrorMessage } from "../../../../utils/error-messages"

type EditGeneralProps = {
  discount: Discount
  onClose: () => void
}

type GeneralForm = {
  regions: Option[]
  code: string
  description: string
  value: number
}

const EditGeneral: React.FC<EditGeneralProps> = ({ discount, onClose }) => {
  const { mutate, isLoading } = useAdminUpdateDiscount(discount.id)
  const notification = useNotification()

  const { control, handleSubmit, reset, register } = useForm<GeneralForm>({
    defaultValues: mapGeneral(discount),
  })

  const onSubmit = (data: GeneralForm) => {
    mutate(
      {
        regions: data.regions.map((r) => r.value),
        code: data.code,
        rule: {
          id: discount.rule.id,
          description: data.description,
          value: data.value,
          allocation: discount.rule.allocation,
        },
      },
      {
        onSuccess: ({ discount }) => {
          notification("Sukces", "Zniżka zaktualizowana pomyślnie", "success")
          reset(mapGeneral(discount))
          onClose()
        },
        onError: (error) => {
          notification("Błąd", getErrorMessage(error), "error")
        },
      }
    )
  }

  useEffect(() => {
    reset(mapGeneral(discount))
  }, [discount])

  const type = discount.rule.type

  const { regions } = useAdminRegions()

  const regionOptions = useMemo(() => {
    return regions
      ? regions.map((r) => ({
          label: r.name,
          value: r.id,
        }))
      : []
  }, [regions])

  const selectedRegions = useWatch<Option[]>({
    control,
    name: "regions",
  })

  const fixedCurrency = useMemo(() => {
    if (type === "fixed" && selectedRegions?.length) {
      return regions?.find((r) => r.id === selectedRegions[0].value)
        ?.currency_code
    }
  }, [selectedRegions, type, regions])

  return (
    <Modal handleClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Modal.Header handleClose={onClose}>
            <h1 className="inter-xlarge-semibold">
              Edytuj podstawowe informacje
            </h1>
          </Modal.Header>
          <Modal.Content isLargeModal>
            <Controller
              name="regions"
              control={control}
              rules={{
                required: "Wybierz przynajmniej jeden region",
                validate: (value) =>
                  Array.isArray(value) ? value.length > 0 : !!value,
              }}
              render={({ value, onChange }) => {
                return (
                  <Select
                    value={value}
                    onChange={(value) => {
                      onChange(type === "fixed" ? [value] : value)
                    }}
                    label="Wybierz prawidłowy region"
                    isMultiSelect={type !== "fixed"}
                    hasSelectAll={type !== "fixed"}
                    enableSearch
                    required
                    options={regionOptions}
                  />
                )
              }}
            />
            <div className="flex gap-x-base gap-y-base my-base">
              <InputField
                label="Kod"
                className="flex-1"
                placeholder="FISHING10"
                required
                name="code"
                ref={register({ required: "Kod jest wymagany" })}
              />

              {type !== "free_shipping" && (
                <>
                  {type === "fixed" ? (
                    <div className="flex-1">
                      <CurrencyInput
                        size="small"
                        currentCurrency={fixedCurrency ?? "USD"}
                        readOnly
                        hideCurrency
                      >
                        <Controller
                          name="value"
                          control={control}
                          rules={{
                            required: "Wartość jest wymagana",
                            min: 1,
                          }}
                          render={({ value, onChange }) => {
                            return (
                              <CurrencyInput.AmountInput
                                label={"Wartość"}
                                required
                                amount={value}
                                onChange={onChange}
                              />
                            )
                          }}
                        />
                      </CurrencyInput>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <InputField
                        label="Procent"
                        min={0}
                        required
                        type="number"
                        placeholder="10"
                        prefix={"%"}
                        name="value"
                        ref={register({
                          required: "Procent jest wymagany",
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="text-grey-50 inter-small-regular flex flex-col mb-6">
              <span>Kod który klient może wpisać przy zamówieniu.</span>
              <span>Tylko wielkie litery oraz liczby dozwolone.</span>
            </div>
            <Textarea
              label="Opis"
              required
              placeholder="Wyprzedaż 2023"
              rows={1}
              name="description"
              ref={register({
                required: "Opis jest wymagany",
              })}
            />
          </Modal.Content>
          <Modal.Footer>
            <div className="gap-x-xsmall flex items-center justify-end w-full">
              <Button
                variant="ghost"
                size="small"
                className="min-w-[128px]"
                type="button"
                onClick={onClose}
              >
                Anuluj
              </Button>
              <Button
                variant="primary"
                size="small"
                className="min-w-[128px]"
                type="submit"
                loading={isLoading}
              >
                Zapisz
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Body>
      </form>
    </Modal>
  )
}

const mapGeneral = (discount: Discount): GeneralForm => {
  return {
    regions: discount.regions.map((r) => ({ label: r.name, value: r.id })),
    code: discount.code,
    description: discount.rule.description,
    value: discount.rule.value,
  }
}

export default EditGeneral
