import { NavLink } from 'react-router-dom'
import { lyricNamesMap } from '@/routes'

const Sidebar: React.FC = () => {
  return (
    <div className='sticky top-0 h-screen overflow-y-auto py-[30px] w-[300px]'>
      <div className='flex flex-col gap-5'>
        {lyricNamesMap.map(route => (
          <NavLink
            key={route.id}
            to={`/${route.id}`}
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
    </div>
  )
}

export default Sidebar
