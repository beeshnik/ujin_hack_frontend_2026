import { FormField, FormItem } from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"
import { useFormContext } from "react-hook-form"

export function TargetSelect() {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="target"
      render={({ field }) => (
        <FormItem>
          <Input {...field} placeholder="Укажите ID сущности..."/>
        </FormItem>
      )}
    />
  )
}
