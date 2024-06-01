import baijiaxin from './data/baijiaxin.json'
import shici from './data/shici.json'

export const randomSurname = () => {
  const p0 = Math.random()
  let p1 = 0
  for (let d of baijiaxin) {
    p1 += d.p
    if (p1 > p0) return d.surname
  }
  return baijiaxin[0].surname
}

export const randomName = (len = 2) => {
  const surname = randomSurname()
  const poetry = sample(shici).content
  const line = sample(poetry).replace(/[^\u4e00-\u9fa5]/g, '')
  const givenName = new Array(len)
    .fill('')
    .map(() => line[randomInt(line.length - 1)])
    .join('')

  return `${surname}${givenName}`
}

const sample = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const randomInt = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b))
  const upper = Math.floor(Math.max(a, b))
  return Math.floor(lower + Math.random() * (upper - lower + 1))
}
