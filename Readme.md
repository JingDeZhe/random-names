# 随机姓名

就是从百家姓和古诗词中随机生成的姓名而已，诗词好听故而随机的名字也可能好听，力大砖飞而已。

[线上体验](https://jingdezhe.github.io/random-names/)

## 姓名示例

杨月月，黄行康，梁无难，姜天暮，侯云华，周鼓秋，熊杜思……

## 安装

```bash
pnpm add @lotusloli/random-names
```

## 使用

```js
import { randomName } from '@lotusloli/random-names'
const name = randomName(2) // 参数为名的长度，不包含姓
```
