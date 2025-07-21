export type Bakery = {
  _id: string;
  title: string;
  images: string;
  branch: string;
  status: number;
  balance: number;
  doughsCount: number;
  roundsCount: number;
  inOvenCount: number;
  breadsCount: number;
  deliveredCount: number;
  soldCount: number;
  baker: string;
  divider: string;
  createdAt: string;
  updatedAt: string;
};

export interface GetAllBakeriesRequest {}
export interface GetAllBakeriesResponse {
  bakerRooms: Bakery[];
}

export interface GetBakeryhRequest {
  id: string;
}
export interface GetBakeryResponse {
  bakerRoom: Bakery;
}

export interface GetAllBakeryDoughsRequest {}
export interface GetAllBakeryDoughsResponse {
  id: string;
  status: string;
  duration: number;
  createdAt: string;
}
