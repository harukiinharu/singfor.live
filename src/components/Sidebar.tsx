import { NavLink } from 'react-router-dom'
import lyricNamesMap from '@/routes'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const SidebarContent: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div className='flex flex-col gap-2'>
      {lyricNamesMap.map(route => (
        <NavLink
          key={route.id}
          to={`/${route.id}`}
          onClick={onClick}
          className={({ isActive }) =>
            `text-center py-[15px] mx-5 rounded-[50px] no-underline border ${
              isActive
                ? 'border-[#fd4a47]'
                : 'border-transparent hover:border-[#fd4a47]'
            }`
          }
        >
          {route.name}
        </NavLink>
      ))}
    </div>
  )
}

const MobileSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='w-full mb-4'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full py-3 px-4 bg-white dark:bg-[#333] rounded-lg shadow-md',
          'flex items-center justify-center'
        )}
      >
        <div className='relative w-6 h-6'>
          {isOpen ? (
            // 三横杠
            <div className='inset-0'>
              <svg
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              >
                <line x1='3' y1='6' x2='21' y2='6' />
                <line x1='3' y1='12' x2='21' y2='12' />
                <line x1='3' y1='18' x2='21' y2='18' />
              </svg>
            </div>
          ) : (
            // 向下箭头
            <div className='inset-0'>
              <svg
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M6 9l6 6 6-6' />
              </svg>
            </div>
          )}
        </div>
      </button>
      <div
        className={cn(
          'absolute left-0 right-0 z-10 mt-2 p-4 bg-white dark:bg-[#333]',
          'rounded-lg shadow-lg max-h-[70vh] overflow-y-auto',
          'transition-all duration-300 ease-in-out',
          isOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <SidebarContent onClick={() => setIsOpen(false)} />
      </div>
    </div>
  )
}

const Sidebar: React.FC = () => {
  return (
    <div className='sticky top-0 h-screen overflow-y-auto py-[30px] w-[300px]'>
      <SidebarContent />
    </div>
  )
}

export { Sidebar, MobileSidebar }
