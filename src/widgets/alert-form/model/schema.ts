import z from "zod";


export const createAlertSchema = z.object({
  text: z.string(),
  duration: z.string(),
  priority: z.string(),
  target_type: z.enum(["DISPLAY", "HOUSE"])
})

export type createAlertDTO = z.infer<typeof createAlertSchema>