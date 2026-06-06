import type { FilterDTO } from "@/entities/filter";
import { FilterBuildings, type settings } from "@/features/filter-buildings";
import { useGetHouses } from "@/shared/api/generated/houses/houses";
import type { House } from "@/shared/api/generated/model";
import { DataTable } from "@/shared/ui/data-table/data-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


type Props = {
  complexId: number
};

export function BuildingsList({complexId}: Props) {
    const settings = {
        complexes: true
    } as settings

    const [houses, setHouses] = useState<House[]>()

    const [filter, setFilter] = useState<FilterDTO>()
    const { data: housesList } = useGetHouses(complexId);

    const navigate = useNavigate()

    useEffect(() => {
        // console.log(filter)
        if (housesList?.status === 200) {
            const rawHouses = housesList.data as House[];

            const filtredHouses =
              rawHouses?.filter(
                (house) =>
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

    const columns = [
      {
        id: "name",
        header: "Название",
        key: "name",
      },
      {
        id: "address",
        header: "Адрес",
        key: "address",
      },
      {
        id: "city",
        header: "Город",
        key: "city",
      },
      {
        id: "floors_number",
        header: "Этажей",
        key: "floors_number",
      },
      {
        id: "entrances_number",
        header: "Подъездов",
        key: "entrances_number",
      },
    ];

  return (
    <>
      <FilterBuildings setFilter={setFilter} settings={settings} />
      {houses && <DataTable data={houses} columns={columns} onRowClick={() => {navigate("/complexes");}}/>}
    </>
  );
}
