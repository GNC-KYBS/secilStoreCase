// Tek bir filtre koşulu
export type FilterCondition = {
  id: string;
  title: string;
  value: string;
  valueName: string;
  currency: string | null;
  comparisonType: number;
};

// Filtre grubu
export type Filters = {
  useOrLogic: boolean;
  filters: FilterCondition[] | null;
};

// Koleksiyonun bilgi kısmı
export type CollectionInfo = {
  id: number;
  name: string;
  description: string;
  url: string;
  langCode: string;
};

// Koleksiyon ürün bilgisi
export type Product = {
  productCode: string;
  colorCode: string | null;
  name: string;
  imageUrl: string;
};

// Koleksiyonun ana tipi
export type Collection = {
  id: number;
  filters: Filters;
  type: number;
  info: CollectionInfo;
  salesChannelId: number;
  products: Product[] | null;
};

// API response tipi
export type CollectionsResponse = {
  meta: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  data: Collection[];
};
