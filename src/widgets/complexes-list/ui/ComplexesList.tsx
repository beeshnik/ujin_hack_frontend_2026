import { ComplexCard } from "@/entities/complexes/ui/ComplexCard";
import { useGetComplexes } from "@/shared/api/generated/complexes/complexes"
import type { Complex } from "@/shared/api/generated/model";

export function ComplexesList() {
    const {data: complexes, status} = useGetComplexes()

    const complexesArray = Array.isArray(complexes?.data)
      ? (complexes.data as Complex[])
      : []
  

    return (
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(320px,1fr))] w-full">
        {complexesArray.map((complex) => (
          <>
            <ComplexCard complex={complex} key={complex.id} />
          </>
        ))}
      </div>
    )
}