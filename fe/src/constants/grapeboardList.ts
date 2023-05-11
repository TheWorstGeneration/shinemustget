export interface podo {
  id: number;
  imageUrl: string;
}

export interface podoList {
  podoCnt: number;
  podoDtoList: podo[];
}

export interface podoListRecord {
  pageCnt: number;
  podosList: podoList[];
}
