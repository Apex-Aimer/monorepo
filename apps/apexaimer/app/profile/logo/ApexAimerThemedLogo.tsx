import { useAppColorScheme } from '../../components/ThemeProvider'
import { LogoDark } from './LogoDark'
import { LogoLight } from './LogoLight'
import { Props } from './types'

export function ApexAimerThemedLogo(props: Props) {
  const colorScheme = useAppColorScheme()

  if (colorScheme === 'light') {
    return <LogoLight {...props} />
  }
  return <LogoDark {...props} />
}
