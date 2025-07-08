import { Box, Stack, Typography, useTheme } from '@mui/material';
import { Feature, Geometry } from 'geojson';
import L, { DivIcon, Layer, Path } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GeoJSON, MapContainer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useGetOriginId } from 'src/api/product/origin';
import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { useCompanyId } from 'src/hooks/use-company-id';
import { useDesign } from 'src/hooks/use-design';
import { useProductId } from 'src/hooks/use-product-id';
import CAccordion from 'src/sections/custom-components/c-accordion-head';
import CCard from 'src/sections/custom-components/c-card';
import CHeading from 'src/sections/custom-components/c-heading';
import SessionTracker, {
  SessionTrackerHandle,
} from 'src/sections/custom-components/sessiontracker';
import { accIconSize, spacing } from 'src/styleguide';
import { IOrigin } from 'src/types/origin';
import { IWidget } from 'src/types/product';
import mapData from './countries.json';
import { FitBounds } from './fit-bounds';
import './map.css';
import OriginStage from './origin-stage';

const MapUpdater = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    if (center && zoom) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
};

type Props = {
  preview: boolean;
  widget: IWidget;
  langIndex: number;
  onAccExpandWidget: (expanded: boolean, accId: string) => void;
  onAccExpandSubWidget: (expanded: boolean, accId: string) => void;
  tags?: string[] | undefined;
  analytics?: boolean;
};

export default function Origin({
  preview,
  widget,
  langIndex,
  onAccExpandWidget,
  onAccExpandSubWidget,
  tags,
  analytics,
}: Props) {
  const theme = useTheme();
  const design = useDesign();
  const companyId = useCompanyId();
  const productId = useProductId();
  const accOpen = useBoolean(widget.open);
  const sessionTrackerRef = useRef<SessionTrackerHandle>(null); // Apply the ref type here
  const matomoPath = `widget/${widget.label.id}/null/${companyId}/${productId}/${tags?.sort().join('/')}`;
  const trackId = `widget/${widget.label.id}/null/${productId}`;

  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const data: GeoJSON.FeatureCollection = mapData as any;

  const head = widget.childs[0].attributes;

  const fontHeadlines = design.typography.headlines.font;
  const weightHeadlines = design.typography.headlines.weight as 'regular' | 'bold';
  const colorHeadlines = design.typography.headlines.color || theme.palette.text.primary;
  const sizeHeadlines = design.typography.headlines.size;

  const tagColor = design.typography.tags.tagColor;
  const secondaryColor = design.style.colors.secondaryColor;
  const iconColor = design.style.icons.iconColor;

  const mapCenter = [48.36974351237097, 10.887179634055476] as [number, number];
  const zoomLevel = 3;

  useEffect(() => {
    if (accOpen.value === true && widget.open === false && analytics) {
      sessionTrackerRef.current?.endSession();
    }
    accOpen.setValue(widget.open);
  }, [accOpen, widget.open, analytics]);

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

  const onSubAccExpand = (expanded: boolean, accId: string) => {
    onAccExpandSubWidget(expanded, accId);
    setOpenAccordion(expanded ? accId : null);
  };

  const defaultCountryStyle = {
    fillColor: '#fdfdfd',
    fillOpacity: 1,
    color: 'black',
    weight: 0.2,
  };

  const foundCountryStyle = {
    fillColor: tagColor,
    fillOpacity: 1,
    color: tagColor,
    weight: 1,
  };

  const markerIcon = new DivIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill=${secondaryColor} d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"/></svg>`,
    iconAnchor: [20, 40],
    popupAnchor: [0, -20],
  });

  const createClusterCustomIcon = (cluster: any) => {
    const count = cluster.getChildCount(); // Get number of markers in cluster

    return new L.DivIcon({
      html: `
        <div style="
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
        </div>
      `,
      className: 'custom-cluster-icon',
      iconSize: [40, 40], // Adjust cluster size
    });
  };

  const staticMarkers: IOrigin = useMemo(
    () => ({
      Production: [],
      Ressources: [],
      Packaging: [],
    }),
    []
  );

  const [countries, setCountries] = useState<IOrigin>(staticMarkers);

  type CountryProperties = {
    ADMIN: string;
    ISO_A3: string;
    ISO_A2: string;
  };

  const onEachCountry = (feature: Feature<Geometry, CountryProperties>, layer: Layer) => {
    const isFound = [...countries.Production, ...countries.Ressources, ...countries.Packaging].some(
      (marker) => marker.iso_a2 === feature.properties.ISO_A2
    );
    if (isFound) {
      (layer as Path).setStyle(foundCountryStyle);
    } else {
      (layer as Path).setStyle(defaultCountryStyle);
    }
  };

  const getMarkersForAccordion = () => {
    switch (openAccordion) {
      case 'Production':
        return countries.Production;
      case 'Ressources':
        return countries.Ressources;
      case 'Packaging':
        return countries.Packaging;
      default:
        return [];
    }
  };

  const { origin } = useGetOriginId(productId || '');

  useEffect(() => {
    if (!origin) return;
    if (!origin.Production || !origin.Packaging || !origin.Ressources) return;
    setCountries(origin);
  }, [origin]);

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
                icon="solar:map-point-wave-bold-duotone"
                color={iconColor}
                width={accIconSize}
                height={accIconSize}
              />
            </Stack>
            <CHeading
              value={head.WidgetHeadline_Origin.value[langIndex]?.val[0]}
              fontHeadlines={fontHeadlines}
              colorHeadlines={colorHeadlines}
              variant="h2"
              size={sizeHeadlines}
              fontWeight={weightHeadlines}
            />
          </>
        }
        expanded={accOpen.value}
        onExpandAccordion={handleAccordionChange}
      >
        <Stack spacing={spacing.contentSpacingM[design.style.general.spacing]}>
          <MapContainer
            key={design.style.cards.borderradius}
            center={[48.37880887121816, 10.899195482438572]}
            maxZoom={5}
            scrollWheelZoom={!preview}
            style={{
              height: '300px',
              backgroundColor: '#d3e6ff',
              borderRadius: theme.spacing(design.style.cards.borderradius),
            }}
            className="no-drag"
          >
            <GeoJSON key={JSON.stringify(countries)} data={data} onEachFeature={onEachCountry} />
            <MarkerClusterGroup
              chunkedLoading
              maxClusterRadius={50}
              showCoverageOnHover={false}
              iconCreateFunction={createClusterCustomIcon}
            >
              {getMarkersForAccordion().map((marker, index) => (
                <Marker key={index} position={marker.geocode!} icon={markerIcon}>
                  {marker.title && (
                    <Popup>
                      <Typography>{`${marker.title}: ${marker.city}`}</Typography>
                    </Popup>
                  )}
                </Marker>
              ))}
            </MarkerClusterGroup>
            <FitBounds
              markers={[...countries.Production, ...countries.Ressources, ...countries.Packaging]}
            />
          </MapContainer>
          <Box>
            {widget.childs.slice(1).map(
              (accordion) =>
                accordion?.show && (
                  <React.Fragment key={`${accordion.id}`}>
                    <OriginStage
                      stageType={accordion.id as 'Packaging' | 'Ressources' | 'Production'}
                      design={design}
                      widget={widget}
                      langIndex={langIndex}
                      onAccExpandWidget={onSubAccExpand}
                      preview={preview}
                      locations={
                        countries[accordion.id as 'Packaging' | 'Ressources' | 'Production']
                      }
                    />
                  </React.Fragment>
                )
            )}
          </Box>
        </Stack>
      </CAccordion>
    </CCard>
  );
}
