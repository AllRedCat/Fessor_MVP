
import * as z from 'zod';

export const studentSchema = z.object({
  name: z.string(),
  age: z.number(),
  className: z.string(),
  observations: z.string().optional(),
  // Add all fields from the /alunos collection in firestore
});
