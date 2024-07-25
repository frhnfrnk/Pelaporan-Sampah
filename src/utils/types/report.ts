import { User } from "./user";

export interface Report {
  _id: string;
  name: string;
  desa: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string[];
  imageDone: string[];
  createdAt: string;
  updatedAt: string;
  status: string;
  pelapor: User;
  petugas: string;
}
