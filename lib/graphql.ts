import { createClient } from "urql";
const url = process.env.NEXT_PUBLIC_API;

export const client = createClient({ url });
