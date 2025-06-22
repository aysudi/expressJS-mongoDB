// joi-objectid.d.ts
declare module "joi-objectid" {
  import type { Root, StringSchema } from "joi";

  export default function joiObjectId(joi: Root): () => StringSchema;
}
