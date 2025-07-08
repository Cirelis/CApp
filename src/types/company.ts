
// ----------------------------------------------------------------------


export type ICompany = {
  id: string;
  name: string;
  street: string;
  housenumber: string;
  city: string;
  state: string;
  plz: string;
  country: string;
  abo: string;
  size: string;
  branche: string;
  user: IUsers[];
  legal: ILegal;
  numberRange: number;
  productId: string;
  userAvail: number,
  createdAt: string;
  disabled: string;
  lastScan: string;
};

export type IUsers = {
  uid: string;
  role: string;
};

export type ILegal = {
  phoneC: string;
  emailC: string;
  nameAR: string;
  titleAR: string;
  numberCRI: string;
  courtCRI: string;
  infoVAT: string;
};


