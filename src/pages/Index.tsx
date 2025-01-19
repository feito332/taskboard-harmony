import { TaskBoard } from "@/components/TaskBoard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Edificios</h1>
        </div>
      </header>
      
      <main className="container mx-auto">
        <TaskBoard />
      </main>
    </div>
  );
};

export default Index;