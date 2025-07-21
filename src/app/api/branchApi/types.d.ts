export type Branch = {
  _id: string;
  branch: string;
  title: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
};

export interface GetAllBranchesRequest {}
export interface GetAllBranchesResponse extends Array<Branch> {}

export interface GetBranchRequest {
  id: string;
}
export interface GetBranchResponse extends Branch {}
