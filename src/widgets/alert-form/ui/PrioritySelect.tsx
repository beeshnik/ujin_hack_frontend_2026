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

export function PrioritySelect() {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name="priority"
      render={({ field }) => (
        <FormItem>
          <Select
            value={field.value?.toString() || ""}
            onValueChange={(val) => field.onChange(val)}
          >
            <FormControl>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <SelectValue placeholder="Выберите приоритет..." />
                </div>
              </SelectTrigger>
            </FormControl>

            <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">Низкий (1)</SelectItem>
                  <SelectItem value="2">Средний (2)</SelectItem>
                  <SelectItem value="3">Высокий (3)</SelectItem>
                </SelectGroup>
              </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
