export type IOrigin = {
  Production: IOriginLocation[];
  Ressources: IOriginLocation[];
  Packaging: IOriginLocation[];
};

export type IOriginLocation = {
  id: string;
  title: string;
  iso_a2: string;
  region: string;
  city: string;
  geocode?: [number, number];
  dialogTitle: string;
  dialogContent: string;
  mapsUrl: string;
  webUrl: string;
};
