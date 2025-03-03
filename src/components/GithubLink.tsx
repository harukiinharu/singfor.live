import useTheme from '@/hooks/use-theme'

const GithubLink: React.FC = () => {
  const { theme } = useTheme()
  return (
    <div className='fixed top-[100px] right-[100px] z-0 w-[54px] h-[54px]'>
      <a href='https://github.com/harukiinharu/singfor.live' target='_blank'>
        <img src={`./github-${theme}.svg`} alt='GitHub' />
      </a>
    </div>
  )
}

export default GithubLink
