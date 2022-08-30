import { useAdminStoreTaxProviders, useAdminUpdateRegion } from "medusa-react"
import React, { useEffect, useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import Checkbox from "../../../components/atoms/checkbox"
import Button from "../../../components/fundamentals/button"
import IconTooltip from "../../../components/molecules/icon-tooltip"
import Select from "../../../components/molecules/select"
import useNotification from "../../../hooks/use-notification"
import { getErrorMessage } from "../../../utils/error-messages"

export const RegionTaxForm = ({ region }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      automatic_taxes: region.automatic_taxes,
      gift_cards_taxable: region.gift_cards_taxable,
      tax_provider_id: {
        label:
          region.tax_provider_id === null
            ? "Systemowy"
            : region.tax_provider_id,
        value: region.tax_provider_id,
      },
    },
  })
  const notification = useNotification()

  useEffect(() => {
    reset({
      automatic_taxes: region.automatic_taxes,
      gift_cards_taxable: region.gift_cards_taxable,
      tax_provider_id: {
        label:
          region.tax_provider_id === null
            ? "Systemowy"
            : region.tax_provider_id,
        value: region.tax_provider_id,
      },
    })
  }, [region])

  const {
    isLoading: isProvidersLoading,
    tax_providers,
  } = useAdminStoreTaxProviders()

  const updateRegion = useAdminUpdateRegion(region.id)

  const providerOptions = useMemo(() => {
    if (tax_providers) {
      return [
        {
          label: "Systemowy",
          value: null,
        },
        ...tax_providers.map((tp) => ({
          label: tp.id,
          value: tp.id,
        })),
      ]
    }
    return [
      {
        label: "Systemowy",
        value: null,
      },
    ]
  }, [tax_providers])

  const onSubmit = (data) => {
    const toSubmit = {
      ...data,
      tax_provider_id: data.tax_provider_id.value,
    }

    updateRegion.mutate(toSubmit, {
      onSuccess: () => {
        notification(
          "Sukces",
          "Podatki regionu zostały zaktualizowane.",
          "success"
        )
      },
      onError: (error) => {
        notification("Błąd", getErrorMessage(error), "error")
      },
    })
  }

  return (
    <form className="flex flex-col flex-1" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-base flex-1">
        <Controller
          name="tax_provider_id"
          control={control}
          defaultValue={region.tax_provider_id}
          rules={{ required: true }}
          render={(props) => (
            <Select
              disabled={isProvidersLoading}
              label="Dostawca podatkowy"
              options={providerOptions}
              value={props.value}
              onChange={props.onChange}
              className="mb-base"
            />
          )}
        />
        <div className="flex item-center gap-x-1.5">
          <Checkbox
            className="inter-base-regular"
            name="automatic_taxes"
            ref={register}
            label="Obliczać podatek automatycznie?"
          />
          <IconTooltip
            content={
              "Jeżeli zaznaczone, podatki zostaną automatycznie zastosowane w koszyku w tym regionie. Jeżeli odznaczone, musisz manualnie obliczyć podatki podczas składania zamówienia."
            }
          />
        </div>
        <div className="flex item-center gap-x-1.5">
          <Checkbox
            className="inter-base-regular"
            name="gift_cards_taxable"
            ref={register}
            label="Zastosować do kart podarunkowych?"
          />
          <IconTooltip content={"W niektórych krajach jest to wymagane."} />
        </div>
      </div>
      <div className="flex justify-end">
        {isDirty && (
          <Button
            loading={updateRegion.isLoading}
            variant="primary"
            size="medium"
            type="submit"
          >
            Zapisz
          </Button>
        )}
      </div>
    </form>
  )
}
