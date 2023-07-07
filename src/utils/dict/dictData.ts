import { getDict } from '@/api/dict'

export default class PDictData {
  type: string
  data: any
  constructor(type) {
    this.type = type
  }

  init() {
    this.loadData().then((data) => {
      this.data = data
    })
  }

  loadData() {
    return new Promise((resolve) => {
      getDict(this.type)
        .then((res) => {
          if (res.code === 200) {
            resolve(res.data)
          }
          resolve([])
        })
        .catch(() => {
          resolve([])
        })
    })
  }
}
