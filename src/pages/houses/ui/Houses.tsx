import { BuildingsList } from "@/widgets/buildings-list";
import { useParams } from "react-router-dom";

export function Houses() {
    const {complexId} = useParams()

    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <h1 className="font-bold text-[24px]">Дома</h1>
          <p className="text-(--text-secondary)">Привязаны к этому ЖК</p>
        </div>
        {complexId && <BuildingsList complexId={Number(complexId)} />}
      </div>
    )
}