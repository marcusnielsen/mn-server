import * as Express from 'express'
import makeAmqp from './amqp'
import { makeProvider } from './provider'

const envVars = process.env
const { run } = makeProvider({ envVars })

run()
