
import { useState } from 'react';
import { PlusCircle, CheckCircle, Circle, Trash, Calendar, Clock, Tag, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  category: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Completar proposta do projeto",
    completed: false,
    category: "Trabalho",
    priority: "high",
    dueDate: "2025-05-20"
  },
  {
    id: 2,
    title: "Comprar mantimentos",
    completed: true,
    category: "Pessoal",
    priority: "medium"
  },
  {
    id: 3,
    title: "Agendar consulta no dentista",
    completed: false,
    category: "Saúde",
    priority: "medium",
    dueDate: "2025-05-25"
  },
  {
    id: 4,
    title: "Revisar slides da apresentação",
    completed: false,
    category: "Trabalho",
    priority: "high",
    dueDate: "2025-05-19"
  },
  {
    id: 5,
    title: "Ligar para a mãe",
    completed: false,
    category: "Pessoal",
    priority: "low"
  }
];

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todas');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      completed: false,
      category: "Pessoal",
      priority: "medium"
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filterTasks = (filterType: string) => {
    setActiveFilter(filterType);
  };

  const getFilteredTasks = () => {
    switch (activeFilter) {
      case 'Concluídas':
        return tasks.filter(task => task.completed);
      case 'Ativas':
        return tasks.filter(task => !task.completed);
      case 'Alta Prioridade':
        return tasks.filter(task => task.priority === 'high');
      default:
        return tasks;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return priority;
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-tasks">Adicionar Nova Tarefa</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addTask} className="flex gap-2">
            <Input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="O que precisa ser feito?"
              className="flex-grow"
            />
            <Button type="submit" className="bg-tasks hover:bg-tasks/90">
              <PlusCircle className="h-4 w-4 mr-2" /> Adicionar
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['Todas', 'Ativas', 'Concluídas', 'Alta Prioridade'].map(filter => (
          <button
            key={filter}
            onClick={() => filterTasks(filter)}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
              activeFilter === filter 
                ? 'bg-tasks text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <Card key={task.id} className={`transition-all ${task.completed ? 'opacity-60' : ''}`}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <button 
                    onClick={() => toggleComplete(task.id)}
                    className="mt-0.5"
                  >
                    {task.completed ? 
                      <CheckCircle className="h-5 w-5 text-green-500" /> : 
                      <Circle className="h-5 w-5 text-gray-400" />
                    }
                  </button>
                  <div>
                    <p className={`${task.completed ? 'line-through text-gray-500' : ''}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3" /> {task.category}
                      </span>
                      {task.dueDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {task.dueDate}
                        </span>
                      )}
                      <Badge className={`${getPriorityColor(task.priority)} text-white text-xs`}>
                        {getPriorityLabel(task.priority)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost"
                  onClick={() => deleteTask(task.id)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center py-8 text-gray-500">Nenhuma tarefa encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
