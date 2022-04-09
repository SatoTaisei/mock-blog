import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "mock-blog",
  apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
});
