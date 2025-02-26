import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { insertUserSchema, type InsertUser } from '../../../shared/schema';
import { apiRequest, queryClient } from '../lib/queryClient';

export function CreateUser() {
  const [, setLocation] = useLocation();
  
  const form = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: InsertUser) => 
      apiRequest('/api/users', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
      setLocation('/');
    },
  });

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      
      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            {...form.register('name')}
            className="w-full px-3 py-2 border rounded"
          />
          {form.formState.errors.name && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            {...form.register('email')}
            type="email"
            className="w-full px-3 py-2 border rounded"
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {mutation.isPending ? 'Creating...' : 'Create User'}
        </button>
      </form>
    </div>
  );
}
