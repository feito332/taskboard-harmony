import { Building2, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AddBuildingDialog } from "./AddBuildingDialog";
import { useToast } from "@/hooks/use-toast";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "inProgress" | "completed">("all");
  const [buildingsList, setBuildingsList] = useState<Building[]>(buildings);
  const { toast } = useToast();

  const handleAddBuilding = (buildingName: string) => {
    const newBuilding: Building = {
      name: buildingName,
      stats: {
        total: 0,
        pending: 0,
        inProgress: 0,
        completed: 0,
      },
    };
    
    setBuildingsList((prev) => [...prev, newBuilding]);
    toast({
      title: "Edificio agregado",
      description: `Se ha agregado "${buildingName}" exitosamente.`,
    });
  };

  const filteredBuildings = buildingsList.filter((building) => {
    const matchesSearch = building.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterStatus === "all") return matchesSearch;
    
    const hasTasksInStatus = building.stats[filterStatus] > 0;
    return matchesSearch && hasTasksInStatus;
  });

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Mis Edificios</h2>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar edificios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <AddBuildingDialog onBuildingAdded={handleAddBuilding} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBuildings.map((building) => (
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