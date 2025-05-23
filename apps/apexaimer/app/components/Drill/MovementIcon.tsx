import { ColorValue } from 'react-native'
import { Path, Svg, SvgProps } from 'react-native-svg'

interface Props extends SvgProps {
  fill?: ColorValue
}

const MovementIcon = ({ fill, ...rest }: Props) => (
  <Svg width={30} height={22} viewBox="0 0 30 22" fill={fill} {...rest}>
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M15.436 15.897a1.78 1.78 0 0 1-.479-2.472l5.128-7.588a1.78 1.78 0 1 1 2.95 1.993l-5.128 7.589a1.78 1.78 0 0 1-2.471.478Z"
      clipRule="evenodd"
    />
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M9.34 15.114a1.353 1.353 0 0 1 1.328-1.377l5.412-.095a1.353 1.353 0 0 1 .048 2.706l-5.412.095a1.353 1.353 0 0 1-1.377-1.33ZM17.813 11.821a1.21 1.21 0 0 1 1.702-.183l3.241 2.611a1.21 1.21 0 0 1-1.519 1.885l-3.241-2.61a1.21 1.21 0 0 1-.183-1.703Z"
      clipRule="evenodd"
    />
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M19.996 21.294a1.353 1.353 0 0 1-.792-1.742l1.71-4.557a1.353 1.353 0 0 1 2.533.95l-1.71 4.557a1.353 1.353 0 0 1-1.74.792ZM22.374 6.348a1.353 1.353 0 0 1 1.868.413l1.628 2.553a1.353 1.353 0 0 1-2.281 1.455L21.96 8.216a1.353 1.353 0 0 1 .413-1.868Z"
      clipRule="evenodd"
    />
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M29.015 7.633c.37.649.145 1.475-.504 1.845l-2.96 1.69a1.353 1.353 0 0 1-1.341-2.35l2.96-1.69a1.353 1.353 0 0 1 1.845.505ZM13.775 9.548a1.353 1.353 0 0 1-.499-1.847l1.612-2.803a1.353 1.353 0 1 1 2.345 1.348l-1.61 2.804c-.373.648-1.2.87-1.848.498Z"
      clipRule="evenodd"
    />
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M21.356 5.43a1.353 1.353 0 0 1-1.323 1.382l-3.703.082a1.353 1.353 0 0 1-.06-2.705l3.703-.082a1.353 1.353 0 0 1 1.383 1.322ZM20.088 1.487c0 .26-.22.47-.494.47H9.284a.483.483 0 0 1-.495-.47c0-.26.221-.47.494-.47h10.311c.273 0 .494.21.494.47ZM11.143 6.038c0 .26-.223.471-.499.471H.813a.485.485 0 0 1-.5-.47c0-.26.224-.471.5-.471h9.831c.276 0 .499.21.499.47ZM14.134 11.479c.002.275-.22.5-.495.502l-9.969.07a.498.498 0 1 1-.007-.996l9.969-.071c.275-.002.5.22.502.495ZM10.416 19.416c0 .304-.22.55-.493.55H1.18c-.273 0-.494-.246-.494-.55 0-.303.221-.549.494-.549h8.743c.272 0 .493.246.493.55Z"
      clipRule="evenodd"
    />
    <Path
      fill={fill}
      d="M26.052 2.507a2.276 2.276 0 1 1-4.55 0 2.276 2.276 0 0 1 4.55 0Z"
    />
  </Svg>
)
export default MovementIcon
