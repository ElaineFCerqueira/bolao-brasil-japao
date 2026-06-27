// src/App.jsx
import Header from './components/Header';
import FormPalpite from './components/FormPalpite';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-body">
      <Header />

      <main className="flex-1 px-4 py-5 space-y-5 max-w-lg mx-auto w-full pb-16">
        <FormPalpite />
        <Dashboard />
        <AdminPanel />
      </main>

      <Footer />
    </div>
  );
}
