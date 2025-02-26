import { Route, Switch } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@lib/queryClient';
import { Toaster } from '@/components/ui/toaster';
import { UserList } from '@/components/UserList';
import { CreateUser } from '@/components/CreateUser';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto px-4 py-8">
        <Switch>
          <Route path="/" component={UserList} />
          <Route path="/create" component={CreateUser} />
        </Switch>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
