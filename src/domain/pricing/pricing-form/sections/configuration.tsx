import { PriceList } from "@medusajs/medusa"
import clsx from "clsx"
import { useAdminCustomerGroups } from "medusa-react"
import React, { useState } from "react"
import { Controller } from "react-hook-form"
import DatePicker from "../../../../components/atoms/date-picker/date-picker"
import TimePicker from "../../../../components/atoms/date-picker/time-picker"
import Switch from "../../../../components/atoms/switch"
import Select from "../../../../components/molecules/select"
import Accordion from "../../../../components/organisms/accordion"
import { usePriceListForm } from "../form/pricing-form-context"
import { ConfigurationField } from "../types"

type ConfigurationProps = {
  priceList?: PriceList
}

const checkForEnabledConfigs = (
  config: Record<ConfigurationField, unknown>
): string[] => {
  const enabledConfigs: string[] = []

  if (config.customer_groups?.length > 0) {
    enabledConfigs.push(ConfigurationField.CUSTOMER_GROUPS)
  }
  if (config.starts_at) {
    enabledConfigs.push(ConfigurationField.STARTS_AT)
  }
  if (config.ends_at) {
    enabledConfigs.push(ConfigurationField.ENDS_AT)
  }

  return enabledConfigs
}

const Configuration: React.FC<ConfigurationProps> = () => {
  const { customer_groups, isLoading } = useAdminCustomerGroups()
  const {
    control,
    handleConfigurationSwitch,
    configFields,
  } = usePriceListForm()
  const [openItems, setOpenItems] = useState<string[]>(
    checkForEnabledConfigs(configFields)
  )

  return (
    <Accordion.Item
      forceMountContent
      title="Konfiguracja"
      tooltip="Opcjonalna konfiguracja cennika"
      value="configuration"
      description="Ceny zostaną nadpisane po opublikowaniu cennika na zawsze."
    >
      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={(values) => {
          handleConfigurationSwitch(values)
          setOpenItems(values)
        }}
      >
        <div className="mt-5">
          <Accordion.Item
            headingSize="medium"
            forceMountContent
            className="border-b-0"
            title="Nadpisanie cen ma date startu?"
            subtitle="Zaplanuj zmianę cen na przyszłość."
            value="starts_at"
            customTrigger={
              <Switch checked={openItems.indexOf("starts_at") > -1} />
            }
          >
            <div
              className={clsx(
                "flex items-center gap-xsmall accordion-margin-transition",
                {
                  "mt-4": openItems.indexOf("starts_at") > -1,
                }
              )}
            >
              <Controller
                name="starts_at"
                control={control}
                render={({ value, onChange }) => {
                  return (
                    <>
                      <DatePicker
                        date={value}
                        label="Data startu"
                        onSubmitDate={onChange}
                      />
                      <TimePicker
                        date={value}
                        label="Data startu"
                        onSubmitDate={onChange}
                      />
                    </>
                  )
                }}
              />
            </div>
          </Accordion.Item>
          <Accordion.Item
            headingSize="medium"
            forceMountContent
            className="border-b-0"
            title="Nadpisanie cen ma date końca?"
            subtitle="Zaplanuj koniec zmiany cen w przyszłości."
            value="ends_at"
            customTrigger={
              <Switch checked={openItems.indexOf("ends_at") > -1} />
            }
          >
            <div
              className={clsx(
                "flex items-center gap-xsmall accordion-margin-transition",
                {
                  "mt-4": openItems.indexOf("ends_at") > -1,
                }
              )}
            >
              <Controller
                name="ends_at"
                control={control}
                render={({ value, onChange }) => {
                  return (
                    <>
                      <DatePicker
                        date={value}
                        label="Data końca"
                        onSubmitDate={onChange}
                      />
                      <TimePicker
                        date={value}
                        label="Data końca"
                        onSubmitDate={onChange}
                      />
                    </>
                  )
                }}
              />
            </div>
          </Accordion.Item>
          <Accordion.Item
            headingSize="medium"
            forceMountContent
            className="border-b-0"
            title="Dostępność dla klientów"
            subtitle="Ustal które grupy klientów mają dostęp do tego cennika."
            value="customer_groups"
            customTrigger={
              <Switch checked={openItems.indexOf("customer_groups") > -1} />
            }
          >
            <Controller
              name="customer_groups"
              control={control}
              css={{ width: "100%" }}
              render={({ value, onChange, ref }) => {
                return (
                  <div
                    className={clsx(
                      "flex items-center gap-xsmall accordion-margin-transition w-full",
                      {
                        "mt-4": openItems.indexOf("customer_groups") > -1,
                      }
                    )}
                  >
                    <Select
                      value={value}
                      label="Grupy klientów"
                      onChange={onChange}
                      isMultiSelect
                      fullWidth
                      enableSearch
                      hasSelectAll
                      isLoading={isLoading}
                      options={
                        customer_groups?.map((cg) => ({
                          label: cg.name,
                          value: cg.id,
                        })) || []
                      }
                      ref={ref}
                    />
                  </div>
                )
              }}
            />
          </Accordion.Item>
        </div>
      </Accordion>
    </Accordion.Item>
  )
}

export default Configuration
