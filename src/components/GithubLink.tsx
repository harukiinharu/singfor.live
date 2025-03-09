import useTheme from '@/hooks/use-theme'
import githubDark from '@/assets/github-dark.svg'
import githubLight from '@/assets/github-light.svg'

const GithubLink: React.FC = () => {
  const { theme } = useTheme()
  return (
    <div className='fixed top-[36px] right-[36px] z-0 w-[54px] h-[54px]'>
      <a href='https://github.com/harukiinharu/singfor.live' target='_blank'>
        <img src={theme === 'dark' ? githubDark : githubLight} alt='GitHub' />
      </a>
    </div>
  )
}

export default GithubLink
