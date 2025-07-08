import {
  alpha,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { Image } from 'src/components/image';
import { IWidget } from 'src/types/product';

import CirelisLogo from 'src/assets/logos/cirelis-normal-slogan';
import CPara from 'src/sections/custom-components/c-para';
import { getContrastText } from 'src/utils/labelUtils';
import { useDesign } from 'src/hooks/use-design';
import { spacing } from 'src/styleguide';

type Props = {
  widget: IWidget;
  langIndex: number;
};

const text1Arr = [
  'Visit', // en
  'Besuche', // de
  'Visita', // es
  'Visitez', // fr
  'Visita', // it
];

const text2Arr = [
  'Made with', // en
  'Gemacht mit', // de
  'Hecho con', // es
  'Fait avec', // fr
  'Fatto con', // it
];

const text3Arr = [
  'Imprint', // en
  'Impressum', // de
  'Pie de imprenta', // es
  'Mentions légales', // fr
  'Note legali', // it
];

const text4Arr = [
  'Privacy Policy', // en
  'Datenschutz', // de
  'Política de privacidad', // es
  'Politique de confidentialité', // fr
  'Informativa sulla privacy', // it
];

const text5Arr = [
  'Contact', // en
  'Kontakt', // de
  'Contacto', // es
  'Contact', // fr
  'Contatto', // it
];

const text6Arr = [
  'All rights reserved', // en
  'Alle Rechte vorbehalten', // de
  'Todos los derechos reservados', // es
  'Tous droits réservés', // fr
  'Tutti i diritti riservati', // it
];

export default function Footer({ widget, langIndex }: Props) {
  const theme = useTheme();
  const design = useDesign();
  // Content
  const attributes = widget.childs[0].attributes;
  const website = attributes.WebsiteURL.value[langIndex]?.val[0];
  const websiteName = attributes.WebsiteName.value[langIndex]?.val[0];
  const showWebsite = attributes.ShowWebsiteURL.value[langIndex]?.val[0];
  const x = attributes.XURL.value[langIndex]?.val[0];
  const showX = attributes.ShowXURL.value[langIndex]?.val[0];
  const fb = attributes.FacebookURL.value[langIndex]?.val[0];
  const showFB = attributes.ShowFacebookURL.value[langIndex]?.val[0];
  const insta = attributes.InstagramURL.value[langIndex]?.val[0];
  const showInsta = attributes.ShowInstagramURL.value[langIndex]?.val[0];
  const linkedin = attributes.LinkedInURL.value[langIndex]?.val[0];
  const showLinkedin = attributes.ShowLinkedInURL.value[langIndex]?.val[0];

  // Style
  const orientation = widget.style?.Orientation?.value[0];
  const showRights = widget.style.ShowRightsReserved.value[0];
  const logo = widget.style.Logo.value[0];
  const showLogo = widget.style.ShowLogo.value[0];

  const colorText = design.typography.paragraphs.color || theme.palette.text.primary;

  // Design
  const colorPrimary = design.style.colors.primaryColor || theme.palette.primary.main;
  const colorSecondary = design.style.colors.secondaryColor || theme.palette.secondary.main;
  const colorHeadlines = design.typography.headlines.color || theme.palette.text.primary;
  const buttonStyle = design.style.buttons.variant;
  const buttonColor = design.style.buttons.buttonColor || colorPrimary;
  const buttonTextColor = design.style.buttons.textColor || colorSecondary;
  const buttonSize = design.style.buttons.size;

  const fontPara = design.typography.paragraphs.font;
  const weightPara = design.typography.paragraphs.weight as 'regular' | 'bold';
  const colorPara = design.typography.paragraphs.color || theme.palette.text.primary;
  const sizePara = design.typography.paragraphs.size;

  const dynamicPrimaryText = getContrastText(buttonColor);

  const iconButtonStyle = {
    backgroundColor: alpha(buttonColor || theme.palette.action.hover, 0.6),
    borderRadius: '50%',
    padding: theme.spacing(1),
    width: 48,
    height: 48,
    '&:hover': {
      backgroundColor: alpha(buttonColor, 0.8),
    },
  };

  const text1 = text1Arr[langIndex];
  const text2 = text2Arr[langIndex];
  const text3 = text3Arr[langIndex];
  const text4 = text4Arr[langIndex];
  const text5 = text5Arr[langIndex];
  const text6 = text6Arr[langIndex];

  const windowOpen = (url: string | URL, target?: string, features?: string) => {
    if (typeof url === 'string' && !url.match(/^https?:\/\//i)) {
      url = `http://${url}`;
    }
    return window.open(url, target, features);
  };

  return (
    <Stack
      sx={{ textAlign: orientation, alignItems: orientation }}
      spacing={spacing.contentSpacingM[design.style.general.spacing]}
    >
      {showLogo === 'X' && (
        <Box sx={{ position: 'relative' }}>
          <Image src={logo} />
        </Box>
      )}
      {showWebsite === 'X' && (
        <Button
          variant={buttonStyle as 'text' | 'outlined' | 'contained'}
          size={buttonSize as 'small' | 'medium'}
          onClick={() => windowOpen(website, '_blank')}
          sx={{
            backgroundColor: buttonStyle === 'outlined' ? 'transparent' : buttonColor,
            borderColor: buttonStyle === 'outlined' ? buttonColor : 'transparent',
            color: buttonTextColor,
            borderRadius: design.style.cards.borderradius,
            '&:hover': {
              backgroundColor: alpha(buttonColor, 0.8),
            },
          }}
        >
          {`${text1} ${websiteName}`}
        </Button>
      )}
      <Stack flexDirection="row" spacing={spacing.contentSpacingM[design.style.general.spacing]}>
        {showX === 'X' && (
          <Link href={x}>
            <IconButton sx={iconButtonStyle}>
              <Iconify icon="ri:twitter-x-line" color={dynamicPrimaryText} />
            </IconButton>
          </Link>
        )}
        {showInsta === 'X' && (
          <Link href={insta}>
            <IconButton sx={iconButtonStyle}>
              <Iconify icon="dashicons:instagram" color={dynamicPrimaryText} />
            </IconButton>
          </Link>
        )}
        {showFB === 'X' && (
          <Link href={fb}>
            <IconButton sx={iconButtonStyle}>
              <Iconify icon="dashicons:facebook" color={dynamicPrimaryText} />
            </IconButton>
          </Link>
        )}
        {showLinkedin === 'X' && (
          <Link href={linkedin}>
            <IconButton sx={iconButtonStyle}>
              <Iconify icon="dashicons:linkedin" color={dynamicPrimaryText} />
            </IconButton>
          </Link>
        )}
      </Stack>
      <Stack
        spacing={spacing.contentSpacingM[design.style.general.spacing]}
        sx={{ textAlign: orientation, alignItems: orientation }}
      >
        <Stack direction="row" alignItems="baseline" spacing={spacing.contentSpacingM[design.style.general.spacing]}>
          <CPara value={text2} font={fontPara} color="#212B36" size="s" fontWeight="bold" />
          <Link href="https://www.cirelis.de">
            <CirelisLogo style={{ height: '20px' }} />
          </Link>
        </Stack>
        <Stack flexDirection="row" spacing={spacing.contentSpacingM[design.style.general.spacing]}>
          <Link href="https://www.cirelis.de/impressum">
            <CPara
              value={text3}
              variant="caption"
              font={fontPara}
              color={colorPara}
              size={sizePara}
              fontWeight={weightPara}
            />
          </Link>
          <Link href="https://www.cirelis.de/datenschutzerklaerung">
            <CPara
              value={text4}
              variant="caption"
              font={fontPara}
              color={colorPara}
              size={sizePara}
              fontWeight={weightPara}
            />
          </Link>
          <Link href="https://www.cirelis.de/kontakt">
            <CPara
              value={text5}
              variant="caption"
              font={fontPara}
              color={colorPara}
              size={sizePara}
              fontWeight={weightPara}
            />
          </Link>
        </Stack>
        {showRights === 'X' && (
          <Stack flexDirection="row" spacing={spacing.spacing2px[design.style.general.spacing]} alignItems="center">
            <Iconify icon="ph:copyright-light" sx={{ color: theme.palette.text.disabled }} />
            <CPara
              value={text6}
              font={fontPara}
              color={theme.palette.text.disabled}
              size={sizePara}
              fontWeight={weightPara}
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
