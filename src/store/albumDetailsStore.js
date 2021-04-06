import create from "zustand";

const useAlbumDetailsStore = create((set) => ({
  activeIndex: 0,
  goUp: () => set((state) => ({ activeIndex: state.activeIndex + 1 })),
  goDown: () => set((state) => ({ activeIndex: state.activeIndex - 1 })),
  resetActiveIndex: () => set((state) => ({ activeIndex: 0 })),
  setActiveIndex: (activeIndex) => set((state) => ({ activeIndex })),

  albumId: "",
  setAlbumId: (albumId) => set((state) => ({ albumId })),
}));

export { useAlbumDetailsStore };
