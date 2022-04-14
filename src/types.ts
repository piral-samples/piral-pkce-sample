declare module "piral-core/lib/types/custom" {
  interface PiletCustomApi extends MyPiletApi {}

  interface PiralCustomState {
    user: CurrentUser;
  }
}

export interface CurrentUser {
  id: string;
  name: string;
  company: string;
}

export interface MyPiletApi {
  getCurrentUser(): CurrentUser;
  requestToken(): Promise<string>;
}
