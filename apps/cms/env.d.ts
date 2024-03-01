import { D1Database, KVNamespace, R2Bucket } from '@cloudflare/workers-types'

declare global {
  interface CloudflareEnv {
    // Add here the Cloudflare Bindings you want to have available in your application
    // (for more details on Bindings see: https://developers.cloudflare.com/pages/functions/bindings/)
    KVDATA: KVNamespace
    D1DATA: D1Database
    R2STORAGE: R2Bucket
  }
}
