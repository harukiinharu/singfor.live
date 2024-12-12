import { NavLink } from 'react-router'

const lyricNames = ['生きていたんだよな', '僕が死のうと思ったのは']

const Sidebar: React.FC = () => {
  return (
    <div id='sidebar'>
      {lyricNames.map(name => (
        <NavLink key={name} to={`/${name}`}>
          {name}
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar
