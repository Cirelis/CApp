import { ReactNode, useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { IDesign } from 'src/types/product';

const cardDesignOff = {
  backgroundColor: 'transparent',
  borderRadius: 0,
  border: 0,
  boxShadow: 0,
};

type Props = {
  design: IDesign;
  children: ReactNode;
};

export default function CCard({ design, children }: Props) {
  const borderradius = design.style.cards.borderradius;
  const [cardColor, setCardColor] = useState(design.style.cards.color);
  const cardDesign = design.style.cards.cardDesign;
  const backgroundColor = design.style.colors.backgroundColor;
  const [cardSX, setCardSX] = useState(cardDesignOff);

  useEffect(() => {
    let sx: any = {
      borderRadius: 0,
      backgroundColor: '',
      border: 0,
      boxShadow: 0,
    };
    if (cardDesign) {
      sx = {
        borderRadius: borderradius,
        backgroundColor: cardColor,
        border: 0,
        boxShadow: 3,
      };
      setCardColor(design.style.cards.color);
    } else {
      sx = cardDesignOff;
      setCardColor(backgroundColor);
    }
    setCardSX(sx);
  }, [cardDesign, borderradius, cardColor, backgroundColor, design.style]);

  return <Card sx={cardSX}>{children}</Card>;
}
