import { ColorValue } from 'react-native'
import Svg, { Path, Circle, SvgProps } from 'react-native-svg'

interface Props extends SvgProps {
  fill?: ColorValue
}

const TrackingIcon = ({ fill, ...rest }: Props) => (
  <Svg width={31} height={20} viewBox="0 0 31 20" fill="none" {...rest}>
    <Path
      stroke={fill}
      strokeWidth={2}
      d="M28.253 10a7.22 7.22 0 1 1-14.439 0 7.22 7.22 0 0 1 14.439 0Z"
    />
    <Circle cx={21.034} cy={10} r={1.494} fill={fill} />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeWidth={2}
      d="M21.033 15.978v2.989M21.033 1.034v2.988M30 10h-2.989M15.056 10h-2.989"
    />
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M14.887 2.133a.36.36 0 0 1-.369.351H6.814a.36.36 0 0 1-.37-.351.36.36 0 0 1 .37-.352h7.704a.36.36 0 0 1 .37.352ZM8.203 6.28a.363.363 0 0 1-.372.352H.484a.363.363 0 0 1-.372-.352c0-.194.167-.351.372-.351h7.347c.205 0 .372.157.372.351ZM8.196 11.84a.372.372 0 0 1-.37.375l-7.448.053a.373.373 0 0 1-.006-.745l7.45-.053a.372.372 0 0 1 .374.37ZM13.638 17.024c0 .227-.165.41-.369.41H6.736c-.203 0-.369-.183-.369-.41 0-.227.166-.41.37-.41h6.532c.204 0 .37.183.37.41Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default TrackingIcon
