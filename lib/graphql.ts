import { createClient } from "urql";
const url = "https://api.learn49.com/graphql";
export const client = createClient({ url });
