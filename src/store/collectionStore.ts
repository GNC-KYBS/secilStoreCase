import { create } from "zustand";
import { Collection, Product, Filters } from "@/types/collection";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

type CollectionState = {
  collections: Collection[];
  selectedCollection: Collection | null;
  filters: Filters;
  loading: boolean;
  error: string | null;

  fetchCollections: () => Promise<void>;
  fetchProducts: (collectionId: string) => Promise<void>;
  setCollections: (collections: Collection[]) => void;
  selectCollection: (collection: Collection) => void;
  resetSelectedCollection: () => void;
  updateProducts: (products: Product[]) => void;
  setFilters: (filters: Partial<Filters>) => void;
};

const useCollectionStore = create<CollectionState>((set, get) => ({
  collections: [],
  selectedCollection: null,
  filters: { useOrLogic: true, filters: null },
  loading: false,
  error: null,

  // Koleksiyonları fetch et
  fetchCollections: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${backendUrl}/Collection/GetAll`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Veri çekilemedi");
      const data = await res.json();
      set({ collections: data.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  // Yeni: Ürünleri fetch et ve selectedCollection'a ekle
  fetchProducts: async (collectionId: string) => {
    set({ loading: true, error: null });
    const { filters } = get(); // store'dan filters al
    try {
      const res = await fetch(
        `${backendUrl}/Collection/${collectionId}/GetProductsForConstants`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...filters, page: 1, pageSize: 36 }),
        }
      );

      if (!res.ok) throw new Error("Products fetch failed");

      const data = await res.json();
      set((state) => ({
        selectedCollection: state.selectedCollection
          ? { ...state.selectedCollection, products: data.products ?? [] }
          : null,
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  setCollections: (collections) => set({ collections }),
  selectCollection: (collection) => set({ selectedCollection: collection }),
  resetSelectedCollection: () => set({ selectedCollection: null }),

  updateProducts: (products) =>
    set((state) => ({
      selectedCollection: state.selectedCollection
        ? { ...state.selectedCollection, products }
        : null,
    })),

  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
}));

export default useCollectionStore;
