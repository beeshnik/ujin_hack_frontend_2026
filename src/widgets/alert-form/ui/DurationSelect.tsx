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

export function DurationSelect() {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name="duration"
      render={({ field }) => (
        <FormItem>
          <Select
            value={field.value?.toString() || ""}
            onValueChange={(val) => field.onChange(val)}
          >
            <FormControl>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <SelectValue placeholder="Выберите длительность..." />
                </div>
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="99999">Бессрочно</SelectItem>
                <SelectItem value="1">1 минута</SelectItem>
                <SelectItem value="3">3 минуты</SelectItem>
                <SelectItem value="5">5 минут</SelectItem>
                <SelectItem value="10">10 минут</SelectItem>
                <SelectItem value="30">30 минут</SelectItem>
                <SelectItem value="120">2 часа</SelectItem>
                <SelectItem value="480">24 часа</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
    // <FormField
    //   control={control}
    //   name="name"
    //   render={({ field }) => (
    //     <FormItem>
    //       <FormControl>
    //         <Select {...field}>
    //           <SelectTrigger className="w-full max-w-48">
    //             <SelectValue placeholder="Выберите приоритет" />
    //           </SelectTrigger>
    //           <SelectContent>
    //             <SelectGroup>
    //               <SelectItem value="1">Низкий (1)</SelectItem>
    //               <SelectItem value="2">Средний (2)</SelectItem>
    //               <SelectItem value="3">Высокий (3)</SelectItem>
    //             </SelectGroup>
    //           </SelectContent>
    //         </Select>
    //       </FormControl>
    //       <FormMessage />
    //     </FormItem>
    //   )}
    // />
  )
}
