import type { Feature } from "../types";

export const programmeFeature: Feature = {
  id: "programme",
  navigation: { label: "Programme", to: "/programme" },
  routes: [
    {
      path: "programme",
      lazy: async () => ({ Component: (await import("./list/ProgrammeListPage")).ProgrammeListPage }),
    },
  ],
};
