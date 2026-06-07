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
  const [houses, setHouses] = useState<House[]>();
  const { data: housesList, status: houseStatus } = useGetHouses(complexId);

  const [complexes, setComplexes] = useState<Complex[]>();
  const { data: complexList, status: complexStatus } = useGetComplexes();

  const [filter, setFilter] = useState<FilterDTO>();

  const [displays, setDisplays] = useState<Display[]>();
  const { data: displayList, status: displayStatus } = useGetDisplays(
    complexId,
    houseId,
  );

  useEffect(() => {
    if (complexStatus === "success" && complexes) {
      const rawComplexes = complexList.data as Complex[]

      const filtredComplexes =
        rawComplexes?.filter((complex) =>
          complex.name
            .toLowerCase()
            .includes(
              filter !== undefined &&
                filter.name !== undefined &&
                filter.name !== ""
                ? filter.name.toLowerCase()
                : complex.name.toLowerCase(),
            ),
        ) || []

      setComplexes(filtredComplexes as Complex[])
    }
  }, [complexes, houses, displays])

  const navigate = useNavigate();

  useEffect(() => {
    if (houseStatus === "success" && houses) {
      const rawHouses = housesList.data as House[];

      const filtredHouses =
        rawHouses?.filter((house) =>
          house.name
            .toLowerCase()
            .includes(
              filter !== undefined &&
                filter.name !== undefined &&
                filter.name !== ""
                ? filter.name.toLowerCase()
                : house.name.toLowerCase(),
            ),
        ) || [];
      setHouses(filtredHouses);
    }
  }, [housesList, filter]);

  useEffect(() => {
    if (displayStatus === "success" && displayList) {
      const rawDisplays = displayList.data as Display[];

      const filtredDisplays =
        rawDisplays?.filter((filterEntity) =>
          filterEntity.name
            .toLowerCase()
            .includes(
              filter !== undefined &&
                filter.name !== undefined &&
                filter.name !== ""
                ? filter.name.toLowerCase()
                : filterEntity.name.toLowerCase(),
            ),
        ) || [];
      setDisplays(filtredDisplays);
    }
  }, [housesList, filter]);

  const settings = {
    complexes: true,
    houses: houses,
  } as settingsType;

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
      {displays ? (
        <DataTable
          data={displays}
          columns={columns}
          onRowClick={(display: Display) => {
            navigate(
              `/complexes/${complexId}/houses/${houseId}/display/${display.id}`,
            )
          }}
        />
      ) : (<p>{"Дисплеев пока нет"}</p>)}
    </>
  );
}
