import { FormControl, FormField, FormItem, FormMessage } from "@/shared/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { useFormContext } from "react-hook-form"

export function TargetTypeSelect() {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name="target_type"
      render={({ field }) => (
        <FormItem>
          <Select
            value={field.value?.toString() || ""}
            onValueChange={(val) => field.onChange(val)}
          >
            <FormControl>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <SelectValue placeholder="Выберите цель..." />
                </div>
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="HOUSE">Здание</SelectItem>
                <SelectItem value="DISPLAY">Дисплей</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
