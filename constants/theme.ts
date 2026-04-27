type TPalette = {
  'color-1': string;
  'color-2': string;
  'color-3': string;
  'color-4': string;
  'color-5': string;
  'color-6': string;
  'gradient-1': string;
  'gradient-2': string;
  'gradient-3': string;
  'gradient-4': string;
  'gradient-5': string;
  'gradient-6': string;
  'shadow-1': string;
  'shadow-2': string;
  'blur-1': string;
};

const lightPalette: TPalette = {
  //main palette
  'color-1': '#F5F5F5',
  'color-2': '#0D0D0D',
  'color-3': '#2FC2AA',
  'color-4': '#C34363',
  'color-5': '#191C1F',
  'color-6': '#1F1919',

  //gradients
  'gradient-1':
    'linear-gradient(180deg, rgba(0, 189, 231, 0) 14.42%, rgba(63, 240, 211, 0.15) 64.9%, rgba(182, 254, 13, 0.5) 100%)',
  'gradient-2':
    'linear-gradient(180deg, rgba(0, 189, 231, 0) 14.42%, rgba(63, 240, 211, 0.075) 64.9%, rgba(182, 254, 13, 0.25) 100%)',
  'gradient-3':
    'linear-gradient(180deg, rgba(231, 8, 0, 0) 18.75%, rgba(231, 0, 139, 0.1) 52.4%, rgba(146, 0, 231, 0.21) 87.98%)',
  'gradient-4':
    'linear-gradient(180deg, rgba(231, 8, 0, 0) 18.75%, rgba(231, 0, 139, 0.08) 52.4%, rgba(146, 0, 231, 0.17) 87.98%)',
  'gradient-5': 'linear-gradient(90deg, #CBFF00 0%, #07F499 100%)',
  'gradient-6': 'linear-gradient(90deg, rgba(203, 255, 0, 0.4) 0%, rgba(7, 244, 153, 0.4) 100%)',

  //shadows
  'shadow-1': '0px 0px 20px 0px rgba(109, 251, 72, 0.5)',
  'shadow-2': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',

  //blurs
  'blur-1': '25px',
} as const;

const darkPalette: TPalette = {
  'color-1': '#F5F5F5',
  'color-2': '#0D0D0D',
  'color-3': '#2FC2AA',
  'color-4': '#C34363',
  'color-5': '#191C1F',
  'color-6': '#1F1919',

  //gradients
  'gradient-1':
    'linear-gradient(180deg, rgba(0, 189, 231, 0) 14.42%, rgba(63, 240, 211, 0.15) 64.9%, rgba(182, 254, 13, 0.5) 100%)',
  'gradient-2':
    'linear-gradient(180deg, rgba(0, 189, 231, 0) 14.42%, rgba(63, 240, 211, 0.075) 64.9%, rgba(182, 254, 13, 0.25) 100%)',
  'gradient-3':
    'linear-gradient(180deg, rgba(231, 8, 0, 0) 18.75%, rgba(231, 0, 139, 0.1) 52.4%, rgba(146, 0, 231, 0.21) 87.98%)',
  'gradient-4':
    'linear-gradient(180deg, rgba(231, 8, 0, 0) 18.75%, rgba(231, 0, 139, 0.08) 52.4%, rgba(146, 0, 231, 0.17) 87.98%)',
  'gradient-5': 'linear-gradient(90deg, #CBFF00 0%, #07F499 100%)',
  'gradient-6': 'linear-gradient(90deg, rgba(203, 255, 0, 0.4) 0%, rgba(7, 244, 153, 0.4) 100%)',

  //shadows
  'shadow-1': '0px 0px 20px 0px rgba(109, 251, 72, 0.5)',
  'shadow-2': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',

  //blurs
  'blur-1': '25px',
} as const;

export const themes = {
  light: lightPalette,
  dark: darkPalette,
} as const;

export type Theme = typeof darkPalette | typeof lightPalette;

export const fonts = {
  regular: 'Geist_400Regular',
  medium: 'Geist_500Medium',
  semibold: 'Geist_600SemiBold',
  bold: 'Geist_700Bold',
  italic: 'Geist_700Italic',
} as const;

export const fontSize = {
  xxs: 10,
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 96,
  '4xl': 40,
  '32pt': 32,
} as const;

export const colors = {
  whiteSolid: '#F5F5F5',
  white85: 'rgba(245, 245, 245, 0.85)',
  white60: 'rgba(245, 245, 245, 0.60)',
  white30: 'rgba(245, 245, 245, 0.30)',
  white20: 'rgba(245, 245, 245, 0.20)',
  white7: 'rgba(245, 245, 245, 0.07)',
  white3: 'rgba(245, 245, 245, 0.03)',
  blackSolid: '#0D0D0D',
  black85: 'rgba(13, 13, 13, 0.85)',
  black60: 'rgba(13, 13, 13, 0.60)',
  black40: 'rgba(13, 13, 13, 0.40)',
  black35: 'rgba(13, 13, 13, 0.35)',
  black30: 'rgba(13, 13, 13, 0.30)',
  greenStart: '#CBFF00',
  greenEnd: '#07F499',
  green40Start: 'rgba(203, 255, 0, 0.4)',
  green40End: 'rgba(7, 244, 153, 0.4)',
  greenGlow: '#6dfb48',
  white50: 'rgba(245, 245, 245, 0.50)',
  teal: '#2FC2AA',
  red: '#C34363',
  darkBlueBg: '#191C1F',
  darkRedBg: '#1F1919',
  selectedFighterBorder: 'rgba(122, 164, 111, 0.2)',
} as const;

export const spacing = {
  xxs: 6,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
} as const;

export const gradients = {
  authBg: {
    colors: ['#060B11', '#070707', '#020202'] as const,
    locations: [0.003, 0.68, 0.991] as const,
    start: { x: 0.15, y: 0 } as const,
    end: { x: 0.85, y: 1 } as const,
  },
} as const;

export const borderRadius = {
  xs: 6,
  card: 8,
  button: 12,
  modal: 16,
  pill: 9999,
  toggle: 30,
} as const;

export const animation = {
  spring: {
    damping: 15,
    stiffness: 150,
  },
} as const;

export const tabBarHeight = 68;
