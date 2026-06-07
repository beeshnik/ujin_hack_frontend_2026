import {
  useGetDisplayById,
  useUpdateDisplay,
} from "@/shared/api/generated/displays/displays"
import type { Display, Template } from "@/shared/api/generated/model"
import { useGetTemplates } from "@/shared/api/generated/templates/templates"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { TemplatesToChoice } from "./TemplatesToChoice"
import { useQueryClient } from "@tanstack/react-query"
import { Divide } from "lucide-react"

export function DisplayInfoPage() {
  const { complexId, houseId, displayId } = useParams()

  const [displayView, setDisplayView] = useState<Display>()

  const [templateList, setTemplateList] = useState<Template[]>([])
  const { data: templates, status, isLoading } = useGetTemplates()

  const queryClient = useQueryClient()

  useEffect(() => {
    if (status === "success" && templates) {
      const rawTemplates = templates.data as Template[]
      //   const filtredTemplates = templateList.filter((template) =>
      //     (filter && filter.name) ? template.name.includes(filter?.name) : false,
      //   ) || []
      setTemplateList(rawTemplates)
      console.log(templateList)
    }
  }, [templates])

  const { data: display, status: getDisplayStatus } = useGetDisplayById(
    Number(complexId),
    Number(houseId),
    Number(displayId),
  )

  const { mutate: mutateDisplay } = useUpdateDisplay()

  useEffect(() => {
    if (getDisplayStatus === "success" && display) {
      const cleanDisplay = display.data as Display
      setDisplayView(cleanDisplay)
    }
  }, [display])

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
        templateList={templateList}
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
    </div>
  )
}
