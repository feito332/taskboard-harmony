import { useState } from "react";
import { TaskCard } from "./TaskCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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
  const [tasks] = useState(initialTasks);

  const filteredTasks = tasks.filter(
    (task) =>
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.building.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
}