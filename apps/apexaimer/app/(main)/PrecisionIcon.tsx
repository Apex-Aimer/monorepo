import { ColorValue } from 'react-native'
import Svg, { Circle, Path, SvgProps } from 'react-native-svg'

interface Props extends SvgProps {
  fill?: ColorValue
}

const PrecisionIcon = ({ fill, ...rest }: Props) => (
  <Svg width={26} height={26} fill="none" {...rest}>
    <Circle cx={13} cy={13} r={10} stroke={fill} strokeWidth={2} />
    <Circle cx={13} cy={13} r={2} fill={fill} />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeWidth={2}
      d="M13 21v4M13 1v4M25 13h-4M5 13H1"
    />
  </Svg>
)
export default PrecisionIcon
