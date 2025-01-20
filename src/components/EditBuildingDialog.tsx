import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit2 } from "lucide-react";
import { useState } from "react";

interface BuildingDetails {
  name: string;
  address: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

interface EditBuildingDialogProps {
  building: BuildingDetails;
  onBuildingUpdated: (buildingName: string, details: BuildingDetails) => void;
}

export function EditBuildingDialog({ building, onBuildingUpdated }: EditBuildingDialogProps) {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState<BuildingDetails>(building);

  const handleSubmit = () => {
    if (details.name.trim()) {
      onBuildingUpdated(building.name, details);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Edificio</DialogTitle>
          <DialogDescription>
            Actualiza la información del edificio
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name">Nombre del edificio</label>
            <Input
              id="name"
              value={details.name}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="address">Dirección</label>
            <Input
              id="address"
              value={details.address}
              onChange={(e) => setDetails({ ...details, address: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="contactName">Nombre de contacto</label>
            <Input
              id="contactName"
              value={details.contactName}
              onChange={(e) => setDetails({ ...details, contactName: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="contactPhone">Teléfono de contacto</label>
            <Input
              id="contactPhone"
              value={details.contactPhone}
              onChange={(e) => setDetails({ ...details, contactPhone: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="contactEmail">Email de contacto</label>
            <Input
              id="contactEmail"
              type="email"
              value={details.contactEmail}
              onChange={(e) => setDetails({ ...details, contactEmail: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}