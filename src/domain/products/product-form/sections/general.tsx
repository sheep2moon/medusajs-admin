import { useParams } from "@reach/router"
import { navigate } from "gatsby"
import {
  useAdminCollections,
  useAdminDeleteProduct,
  useAdminProductTypes,
  useAdminUpdateProduct,
} from "medusa-react"
import React from "react"
import { Controller } from "react-hook-form"
import Checkbox from "../../../../components/atoms/checkbox"
import TrashIcon from "../../../../components/fundamentals/icons/trash-icon"
import IconTooltip from "../../../../components/molecules/icon-tooltip"
import Input from "../../../../components/molecules/input"
import Select from "../../../../components/molecules/select"
import StatusSelector from "../../../../components/molecules/status-selector"
import TagInput from "../../../../components/molecules/tag-input"
import Textarea from "../../../../components/molecules/textarea"
import BodyCard from "../../../../components/organisms/body-card"
import RadioGroup from "../../../../components/organisms/radio-group"
import useImperativeDialog from "../../../../hooks/use-imperative-dialog"
import useNotification from "../../../../hooks/use-notification"
import { getErrorMessage } from "../../../../utils/error-messages"
import {
  SINGLE_PRODUCT_VIEW,
  useProductForm,
  VARIANTS_VIEW,
} from "../form/product-form-context"

const General = ({ showViewOptions = true, isEdit = false, product }) => {
  const {
    register,
    control,
    setViewType,
    viewType,
    setValue,
  } = useProductForm()
  const { product_types } = useAdminProductTypes(undefined, { cacheTime: 0 })
  const { collections } = useAdminCollections({ limit: 99, offset: 0 })

  const typeOptions =
    product_types?.map((tag) => ({ label: tag.value, value: tag.id })) || []
  const collectionOptions =
    collections?.map((collection) => ({
      label: collection.title,
      value: collection.id,
    })) || []

  const setNewType = (value: string) => {
    const newType = {
      label: value,
      value,
    }

    typeOptions.push(newType)
    setValue("type", newType)

    return newType
  }

  return (
    <GeneralBodyCard
      isEdit={isEdit}
      product={product}
      title="Og??lne"
      subtitle=""
    >
      <div className="mt-large">
        <h6 className="inter-base-semibold mb-1">Szczeg????y</h6>
        <label
          htmlFor="name"
          className="inter-small-regular text-grey-50 block max-w-[370px] mb-base"
        >
          Nadaj kr??tk?? i prost?? nazw??. Najlepiej 50-60 znak??w.
        </label>
        <div className="flex gap-8 mb-base">
          <Input
            id="name"
            label="Nazwa"
            name="title"
            placeholder="Czapka, okulary..."
            required
            ref={register({
              required: "Nazwa wymagana",
              minLength: 1,
              pattern: /(.|\s)*\S(.|\s)*/,
            })}
          />
          <Input
            tooltipContent="Czytelne identyfikatory u??ywane w linku. Musi by?? unikalny"
            label="Handle"
            name="handle"
            placeholder="majtki-cottonworld-classic"
            prefix="/"
            ref={register()}
          />
        </div>
        <label
          className="inter-small-regular text-grey-50 block max-w-[370px] mb-base"
          htmlFor="description"
        >
          Kr??tki i prosty opis produktu. Najlepiej 120-160 znak??w.
        </label>
        <div className="grid grid-rows-3 grid-cols-2 gap-x-8 gap-y-4 mb-large">
          <Textarea
            name="description"
            id="description"
            label="Opis"
            placeholder="Kr??tki opis produktu..."
            className="row-span-full"
            rows={8}
            ref={register}
          />
          <Controller
            as={Select}
            control={control}
            label="Kolekcja"
            name="collection"
            placeholder="Wybierz kolekcje..."
            options={collectionOptions}
            clearSelected
          />
          <Controller
            control={control}
            name="type"
            render={({ value, onChange }) => {
              return (
                <Select
                  label="Typ"
                  placeholder="Wybierz typ..."
                  options={typeOptions}
                  onChange={onChange}
                  value={value}
                  isCreatable
                  onCreateOption={(value) => {
                    return setNewType(value)
                  }}
                  clearSelected
                />
              )
            }}
          />
          <Controller
            name="tags"
            render={({ onChange, value }) => {
              return (
                <TagInput
                  label="Tagi (oddzielone przecinkiem)"
                  placeholder="Wiosna, lato..."
                  onChange={onChange}
                  values={value || []}
                />
              )
            }}
            control={control}
          />
        </div>
        <div className="flex item-center gap-x-1.5 mb-xlarge">
          <Checkbox name="discountable" ref={register} label="Zni??kowy" />
          <IconTooltip
            content={
              "Gdy odznaczone zni??ki nie b??d?? stosowane do tego produktu"
            }
          />
        </div>
        {showViewOptions && (
          <RadioGroup.Root
            value={viewType}
            onValueChange={setViewType}
            className="flex items-center gap-4 mt-xlarge"
          >
            <RadioGroup.SimpleItem
              label="Prosty produkt"
              value={SINGLE_PRODUCT_VIEW}
            />
            <RadioGroup.SimpleItem
              label="Produkt z wariantami"
              value={VARIANTS_VIEW}
            />
          </RadioGroup.Root>
        )}
      </div>
    </GeneralBodyCard>
  )
}

const GeneralBodyCard = ({ isEdit, product, ...props }) => {
  const params = useParams()
  const dialog = useImperativeDialog()
  const notification = useNotification()
  const updateProduct = useAdminUpdateProduct(params?.id)
  const deleteProduct = useAdminDeleteProduct(params?.id)

  const onDelete = async () => {
    const shouldDelete = await dialog({
      heading: "Usu?? produkt",
      text: "Na pewno chcesz usun???? ten produkt",
    })
    if (shouldDelete) {
      deleteProduct.mutate(undefined, {
        onSuccess: () => {
          notification("Sukces", "Produkt pomy??lnie usuni??ty", "success")
          navigate("/a/products/")
        },
        onError: (err) => {
          notification("Ooops", getErrorMessage(err), "error")
        },
      })
    }
  }

  const onStatusChange = async () => {
    const newStatus = product?.status === "published" ? "draft" : "published"
    updateProduct.mutate(
      {
        status: newStatus,
      },
      {
        onSuccess: () => {
          const pastTense =
            newStatus === "published" ? "opublikowany" : "zachowany jako"
          notification("Sukces", `Produkt ${pastTense} pomy??lnie`, "success")
        },
        onError: (err) => {
          notification("Ooops", getErrorMessage(err), "error")
        },
      }
    )
  }

  const actionables = [
    {
      label: "Usu?? produkt",
      onClick: onDelete,
      variant: "danger" as const,
      icon: <TrashIcon />,
    },
  ]

  return (
    <BodyCard
      actionables={isEdit ? actionables : undefined}
      forceDropdown
      status={
        isEdit ? (
          <StatusSelector
            isDraft={product?.status === "draft"}
            activeState="Opublikowany"
            draftState="Plan"
            onChange={onStatusChange}
          />
        ) : undefined
      }
      {...props}
    />
  )
}

export default General
