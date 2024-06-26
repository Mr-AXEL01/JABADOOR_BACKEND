// user.interface.ts

import { Address } from "src/schemas/address.schema";

export interface SocialMedia {
  instagram: string;
  facebook: string;
}

export interface User {
  user_code: string;
  user_name: string;
  avatar?: string;
  bio?: string;
  first_name: string;
  last_name: string;
  gender: string;
  birthdate: string;
  address: Address;
  status: string;
  gsm: string;
  email: string;
  language_default: string;
  rate: number;
  count_rate: number;
  added_date: Date;
  become_creator?: string;

  wishlistid?: string;
  social_media: SocialMedia;
}
