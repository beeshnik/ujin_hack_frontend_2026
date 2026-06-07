import { BuildingsList } from "@/widgets/buildings-list";
import { useParams } from "react-router-dom";

export function Houses() {
    const {complexId} = useParams()

    return (
      <div>
        {complexId && (
          <BuildingsList complexId={Number(complexId)} />
        )}
      </div>
    );
}