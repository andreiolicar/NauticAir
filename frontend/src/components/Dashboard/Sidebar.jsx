import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  Bell,
  HardDrive,
  History,
  LayoutDashboard,
  Settings,
  Ship,
} from 'lucide-react';
import UserProfile from './UserProfile';
import { slideDown, staggerContainer, staggerItem } from '../../utils/animations';

const iconMap = {
  dashboard: LayoutDashboard,
  alerts: Bell,
  devices: HardDrive,
  history: History,
  settings: Settings
};

const Sidebar = ({ sections, profile, onLogout, onEditProfile }) => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-72 flex-col overflow-x-hidden border-r border-gray-200 bg-white">
      <div className="flex-shrink-0">
        <motion.div
          variants={slideDown}
          initial="hidden"
          animate="visible"
          className="border-b border-gray-200 px-6 py-5"
        >
          <Link to="/dashboard" className="inline-flex items-center gap-2" aria-label="Ir para dashboard">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white">
              <Ship size={20} />
            </span>
            <span className="text-xl font-bold font-['Manrope'] text-gray-900">NauticAir</span>
          </Link>
        </motion.div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <motion.nav
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          aria-label="Navegacao principal"
          className="space-y-0"
        >
          {sections.map((section) => (
            <section key={section.title} className="w-full px-5 py-6">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="flex-1 text-xs font-semibold font-['Manrope'] leading-3 text-gray-400">
                  {section.title}
                </h2>
              </div>

              <ul className="flex flex-col space-y-1">
                {section.items.map((item) => {
                  const Icon = iconMap[item.key] || LayoutDashboard;
                  const isActive = location.pathname === item.to;

                  return (
                    <motion.li key={item.key} variants={staggerItem}>
                      <Link
                        to={item.to}
                        className={`flex h-11 w-full items-center gap-4 rounded-lg px-3 py-3.5 text-sm font-semibold font-['Manrope'] leading-4 transition-colors ${isActive
                            ? 'bg-slate-50 text-blue-600'
                            : 'text-slate-500 hover:bg-slate-50'
                          }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <Icon className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                        <span>{item.label}</span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </section>
          ))}
        </motion.nav>
      </div>

      <div className="flex-shrink-0">
        <UserProfile
          name={profile.name}
          email={profile.email}
          initials={profile.initials}
          onLogout={onLogout}
          onEditProfile={onEditProfile}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
