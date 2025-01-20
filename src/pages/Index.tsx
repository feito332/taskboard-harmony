import { BuildingsDashboard } from "@/components/BuildingsDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Sistema de Gestión de Edificios
          </h1>
          <p className="text-gray-600 mt-2">
            Administra y supervisa todos tus edificios desde un solo lugar
          </p>
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <BuildingsDashboard />
      </main>

      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-6 py-4">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Sistema de Gestión de Edificios. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;