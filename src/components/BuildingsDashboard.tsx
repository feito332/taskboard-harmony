import { Building2, Search, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AddBuildingDialog } from "./AddBuildingDialog";
import { EditBuildingDialog } from "./EditBuildingDialog";
import { useToast } from "@/hooks/use-toast";
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
import { Button } from "./ui/button";

interface BuildingStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}

interface BuildingDetails {
  name: string;
  address: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

interface Building extends BuildingDetails {
  stats: BuildingStats;
}

// Datos de ejemplo actualizados
const buildings: Building[] = [
  {
    name: "Edificio Central",
    address: "Calle Principal 123",
    contactName: "Juan Pérez",
    contactPhone: "555-0123",
    contactEmail: "juan@ejemplo.com",
    stats: {
      total: 5,
      pending: 2,
      inProgress: 2,
      completed: 1,
    },
  },
  {
    name: "Torre Norte",
    address: "Avenida Norte 456",
    contactName: "María García",
    contactPhone: "555-0124",
    contactEmail: "maria@ejemplo.com",
    stats: {
      total: 3,
      pending: 1,
      inProgress: 1,
      completed: 1,
    },
  },
  {
    name: "Residencial Sur",
    address: "Calle Sur 789",
    contactName: "Pedro López",
    contactPhone: "555-0125",
    contactEmail: "pedro@ejemplo.com",
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
      address: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
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

  const handleUpdateBuilding = (oldName: string, updatedDetails: BuildingDetails) => {
    setBuildingsList((prev) =>
      prev.map((building) =>
        building.name === oldName
          ? { ...building, ...updatedDetails }
          : building
      )
    );
    toast({
      title: "Edificio actualizado",
      description: "Los cambios han sido guardados exitosamente.",
    });
  };

  const handleDeleteBuilding = (buildingName: string) => {
    setBuildingsList((prev) => prev.filter((building) => building.name !== buildingName));
    toast({
      title: "Edificio eliminado",
      description: `Se ha eliminado "${buildingName}" exitosamente.`,
      variant: "destructive",
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
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow relative"
          >
            <div className="absolute top-4 right-4 flex gap-2">
              <EditBuildingDialog
                building={building}
                onBuildingUpdated={handleUpdateBuilding}
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. Se eliminará permanentemente el edificio
                      y toda su información asociada.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteBuilding(building.name)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            
            <div 
              className="flex items-center gap-3 mb-4"
              onClick={() => navigate(`/building/${encodeURIComponent(building.name)}`)}
            >
              <Building2 className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">{building.name}</h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Dirección:</span>
                <span className="font-medium">{building.address || "No especificada"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Contacto:</span>
                <span className="font-medium">{building.contactName || "No especificado"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Teléfono:</span>
                <span className="font-medium">{building.contactPhone || "No especificado"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{building.contactEmail || "No especificado"}</span>
              </div>
              <div className="pt-2 border-t mt-2">
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
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}