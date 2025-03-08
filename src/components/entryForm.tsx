'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { api } from '@/trpc/react';
import { Button } from './ui/button';

const entryFormSchema = z.object({
  entry: z.string(),
  column: z.enum(['DID', 'WILL', 'ACHIEVE', 'REGRET']),
});

const EntryForm = ({
  column,
}: {
  column: 'DID' | 'WILL' | 'ACHIEVE' | 'REGRET';
}) => {
  const { mutateAsync } = api.entries.create.useMutation();

  const form = useForm<z.infer<typeof entryFormSchema>>({
    resolver: zodResolver(entryFormSchema),
    defaultValues: {
      entry: '',
      column,
    },
  });

  const onSubmit = async (data: z.infer<typeof entryFormSchema>) => {
    await mutateAsync(data);
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="entry"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="entry"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="hidden" type="submit" />
      </form>
    </Form>
  );
};

export default EntryForm;
