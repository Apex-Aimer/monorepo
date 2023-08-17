import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Link } from 'expo-router'

import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import { useState } from 'react'
import { Button } from '../components/Button'

interface Item<T> {
  value: T
  label: string
}

interface Props<T> {
  initialItem: T
  items: Item<T>[]
  onChange(value: any): void
}

export function Select<T extends unknown>({
  items,
  initialItem,
  onChange,
}: Props<T>) {
  const styles = useAppStyles(themedStyles)
  const [currentValue, setCurrentValue] = useState(initialItem)

  return (
    <View style={styles.container}>
      {items
        .map(({ label, value }) => {
          return (
            <Button
              key={label}
              style={styles.row}
              onPress={() => {
                setCurrentValue(value)
                onChange(value)
              }}
              haptic="selection"
            >
              <Text
                style={[
                  styles.label,
                  currentValue === value && styles.labelActive,
                ]}
              >
                {label}
              </Text>
              <View
                style={[
                  styles.circle,
                  currentValue === value && styles.activeCircle,
                ]}
              >
                <View
                  style={[
                    styles.circleInner,
                    currentValue === value && styles.activeCircleInner,
                  ]}
                ></View>
              </View>
            </Button>
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
  label: {
    color: 'text primary',
    fontFamily: 'rubik 400',
    fontSize: 14,
  },
  labelActive: {
    color: 'accent primary',
  },
  circle: {
    width: 22,
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'line disabled',
  },
  circleInner: {
    width: 12,
    aspectRatio: 1,
    borderRadius: 6,
  },
  activeCircle: {
    borderColor: 'line accent disabled',
  },
  activeCircleInner: {
    backgroundColor: 'line accent',
  },
})
