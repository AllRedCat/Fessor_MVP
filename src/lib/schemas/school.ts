
import * as z from 'zod';

export const schoolSchema = z.object({
  name: z.string(),
  address: z.string(),
  secretary: z.string(),
  // Add all fields from the /escolas collection in firestore
});
