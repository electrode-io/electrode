import { Redux } from "@xarc/react-redux";

export interface SingleProductProps {
  heading: string;
  imageUrl: string;
  footer: string;
}

export interface ProductsProps {
  products: [string];
  dispatch: Redux.Dispatch;
}
