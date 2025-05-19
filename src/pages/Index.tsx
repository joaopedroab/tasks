
import TaskList from "@/components/tasks/TaskList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare } from "lucide-react";

const Index = () => {
  return (
    <div className="container mx-auto py-8 px-4 bg-gradient-to-br from-orange-50 to-red-50 min-h-screen">
      <Card className="mb-6 border-tasks/20 bg-white/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="p-2 rounded-full bg-tasks/10">
            <CheckSquare className="h-8 w-8 text-tasks" />
          </div>
          <div>
            <CardTitle className="text-2xl text-tasks">Gerenciador de Tarefas</CardTitle>
            <CardDescription>Organize e acompanhe suas tarefas diárias</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p>
            Este aplicativo de gerenciamento de tarefas ajuda os usuários a organizar suas atividades diárias.
            Os recursos incluem adicionar, completar e excluir tarefas, junto com opções de filtros
            e níveis de prioridade. A interface foi projetada para ser intuitiva e facilitar
            a produtividade.
          </p>
        </CardContent>
      </Card>
      <TaskList />
    </div>
  );
};

export default Index;
