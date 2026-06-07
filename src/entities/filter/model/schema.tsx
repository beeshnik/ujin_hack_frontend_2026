import z from "zod";

const filterSchema = z.object({
  complexId: z.string().optional(),
  buildingId: z.string().optional(),
  groupId: z.string().optional(),
  name: z.string().optional()
});

export type FilterDTO = z.infer<typeof filterSchema>;
