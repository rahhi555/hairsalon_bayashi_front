 declare module 'interface' {
  export interface Customer {
      id?: number;
      name: string;
      tel: string;
      mail: string;
      created_at?: Date;
      updated_at?: Date;
    }

  export interface Rank {
    id?: number;
    name: string;
  }

  export interface Stylist {
    id?: number;
    uid?: string;
    rank_id?: number|null;
    name: string;
    is_male: boolean;
    nickname?: string;
    hire_on: string;
    tel: string;
    mail: string;
    created_at?: Date;
    updated_at?: Date;
  }

  export interface Menu {
    id?: number;
    name: string;
    code: string;
    time: string;
    created_at?: Date;
    updated_at?: Date;
  }
 }