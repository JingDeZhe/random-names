/**
 * 格式化原始数据为标准格式
 */

import tangshisanbaishou from './data/tangshisanbaishou.json'
import songcisanbaishou from './data/songcisanbaishou.json'
import caocao from './data/caocao.json'
import chuci from './data/chuci.json'
import fs from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import * as csv from 'fast-csv'
import * as OpenCC from 'opencc-js'

const resolve = (p: string) => fileURLToPath(new URL(p, import.meta.url))

const baijiaxin: { surname: string; p: number }[] = []
fs.createReadStream(resolve('./data/Chinese_Family_Name（1k）.csv'))
  .pipe(csv.parse({ headers: true }))
  .on('error', (error) => console.error(error))
  .on('data', (row) => baijiaxin.push({ surname: row.NameB, p: +row.TF }))
  .on('end', () => {
    const totalCount = baijiaxin.reduce((pv, cv) => {
      pv += cv.p
      return pv
    }, 0)
    baijiaxin.forEach((d) => (d.p = d.p / totalCount))
    fs.writeFile(
      resolve('../lib/data/baijiaxin.json'),
      JSON.stringify(baijiaxin),
      (err) => {
        err && console.error(err)
      }
    )
  })

const list: { title: string; category: number; content: string[] }[] = []

for (const cat of tangshisanbaishou) {
  list.push(
    ...cat.content.map((d) => {
      return {
        title: d.chapter,
        category: 1,
        content: d.paragraphs,
      }
    })
  )
}

list.push(
  ...songcisanbaishou.map((d) => {
    return {
      title: d.title,
      category: 2,
      content: d.paragraphs,
    }
  })
)

list.push(
  ...chuci.map((d) => {
    return {
      title: d.title,
      category: 3,
      content: d.content,
    }
  })
)

list.push(
  ...caocao.map((d) => {
    return {
      title: d.title,
      category: 4,
      content: d.paragraphs,
    }
  })
)

const converter = OpenCC.Converter({ from: 't', to: 'cn' })
list.forEach((d) => {
  d.title = converter(d.title)
  d.content = d.content.filter((v) => v).map((v) => converter(v))
})

fs.writeFile(resolve('../lib/data/shici.json'), JSON.stringify(list), (err) => {
  err && console.error(err)
})
