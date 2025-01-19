import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Building2, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface TaskCardProps {
  id: number;
  provider: string;
  building: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  dueDate: string;
  notes?: string;
  onStatusChange?: (id: number, newStatus: "pending" | "in-progress" | "completed") => void;
}

const statusConfig = {
  pending: { color: "bg-destructive", text: "Pendiente" },
  "in-progress": { color: "bg-warning", text: "En Curso" },
  completed: { color: "bg-success", text: "Finalizado" },
};

export function TaskCard({
  id,
  provider,
  building,
  description,
  status,
  dueDate,
  notes,
  onStatusChange,
}: TaskCardProps) {
  const { toast } = useToast();

  const handleStatusChange = (newStatus: "pending" | "in-progress" | "completed") => {
    if (onStatusChange) {
      onStatusChange(id, newStatus);
      toast({
        title: "Estado actualizado",
        description: `La tarea ha sido marcada como ${statusConfig[newStatus].text}`,
      });
    }
  };

  const isOverdue = new Date(dueDate) < new Date() && status !== "completed";

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-lg">{description}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Badge className={`${statusConfig[status].color}`}>
                  {statusConfig[status].text}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleStatusChange("pending")}>
                Pendiente
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange("in-progress")}>
                En Curso
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange("completed")}>
                Finalizado
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User2 className="h-4 w-4" />
            <span>{provider}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building2 className="h-4 w-4" />
            <span>{building}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CalendarDays className="h-4 w-4" />
            <span className={isOverdue ? "text-destructive font-medium" : ""}>
              {dueDate}
            </span>
          </div>
        </div>
        
        {notes && (
          <div className="mt-2 text-sm text-gray-500 border-t pt-2">
            {notes}
          </div>
        )}
      </div>
    </Card>
  );
}