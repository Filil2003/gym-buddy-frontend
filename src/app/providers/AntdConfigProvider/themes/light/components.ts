import type { Components } from '../../types.ts';

export const components: Components = {
  Layout: {
    headerBg: '#fff',
    headerHeight: 64,
    headerPadding: '0 16px',
    bodyBg: '#fff',
    footerBg: '#fff',
    footerPadding: '16px',
    siderBg: '#fff'
  },
  Menu: {
    itemBg: 'transparent',
    iconSize: 24,
    activeBarBorderWidth: 0,
    activeBarWidth: 20,
    itemMarginBlock: 0,
    itemMarginInline: 0
  },
  Form: {
    labelColor: 'inherit',
    colorText: 'inherit'
  },
  InputNumber: {
    controlWidth: 30
  },
} as const;
