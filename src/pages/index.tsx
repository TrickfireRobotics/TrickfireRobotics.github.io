import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";

export default function Home(): React.JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    const repos = (siteConfig.customFields?.repos as string[]) ?? [];

    return (
        <Layout title="Home" description={siteConfig.tagline}>
            <main className={styles.main}>
                <h1 className={styles.title}>TrickFire Robotics</h1>
                <p className={styles.tagline}>Project documentation</p>
                {repos.length === 0 ? (
                    <p className={styles.empty}>No documentation has been synced yet.</p>
                ) : (
                    <ul className={styles.projectList}>
                        {repos.map((repo) => (
                            <li key={repo}>
                                <Link className={styles.projectLink} to={`/${repo}/`}>
                                    {repo}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </Layout>
    );
}
