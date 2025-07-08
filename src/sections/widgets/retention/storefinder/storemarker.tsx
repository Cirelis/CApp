import { useEffect, useImperativeHandle, useRef, forwardRef } from 'react';
import { Box, Stack, useTheme } from '@mui/material';
import { DivIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Marker, Popup, useMap } from 'react-leaflet';
import { Iconify } from 'src/components/iconify';
import CButton from 'src/sections/custom-components/c-button';
import CHeading from 'src/sections/custom-components/c-heading';
import CPara from 'src/sections/custom-components/c-para';
import { IDesign } from 'src/types/product';
// Assume IStore and IStoreTag are defined in your types
import { spacing } from 'src/styleguide';
import './styles.css';

// ----------------------
// StoreMarker Component
// ----------------------
type StoreMarkerProps = {
  store: IStore;
  tag: IStoreTag;
  design: IDesign;
  isActive: boolean;
  onMarkerClick: (geocode: [number, number]) => void;
  icon: DivIcon;
};

export const StoreMarker = forwardRef<any, StoreMarkerProps>(
  ({ store, tag, design, isActive, onMarkerClick, icon }, ref) => {
    const markerRef = useRef<any>(null);
    const map = useMap();
    const theme = useTheme();

    useImperativeHandle(ref, () => markerRef.current);

    useEffect(() => {
      if (isActive && markerRef.current) {
        markerRef.current.openPopup();
      }
    }, [isActive]);

    return (
      <Marker
        ref={markerRef}
        position={store.geocode}
        icon={icon}
        eventHandlers={{
          click: () => onMarkerClick(store.geocode),
        }}
      >
        {isActive && (
          <Popup>
            <Stack spacing={spacing.contentSpacingS[design.style.general.spacing]}>
              <Stack direction="row" alignItems="center" spacing={spacing.inlineSpacing[design.style.general.spacing]}>
                <CHeading
                  value={store.name}
                  fontHeadlines={design.typography.headlines.font}
                  colorHeadlines={design.typography.headlines.color || theme.palette.text.primary}
                  size={design.typography.headlines.size}
                  fontWeight="bold"
                  variant="h4"
                />
                <Iconify icon={tag.icon || ''} width={20} />
              </Stack>
              <Box>
                <CPara
                  value={store.address.street}
                  font={design.typography.paragraphs.font}
                  color={design.typography.paragraphs.color || theme.palette.text.primary}
                  size={design.typography.paragraphs.size}
                  fontWeight={design.typography.paragraphs.weight as 'regular' | 'bold'}
                />
                <CPara
                  value={store.address.city}
                  font={design.typography.paragraphs.font}
                  color={design.typography.paragraphs.color || theme.palette.text.primary}
                  size={design.typography.paragraphs.size}
                  fontWeight={design.typography.paragraphs.weight as 'regular' | 'bold'}
                />
              </Box>
              <CButton
                onClick={() =>
                  window.open(
                    `https://www.google.de/maps/place/${encodeURIComponent(
                      store.address.street
                    )},+${encodeURIComponent(store.address.city)}`,
                    '_blank'
                  )
                }
                variant={design.style.buttons.variant}
                buttonColor={design.style.buttons.buttonColor || theme.palette.primary.main}
                textColor={design.style.buttons.textColor || theme.palette.primary.main}
                size={design.style.buttons.size as 'small' | 'large' | 'medium'}
              >
                Google Maps
              </CButton>
            </Stack>
          </Popup>
        )}
      </Marker>
    );
  }
);
StoreMarker.displayName = 'StoreMarker';
