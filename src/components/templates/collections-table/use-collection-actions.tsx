import { navigate } from "gatsby"
import { useAdminDeleteCollection } from "medusa-react"
import * as React from "react"
import useImperativeDialog from "../../../hooks/use-imperative-dialog"
import EditIcon from "../../fundamentals/icons/edit-icon"
import TrashIcon from "../../fundamentals/icons/trash-icon"
import { ActionType } from "../../molecules/actionables"

const useCollectionActions = (collection) => {
  const dialog = useImperativeDialog()
  const deleteCollection = useAdminDeleteCollection(collection?.id)

  const handleDelete = async () => {
    const shouldDelete = await dialog({
      heading: "Usuń kolekcje",
      text: "Czy na pewno usunąć tę kolekcję?",
    })

    if (shouldDelete) {
      deleteCollection.mutate()
    }
  }

  const getActions = (coll): ActionType[] => [
    {
      label: "Edytuj",
      onClick: () => navigate(`/a/collections/${coll.id}`),
      icon: <EditIcon size={20} />,
    },
    {
      label: "Usuń",
      variant: "danger",
      onClick: handleDelete,
      icon: <TrashIcon size={20} />,
    },
  ]

  return {
    getActions,
  }
}

export default useCollectionActions
