import create from "zustand";

interface Stats {
  health: number;
  stamina: number;
  strength: number;
}

interface LoginState {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  image: string;
  setImage: (image: string) => void;
  stats: Stats;
  setStats: (stats: Stats) => void;
}

const useStore = create<LoginState>((set) => ({
  name: "",
  setName: (name) =>
    set((state) => ({
      ...state,
      name,
    })),

  description: "",
  setDescription: (description) =>
    set((state) => ({
      ...state,
      description,
    })),

  image: "",
  setImage: (image) =>
    set((state) => ({
      ...state,
      image,
    })),

  stats: { health: 80, stamina: 20, strength: 40 },
  setStats: (stats) =>
    set((state) => ({
      ...state,
      stats,
    })),
}));

export default useStore;
