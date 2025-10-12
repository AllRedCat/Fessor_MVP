
import { format } from 'date-fns';

export const formatToReadableDate = (date: Date | string) => {
  return format(new Date(date), 'dd/MM/yyyy');
};
