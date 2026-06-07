import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import { useEffect, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { createDisplaySchema, type createDisplayDTO } from "../model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComplexesSelect } from "./ComplexesSelect";
import { useGetComplexes } from "@/shared/api/generated/complexes/complexes";
import type { Complex, House } from "@/shared/api/generated/model";
import { useGetHouses } from "@/shared/api/generated/houses/houses";
import { HousesSelect } from "./HousesSelect";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/shared/ui/form";
import { useCreateDisplay } from "@/shared/api/generated/displays/displays";

type Props = {
  children: ReactNode;
};

export function CreateDisplay({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<createDisplayDTO>({
    resolver: zodResolver(createDisplaySchema),
    defaultValues: { name: "" },
  });

  const selectedComplex = form.watch("complex");
  const selectedHouse = form.watch("house");

  const [complexList, setComplexList] = useState<Complex[]>();
  const {
    data: complexes,
    status: complexesStatus,
    isPending: isComplexesPending,
  } = useGetComplexes();

  const [houses, setHouses] = useState<House[]>();
  const {
    data: housesList,
    status: housesStatus,
    isPending: isHousesPending,
  } = useGetHouses(selectedComplex);

  const {mutate: createDisplay} = useCreateDisplay()

  useEffect(() => {
    if (complexesStatus === "success" && complexes) {
      setComplexList(complexes.data as Complex[]);
    }
  }, [complexes]);

  useEffect(() => {
    if (housesStatus === "success" && housesList) {
      setHouses(housesList.data as House[]);
    }
  }, [housesList]);

  const onSubmit = async (data: createDisplayDTO) => {
    createDisplay({
      complexId: Number(selectedComplex),
      id: Number(selectedHouse),
      data: {
        house_id: Number(selectedHouse),
        name: data.name
      },
    });
    console.log(data);
    setIsOpen(false)
  };

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>{children}</SheetTrigger>

        <SheetContent className="sm:max-w-[390px] flex flex-col h-full p-0 gap-0 bg-background">
          <SheetHeader className="p-6">
            <SheetTitle className="text-2xl font-bold text-text-primary">
              Добавить дисплей
            </SheetTitle>
            <SheetDescription>
              Создайте новый дисплей в системе
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-6">
            <Form {...form}>
              <form
                id="create-display"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Холл 1-го этажа" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complex">Жилой комплекс</Label>
                  <ComplexesSelect
                    complexes={complexList || []}
                    isPending={isComplexesPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="house">Здание</Label>
                  <HousesSelect
                    houses={houses || []}
                    isPending={isHousesPending}
                  />
                </div>
              </form>
            </Form>
          </div>

          <SheetFooter className="p-6 mt-auto">
            <div className="flex flex-row justify-between w-full">
              <Button
                type="submit"
                form="create-display"
                className="bg-primary hover:bg-primary-hover"
              >
                {"Создать дисплей"}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
