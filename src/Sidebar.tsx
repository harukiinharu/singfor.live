import { NavLink } from 'react-router'
import { lyricNamesMap } from './route'

const Sidebar: React.FC = () => {
  return (
    <div id='sidebar'>
      {lyricNamesMap.map(route => (
        <NavLink key={route.id} to={`/${route.id}`}>
          {route.name}
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar
