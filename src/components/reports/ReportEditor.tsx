
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Textarea } from '@/components/ui';

const reportEditorSchema = z.object({
  content: z.string().min(10),
});

type ReportEditorValues = z.infer<typeof reportEditorSchema>;

interface ReportEditorProps {
  initialContent: string;
  onSave: (data: ReportEditorValues) => void;
}

const ReportEditor: React.FC<ReportEditorProps> = ({ initialContent, onSave }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ReportEditorValues>({
    resolver: zodResolver(reportEditorSchema),
    defaultValues: { content: initialContent },
  });

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <Textarea
        label="Report Content"
        {...register('content')}
        error={!!errors.content}
        helperText={errors.content?.message}
        rows={10}
      />
      <Button type="submit">Save Changes</Button>
    </form>
  );
};

export default ReportEditor;
