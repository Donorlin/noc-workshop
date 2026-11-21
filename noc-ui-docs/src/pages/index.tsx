import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

const features = [
  {
    title: "Components",
    accent: "pink",
    text: "DataTable, forms on react-hook-form + zod, live filters, QueryState, Section and DescriptionList – an opinionated API on Radix UI and TanStack Table.",
    to: "/docs/components/data-table",
  },
  {
    title: "Patterns",
    accent: "yellow",
    text: "How a list screen keeps its filters in the URL, how a detail loads related records, how loading, empty and error states look.",
    to: "/docs/patterns/list-screen",
  },
  {
    title: "Docs for agents",
    accent: "mint",
    text: "The same MDX pages ship next to the source with an llms.txt index, so coding agents look the API up instead of guessing.",
    to: "/docs/getting-started",
  },
] as const;

export default function Home() {
  return (
    <Layout description="The UI platform library of Night of Chances applications">
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Night of Chances IT / 2026</p>
          <h1 className={styles.title}>
            noc-ui
            <br />
            <span>build screens, not boilerplate.</span>
          </h1>
          <p className={styles.lead}>
            The UI platform library of the NoC Organizer: React components, forms, tables and screen patterns in the
            Night of Chances style – documented for people and for AI agents.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} to="/docs/getting-started">
              Get started →
            </Link>
            <Link className={styles.secondary} to="/showcase">
              See it live
            </Link>
          </div>
        </div>
      </header>
      <main className={styles.features}>
        {features.map((feature) => (
          <Link key={feature.title} to={feature.to} className={`${styles.card} ${styles[feature.accent]}`}>
            <h2>{feature.title}</h2>
            <p>{feature.text}</p>
          </Link>
        ))}
      </main>
    </Layout>
  );
}
