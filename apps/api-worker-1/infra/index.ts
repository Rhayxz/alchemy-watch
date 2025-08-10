import alchemy from "alchemy"
import { Worker} from "alchemy/cloudflare"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { z } from "zod"
import { someStuff } from "../src/lib"

const __current_dir = dirname(fileURLToPath(import.meta.url))
export const APIWorker1EnvSchema = z.object({})
export type APIWorker1EnvType = z.infer<typeof APIWorker1EnvSchema>

export async function deployAPIWorker1(env: APIWorker1EnvType) {
  return alchemy.run('api-worker-1', async (scope) => {
    const PREFIX = `${scope.appName}-${scope.stage}`
    console.log(someStuff)
    const worker = await Worker(`${PREFIX}-api-worker-1`, {
      entrypoint: "src/worker.ts",
      cwd: resolve(__current_dir, "../"),
      adopt: true,
    })
    return { worker }
  })
}
export type APIWorker1Env = Awaited<ReturnType<typeof deployAPIWorker1>>['worker']
