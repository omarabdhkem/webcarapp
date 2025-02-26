import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import type { User } from '../../../shared/schema';

export function UserList() {
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ['/api/users'],
  });

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users</h1>
        <Link href="/create">
          <a className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Create User
          </a>
        </Link>
      </div>
      
      <div className="grid gap-4">
        {users?.map((user) => (
          <div key={user.id} className="p-4 border rounded shadow">
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
