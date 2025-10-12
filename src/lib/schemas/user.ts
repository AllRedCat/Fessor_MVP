
import * as z from 'zod';

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  // Add all fields from the /users collection in firestore
});
