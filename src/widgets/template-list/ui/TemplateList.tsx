import type { FilterDTO } from "@/entities/filter"
import { TemplateCard } from "@/entities/template/ui/TemplateCard"
import { FilterBuildings } from "@/features/filter-buildings"
import type { Template } from "@/shared/api/generated/model"
import { useGetTemplates } from "@/shared/api/generated/templates/templates"
import { useEffect, useState } from "react"

export function TemplateList() {
  const [filter, setFilter] = useState<FilterDTO>()

  const { data: templates, status, isLoading } = useGetTemplates()

  const templateArray = Array.isArray(templates?.data)
    ? (templates.data as Template[])
    : []

  return (
    <div className="flex flex-col gap-6">
      <FilterBuildings setFilter={setFilter} />

      {isLoading ? (
        <>Загрузка...</>
      ) : (
        <>
          {templateArray.length > 0 ? (
            templateArray.map((template) => (
              <TemplateCard template={template} />
            ))
          ) : (
            <>Шаблонов пока нет</>
          )}
        </>
      )}
    </div>
  )
}
