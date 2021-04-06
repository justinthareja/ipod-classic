import create from "zustand";

const useArtistAlbumsStore = create((set) => ({
  activeIndex: 0,
  goUp: () => set((state) => ({ activeIndex: state.activeIndex + 1 })),
  goDown: () => set((state) => ({ activeIndex: state.activeIndex - 1 })),
  resetActiveIndex: () => set((state) => ({ activeIndex: 0 })),

  artistId: "",
  setArtistId: (artistId) => set((state) => ({ artistId })),
}));

export { useArtistAlbumsStore };
