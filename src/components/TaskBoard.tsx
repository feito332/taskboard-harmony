import { useState, useEffect } from "react";
import { TaskCard } from "./TaskCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AddTaskDialog } from "./AddTaskDialog";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Task {
  id: number;
  provider: string;
  building: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  dueDate: string;
  notes?: string;
}

// Datos de ejemplo
const initialTasks = [
  {
    id: 1,
    provider: "Electricista Juan",
    building: "Edificio Central",
    description: "Reparación de iluminación en lobby",
    status: "pending" as const,
    dueDate: "2024-04-15",
    notes: "Se requiere cambio de transformador",
  },
  {
    id: 2,
    provider: "Plomería Express",
    building: "Torre Norte",
    description: "Mantenimiento sistema de agua",
    status: "in-progress" as const,
    dueDate: "2024-04-20",
    notes: "Revisión trimestral programada",
  },
  {
    id: 3,
    provider: "Seguridad Total",
    building: "Residencial Sur",
    description: "Actualización cámaras de seguridad",
    status: "completed" as const,
    dueDate: "2024-04-10",
    notes: "Instalación completada, pendiente capacitación",
  },
];

export function TaskBoard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [buildingFilter, setBuildingFilter] = useState<string>("all");
  const { toast } = useToast();

  // Obtener lista única de edificios
  const buildings = Array.from(new Set(tasks.map((task) => task.building)));

  useEffect(() => {
    // Verificar tareas próximas a vencer
    const checkDueDates = () => {
      const today = new Date();
      const threeDaysFromNow = new Date();
      threeDaysFromNow.setDate(today.getDate() + 3);

      tasks.forEach((task) => {
        if (task.status !== "completed") {
          const dueDate = new Date(task.dueDate);
          if (dueDate <= threeDaysFromNow && dueDate >= today) {
            toast({
              title: "Tarea próxima a vencer",
              description: `La tarea "${task.description}" vence el ${task.dueDate}`,
              variant: "destructive",
            });
          }
        }
      });
    };

    checkDueDates();
    // Verificar cada 24 horas
    const interval = setInterval(checkDueDates, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [tasks, toast]);

  const handleStatusChange = (taskId: number, newStatus: "pending" | "in-progress" | "completed") => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleAddTask = (newTask: Omit<Task, "id" | "status">) => {
    const task: Task = {
      ...newTask,
      id: Math.max(...tasks.map((t) => t.id)) + 1,
      status: "pending",
    };
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.building.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesBuilding = buildingFilter === "all" || task.building === buildingFilter;

    return matchesSearch && matchesStatus && matchesBuilding;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar tareas..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="pending">Pendiente</SelectItem>
              <SelectItem value="in-progress">En Curso</SelectItem>
              <SelectItem value="completed">Finalizado</SelectItem>
            </SelectContent>
          </Select>

          <Select value={buildingFilter} onValueChange={setBuildingFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por edificio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los edificios</SelectItem>
              {buildings.map((building) => (
                <SelectItem key={building} value={building}>
                  {building}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <AddTaskDialog onTaskAdded={handleAddTask} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
}