import create from "zustand";

const useMusicStore = create((set) => ({
  activeIndex: 0,
  goUp: () => set((state) => ({ activeIndex: state.activeIndex + 1 })),
  goDown: () => set((state) => ({ activeIndex: state.activeIndex - 1 })),
}));

export { useMusicStore };
