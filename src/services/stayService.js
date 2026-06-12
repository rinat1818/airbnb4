import { storageService } from './storageService.js'
import { stays } from '../data/stays.js'

const STORAGE_KEY = 'stays'

_createStays()

export const stayService = {
  query() {
    return storageService.query(STORAGE_KEY)
  },

  get(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
  },

  save(stay) {
    if (stay._id) {
      return storageService.put(STORAGE_KEY, stay)
    } else {
      return storageService.post(STORAGE_KEY, stay)
    }
  },

  remove(stayId) {
    return storageService.remove(STORAGE_KEY, stayId)
  },

  getEmptyStay() {
    return {
      name: '',
      type: '',
      imgUrls: [],
      price: 0,
      summary: '',
      capacity: 0,
      amenities: [],
      labels: [],
      host: {},
      loc: {},
      reviews: [],
      likedByUsers: [],
    }
  },
}

function _createStays() {
  let savedStays = localStorage.getItem(STORAGE_KEY)
  if (!savedStays || !savedStays.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stays))
  }
}