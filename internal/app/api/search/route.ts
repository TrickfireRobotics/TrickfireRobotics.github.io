import { createFromSource } from "fumadocs-core/search/server";
import { source } from "../../../lib/source";

// Static export has no server to run a real search API against - `staticGET` instead bakes
// the search index into a static JSON file at build time, fetched and queried client-side
// (see fumadocs-core/search/client/orama-static, wired up by fumadocs-ui's default search UI).
export const revalidate = false;
export const { staticGET: GET } = createFromSource(source);
