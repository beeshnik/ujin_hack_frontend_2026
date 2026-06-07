import type { Template } from "@/shared/api/generated/model"
import { Clock } from "lucide-react"

type Props = {
  template: Template
}

export function TemplateCard({ template }: Props) {
  return (
    <div className="rounded-[8px] border border-border flex flex-col">
      <div></div>
      <div className="flex flex-col gap-1">
        <h2>{template.name}</h2>
        <div className="flex flex-row gap-2">
          <Clock size={12} />
          <p className="text text-[10px]">{`Обновлен: 10 июн 2026`}</p>
        </div>
      </div>
    </div>
  )
}
