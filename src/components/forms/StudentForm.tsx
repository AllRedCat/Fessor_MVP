
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Input, Textarea } from '@/components/ui';

const studentSchema = z.object({
  name: z.string().min(2),
  age: z.number().min(1),
  className: z.string().min(1),
  observations: z.string().optional(),
});

type StudentFormValues = z.infer<typeof studentSchema>;

const StudentForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = (data: StudentFormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Full Name"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Input
        label="Age"
        type="number"
        {...register('age', { valueAsNumber: true })}
        error={!!errors.age}
        helperText={errors.age?.message}
      />
      <Input
        label="Class"
        {...register('className')}
        error={!!errors.className}
        helperText={errors.className?.message}
      />
      <Textarea
        label="Observations"
        {...register('observations')}
      />
      <Button type="submit">Save Student</Button>
    </form>
  );
};

export default StudentForm;
