/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** `"disabled"` turns MSW mocks off in development. */
  readonly VITE_API_MOCKING?: "enabled" | "disabled";
}
