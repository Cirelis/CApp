// theme multiplier: 8

const spacingWidgets2px = 0.25;
const spacingWidgets4px = 0.5;
const spacingWidgets6px = 0.75;
const spacingWidgets8px = 1;
const spacingWidgets10px = 1.25;
const spacingWidgets12px = 1.5;
const spacingWidgets14px = 1.75;
const spacingWidgets16px = 2;
const spacingWidgets18px = 2.25;
const spacingWidgets20px = 2.5;
const spacingWidgets22px = 2.75;
const spacingWidgets24px = 3;
const spacingWidgets26px = 3.25;

const styleguide = {
  spacing: {
    spacing2px: {
      S: spacingWidgets2px,
      M: spacingWidgets2px,
      L: spacingWidgets2px,
    },
    spacingTags: {
      S: spacingWidgets6px,
      M: spacingWidgets6px,
      L: spacingWidgets6px,
    },
    contentSpacingS: {
      S: spacingWidgets10px,
      M: spacingWidgets12px,
      L: spacingWidgets14px,
    },
    contentSpacingM: {
      S: spacingWidgets18px,
      M: spacingWidgets20px,
      L: spacingWidgets22px,
    },
    contentSpacingL: {
      S: spacingWidgets22px,
      M: spacingWidgets24px,
      L: spacingWidgets26px,
    },
    inlineSpacing: {
      S: spacingWidgets6px,
      M: spacingWidgets8px,
      L: spacingWidgets10px,
    },
    buttonPaddingS: {
      S: spacingWidgets6px,
      M: spacingWidgets6px,
      L: spacingWidgets6px,
    },
    buttonPaddingM: {
      S: spacingWidgets10px,
      M: spacingWidgets12px,
      L: spacingWidgets14px,
    },
    containerPadding: {
      S: spacingWidgets10px,
      M: spacingWidgets12px,
      L: spacingWidgets14px,
    },
  },
  cardSpace: {
    out: {
      S: 2,
      M: 3,
      L: 4,
    },
    in: {
      S: 1,
      M: 2,
      L: 3,
    },
  },
  accIconSize: '25px',
  subAccIconSize: '23px',
};

export const spacing = styleguide.spacing;
export const { out: spacingOuterWidgets, in: spacingInnerWidgets } = styleguide.cardSpace;

export const { accIconSize } = styleguide;
export const { subAccIconSize } = styleguide;
