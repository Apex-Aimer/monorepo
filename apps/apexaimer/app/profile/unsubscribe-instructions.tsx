import { Platform } from 'react-native'
import { withDocScreen } from './Doc'

const TermsOfUseScreen = withDocScreen(
  Platform.select({
    ios: require('./unsubscribe-instructions-ios.md'),
    android: require('./unsubscribe-instructions-android.md'),
  })
)

export default TermsOfUseScreen
