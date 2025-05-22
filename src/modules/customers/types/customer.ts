export interface CustomerCreateInterface {
  chat_id: number;
  username: string;
}

export interface CustomerUpdateInterface {
  email: string;
  first_name: string;
  last_name: string;
}

export enum CustomerExperienceRouteInterface {
  ADULT = 'adult',
  CHILD = 'child',
  COUPLE = 'couple',
  SUPERVISION = 'supervision',
}
