import { Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface BuildingStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}

interface Building {
  name: string;
  stats: BuildingStats;
}

// Datos de ejemplo
const buildings: Building[] = [
  {
    name: "Edificio Central",
    stats: {
      total: 5,
      pending: 2,
      inProgress: 2,
      completed: 1,
    },
  },
  {
    name: "Torre Norte",
    stats: {
      total: 3,
      pending: 1,
      inProgress: 1,
      completed: 1,
    },
  },
  {
    name: "Residencial Sur",
    stats: {
      total: 4,
      pending: 2,
      inProgress: 1,
      completed: 1,
    },
  },
];

export function BuildingsDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Mis Edificios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buildings.map((building) => (
          <Card
            key={building.name}
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/building/${encodeURIComponent(building.name)}`)}
          >
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">{building.name}</h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tareas Totales:</span>
                <span className="font-medium">{building.stats.total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Pendientes:</span>
                <span className="font-medium text-destructive">{building.stats.pending}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">En Progreso:</span>
                <span className="font-medium text-warning">{building.stats.inProgress}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Completadas:</span>
                <span className="font-medium text-success">{building.stats.completed}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}