import useTheme from '@/hooks/use-theme'

const GithubLink: React.FC = () => {
  const { theme } = useTheme()
  return (
    <div className='fixed top-[80px] right-[80px] z-0 w-[50px] h-[50px]'>
      <a href='https://github.com/harukiinharu/singfor.live' target='_blank'>
        <img src={`./github-${theme}.svg`} alt='GitHub' />
      </a>
    </div>
  )
}

export default GithubLink
