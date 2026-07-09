// Seed user data used for local/dev fallback (storageService) and DB seeding reference.
// Trips reference real stay documents from src/data/stays.js so "My Trips" renders real listings.

export const users = [
  {
    "_id": "u101",
    "fullname": "Maya Cohen",
    "imgUrl": "https://robohash.org/user1?set=set5",
    "username": "user1",
    "password": "user1",
    "isHost": false,
    "trips": [
      {
        "_id": "t2001",
        "stay": {
          "_id": "622f337a75c7d36e498aab04",
          "name": "Grand apartment Sagrada Familia",
          "price": 169,
          "imgUrl": "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436811/ym5nh1anownexsyzgbqq.jpg"
        },
        "startDate": "2025-11-02",
        "endDate": "2025-11-06"
      },
      {
        "_id": "t2002",
        "stay": {
          "_id": "622f337a75c7d36e498aab27",
          "name": "Luxury 1-Bdrm in Downtown Brooklyn",
          "price": 144,
          "imgUrl": "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436827/znh7gqzbwb4wm6bdziy7.jpg"
        },
        "startDate": "2026-02-14",
        "endDate": "2026-02-19"
      },
      {
        "_id": "t2003",
        "stay": {
          "_id": "622f337a75c7d36e498aab50",
          "name": "Lachine room+Free parking+Airport",
          "price": 78,
          "imgUrl": "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437025/haliwehueqfkmxo1tv7j.jpg"
        },
        "startDate": "2026-08-10",
        "endDate": "2026-08-15"
      },
      {
        "_id": "t2004",
        "stay": {
          "_id": "622f337b75c7d36e498aab7a",
          "name": "Breathtaking Ocean Beach Condo Kaanapali , Maui!",
          "price": 150,
          "imgUrl": "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436993/yzxnnw83e9qyas022au4.jpg"
        },
        "startDate": "2026-10-03",
        "endDate": "2026-10-08"
      }
    ]
  },
  {
    "_id": "u102",
    "fullname": "Daniel Levi",
    "imgUrl": "https://robohash.org/user2?set=set5",
    "username": "user2",
    "password": "user2",
    "isHost": false,
    "trips": [
      {
        "_id": "t2005",
        "stay": {
          "_id": "622f337b75c7d36e498aaba7",
          "name": "Peaceful hometown with perfect sea and forest view",
          "price": 501,
          "imgUrl": "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436928/ouvft4oeavr7ceeha4gk.jpg"
        },
        "startDate": "2025-11-02",
        "endDate": "2025-11-06"
      },
      {
        "_id": "t2006",
        "stay": {
          "_id": "622f337c75c7d36e498aabca",
          "name": "Puamana Ocean Breeze Bungalow",
          "price": 245,
          "imgUrl": "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437040/oarfkdxx7gyyvcynvwko.jpg"
        },
        "startDate": "2026-02-14",
        "endDate": "2026-02-19"
      },
      {
        "_id": "t2007",
        "stay": {
          "_id": "622f337c75c7d36e498aabe8",
          "name": "Cozy & in the heart of Kowloon",
          "price": 691,
          "imgUrl": "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436410/shdfxkcohvm8beh5rkar.jpg"
        },
        "startDate": "2026-08-10",
        "endDate": "2026-08-15"
      },
      {
        "_id": "t2008",
        "stay": {
          "_id": "622f337c75c7d36e498aac01",
          "name": "* Room Taste of Real İstanbul",
          "price": 84,
          "imgUrl": "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436600/rt3ldgx1xfqct3961yjz.jpg"
        },
        "startDate": "2026-10-03",
        "endDate": "2026-10-08"
      }
    ]
  },
  {
    "_id": "u103",
    "fullname": "Noa Bar",
    "imgUrl": "https://robohash.org/user3?set=set5",
    "username": "user3",
    "password": "user3",
    "isHost": false,
    "trips": [
      {
        "_id": "t2009",
        "stay": {
          "_id": "622f337d75c7d36e498aac24",
          "name": "Greystone Apartment 2",
          "price": 353,
          "imgUrl": "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437053/cg3bpdujvsd9lswwpfgy.jpg"
        },
        "startDate": "2025-11-02",
        "endDate": "2025-11-06"
      },
      {
        "_id": "t2010",
        "stay": {
          "_id": "622f337d75c7d36e498aac45",
          "name": "Double/single room, bathroom & garage in Poblenou",
          "price": 40,
          "imgUrl": "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437045/dmquvficldi8ssfdlrrx.jpg"
        },
        "startDate": "2026-02-14",
        "endDate": "2026-02-19"
      },
      {
        "_id": "t2011",
        "stay": {
          "_id": "622f337a75c7d36e498aaafd",
          "name": "DOUBLE ROOM IN THE HEART OF BCN",
          "price": 25,
          "imgUrl": "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436793/httqod38otalkzp9kynq.jpg"
        },
        "startDate": "2026-08-10",
        "endDate": "2026-08-15"
      },
      {
        "_id": "t2012",
        "stay": {
          "_id": "622f337a75c7d36e498aab34",
          "name": "SUPERHOST-LARGE&CLEAN-Near Pierloti",
          "price": 74,
          "imgUrl": "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436835/pose0fy4kkms4qkln2hg.jpg"
        },
        "startDate": "2026-10-03",
        "endDate": "2026-10-08"
      }
    ]
  },
  {
    "_id": "u104",
    "fullname": "Itay Ron",
    "imgUrl": "https://robohash.org/user4?set=set5",
    "username": "user4",
    "password": "user4",
    "isHost": false,
    "trips": [
      {
        "_id": "t2013",
        "stay": {
          "_id": "622f337a75c7d36e498aab57",
          "name": "Sunny appartment on the Plateau",
          "price": 79,
          "imgUrl": "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436359/abuiyexl2xyemq8uon4s.jpg"
        },
        "startDate": "2025-11-02",
        "endDate": "2025-11-06"
      },
      {
        "_id": "t2014",
        "stay": {
          "_id": "622f337b75c7d36e498aab8e",
          "name": "City center private room with bed",
          "price": 181,
          "imgUrl": "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436470/jrzh7wvpvulqxo42xocc.jpg"
        },
        "startDate": "2026-02-14",
        "endDate": "2026-02-19"
      },
      {
        "_id": "t2015",
        "stay": {
          "_id": "622f337b75c7d36e498aabb6",
          "name": "Great location in Barcelona",
          "price": 31,
          "imgUrl": "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436952/aef9ajipinpjhkley1e3.jpg"
        },
        "startDate": "2026-08-10",
        "endDate": "2026-08-15"
      },
      {
        "_id": "t2016",
        "stay": {
          "_id": "622f337c75c7d36e498aabd4",
          "name": "João´s beach house",
          "price": 49,
          "imgUrl": "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437006/kcsenznwf3pnka6hjwoh.jpg"
        },
        "startDate": "2026-10-03",
        "endDate": "2026-10-08"
      }
    ]
  },
  {
    "_id": "u105",
    "fullname": "Shira Katz",
    "imgUrl": "https://robohash.org/user5?set=set5",
    "username": "user5",
    "password": "user5",
    "isHost": false,
    "trips": [
      {
        "_id": "t2017",
        "stay": {
          "_id": "622f337c75c7d36e498aabf2",
          "name": "Copacabana Studio -  5* Reviews, 5 mins to Beach",
          "price": 205,
          "imgUrl": "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437279/vgq4tkkecvdo2nzxdudx.jpg"
        },
        "startDate": "2025-11-02",
        "endDate": "2025-11-06"
      },
      {
        "_id": "t2018",
        "stay": {
          "_id": "622f337c75c7d36e498aac10",
          "name": "Nişantaşı, safe, quality area.Very close to metro.",
          "price": 417,
          "imgUrl": "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437339/qgs3hrnx0accbjkzuh9s.jpg"
        },
        "startDate": "2026-02-14",
        "endDate": "2026-02-19"
      },
      {
        "_id": "t2019",
        "stay": {
          "_id": "622f337d75c7d36e498aac2e",
          "name": "Casa S. Miguel 6 - The Yellow House",
          "price": 150,
          "imgUrl": "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437262/ifklqhihs1qinbmap5hd.jpg"
        },
        "startDate": "2026-08-10",
        "endDate": "2026-08-15"
      },
      {
        "_id": "t2020",
        "stay": {
          "_id": "622f337d75c7d36e498aac4c",
          "name": "BEST REVIEWS*BEST MALLS*SAFE STAY*DIMSUM*CWB*MTR",
          "price": 1492,
          "imgUrl": "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437361/h7fdhfrwoo9jtcgwqzn7.jpg"
        },
        "startDate": "2026-10-03",
        "endDate": "2026-10-08"
      }
    ]
  }
]
