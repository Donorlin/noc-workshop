import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docs: [
    "getting-started",
    {
      type: "category",
      label: "Foundations",
      collapsed: false,
      items: ["foundations/design-tokens", "foundations/layout", "foundations/typography"],
    },
    {
      type: "category",
      label: "Components",
      collapsed: false,
      items: [
        "components/button",
        "components/data-table",
        "components/description-list",
        "components/feedback",
        "components/filter-panel",
        "components/forms",
        "components/query-state",
        "components/tag",
        "components/avatar",
      ],
    },
    {
      type: "category",
      label: "Patterns",
      collapsed: false,
      items: ["patterns/list-screen", "patterns/detail-screen", "patterns/data-loading"],
    },
    { type: "category", label: "Utilities", items: ["utilities/formatting"] },
  ],
};

export default sidebars;
