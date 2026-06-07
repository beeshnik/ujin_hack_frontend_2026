import type { FilterDTO } from "@/entities/filter"
import { TemplateCard } from "@/entities/template/ui/TemplateCard"
import { FilterBuildings } from "@/features/filter-buildings"
import type { Template } from "@/shared/api/generated/model"
import { useGetTemplates } from "@/shared/api/generated/templates/templates"
import { useEffect, useState } from "react"

export function TemplateList() {
  const [filter, setFilter] = useState<FilterDTO>()
  const [templateList, setTemplateList] = useState<Template[]>([])
  const { data: templates, status, isLoading } = useGetTemplates()

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
  return (
    <div className="flex flex-col gap-6">
      <FilterBuildings setFilter={setFilter} />

      {isLoading ? (
        <>Загрузка...</>
      ) : (
        <>
          {templateList.length > 0 ? templateList.map((template) => (
            <TemplateCard template={template} />
          )) : <>Шаблонов пока нет</>}
        </>
      )}
    </div>
  )
}
