import { AppStyleSheet } from '../useAppStyles'

export const PAYWALL_HORIZONTAL_PADDING = 15

export const themedStyles = AppStyleSheet.create({
  plan: {
    padding: 20,
    height: 92,
    shadowColor: 'paywall plan shadow',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  planBusy: {
    opacity: 0.5,
  },
  planContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planDecorationsAccentPrimaryCircle: {
    backgroundColor: 'accent primary',
  },
  planDecorationsAccentSecondaryCircle: {
    backgroundColor: 'accent secondary',
  },
  planBadge: {
    backgroundColor: 'paywall plan not-active badge',
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  planBadgeContainer: {
    backgroundColor: 'bg',
    position: 'absolute',
    top: -13,
    right: 18,
    borderRadius: 8,
    overflow: 'hidden',
  },
  planBadgeLabelActive: {
    fontFamily: 'rubik 600',
    fontSize: 13,
    color: 'text light',
  },
  planBadgeLabel: {
    fontFamily: 'rubik 600',
    fontSize: 13,
    color: 'text primary',
  },
})
