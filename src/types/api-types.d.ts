export interface GetAccessCounterResponse {
  count: number;
}

export interface AddAccessCounterBody {
  namespace: string;
}

export interface CreateUserBody {
  cpf: string;
  name: string;
}
