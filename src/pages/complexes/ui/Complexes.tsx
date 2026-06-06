import { ComplexesList } from "@/widgets/complexes-list";

export function Complexes() {



  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="font-bold text-[24px]">Жилые комплексы (ЖК)</h1>
        <p className="text-(--text-secondary)">
          Управление группами объектов недвижимости
        </p>
      </div>
      <ComplexesList />
    </div>
  );
}
