// import { storageService } from './storageService.js'
// import { stays } from '../data/stays.js'

// const STORAGE_KEY = 'stays'

// _createStays()

// export const stayService = {
//   query() {
//     return storageService.query(STORAGE_KEY)
//   },

//   get(stayId) {
//     return storageService.get(STORAGE_KEY, stayId)
//   },

//   save(stay) {
//     if (stay._id) {
//       return storageService.put(STORAGE_KEY, stay)
//     } else {
//       return storageService.post(STORAGE_KEY, stay)
//     }
//   },

//   remove(stayId) {
//     return storageService.remove(STORAGE_KEY, stayId)
//   },

//   getEmptyStay() {
//     return {
//       name: '',
//       type: '',
//       imgUrls: [],
//       price: 0,
//       summary: '',
//       capacity: 0,
//       amenities: [],
//       labels: [],
//       host: {},
//       loc: {},
//       reviews: [],
//       likedByUsers: [],
//     //    reviews: [],          
//     // likedByUsers: [],
//     }
//   },
// }

// function _createStays() {
//   let savedStays = localStorage.getItem(STORAGE_KEY)
//   if (!savedStays || !savedStays.length) {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(stays))
//   }
// }

import { httpService } from './http.service.js'
import { storageService } from './storageService.js'
import { stays } from '../data/stays.js'

const USE_BACKEND = true // ← שני ל-false כדי לחזור ל-localStorage
const STORAGE_KEY = 'stays'

if (!USE_BACKEND) _createStays()

export const stayService = {
  query() {
    if (USE_BACKEND) return httpService.get('stay')
    return storageService.query(STORAGE_KEY)
  },

  get(stayId) {
    if (USE_BACKEND) return httpService.get(`stay/${stayId}`)
    return storageService.get(STORAGE_KEY, stayId)
  },

  save(stay) {
    if (USE_BACKEND) {
      if (stay._id) return httpService.put(`stay/${stay._id}`, stay)
      return httpService.post('stay', stay)
    }
    if (stay._id) return storageService.put(STORAGE_KEY, stay)
    return storageService.post(STORAGE_KEY, stay)
  },

  remove(stayId) {
    if (USE_BACKEND) return httpService.delete(`stay/${stayId}`)
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