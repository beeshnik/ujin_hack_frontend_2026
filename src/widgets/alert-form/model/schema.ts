import z from "zod";


export const createAlertSchema = z.object({
  text: z.string(),
  duration: z.string(),
  priority: z.string(),
  target_type: z.enum(["DISPLAY", "HOUSE"]),
  target: z.string()
})

export type createAlertDTO = z.infer<typeof createAlertSchema>