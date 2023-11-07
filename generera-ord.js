import { appendFile, appendFileSync, readFileSync } from 'node:fs'

appendFileSync('data', 'data to append', 'utf8')

readFileSync('data/ordlista.csv', 'utf-8')
