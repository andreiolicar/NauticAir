import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const sidebarSections = [
  {
    title: 'Menu Principal',
    items: [
      { key: 'dashboard', label: 'Dashboard', to: '/dashboard' },
      { key: 'alerts', label: 'Alertas', to: '/dashboard/alerts' },
      { key: 'devices', label: 'Dispositivos', to: '/dashboard/devices' },
      { key: 'history', label: 'Historico', to: '/dashboard/history' }
    ]
  },
  {
    title: 'Outros',
    items: [{ key: 'settings', label: 'Configuracoes', to: '/dashboard/settings' }]
  }
];

const profile = {
  name: 'Andrei Carneiro',
  email: 'andreicarneiro@email.com',
  initials: 'AC'
};

const RestrictedLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-50 font-['Manrope'] text-slate-900">
      <div className="flex min-h-screen w-full">
        <Sidebar
          sections={sidebarSections}
          profile={profile}
          onLogout={() => navigate('/login')}
          onEditProfile={() => navigate('/dashboard/settings')}
        />

        <main className="ml-72 min-h-screen flex-1 px-4 pb-8 pt-6 md:px-6" aria-label="Conteudo principal da area restrita">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RestrictedLayout;
