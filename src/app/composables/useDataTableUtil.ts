import { type Ref } from 'vue'

interface Payload {
  deleteId?: Ref<number>
  editData?: Ref<any | null>
  newData?: any
  objects: Ref<Array<any>>
}

export function useDataTableUtil() {
  function updateObjectsList(payload: Payload) {
    // update edited item data
    if (payload.editData && payload.newData) {
      for (let i = 0; i < payload.objects.value.length; i++) {
        if (payload.editData.value.id == payload.objects.value[i].id) {
          payload.objects.value.splice(i, 1, payload.newData)
        }
      }
    }
    // add new item to list
    else if (!payload.editData && payload) {
      payload.objects.value.unshift(payload.newData)
    }

    // Remove deleted item from list
    if (payload.deleteId && payload.deleteId.value > 0 && !payload.editData) {
      for (let i = 0; i < payload.objects.value.length; i++) {
        if (payload.deleteId.value == payload.objects.value[i].id) {
          payload.objects.value.splice(i, 1)
        }
      }
    }

    // Finish the list update by sorting items
    sortObjectsList(payload.objects)

  }

  return { updateObjectsList }
}

function sortObjectsList(objects: Ref<Array<any>>) {
  objects.value.sort((a: any, b: any) => {
    if (a.name > b.name) return 1
    else if (b.name > a.name) return -1
    return 0
  })
}