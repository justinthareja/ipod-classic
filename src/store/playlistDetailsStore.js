import create from "zustand";

const usePlaylistDetailsStore = create((set) => ({
  activeIndex: 0,
  goUp: () => set((state) => ({ activeIndex: state.activeIndex + 1 })),
  goDown: () => set((state) => ({ activeIndex: state.activeIndex - 1 })),
  resetActiveIndex: () => set((state) => ({ activeIndex: 0 })),
  setActiveIndex: (activeIndex) => set((state) => ({ activeIndex })),

  playlistId: "",
  setPlaylistId: (id) => set((state) => ({ playlistId: id })),
}));

export { usePlaylistDetailsStore };
