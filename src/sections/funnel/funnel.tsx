import { Box, Button, Card, Stack, useTheme } from '@mui/material';
import { useCallback, useEffect, useState, lazy, Suspense } from 'react';
import { _design } from 'src/_mock';
import { spacingOuterWidgets } from 'src/styleguide';
import { IDesign, IProductPass, IWidget } from 'src/types/product';
import styled from 'styled-components';
import HoverButton from '../widgets/required/hoverButton';
import DynamicComponents from './pass-dyncomps';
import CButton from '../custom-components/c-button';

// const ThreeBackground = lazy(() => import('src/three/three-background'));

// ----------------------------------------------------------------------

type Props = {
  productPass: IProductPass | undefined;
  language: number;
  tags: string[] | undefined;
  analytics: boolean;
};

const OuterContainer = styled.div<{ $bgColor: string; $spacing: string }>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
  padding: 6px;
  position: relative;
  overflow: visible;
  background-color: ${(props) => props.$bgColor};

  > *:not(:first-child):not(:last-child) {
    margin-bottom: ${(props) => props.$spacing};
  }
`;

const VideoWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 0; /* nicht negativ! */
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1; /* Video nach hinten schieben */
`;

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const button1Arr = [
  'Go On', // en
  'Weiter', // de
  'Go On', // es
  'Go On', // fr
  'Go On', // it
];

export function updateSubAccordionExpand(widgets: IWidget[], accId: string, expand: boolean) {
  const updatedLists = [...widgets];

  updatedLists.forEach((widget) => {
    widget.childs.forEach((child) => {
      if (child.id === accId) {
        child.open = expand;
      } else {
        child.open = false;
      }
    });
  });

  return updatedLists;
}

// ----------------------------------------------------------------------

export default function Funnel({ productPass, language, tags, analytics }: Props) {
  const [langIndex, setLangIndex] = useState<number>(language);
  const [hoverButton, setHoverButton] = useState<IWidget | undefined>(undefined);

  const [isCardVisible, setIsCardVisible] = useState<boolean>(true);
  const [bgColor, setBgColor] = useState<string>('transparent');

  const [widgets, setWidgets] = useState<IWidget[]>(productPass?.widgets || []);
  const [design, setDesign] = useState<IDesign>(productPass?.design || _design);

  const [widgetsD0, setWidgetsD0] = useState<IWidget[] | undefined>(undefined);
  const [customComps, setCustomComps] = useState<IWidget[] | undefined>(undefined);

  const theme = useTheme();

  useEffect(() => {
    if (Array.isArray(widgets)) {
      setWidgetsD0(widgets.filter((widget) => widget.drop === 0));
      setCustomComps(widgets.filter((widget) => widget.drop !== 0));
      const element = widgets.find((el) => el.label.name === 'Hover Button');
      if (element) {
        setHoverButton(element);
      }
    }
  }, [widgets]);

  useEffect(() => {
    setLangIndex(language);
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 600) {
        setIsCardVisible(false);
        setBgColor(productPass?.design.style.colors.backgroundColor || 'transparent');
      } else {
        setIsCardVisible(true);
        setBgColor('transparent');
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [productPass, language]);

  const handleChangeLang = useCallback((newLang: string) => {
    switch (newLang) {
      case 'en':
        setLangIndex(0);
        break;
      case 'de':
        setLangIndex(1);
        break;
      case 'es':
        setLangIndex(2);
        break;
      case 'fr':
        setLangIndex(3);
        break;
      default:
        setLangIndex(0); // Default to English if language is unknown
    }
  }, []);

  const handleSubAccordionExpand = (expanded: boolean, accId: string) => {
    setWidgets((prevLists) => {
      const updatedLists = updateSubAccordionExpand(prevLists, accId, expanded);
      return updatedLists;
    });
  };

  const handleAccordionExpand = (expanded: boolean, accId: string) => {
    const updatedLists = [...(widgetsD0 || [])];
    updatedLists.forEach((w) => {
      if (w.id === accId) {
        w.open = expanded;
      } else {
        w.open = false;
      }
      setWidgetsD0(updatedLists);
    });
  };

  const button1 = button1Arr[langIndex];
  // eslint-disable-next-line react/prop-types
  const ButtonContainer: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <>
      {productPass && (
        <Box
          component="div"
          sx={{
            position: 'absolute',
            bottom: '32px', // entspricht theme.spacing(4)
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10, // hoch genug, damit der Button über dem Video liegt
          }}
        >
          <CButton
            onClick={() => {
              onClick();
            }}
            variant={productPass.design.style.buttons.variant}
            buttonColor={productPass.design.style.buttons.buttonColor}
            textColor={productPass.design.style.buttons.textColor}
            size={productPass.design.style.buttons.size}
          >
            {button1}
          </CButton>
        </Box>
      )}
    </>
  );
  const coverSrc = hoverButton?.childs[1].attributes.CoverImage.value[langIndex].val[0] || '';

  // ﹟2: URL‐Objekt erzeugen und reinen Pfad holen
  let pathname = '';
  try {
    pathname = new URL(coverSrc).pathname;
  } catch {
    pathname = coverSrc;
  }

  // ﹟3: Prüfung auf Video‐Endung (nur anhand des pathname)
  const isVideo = /\.(mp4|webm|ogg|mov|m4v)$/i.test(pathname);

  // ﹟4: Prüfung auf Bild‐Endung (nur anhand des pathname)
  const isImage = /\.(png|jpe?g|webp|gif|bmp)$/i.test(pathname);
  const showPanorama =
    hoverButton?.childs[1].attributes.ShowPanorama.value[langIndex].val[0] === 'X';

  const [showContent, setShowContent] = useState<boolean>(false);
  const handleStartClick = () => {
    setShowContent(true);
  };

  return (
    <>
      {!showContent &&
      hoverButton?.childs[1].attributes.ShowCover.value[langIndex].val[0] === 'X' ? (
        <VideoWrapper>
          {/* {showPanorama && (
            <Suspense fallback={null}><ThreeBackground envFile={coverSrc} /></Suspense>
          )} */}
          {isVideo && <StyledVideo src={coverSrc} autoPlay loop muted playsInline />}
          {isImage && <StyledImage src={coverSrc} alt="Hintergrundbild" />}
          {/* Falls weder isVideo noch isImage zutrifft, könntest du hier optional eine Fallback‐Komponente rendern */}
          <ButtonContainer onClick={handleStartClick} />
        </VideoWrapper>
      ) : (
        <OuterContainer
          $bgColor={bgColor}
          $spacing={theme.spacing(spacingOuterWidgets[design.style.general.widgetSpacing])}
        >
          {isCardVisible ? (
            <Card
              sx={{
                borderRadius: 1,
                bgcolor: productPass?.design.style.colors.backgroundColor,
                boxShadow: 3,
                border: `1px solid ${productPass?.design.style.colors.backgroundColor}`,
                p: 1,
                mx: 'auto',
                my: 2,
                maxWidth: 1000,
                position: 'relative',
                overflow: 'visible',
              }}
            >
              <Stack spacing={spacingOuterWidgets[design.style.general.widgetSpacing]}>
                {widgetsD0?.length ? (
                  widgetsD0?.map((widget, index) => (
                    <DynamicComponents
                      key={index}
                      preview={false}
                      widget={widget}
                      customComps={customComps}
                      langIndex={langIndex}
                      handleChangeLang={handleChangeLang}
                      onAccExpandWidget={handleAccordionExpand}
                      onAccExpandSubWidget={handleSubAccordionExpand}
                      tags={tags}
                      analytics={analytics}
                    />
                  ))
                ) : (
                  <></>
                )}
              </Stack>

              {hoverButton !== undefined && productPass?.design && (
                <Box
                  sx={{
                    display: 'flex',
                    position: 'fixed', // Change from 'sticky' to 'fixed'
                    bottom: 16, // Add space from the bottom of the viewport
                    left: hoverButton?.style.Orientation.value.includes('left') ? 16 : 'auto', // Adjust left position
                    right: hoverButton?.style.Orientation.value.includes('right') ? 16 : 'auto', // Adjust right position
                    justifyContent: hoverButton?.style.Orientation.value.includes('left')
                      ? 'flex-start'
                      : 'flex-end', // Adjust alignment
                  }}
                >
                  <HoverButton
                    design={productPass.design}
                    widget={hoverButton}
                    langIndex={langIndex}
                    tags={tags}
                    analytics={analytics}
                  />
                </Box>
              )}
            </Card>
          ) : (
            <>
              {widgetsD0?.length ? (
                widgetsD0?.map((widget, index) => (
                  <DynamicComponents
                    key={index}
                    preview={false}
                    widget={widget}
                    customComps={customComps}
                    langIndex={langIndex}
                    handleChangeLang={handleChangeLang}
                    onAccExpandWidget={handleAccordionExpand}
                    onAccExpandSubWidget={handleSubAccordionExpand}
                    tags={tags}
                    analytics={analytics}
                  />
                ))
              ) : (
                <></>
              )}
              {hoverButton !== undefined && productPass?.design && (
                <Box
                  sx={{
                    display: 'flex',
                    position: 'fixed', // Change from 'sticky' to 'fixed'
                    bottom: 16, // Add space from the bottom of the viewport
                    left: hoverButton?.style.Orientation.value.includes('left') ? 16 : 'auto', // Adjust left position
                    right: hoverButton?.style.Orientation.value.includes('right') ? 16 : 'auto', // Adjust right position
                    justifyContent: hoverButton?.style.Orientation.value.includes('left')
                      ? 'flex-start'
                      : 'flex-end', // Adjust alignment
                  }}
                >
                  <HoverButton
                    design={productPass.design}
                    widget={hoverButton}
                    langIndex={langIndex}
                    tags={tags}
                    analytics={analytics}
                  />
                </Box>
              )}
            </>
          )}
        </OuterContainer>
      )}
    </>
  );
}
