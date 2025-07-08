type IStoreTag = {
  name: string;
  label: string;
  icon: string;
  iconColor?: string;
  selected: boolean;
};

type IStore = {
  id: string;
  name: string;
  address: { street: string; city: string };
  tag: string;
  geocode: [number, number];
};

