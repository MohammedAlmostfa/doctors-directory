// src/app/core/models/location.model.ts
export interface Governorate {
  id: number;
  name: string;
}

export interface Area {
  id: number;
  name: string;
  governorate: Governorate;
}
