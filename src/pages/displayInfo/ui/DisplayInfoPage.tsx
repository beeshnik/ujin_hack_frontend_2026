import {
  useGetDisplayById,
  useUpdateDisplay,
} from "@/shared/api/generated/displays/displays"
import type { Display, Template } from "@/shared/api/generated/model"
import { useGetTemplates } from "@/shared/api/generated/templates/templates"
import { useParams } from "react-router-dom"
import { TemplatesToChoice } from "./TemplatesToChoice"
import { useQueryClient } from "@tanstack/react-query"
import { LogsHistory } from "@/widgets/logs-history/ui/LogsHistory"

export function DisplayInfoPage() {
  const { complexId, houseId, displayId } = useParams()

  const { data: templates, status, isLoading } = useGetTemplates()

  const queryClient = useQueryClient()

  const { data: display, status: getDisplayStatus } = useGetDisplayById(
    Number(complexId),
    Number(houseId),
    Number(displayId),
  )

  const { mutate: mutateDisplay } = useUpdateDisplay()

  const displayView = display?.data as Display 

  const templateArray = Array.isArray(templates?.data)
    ? (templates.data as Template[])
    : []

  return (
    <div>
      {displayView && (
        <div className="flex flex-row gap-4">
          <p className="text-(--text-secondary)">Название:</p>
          <h1>{displayView.name}</h1>
        </div>
      )}
      {displayView && (
        <div className="flex flex-row gap-4">
          <p className="text-(--text-secondary)">Токен:</p>
          <h1 className="text-[18px] font-bold">{displayView.token}</h1>
        </div>
      )}
      <TemplatesToChoice
        templateList={templateArray}
        chosenTemplate={displayView?.template_id}
        updateClick={(id) => {
          mutateDisplay({
            complexId: Number(complexId),
            id: Number(houseId),
            displayId: Number(displayId),
            data: {
              ...displayView,
              name: displayView?.name || "default_name",
              template_id: id,
            },
          })

          queryClient.invalidateQueries({
            queryKey: [
              `/complexes/${complexId}/houses/${houseId}/display/${displayId}`,
            ],
          })
        }}
      />
      <LogsHistory
        complexId={complexId || ""}
        houseId={houseId || ""}
        displayId={displayId || ""}
      />
    </div>
  )
}
