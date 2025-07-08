import {
  Box,
  Chip,
  Divider,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  useTheme,
} from '@mui/material';
import L, { DivIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useGetStorefinderStoresById } from 'src/api/product/storefinder';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useBoolean } from 'src/hooks/use-boolean';
import { useCompanyId } from 'src/hooks/use-company-id';
import { useDesign } from 'src/hooks/use-design';
import { useProductId } from 'src/hooks/use-product-id';
import CAccordion from 'src/sections/custom-components/c-accordion-head';
import CCard from 'src/sections/custom-components/c-card';
import CHeading from 'src/sections/custom-components/c-heading';
import CPara from 'src/sections/custom-components/c-para';
import SessionTracker, {
  SessionTrackerHandle,
} from 'src/sections/custom-components/sessiontracker';
import { accIconSize, spacing } from 'src/styleguide';
import { IWidget } from 'src/types/product';
// Assume IStore and IStoreTag are defined in your types
import { Store } from './store';
import { StoreMarker } from './storemarker';
import './styles.css';

// ----------------------
// Helper Component: Combined Map Updater
// ----------------------
const MapUpdater = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    if (center && zoom) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
};

// ----------------------
// Main Storefinder Component
// ----------------------
type Props = {
  preview: boolean;
  widget: IWidget;
  langIndex: number;
  onAccExpandWidget: (expanded: boolean, accId: string) => void;
  tags?: string[] | undefined;
  analytics?: boolean;
};

const text1Arr = [
  'No results found – maybe try another region?',
  'Aktuell keine Treffer – vielleicht in einer anderen Region versuchen?',
  'Actualmente no hay resultados; quizás prueba con otra región.',
  'Aucun résultat pour le moment – essayez peut-être une autre région.',
  'Al momento nessun risultato – prova magari in un’altra zona.',
];

const text2Arr = [
  'Stores found:',
  'Geschäfte gefunden:',
  'Tiendas encontradas:',
  'Magasins trouvés:',
  'Negozi trovati:',
];

const tagGastro = ['Gastronomy', 'Gastronomie', 'Gastronomía', 'Gastronomie', 'Gastronomia'];
const tagRetail = ['Retail', 'Handel', 'Comercio', 'Commerce de détail', 'Commercio al dettaglio'];
const tagOther = ['Other', 'Sonstige', 'Otros', 'Autres', 'Altro'];

export default function Storefinder({
  preview,
  widget,
  langIndex,
  onAccExpandWidget,
  tags,
  analytics,
}: Props) {
  const theme = useTheme();
  const design = useDesign();
  const companyId = useCompanyId();
  const productId = useProductId();
  const accOpen = useBoolean(widget.open);
  const sessionTrackerRef = useRef<SessionTrackerHandle>(null);
  const matomoPath = `widget/${widget.label.id}/null/${companyId}/${productId}/${tags?.sort().join('/')}`;
  const trackId = `widget/${widget.label.id}/null/${productId}`;
  const head = widget.childs[0].attributes;
  const primaryColor = design.style.colors.primaryColor || theme.palette.primary.main;
  const secondaryColor = design.style.colors.secondaryColor || theme.palette.primary.main;
  const buttonColor = design.style.buttons.buttonColor || primaryColor;

  // Local state for map settings.
  const [postalCode, setPostalCode] = useState('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    48.36974351237097, 10.887179634055476,
  ]);
  const [zoomLevel, setZoomLevel] = useState(12);
  const [radius, setRadius] = useState(20);

  // New state for fullscreen mode.
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [storefinderStores, setStorefinderStores] = useState<IStore[]>([]);

  const radiusToZoom: Record<number, number> = {
    5: 14,
    10: 13,
    20: 12,
    25: 11,
  };

  const getStoreKey = (store: IStore) => `${store.geocode.join(',')}:${store.name}`;

  const handleRadiusChange = (newRadius: number) => {
    setRadius(newRadius);
    setZoomLevel(radiusToZoom[newRadius]);
  };

  const handleAccordionChange = (expanded: boolean) => {
    accOpen.setValue(expanded);
    if (analytics) {
      if (expanded) {
        sessionTrackerRef.current?.startSession();
      } else {
        sessionTrackerRef.current?.endSession();
      }
    }
    onAccExpandWidget(expanded, widget.id);
  };

  useEffect(() => {
    if (accOpen.value === true && widget.open === false && analytics) {
      sessionTrackerRef.current?.endSession();
    }
    accOpen.setValue(widget.open);
  }, [accOpen, widget.open, analytics]);

  const [storeTags, setStoreTags] = useState<IStoreTag[]>([
    {
      name: 'gastro',
      label: tagGastro[langIndex],
      icon: 'mdi:silverware-variant',
      iconColor: primaryColor,
      selected: true,
    },
    {
      name: 'retail',
      label: tagRetail[langIndex],
      icon: 'mdi:cart',
      selected: true,
    },
    {
      name: 'other',
      label: tagOther[langIndex],
      icon: 'mdi:house-variant',
      selected: true,
    },
  ]);

  const allTagsSelected = storeTags.every((storeTag) => storeTag.selected);
  const handleLabelClick = (clickedTag: IStoreTag) => {
    setStoreTags((prevTags) =>
      prevTags.map((tag) =>
        tag.name === clickedTag.name ? { ...tag, selected: !tag.selected } : tag
      )
    );
  };
  const handleAllClick = () => {
    setStoreTags(storeTags.map((tag) => ({ ...tag, selected: !allTagsSelected })));
  };

  const defaultIcon = new DivIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="${primaryColor}" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"/></svg>`,
    iconAnchor: [20, 40],
    popupAnchor: [0, -20],
  });

  const selectedTags = storeTags.filter((tag) => tag.selected).map((tag) => tag.name);
  const filteredStores = storefinderStores.filter(
    (store) =>
      (store.address.city.includes(postalCode) || store.name.includes(postalCode)) &&
      selectedTags.includes(store.tag)
  );

  const [activeMarker, setActiveMarker] = useState<[number, number] | null>(null);

  // ----------------------
  // MarkerCluster and Marker refs
  // ----------------------
  const markerClusterRef = useRef<any>(null);
  const markerRefs = useRef<{ [key: string]: any }>({});

  const handleStoreClick = (store: IStore) => {
    const key = getStoreKey(store);
    const markerInstance = markerRefs.current[key];
    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
      mapContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (markerClusterRef.current && markerInstance) {
      markerClusterRef.current.zoomToShowLayer(markerInstance, () => {
        markerInstance.openPopup();
        setMapCenter(store.geocode);
        setZoomLevel(17);
      });
    } else {
      setMapCenter(store.geocode);
    }
    setActiveMarker(store.geocode);
  };

  const handleMarkerClick = (geocode: [number, number]) => {
    setActiveMarker(geocode);
  };

  const { stores } = useGetStorefinderStoresById(companyId || '');
  useEffect(() => {
    if (!stores || stores.length === 0) return;
    const updatedStores = stores.map((store) => ({
      ...store,
    }));
    setStorefinderStores(updatedStores);
  }, [stores]);

  const text1 = text1Arr[langIndex];
  const text2 = text2Arr[langIndex];

  const createClusterCustomIcon = (cluster: any) => {
    const count = cluster.getChildCount();
    return new L.DivIcon({
      html: `<div style="
            background-color: ${secondaryColor};
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: bold;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
          ">
            ${count}
          </div>`,
      className: 'custom-cluster-icon',
      iconSize: [40, 40],
    });
  };

  // Toggle fullscreen mode
  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  // Normal inline map container style.
  const inlineMapStyle = {
    height: '250px',
    backgroundColor: '#a1b4cd',
    borderRadius: theme.spacing(design.style.cards.borderradius),
  };

  return (
    <CCard design={design}>
      {analytics && (
        <SessionTracker
          ref={sessionTrackerRef}
          matomoPath={matomoPath}
          trackId={trackId}
          onSessionEnd={() => {}}
          onSessionTimeUpdate={() => {}}
        />
      )}
      <CAccordion
        preview={preview}
        design={design}
        summary={
          <>
            <Stack sx={{ p: 0.1 }}>
              <Iconify
                icon="solar:streets-map-point-bold-duotone"
                color={design.style.icons.iconColor}
                width={accIconSize}
                height={accIconSize}
              />
            </Stack>
            <CHeading
              value={head.WidgetHeadline_Storefinder.value[langIndex]?.val[0]}
              fontHeadlines={design.typography.headlines.font}
              colorHeadlines={design.typography.headlines.color || theme.palette.text.primary}
              variant="h2"
              size={design.typography.headlines.size}
              fontWeight={design.typography.headlines.weight as 'regular' | 'bold'}
              orientation="left"
            />
          </>
        }
        expanded={accOpen.value}
        onExpandAccordion={handleAccordionChange}
      >
        <Stack spacing={spacing.contentSpacingM[design.style.general.spacing]}>
          {/* Normal inline map (only visible when NOT fullscreen) */}
          {!isFullScreen && (
            <Box id="map-container" sx={{ position: 'relative' }}>
              <MapContainer scrollWheelZoom={!preview} style={inlineMapStyle} className="no-drag">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                />
                <MapUpdater center={mapCenter} zoom={zoomLevel} />
                <MarkerClusterGroup
                  ref={markerClusterRef}
                  disableClusteringAtZoom={17}
                  chunkedLoading
                  maxClusterRadius={20}
                  showCoverageOnHover={false}
                  iconCreateFunction={createClusterCustomIcon}
                >
                  {filteredStores.map((store) => {
                    const key = getStoreKey(store);
                    const tag = storeTags.find((stag) => stag.name === store.tag) || {
                      name: store.tag,
                      label: '',
                      icon: '',
                      selected: false,
                    };
                    const isActive = activeMarker
                      ? activeMarker[0] === store.geocode[0] && activeMarker[1] === store.geocode[1]
                      : false;
                    return (
                      <StoreMarker
                        key={key}
                        ref={(instance) => {
                          if (instance) {
                            markerRefs.current[key] = instance;
                          }
                        }}
                        store={store}
                        design={design}
                        tag={tag}
                        isActive={isActive}
                        onMarkerClick={handleMarkerClick}
                        icon={defaultIcon}
                      />
                    );
                  })}
                </MarkerClusterGroup>
              </MapContainer>
              {/* Fullscreen toggle button */}
              <IconButton
                onClick={toggleFullScreen}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 1500,
                  backgroundColor: 'rgba(255,255,255,0.8)',
                }}
              >
                <Iconify icon="mdi:fullscreen" />
              </IconButton>
            </Box>
          )}
          {/* When fullscreen is enabled, show a modal with only the map container */}
          <Modal open={isFullScreen} onClose={toggleFullScreen}>
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: '#a1b4cd',
                zIndex: 1300,
              }}
            >
              {/* Fullscreen toggle exit button */}
              <IconButton
                onClick={toggleFullScreen}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 1500,
                  backgroundColor: 'rgba(255,255,255,0.8)',
                }}
              >
                <Iconify icon="mdi:fullscreen-exit" />
              </IconButton>
              <MapContainer
                id="map-container"
                scrollWheelZoom={!preview}
                style={{ width: '100%', height: '100%' }}
                className="no-drag"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                />
                <MapUpdater center={mapCenter} zoom={zoomLevel} />
                <MarkerClusterGroup
                  ref={markerClusterRef}
                  disableClusteringAtZoom={17}
                  chunkedLoading
                  maxClusterRadius={20}
                  showCoverageOnHover={false}
                  iconCreateFunction={createClusterCustomIcon}
                >
                  {filteredStores.map((store) => {
                    const key = getStoreKey(store);
                    const tag = storeTags.find((stag) => stag.name === store.tag) || {
                      name: store.tag,
                      label: '',
                      icon: '',
                      selected: false,
                    };
                    const isActive = activeMarker
                      ? activeMarker[0] === store.geocode[0] && activeMarker[1] === store.geocode[1]
                      : false;
                    return (
                      <StoreMarker
                        key={key}
                        ref={(instance) => {
                          if (instance) {
                            markerRefs.current[key] = instance;
                          }
                        }}
                        store={store}
                        design={design}
                        tag={tag}
                        isActive={isActive}
                        onMarkerClick={handleMarkerClick}
                        icon={defaultIcon}
                      />
                    );
                  })}
                </MarkerClusterGroup>
              </MapContainer>
            </Box>
          </Modal>
          {/* Search Field */}
          <TextField
            variant="outlined"
            placeholder="PLZ, Ort oder Name"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            sx={{ width: '100%' }}
          />
          <Grid container spacing={spacing.spacingTags[design.style.general.spacing]}>
            <Grid >
              <Chip
                sx={{
                  backgroundColor: allTagsSelected ? buttonColor : 'transparent',
                  color: allTagsSelected ? design.style.cards.color : buttonColor,
                  borderRadius: design.style.cards.borderradius,
                }}
                variant={allTagsSelected ? 'filled' : 'outlined'}
                icon={<Iconify icon="mdi:check" />}
                label={`Alle (${storefinderStores.length})`}
                onClick={handleAllClick}
              />
            </Grid>
            {storeTags.map((tag) => (
              <Grid key={tag.name}>
                <Chip
                  variant={tag.selected ? 'filled' : 'outlined'}
                  sx={{
                    backgroundColor: tag.selected ? buttonColor : 'transparent',
                    color: tag.selected ? design.style.cards.color : buttonColor,
                    borderRadius: design.style.cards.borderradius,
                  }}
                  icon={<Iconify icon={tag.icon} />}
                  onClick={() => handleLabelClick(tag)}
                  label={tag.label}
                />
              </Grid>
            ))}
          </Grid>
          <Divider />
          <Stack sx={{ maxHeight: 320 }}>
            {filteredStores.length > 0 && (
              <Scrollbar
                sx={{
                  borderRadius: 2,
                  '& .simplebar-content': {
                    display: 'flex',
                    flexDirection: 'column',
                  },
                }}
              >
                <Stack
                  spacing={spacing.contentSpacingS[design.style.general.spacing]}
                  divider={<Divider />}
                >
                  {filteredStores.map((store) => {
                    const tag = storeTags.find((stag) => stag.name === store.tag);
                    return (
                      <Stack key={getStoreKey(store)}>
                        <Box key={store.name} onClick={() => handleStoreClick(store)}>
                          <Store
                            design={design}
                            title={store.name}
                            icon={tag?.icon || ''}
                            address={store.address}
                          />
                        </Box>
                      </Stack>
                    );
                  })}
                </Stack>
              </Scrollbar>
            )}
          </Stack>
          <Box
            sx={{
              p: spacing.containerPadding[design.style.general.spacing],
              textAlign: 'center',
              bgcolor: buttonColor,
              borderRadius: design.style.cards.borderradius,
            }}
          >
            <CPara
              value={`${text2} ${filteredStores.length}`}
              font={design.typography.paragraphs.font}
              color={design.style.buttons.textColor || theme.palette.primary.main}
              size={design.typography.paragraphs.size}
              fontWeight={design.typography.paragraphs.weight as 'regular' | 'bold'}
            />
          </Box>
        </Stack>
      </CAccordion>
    </CCard>
  );
}
