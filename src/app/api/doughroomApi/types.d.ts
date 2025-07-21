import { Status } from "../../../constants";

export interface GetAllDoughroomsRequest {}

export interface GetAllDoughroomsResponse extends Array<Doughroom> {}

export interface IngredientDetail {
  _id: string;
  title: string;
  scope: string;
  branch: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface WarehouseItem {
  ingredient: IngredientDetail;
  amount: number;
  _id: string;
}

export interface Doughroom {
  _id: string;
  title: string;
  branch: string;
  images: string;
  warehouse: WarehouseItem[];
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface PostDoughroomsRequest {
  doughroomId: string | null;
  dough_type: string | null;
  count: number;
}

export interface PostDoughroomsResponse {
  count: number;
  sent: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetByIdDoughroomRequest {
  id: string;
}
export interface GetByIdDoughroomResponse extends Doughroom {}

export interface DeleteDoughResponse {
  _id?: string;
  doughroom?: string;
  status?: Status;
  createdAt?: string;
  updatedAt?: string;
  driver?: string;
  bakery?: string;
}

export interface DeleteDoughRequest {
  id?: string;
}

export interface GetDoughsRequest {
  id: string;
  date?: string;
}

interface DoughTypeInfo {
  _id: string;
  title: string;
  price_for_baker: number;
  price_for_divider: number;
  bread_selling_price: number;
}

interface DividedWorker {}

interface DoughBallInfo {
  dough_ball_count: number;
  divided_by_workers: DividedWorker[];
}

export interface GetDoughsResponse {
  doughBallInfo: DoughBallInfo;
  _id: string;
  branch: string;
  dough_type: DoughTypeInfo;
  doughroomId: string;
  status: number;
  send_to_baker_room: string | null;
  type: string;
  isReady: boolean;
  isDelivered: boolean;
  transferred_driver: string | null;
  isBakerRoomTransferredToBakerRoom: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetStockRequest {
  id?: string;
}

export interface GetStockReponse extends Doughroom {}

export interface ReadyDoughRequest {
  id: string;
}

export interface ReadyDoughResponse {
  doughBallInfo: DoughBallInfo;
  _id: string;
  branch: string;
  dough_type: string;
  doughroomId: string;
  status: number;
  send_to_baker_room: string | null;
  type: string;
  isReady: boolean;
  isDelivered: boolean;
  transferred_driver: string | null;
  isBakerRoomTransferredToBakerRoom: boolean;
  createdAt: string;
  updatedAt: string;
}

interface DoughBallInfo {
  dough_ball_count: number;
  divided_by_workers: any[];
}

export interface SendToDoughResponse {
  doughBallInfo: DoughBallInfo;
  _id: string;
  branch: string;
  dough_type: string;
  doughroomId: string;
  status: number;
  send_to_baker_room: string | null;
  type: string;
  isReady: boolean;
  isDelivered: boolean;
  transferred_driver: null | string;
  isBakerRoomTransferredToBakerRoom: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SendToDoughRequest {
  id: string;
  send_to_baker_room: string;
}
