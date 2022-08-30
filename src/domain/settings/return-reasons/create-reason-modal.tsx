import { useAdminCreateReturnReason } from "medusa-react"
import React from "react"
import { useForm } from "react-hook-form"
import Button from "../../../components/fundamentals/button"
import Input from "../../../components/molecules/input"
import Modal from "../../../components/molecules/modal"
import useNotification from "../../../hooks/use-notification"

type CreateReturnReasonModalProps = {
  handleClose: () => void
  initialReason?: any
}

// the reason props is used for prefilling the form when duplicating
const CreateReturnReasonModal = ({
  handleClose,
  initialReason,
}: CreateReturnReasonModalProps) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      value: initialReason?.value,
      label: initialReason?.label,
      description: initialReason?.description,
    },
  })
  const notification = useNotification()
  const createRR = useAdminCreateReturnReason()

  const onCreate = async (data) => {
    await createRR.mutateAsync(data, {
      onSuccess: () => {
        notification("Sukces", "Stworzono nowy powód zwrotu", "success")
      },
      onError: () => {
        notification(
          "Błąd",
          "Cant create a Return reason with an existing code",
          "error"
        )
      },
    })
    handleClose()
  }

  return (
    <Modal handleClose={handleClose}>
      <Modal.Body>
        <Modal.Header handleClose={handleClose}>
          <span className="inter-xlarge-semibold">Add Reason</span>
        </Modal.Header>
        <Modal.Content>
          <div className="flex">
            <Input
              ref={register({ required: true })}
              name="value"
              label="Wartość"
              placeholder="zly_rozmiar"
            />
            <Input
              className="ml-base"
              ref={register({ required: true })}
              name="label"
              label="Etykieta"
              placeholder="Zły rozmiar"
            />
          </div>
          <Input
            className="mt-large"
            ref={register}
            name="description"
            label="Opis"
            placeholder="Klient otrzymał zły rozmiar produktu"
          />
        </Modal.Content>
        <Modal.Footer>
          <div className="flex w-full h-8 justify-end">
            <Button
              variant="ghost"
              className="mr-2 w-32 text-small justify-center"
              size="large"
              onClick={handleClose}
            >
              Anuluj
            </Button>
            <Button
              loading={createRR.isLoading}
              size="large"
              className="w-32 text-small justify-center"
              variant="primary"
              onClick={handleSubmit(onCreate)}
            >
              Stwórz
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  )
}

export default CreateReturnReasonModal
