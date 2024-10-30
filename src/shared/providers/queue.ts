import { mail } from './mail'

export let queue = Object.assign({}, { mail: [] as any[] })

export const processQueueMail = async () => {
  Object.keys(queue).forEach(async (job) => {
    const work = queue[job as keyof typeof queue].shift()
    if (!work) return

    await mail.sendMail(work)
  })
}
