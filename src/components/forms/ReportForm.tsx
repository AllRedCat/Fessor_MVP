
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Select, Textarea } from '@/components/ui';

const reportSchema = z.object({
  studentId: z.string(),
  observations: z.string().min(10),
});

type ReportFormValues = z.infer<typeof reportSchema>;

const ReportForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
  });

  const onSubmit = (data: ReportFormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Select
        label="Student"
        {...register('studentId')}
        error={!!errors.studentId}
      >
        {/* Add student options here */}
      </Select>
      <Textarea
        label="Initial Observations"
        {...register('observations')}
        error={!!errors.observations}
        helperText={errors.observations?.message}
      />
      <Button type="submit">Generate Report</Button>
    </form>
  );
};

export default ReportForm;
