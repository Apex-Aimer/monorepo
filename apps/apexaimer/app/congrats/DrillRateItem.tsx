import { Text, View } from 'react-native'
import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import { CoverIcon } from '../components/Drill/CoverIcon'
import { useRecoilValue } from 'recoil'
import { routineDrill } from '../store'
import { Slider } from './Slider'

export function DrillRateItem({ id }: { id: string }) {
  const styles = useAppStyles(themedStyles)
  const { type, description } = useRecoilValue(routineDrill(id))

  return (
    <View style={styles.wrapper}>
      <View style={styles.drillInfo}>
        <View style={styles.coverContainer}>
          <View style={styles.cover} />
          <CoverIcon type={type} active absolute />
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      </View>
      <Slider initialIndex={2} />
    </View>
  )
}

const themedStyles = AppStyleSheet.create({
  wrapper: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  coverContainer: {
    position: 'relative',
    paddingRight: 20,
    paddingBottom: 20,
  },
  cover: {
    width: 80,
    aspectRatio: 1,
    backgroundColor: 'accent primary',
    borderRadius: 10,
  },
  description: {
    flex: 1,
  },
  descriptionText: {
    color: 'text primary',
    fontFamily: 'rubik 700',
    fontSize: 16,
    textAlign: 'right',
  },
  drillInfo: {
    flexDirection: 'row',
    gap: 15,
    paddingBottom: 20,
  },
})
