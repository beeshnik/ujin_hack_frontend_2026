import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createAlertSchema, type createAlertDTO } from "../model/schema"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"
import { PrioritySelect } from "./PrioritySelect"
import { Button } from "@/shared/ui/button"
import { DurationSelect } from "./DurationSelect"
import { useCreateEmergency } from "@/shared/api/generated/emergency/emergency"
import { TargetTypeSelect } from "./TargetTypeSelect"
import { TargetSelect } from "./TargetSelect"
import { Label } from "@/shared/ui/label"

export function AlertForm() {
  const form = useForm<createAlertDTO>({
    resolver: zodResolver(createAlertSchema),
    defaultValues: { text: "", priority: "1", duration: "15" },
  })

  const {mutate} = useCreateEmergency()
  const onSubmit = async (data: createAlertDTO) => {
    const time = Number(data.duration)

    const now = new Date()
    const timestemp = new Date(now.getTime() + time * 60 * 1000)

    mutate({
      data: {
        target_type: data.target_type,
        text: data.text,
        until_at: timestemp,
        priority: Number(data.priority),
        target: Number(data.target),
      },
    })
    

  }

  return (
    <div>
      <Form {...form}>
        <form
          id="create-alert"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="text">Введите сообщение</Label>
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="ВНИМАНИЕ!!! Беспилотная опасность!..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="text">Выберите приоритет</Label>
            <PrioritySelect />
          </div>
          <div className="space-y-2">
            <Label htmlFor="text">Укажите продолжительность</Label>
            <DurationSelect />
          </div>
          <div className="space-y-2">
            <Label htmlFor="text">Выберите тип цели для уведомления</Label>
            <TargetTypeSelect />
          </div>
          <div className="space-y-2">
            <Label htmlFor="text">Укажите ID цели</Label>
            <TargetSelect />
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="house">Здание</Label>
            <HousesSelect houses={houses || []} isPending={isHousesPending} />
          </div> */}
          <Button className="bg-destructive hover:bg-destructive" type="submit">
            АКТИВИРОВАТЬ РЕЖИМ ЧС
          </Button>
        </form>
      </Form>
    </div>
  )
}
