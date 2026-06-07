import z from "zod";


export const createDisplaySchema = z.object({
  name: z.string().min(2, "Минимум 2 символа"),
  complex: z.string(),
  house: z.string(),
  entrances: z.string().optional(),
  floor: z.string().optional(),
});

export type createDisplayDTO = z.infer<typeof createDisplaySchema>;