import { NextApiResponse } from 'next'
import nc from 'next-connect'
import middleware from '../../../middleware/all'
import { Request } from '../../../types'
import { doc } from '../../../db'
import onError from '../../../middleware/error'

const handler = nc<Request, NextApiResponse>({
  onError,
})

handler.use(middleware)

handler.post(async (req, res) => {
  const newDoc = await doc.createDoc(req.db, {
    createdBy: req.user.id,
    folder: req.body.folder,
    name: req.body.name,
  })
  res.send({ data: newDoc })
})

export default handler
