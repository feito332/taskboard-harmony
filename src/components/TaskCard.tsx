import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Building2, User2 } from "lucide-react";

interface TaskCardProps {
  provider: string;
  building: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  dueDate: string;
  notes?: string;
}

const statusConfig = {
  pending: { color: "bg-destructive", text: "Pendiente" },
  "in-progress": { color: "bg-warning", text: "En Curso" },
  completed: { color: "bg-success", text: "Finalizado" },
};

export function TaskCard({
  provider,
  building,
  description,
  status,
  dueDate,
  notes,
}: TaskCardProps) {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-lg">{description}</h3>
          <Badge className={`${statusConfig[status].color}`}>
            {statusConfig[status].text}
          </Badge>
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
            <span>{dueDate}</span>
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