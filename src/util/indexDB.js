const getUuid = () => {
  const s = []
  const hexDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const array = Array.from({ length: 36 }).map((v, k) => k)
  for (const i of array) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = '-'
  s[13] = '-'
  s[18] = '-'
  s[23] = '-'
  const uuid = s.join('')
  return uuid
}

class DataBase {
  constructor(databaseName) {
    this.request = null
    this.db = null
    this.list = []
    this.init(databaseName)
  }

  init(databaseName) {
    if(window.indexedDB) {
      // 创建/打开数据库实例
      this.request = window.indexedDB.open(databaseName, 2)
      this.request.onsuccess = this.requestSuccess(this)
      this.request.onupgradeneeded = this.requestUpgrade(this)
    }
  }
  requestSuccess(that) {
    return event => {
      that.db = event.target.result
    }
  }
  requestUpgrade(that) {
    return event => {
      // 创建/升级时触发
      that.db = event.target.result
      // 创建表
      const store = that.db.createObjectStore('files', {
        ketPath: 'uuid',
        autoIncrement: false,
      })
      // 创建索引
      // 第一个参数：索引名
      // 第二个参数：索引在表中对应的名称
      // 第三个参数：{ 是否唯一 }
      store.createIndex("uuid", "uuid", { unique: false })
    }
  }

  add(obj) {
    const transaction = this.db.transaction(['files'], 'readwrite')
    const store = transaction.objectStore('files')
    const uuid = getUuid()
    store.put(Object.assign(obj, { uuid }), uuid)
  }
  getAll() {
    const store = this.db.transaction(['files']).objectStore('files');
    const that = this
    store.openCursor().onsuccess = function (event) {
      const cursor = event.target.result;
      if (cursor) {
        that.list.push(cursor.value)
        cursor.continue();
      }
    }
    return this.list
  }
}

export default DataBase
