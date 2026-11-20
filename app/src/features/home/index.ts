import type { Feature } from "../types";

export const homeFeature: Feature = {
  id: "home",
  navigation: { label: "Home", to: "/" },
  routes: [
    {
      index: true,
      lazy: async () => ({ Component: (await import("./HomePage")).HomePage }),
    },
  ],
};
