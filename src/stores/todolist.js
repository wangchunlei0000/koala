import { defineStore } from 'pinia'

export const useTodolist = defineStore('todolist', {
  state: () => {
    return {
      list: [
        {
          title: '吃饭',
          description: 'nothing',
          done: true,
        },
        {
          title: '睡觉😪',
          description: 'nothing',
          done: true,
        },
        {
          title: '打 boss',
          description: 'nothing',
          done: true,
        },
      ],
    }
  },
  actions: {
    addListItem(data) {
      this.list.unshift(data)
    },
    resetList(data) {
      this.list = data
    },
  },
})
