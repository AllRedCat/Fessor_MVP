
import * as z from 'zod';

export const reportSchema = z.object({
  studentId: z.string(),
  observations: z.string(),
  // Add all fields from the /relatorios collection in firestore
});
