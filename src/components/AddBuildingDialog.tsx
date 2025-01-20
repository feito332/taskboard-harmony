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
import { Plus } from "lucide-react";
import { useState } from "react";

interface AddBuildingDialogProps {
  onBuildingAdded: (buildingName: string) => void;
}

export function AddBuildingDialog({ onBuildingAdded }: AddBuildingDialogProps) {
  const [open, setOpen] = useState(false);
  const [buildingName, setBuildingName] = useState("");

  const handleSubmit = () => {
    if (buildingName.trim()) {
      onBuildingAdded(buildingName);
      setBuildingName("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Agregar Edificio
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Edificio</DialogTitle>
          <DialogDescription>
            Ingresa el nombre del nuevo edificio que deseas agregar al sistema.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              placeholder="Nombre del edificio"
              className="col-span-4"
              value={buildingName}
              onChange={(e) => setBuildingName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">Agregar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}