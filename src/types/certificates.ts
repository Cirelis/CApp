// ----------------------------------------------------------------------

import { IDesc } from "./product";


export type ICertificate = {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  data: {
    institution: string;
    website: string;
    contact: string;
  };
};

export type ICustomCert = {
  id: string;
  title: IDesc[];
  showTitle: boolean;
  labelPicture: string;
  redirect: boolean;
  redirectURL: string;
  labelDetailsPicture: string;
  description: IDesc[];
  proof: IDesc[];
  proofDoc: string;
  proofURL: string;
};
