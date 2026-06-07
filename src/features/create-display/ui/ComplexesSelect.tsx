import type { Complex } from "@/shared/api/generated/model";
import { FormControl, FormField, FormItem, FormMessage } from "@/shared/ui/form";
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { useFormContext } from "react-hook-form";

type props = {
    complexes: Complex[],
    isPending: boolean
}

export function ComplexesSelect({complexes, isPending}: props) {

    const { control } = useFormContext();

    return (
      <FormField
        control={control}
        name="complex" 
        render={({ field }) => (
          <FormItem>
            <Select
    
              value={field.value?.toString() || ""}
              onValueChange={(val) => field.onChange(val)}
            >
              <FormControl>
                <SelectTrigger disabled={isPending}>
                  <div className="flex items-center gap-2">
                    <SelectValue placeholder="Выберите ЖК..." />
                  </div>
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {complexes.map((complex) => (
                <SelectItem
                  key={`selectComplex-${complex.id}`}
                  value={complex.id.toString()}
                >
                  {complex.name}
                </SelectItem>
              ))}
              </SelectContent>
            </Select>

            {/* Сюда будут выводиться красные ошибки валидации от Zod */}
            <FormMessage />
          </FormItem>
        )}
      />
    );
}