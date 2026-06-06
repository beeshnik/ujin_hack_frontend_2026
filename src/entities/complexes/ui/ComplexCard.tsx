import type { Complex } from "@/shared/api/generated/model"
import { Building, Building2 } from "lucide-react";

type Props = {
    complex: Complex
}

export function ComplexCard({complex}: Props) {

    return (
      <div className="flex flex-col gap-4 p-4 border rounded-[12px] justify-between hover:shadow-(--shadow-card) cursor-pointer transition-all duration-300 h-[240px]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row">
            <div className="items-center justify-center rounded-[8px] p-2 bg-(--borders-light) w-auto">
              <Building2 />
            </div>
          </div>
          <h2 className="font-bold text-[20px] text-(--text-primary)">
            {complex.name}
          </h2>
        </div>
        <div>
          <p className="text-[12px] text-(--text-secondary)">Зданий</p>
          <div className="flex flex-row gap-2 items-center">
            <Building size={16} />
            <p className="font-bold text-[16px] text-(--text-primary)">
              {complex.houses.length}
            </p>
          </div>
        </div>
      </div>
    );
}