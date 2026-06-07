import type { House } from "@/shared/api/generated/model";
import { FormControl, FormField, FormItem, FormMessage } from "@/shared/ui/form";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { useFormContext } from "react-hook-form";

type props = {
  houses: House[];
  isPending: boolean
};

export function HousesSelect({ houses, isPending }: props) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="house"
      render={({ field }) => (
        <FormItem>
          <Select
            value={field.value?.toString() || ""}
            onValueChange={(val) => field.onChange(val)}
          >
            <FormControl>
              <SelectTrigger disabled={isPending}>
                <div className="flex items-center gap-2">
                  <SelectValue placeholder="Выберите дом..." />
                </div>
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {houses.map((house) => (
                <SelectItem
                  key={`selectComplex-${house.id}`}
                  value={house.id.toString()}
                >
                  {house.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
