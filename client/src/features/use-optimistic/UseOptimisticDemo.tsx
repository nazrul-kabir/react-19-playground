import { useState, useOptimistic } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const UseOptimisticDemo = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn useOptimistic', completed: false },
    { id: 2, text: 'Build demo app', completed: true },
  ]);
  const [newTodo, setNewTodo] = useState('');

  // Optimistic state and setter
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: Todo) => [...state, newTodo]
  );

  // Simulate server delay
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Add todo with optimistic update
  const addTodo = async (text: string) => {
    if (!text.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };

    addOptimisticTodo(newTodo);

    // Simulate an API call
    await delay(1500);

    // Update actual state
    setTodos((prev) => [...prev, newTodo]);
    setNewTodo('');
  };

  // Toggle todo completion with optimistic update
  const [optimisticTodosCompletion, toggleOptimisticCompletion] = useOptimistic(
    optimisticTodos,
    (state, todoId: number) =>
      state.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
  );

  const toggleTodo = async (todoId: number) => {
    // Optimistically toggle the todo
    toggleOptimisticCompletion(todoId);

    // Simulate API call
    await delay(1000);

    // Update actual state
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>useOptimistic Demo</CardTitle>
          <CardDescription>
            See how useOptimistic provides instant feedback while waiting for
            server responses
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Add Todo Form */}
          <div className="flex gap-2">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              onKeyPress={(e) => e.key === 'Enter' && addTodo(newTodo)}
            />
            <Button onClick={() => addTodo(newTodo)}>Add Todo</Button>
          </div>

          {/* Todo List */}
          <div className="space-y-2">
            {optimisticTodosCompletion.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 hover:bg-transparent"
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </Button>
                <span
                  className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}
                >
                  {todo.text}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 p-0 hover:bg-transparent"
                >
                  <Trash2 className="h-4 w-4 text-red-400 hover:text-red-500" />
                </Button>
              </div>
            ))}
          </div>

          {/* Code Example */}
          <Card className="mt-6 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-sm">useOptimistic Example</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-blue-100 p-4 rounded text-sm overflow-x-auto">
                {`// Define optimistic state and update function
const [optimisticTodos, addOptimisticTodo] = useOptimistic(
  todos,
  (state, newTodo) => [...state, newTodo]
);

// Usage in event handler
const addTodo = async (text) => {
  // Create new todo
  const newTodo = { id: Date.now(), text, completed: false };
  
  // Optimistically add todo
  addOptimisticTodo(newTodo);
  
  // Actual API call
  await saveTodoToServer(newTodo);
  
  // Update real state
  setTodos(prev => [...prev, newTodo]);
};`}
              </pre>
            </CardContent>
          </Card>
        </CardContent>

        <CardFooter className="text-sm text-gray-500">
          <p>
            Note: The useOptimistic Hook allows us to update the UI immediately
            while the server request is in progress, providing a more responsive
            user experience.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UseOptimisticDemo;
