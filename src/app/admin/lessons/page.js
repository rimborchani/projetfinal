import LessonManagement from '../../../components/admin/LessonManagement';

export default function AdminLessonsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header de navigation simple */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">⚙️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Administration</h1>
                <p className="text-sm text-gray-600">Gestion des leçons</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a 
                href="/" 
                className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
              >
                ← Retour au laboratoire
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="py-8">
        <LessonManagement />
      </main>
    </div>
  );
}

export const metadata = {
  title: 'Administration - Gestion des Leçons',
  description: 'Interface d\'administration pour gérer les leçons de programmation',
};
