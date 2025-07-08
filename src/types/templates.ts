// ----------------------------------------------------------------------

import { IProductPass } from "./product";

export type ITemplate = {
  id: string;
  name: string;
  createdAt: string;
  createdBy: string;
  industry: string;
  changeProduct: string;
  tempChangeAt: string;
  products: string[];
  pass: IProductPass;
};



