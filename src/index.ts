import './lib/env'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import axios from 'axios'
import { CIRCLECI_TOKEN, PROJECT_NAME, PORT } from './utils/constants'

const app = express()

app.use(bodyParser.json())

app.get('/', (_: any, res: any) => {
  res.json({ data: `${Date.now()}` })
})

app.post('/webhook', async (req: any, res: any) => {
  if (!PROJECT_NAME) {
    res.status(404).send('There is no project name configured')
  }

  if (!CIRCLECI_TOKEN) {
    res.status(404).send('There is no CircleCI token configured')
  }

  try {
    const postToCircleCi = await axios.post(
      `https://circleci.com/api/v1.1/project/gh/danielivert/${PROJECT_NAME}/tree/master?circle-token=${CIRCLECI_TOKEN}`
    )

    res.status(200).send('Building...')
  } catch (error) {
    const errorMessage = error.response.statusText
    const statusCode = error.response.status

    res.status(statusCode).send(errorMessage)
  }
})

app.listen(PORT, () =>
  // tslint:disable-next-line:no-console
  console.log(`Server is running on http://localhost:${PORT}`)
)

export default app
