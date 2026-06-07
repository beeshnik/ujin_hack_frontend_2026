import type { FilterDTO } from "@/entities/filter";
import {
  FilterBuildings,
  type settingsType,
} from "@/features/filter-buildings";
import { useGetComplexes } from "@/shared/api/generated/complexes/complexes";
import { useGetDisplays } from "@/shared/api/generated/displays/displays";
import { useGetHouses } from "@/shared/api/generated/houses/houses";
import type { Complex, Display, House } from "@/shared/api/generated/model";
import { DataTable } from "@/shared/ui/data-table/data-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  complexId: number;
  houseId: number;
};

export function DisplayList({ complexId, houseId }: Props) {
  const { data: housesList, status: houseStatus } = useGetHouses(complexId);

  const { data: complexList, status: complexStatus } = useGetComplexes();

  const [filter, setFilter] = useState<FilterDTO>();

  const { data: displayList, status: displayStatus } = useGetDisplays(
    complexId,
    houseId,
  );

  const navigate = useNavigate();

  const settings = {
    complexes: true,
    houses: housesList?.data || [],
  } as settingsType

  const columns = [
    {
      id: "name",
      header: "Название",
      key: "name",
    },
    {
      id: "floor",
      header: "Этаж",
      key: "floor",
    },
    {
      id: "entrance",
      header: "Подъезд",
      key: "entrance",
    },
  ];

  return (
    <>
      <FilterBuildings setFilter={setFilter} settings={settings} />
      {displayList?.data ? (
        <DataTable
          data={displayList?.data || []}
          columns={columns}
          onRowClick={(display: Display) => {
            navigate(
              `/complexes/${complexId}/houses/${houseId}/display/${display.id}`,
            )
          }}
        />
      ) : (
        <p>{"Дисплеев пока нет"}</p>
      )}
    </>
  )
}
