// Shared pixel-art building blocks. Everything sits on a grid of P x P "pixels";
// sprites are strings where each character is a color from PAL and '.' is empty.

export const P = 6
export const c = (n) => n * P

export const MONITOR = { x: c(74), y: c(61), w: c(52), h: c(39) }
export const SCREEN = { x: c(77), y: c(64), w: c(46), h: c(25) }

export const PAL = {
  k: '#4b3832', // outline
  w: '#fffdf7',
  c: '#f5e6ca',
  p: '#ffe8d6',
  P: '#b2774c',
  r: '#e3a47a', // blush
  y: '#ffd6a5',
  m: '#b7b7a4',
  M: '#798468',
  o: '#dcc7aa',
  l: '#b2774c',
  L: '#6f4e37',
  v: '#dcc7aa',
  s: '#b7b7a4',
  g: '#ffd6a5',
  G: '#6b705c',
}

export const ART = {
  coffee: {
    bg: PAL.p,
    rows: [
      '............',
      '...w...w....',
      '....w...w...',
      '............',
      '.kkkkkkkkk..',
      '.kwwwwwwwkk.',
      '.kwkwwwkwk.k',
      '.krwwwwwrk.k',
      '.kwwwkwwwkk.',
      '..kwwwwwk...',
      '...kkkkk....',
      '............',
    ],
  },
  cat: {
    bg: PAL.m,
    rows: [
      '............',
      '.k........k.',
      '.kk......kk.',
      '.kokkkkkkok.',
      '.kooooooook.',
      '.kokooookok.',
      '.kroooooork.',
      '.koookokook.',
      '.kooooooook.',
      '..kkkkkkkk..',
      '............',
      '............',
    ],
  },
  strawberry: {
    bg: PAL.c,
    rows: [
      '............',
      '.....MM.....',
      '...MMMMMM...',
      '..kkkkkkkk..',
      '.kPPPPPPPPk.',
      '.kPkPPPPkPk.',
      '.kPrPPPPrPk.',
      '.kPPPkkPPPk.',
      '..kPyPPyPk..',
      '...kPPPPk...',
      '....kkkk....',
      '............',
    ],
  },
  cloud: {
    bg: PAL.s,
    rows: [
      'y...........',
      '..........y.',
      '....kkkk....',
      '...kwwwwk...',
      '.kkwwwwwwkk.',
      'kwwwwwwwwwwk',
      'kwwkwwwwkwwk',
      'kwrwwkkwwrwk',
      'kwwwwwwwwwwk',
      '.kkkkkkkkkk.',
      '..p..y..m..v',
      '............',
    ],
  },
}
