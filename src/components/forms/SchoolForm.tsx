
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Input } from '@/components/ui';

const schoolSchema = z.object({
  name: z.string().min(2),
  address: z.string().min(10),
  secretary: z.string().min(2),
});

type SchoolFormValues = z.infer<typeof schoolSchema>;

const SchoolForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolSchema),
  });

  const onSubmit = (data: SchoolFormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="School Name"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Input
        label="Address"
        {...register('address')}
        error={!!errors.address}
        helperText={errors.address?.message}
      />
      <Input
        label="Secretary Name"
        {...register('secretary')}
        error={!!errors.secretary}
        helperText={errors.secretary?.message}
      />
      <Button type="submit">Register School</Button>
    </form>
  );
};

export default SchoolForm;
