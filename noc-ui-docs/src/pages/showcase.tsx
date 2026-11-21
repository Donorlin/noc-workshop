import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import styles from "./showcase.module.css";

export default function Showcase() {
  return (
    <Layout title="Showcase" description="Every noc-ui component, live">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Live</p>
        <h1>Showcase</h1>
        <p>
          The real components from <code>app/packages/noc-ui</code> – filter, page and sort the table, hover the
          disabled actions.
        </p>
      </div>
      <iframe className={styles.frame} src={useBaseUrl("/showcase-app/")} title="noc-ui showcase" />
    </Layout>
  );
}
