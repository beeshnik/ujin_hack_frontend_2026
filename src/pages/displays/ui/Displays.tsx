import { CreateDisplay } from "@/features/create-display/ui/CreateDisplay";
import { Button } from "@/shared/ui/button";
import { DisplayList } from "@/widgets/display-list";
import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";

export function Displays() {
  const {complexId, houseId} = useParams()
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <h1 className="font-bold text-[24px]">Дисплеи</h1>
          <p className="text-(--text-secondary)">
            Управление физическими устройствами в ЖК
          </p>
        </div>
        <CreateDisplay>
          <Button>
            <Plus /> Добавить дисплей
          </Button>
        </CreateDisplay>
      </div>
      {complexId && houseId && (
        <DisplayList complexId={Number(complexId)} houseId={Number(houseId)} />
      )}
    </div>
  );
}
