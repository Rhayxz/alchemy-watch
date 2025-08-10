/// <reference types="@types/node" />
import alchemy from "alchemy";
import {deployAPIWorker1} from '@apps/api-worker-1/infra'
import {deployTanstackWeb} from '@apps/web/infra'
const dummyConst = "dasudausdadssdsasddsassdssddsdas"
const app = await alchemy("test-app");
const api1Worker = await deployAPIWorker1({})
console.log(`api-1 ready : ${api1Worker.worker.url}`)
if (!api1Worker.worker.url){
    throw Error(`api url undefined`)
}
const tanstackWorker = await deployTanstackWeb({
    VITE_API_URL: api1Worker.worker.url
})
console.log(`tanstack-web ready : ${tanstackWorker.worker.url}`)
await app.finalize();