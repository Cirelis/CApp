import { IconButton, Stack } from '@mui/material';
import { latLngBounds } from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import { useMap } from 'react-leaflet';
import { Iconify } from 'src/components/iconify';
import { IOriginLocation } from 'src/types/origin';

type FitBoundsProps = {
  markers: IOriginLocation[];
};

export const FitBounds: React.FC<FitBoundsProps> = ({ markers }) => {
  const map = useMap();
  const hasFitBounds = useRef(false);
  const [initialBounds, setInitialBounds] = useState<L.LatLngBounds | null>(null);

  useEffect(() => {
    if (markers.length === 0 || hasFitBounds.current) return;

    const bounds = latLngBounds(markers.map((marker) => marker.geocode!));
    setInitialBounds(bounds);
    map.fitBounds(bounds, { padding: [70, 70] });

    hasFitBounds.current = true;
  }, [markers, map]);

  const handleRecenter = () => {
    if (initialBounds) {
      map.fitBounds(initialBounds, { padding: [70, 70] });
    }
  };

  return (
    <Stack alignItems="end">
      <IconButton type="button" onClick={handleRecenter} disableRipple className="leaflet-control">
        <Iconify width={30} icon="mdi:image-filter-center-focus-weak" color="black" />
      </IconButton>
    </Stack>
  );
};
