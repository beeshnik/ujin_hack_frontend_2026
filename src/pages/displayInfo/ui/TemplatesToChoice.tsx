import { useUpdateDisplay } from "@/shared/api/generated/displays/displays"
import type { Template } from "@/shared/api/generated/model"
import { cn } from "@/shared/lib/cn"
import { Check } from "lucide-react"
import { useEffect, useState } from "react"

type smallProps = {
  template: Template
  isChosen: boolean,
  handleClicked: (templateId: number) => void
}

function TemplateSmallCard({ template, isChosen, handleClicked }: smallProps) {
  const chosenStyle = "border-[2px] border-(--color-primary)"
  return (
    <div
      onClick={() => {handleClicked(template.id)}}
      className={cn("flex flex-row p-4 border cursor-pointer gap-2 items-center rounded-[8px]", isChosen && chosenStyle)}
    >
      {template.name}
      {isChosen && <Check size={12} />}
    </div>
  )
}

type props = {
  templateList: Template[]
  chosenTemplate?: number,
  updateClick: (id: number) => void
}

export function TemplatesToChoice({ templateList, chosenTemplate, updateClick }: props) {
  const [chosen, setChosen] = useState()


  useEffect(() => {
    if (chosenTemplate) {
      setChosen(chosen)
    }
  }, [chosenTemplate])

  return (
    <div className="flex flex-col gap-4">
        <h2 className="text-[20px] font-medium">Выбранный шаблон:</h2>
      {templateList.map((template) => (
        <TemplateSmallCard
          key={`TemplateSmallCard-${template.id}`}
          template={template}
          isChosen={template.id === chosenTemplate}
          handleClicked={(id) => {
            updateClick(id)
          }}
        />
      ))}
    </div>
  )
}
