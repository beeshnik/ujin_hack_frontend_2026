import { ComplexCard } from "@/entities/complexes/ui/ComplexCard";
import { useGetComplexes } from "@/shared/api/generated/complexes/complexes"
import type { Complex } from "@/shared/api/generated/model";
import { useEffect, useState } from "react";

export function ComplexesList() {
    const [complexList, setComplexList] = useState<Complex[]>();
    const {data: complexes, status} = useGetComplexes()
    
    useEffect(() => {
        if (status === "success" && complexes) {
          setComplexList(complexes.data as Complex[]);
        }
    }, [complexes]);


    return (
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(320px,1fr))] w-full">
        {complexList?.map((complex) => (
          <ComplexCard complex={complex} key={complex.id}/>
        ))}
      </div>
    );
}