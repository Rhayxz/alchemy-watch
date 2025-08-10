import alchemy from "alchemy"
import { Worker, TanStackStart} from "alchemy/cloudflare"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { z } from "zod"

const __current_dir = dirname(fileURLToPath(import.meta.url))
export const TanstackWebEnvSchema = z.object({
  VITE_API_URL: z.string().url(),
})
export type TanstackWebEnvType = z.infer<typeof TanstackWebEnvSchema>

export async function deployTanstackWeb(env: TanstackWebEnvType) {
  return alchemy.run('tanstack-web', async (scope) => {
    const PREFIX = `${scope.appName}-${scope.stage}`
    const worker = await TanStackStart(`${PREFIX}-tanstack-web`, {
      cwd: resolve(__current_dir, "../"),
      adopt: true,
      bindings:{
        VITE_API_URL: env.VITE_API_URL
      }
    })
    return { worker }
  })
}
export type TanstackWebEnv = Awaited<ReturnType<typeof deployTanstackWeb>>['worker']
