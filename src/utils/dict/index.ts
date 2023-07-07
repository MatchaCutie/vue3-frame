import PDictData from './dictData'
import dictDatas from './dicts'

// 从后端获取数据字典
export function useDict(dicts: string[] = []) {
  const arr = ref([])
  dicts.forEach((dict) => {
    const dictData = ref(null)
    dictData.value = new PDictData(dict)
    dictData.value.init()
    arr.value.push(dictData.value)
  })

  return arr.value
}

// 从前端获取静态数据字典
export function useStaticDict(dicts: string[] = []) {
  const arr = []
  dicts.forEach((dict) => {
    arr.push(dictDatas[dict] || [])
  })

  return arr
}
