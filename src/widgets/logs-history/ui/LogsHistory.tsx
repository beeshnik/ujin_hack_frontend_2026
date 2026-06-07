import type { FilterDTO } from "@/entities/filter";
import { FilterBuildings } from "@/features/filter-buildings";
import { useGetDisplayLogs } from "@/shared/api/generated/logs/logs";
import type { Log } from "@/shared/api/generated/model";
import { DataTable } from "@/shared/ui/data-table/data-table";
import { useState } from "react";

type Props = {
  complexId: string
  houseId: string
  displayId: string
}

export function LogsHistory({complexId, houseId, displayId}: Props) {
    const [filter, setFilter] = useState<FilterDTO>()

    const {data: displayLogs} = useGetDisplayLogs(
      Number(complexId) || 0,
      Number(houseId) || 0,
      Number(displayId) || 0,
    )

    const logsArray = Array.isArray(displayLogs?.data)
      ? (displayLogs.data as Log[])
      : []

    const filtredLogs = logsArray.filter((log) => filter !== undefined ? log.text.includes(filter.name || "") : true)
    
    const columns = [
      {
        id: "actor",
        header: "Актор",
        key: "actor",
      },
      {
        id: "display_id",
        header: "ID Дисплея",
        key: "display_id",
      },
      {
        id: "text",
        header: "Сообщение",
        key: "text",
      },

    ]

    return (
      <div className="mt-8">
        <FilterBuildings setFilter={setFilter} />
        {<DataTable data={filtredLogs || []} columns={columns} />}
      </div>
    )
}