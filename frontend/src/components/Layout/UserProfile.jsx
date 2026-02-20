import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MoreVertical } from 'lucide-react';

const dropdownVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.16, ease: 'easeIn' }
  }
};

const UserProfile = ({ name, email, initials, onLogout, onEditProfile }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div ref={containerRef} className="relative border-t border-gray-200 bg-white px-4 pb-6 pt-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onEditProfile?.()}
            className="inline-flex items-center justify-center overflow-hidden rounded-lg bg-zinc-100 px-2 py-1.5 transition-colors hover:bg-zinc-200"
            aria-label="Editar perfil"
          >
            <span className="text-base font-medium font-['Manrope'] leading-7 text-slate-900">{initials}</span>
          </button>

          <div className="min-w-0">
            <p className="truncate text-xs font-bold font-['Manrope'] leading-3 text-slate-900">{name}</p>
            <p className="mt-1 truncate text-xs font-medium font-['Manrope'] leading-3 text-gray-400">{email}</p>
          </div>
        </div>

        <motion.button
          type="button"
          onClick={() => setOpenMenu((previous) => !previous)}
          className="ml-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md text-blue-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          whileTap={{ opacity: 0.8 }}
          aria-label="Menu do usuario"
          aria-expanded={openMenu}
          aria-haspopup="menu"
        >
          <MoreVertical className="h-5 w-5" />
        </motion.button>
      </div>

      <AnimatePresence>
        {openMenu && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-16 right-4 z-50 w-44 rounded-lg border border-gray-200 bg-white p-1"
          >
            <ul className="space-y-1" role="menu" aria-label="Opcoes do usuario">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onEditProfile?.();
                    setOpenMenu(false);
                  }}
                  className="flex h-11 w-full items-center rounded-lg px-3 py-3.5 text-left text-sm font-semibold font-['Manrope'] leading-4 text-slate-500 transition-colors hover:bg-slate-50"
                  role="menuitem"
                >
                  Editar Perfil
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onLogout?.();
                    setOpenMenu(false);
                  }}
                  className="flex h-11 w-full items-center rounded-lg px-3 py-3.5 text-left text-sm font-semibold font-['Manrope'] leading-4 text-red-600 transition-colors hover:bg-red-50"
                  role="menuitem"
                >
                  Logout
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;
