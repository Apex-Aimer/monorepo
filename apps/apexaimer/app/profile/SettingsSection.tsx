import { ComponentType } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import { Link, LinkProps } from 'expo-router'
import {
  ChevronRightIcon,
  ArrowTopRightOnSquareIcon,
} from 'react-native-heroicons/solid'
import { Button } from '../components/Button'

interface SettingsRowIconProps {
  icon:
    | {
        external: boolean
      }
    | ComponentType<{ size: number; color: string }>
}

interface SettingsRow<T> extends SettingsRowIconProps {
  label: string
  labelIcon?: ComponentType<{ size: number; color: string }>
  href?: LinkProps<T>['href']
  onPress?(): void
}

interface Props<T> {
  rows: (SettingsRow<T> | null)[]
}

function SettingsRowIcon({ icon }: SettingsRowIconProps) {
  const styles = useAppStyles(themedStyles)
  const { backgroundColor: rowIconColor } = StyleSheet.flatten(styles.rowIcon)

  if (!('external' in icon)) {
    const Icon = icon
    return <Icon size={20} color={rowIconColor as string} />
  }

  if (!icon.external) {
    return (
      <View style={styles.rowIconArrow}>
        <ChevronRightIcon size={20} color={rowIconColor} />
      </View>
    )
  }
  return (
    <View style={styles.rowIconExternal}>
      <ArrowTopRightOnSquareIcon size={20} color={rowIconColor} />
    </View>
  )
}

export function SettingsSection<T>({ rows }: Props<T>) {
  const styles = useAppStyles(themedStyles)

  const { backgroundColor: labelIconColor } = StyleSheet.flatten(
    styles.labelIcon
  )

  return (
    <View style={styles.container}>
      {rows
        .filter((it) => it != null)
        .map(({ label, labelIcon: LabelIcon, href, icon, onPress }) => {
          const row = (
            <>
              <View style={styles.labelWrapper}>
                {LabelIcon && (
                  <LabelIcon size={18} color={labelIconColor as string} />
                )}
                <Text style={styles.label}>{label}</Text>
              </View>
              <SettingsRowIcon icon={icon} />
            </>
          )

          if (onPress != null) {
            return (
              <Button
                key={label}
                style={styles.row}
                onPress={onPress}
                haptic="selection"
              >
                {row}
              </Button>
            )
          }

          if (href != null) {
            return (
              <Link key={label} href={href} asChild>
                <Button style={styles.row} haptic="selection">
                  {row}
                </Button>
              </Link>
            )
          }

          return (
            <View key={label} style={styles.row}>
              {row}
            </View>
          )
        })
        .flatMap((el, index) =>
          index === 0
            ? [el]
            : [<View key={`separator:${index}`} style={styles.separator} />, el]
        )}
    </View>
  )
}

const themedStyles = AppStyleSheet.create({
  container: {
    backgroundColor: 'bg accent',
    borderRadius: 15,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  separator: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'line disabled',
  },
  labelWrapper: {
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
  },
  labelIcon: {
    backgroundColor: 'text primary',
  },
  rowIcon: {
    backgroundColor: 'line',
  },
  rowIconArrow: {
    paddingRight: 5,
  },
  rowIconExternal: {
    paddingRight: 10,
  },
  label: {
    color: 'text primary',
    fontFamily: 'rubik 400',
    fontSize: 14,
  },
})
