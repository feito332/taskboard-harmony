import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Trash2, CheckCircle, Circle, Clock } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Task {
  id: string;
  provider: string;
  building: string;
  description: string;
  dueDate: string;
  notes?: string;
  status: "pending" | "inProgress" | "completed";
}

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onDelete: (taskId: string) => void;
}

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const statusColors = {
    pending: "text-red-500",
    inProgress: "text-yellow-500",
    completed: "text-green-500",
  };

  const StatusIcon = {
    pending: Circle,
    inProgress: Clock,
    completed: CheckCircle,
  }[task.status];

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-gray-200 p-4 hover:shadow-md transition-all duration-200 group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <StatusIcon className={`h-5 w-5 ${statusColors[task.status]}`} />
          <h3 className="font-medium text-gray-900">{task.provider}</h3>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Cambiar estado</span>
                <StatusIcon className={`h-4 w-4 ${statusColors[task.status]}`} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onStatusChange(task.id, "pending")}>
                <Circle className="mr-2 h-4 w-4 text-red-500" />
                <span>Pendiente</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(task.id, "inProgress")}>
                <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                <span>En Progreso</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(task.id, "completed")}>
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                <span>Completada</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-50">
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Se eliminará permanentemente la tarea.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(task.id)}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <p className="text-gray-600 mb-3">{task.description}</p>

      {task.notes && (
        <p className="text-sm text-gray-500 mb-3">{task.notes}</p>
      )}

      <div className="flex items-center text-sm text-gray-500">
        <Calendar className="h-4 w-4 mr-2" />
        <time dateTime={task.dueDate}>
          {new Date(task.dueDate).toLocaleDateString()}
        </time>
      </div>
    </Card>
  );
}