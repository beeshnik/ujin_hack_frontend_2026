import { CreateTemplate } from "@/features/create-template/ui/CreateTemplate";
import { Button } from "@/shared/ui/button";
import { TemplateList } from "@/widgets/template-list/";
import { Plus } from "lucide-react";

export function Templates() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <h1 className="font-bold text-[24px]">Дисплеи</h1>
          <p className="text-(--text-secondary)">
            Управление физическими устройствами в ЖК
          </p>
        </div>
        <CreateTemplate />
      </div>
      <TemplateList />
    </div>
  )
}
