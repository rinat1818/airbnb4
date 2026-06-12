export const storageService = {
  query(entityType) {
    const entities = localStorage.getItem(entityType)
    return Promise.resolve(entities ? JSON.parse(entities) : [])
  },

  get(entityType, entityId) {
    return this.query(entityType).then(entities =>
      entities.find(entity => entity._id === entityId)
    )
  },

  post(entityType, newEntity) {
    newEntity._id = _makeId()
    return this.query(entityType).then(entities => {
      entities.push(newEntity)
      localStorage.setItem(entityType, JSON.stringify(entities))
      return newEntity
    })
  },

  put(entityType, updatedEntity) {
    return this.query(entityType).then(entities => {
      const idx = entities.findIndex(e => e._id === updatedEntity._id)
      entities[idx] = updatedEntity
      localStorage.setItem(entityType, JSON.stringify(entities))
      return updatedEntity
    })
  },

  remove(entityType, entityId) {
    return this.query(entityType).then(entities => {
      const idx = entities.findIndex(e => e._id === entityId)
      entities.splice(idx, 1)
      localStorage.setItem(entityType, JSON.stringify(entities))
    })
  },
}

function _makeId(length = 5) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}