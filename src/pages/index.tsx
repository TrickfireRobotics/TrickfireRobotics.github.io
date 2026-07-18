import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";

interface RepoMeta {
    id: string;
    name: string;
    description: string;
}

interface FrameworkMeta {
    name: string;
    routeBasePath: string;
}

function toTitleCase(value: string): string {
    return value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Home(): React.JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    const repoMeta = (siteConfig.customFields?.repoMeta as RepoMeta[]) ?? [];
    const frameworkMeta = siteConfig.customFields?.frameworkMeta as FrameworkMeta | undefined;

    const isEmpty = repoMeta.length === 0 && !frameworkMeta;

    return (
        <Layout title="Home" description={siteConfig.tagline}>
            <main className={styles.main}>
                <h1 className={styles.title}>TrickFire Robotics</h1>
                <p className={styles.tagline}>Project documentation</p>
                {isEmpty ? (
                    <p className={styles.empty}>No documentation has been synced yet.</p>
                ) : (
                    <ul className={styles.projectList}>
                        {frameworkMeta && (
                            <li key="framework">
                                <Link
                                    className={styles.projectLink}
                                    to={`/${frameworkMeta.routeBasePath}/`}
                                >
                                    {toTitleCase(frameworkMeta.name)}
                                </Link>
                            </li>
                        )}
                        {repoMeta.map(({ id, name }) => (
                            <li key={id}>
                                <Link className={styles.projectLink} to={`/${id}/`}>
                                    {toTitleCase(name)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </Layout>
    );
}
