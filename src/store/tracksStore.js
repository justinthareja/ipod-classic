import create from "zustand";

const useTracksStore = create((set) => ({
  activeIndex: 0,
  goUp: () => set((state) => ({ activeIndex: state.activeIndex + 1 })),
  goDown: () => set((state) => ({ activeIndex: state.activeIndex - 1 })),
  setActiveIndex: (activeIndex) => set((state) => ({ activeIndex })),
}));

export { useTracksStore };
