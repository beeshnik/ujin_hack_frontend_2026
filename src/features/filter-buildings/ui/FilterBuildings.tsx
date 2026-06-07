import type { FilterDTO } from "@/entities/filter";
import { SearchInput } from "@/shared/ui/search-input";
import { useEffect, useState } from "react";
import type { settingsType } from "../model/types";


type Props = {
  setFilter: (filter: FilterDTO) => void;
  settings?: settingsType;
};

export function FilterBuildings({setFilter, settings}: Props) {
    const [searchState, setSearchState] = useState<string>()

    useEffect(() => {
        setFilter({
            name: searchState
        })
    }, [searchState]);

    return <div className="flex flex-row gap-4 flex-wrap">
        <SearchInput value={searchState || ""} onChange={setSearchState}/>
    </div>
}