import { storageService } from './storageService.js'

const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
const STORAGE_KEY = 'users'

_createUsers()

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    query,
}

function query() {
    return storageService.query(STORAGE_KEY)
}

async function login(username, password) {
    const users = await storageService.query(STORAGE_KEY)
    const user = users.find(user => user.username === username && user.password === password)

    if (user) {
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
        return user
    }
    return Promise.reject('Invalid username or password')
}

async function signup(userCred) {
    if (!userCred.imgUrl) {
        userCred.imgUrl = 'https://robohash.org/' + userCred.username + '?set=set5'
    }
    userCred.score = 10000

    const user = await storageService.post(STORAGE_KEY, userCred)
    return login(user.username, user.password)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _createUsers() {
    let users = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!users || !users.length) {
        users = [
            {
                _id: 'u101',
                fullname: 'User 1',
                imgUrl: 'https://robohash.org/user1?set=set5',
                username: 'user1',
                password: 'secret',
                trips: [
                    {
                        _id: 't1001',
                        stay: {
                            _id: '622f337a75c7d36e498aaaf8',
                            name: 'Westin Kaanapali KORVN 2BR',
                            price: 595,
                            imgUrl: 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg',
                        },
                        startDate: '2024-07-10',
                        endDate: '2024-07-15',
                    },
                    {
                        _id: 't1002',
                        stay: {
                            _id: '622f337a75c7d36e498aaaf9',
                            name: 'Belle chambre à côté Metro Papineau',
                            price: 30,
                            imgUrl: 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437045/dmquvficldi8ssfdlrrx.jpg',
                        },
                        startDate: '2023-09-02',
                        endDate: '2023-09-06',
                    },
                    {
                        _id: 't1011',
                        stay: {
                            _id: '622f337a75c7d36e498aab02',
                            name: 'Penthouse Sands of Kahana Sandy Swimmable Beach',
                            price: 800,
                            imgUrl: 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436917/mqkfjmfpmyqpqmzmqgau.jpg',
                        },
                        startDate: '2026-08-10',
                        endDate: '2026-08-15',
                    },
                    {
                        _id: 't1012',
                        stay: {
                            _id: '622f337a75c7d36e498aab03',
                            name: '+Spacious Studio&Kitchenette near Blue Mosque+',
                            price: 264,
                            imgUrl: 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436321/g2cs1w7tkxsx58penq9j.jpg',
                        },
                        startDate: '2026-09-05',
                        endDate: '2026-09-09',
                    },
                ],
            },
            {
                _id: 'u102',
                fullname: 'User 2',
                imgUrl: 'https://robohash.org/user2?set=set5',
                username: 'user2',
                password: 'secret',
                trips: [
                    {
                        _id: 't1003',
                        stay: {
                            _id: '622f337a75c7d36e498aaafa',
                            name: 'M&M Space MM2  Apartamento no centro da cidade',
                            price: 65,
                            imgUrl: 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436861/xrxhgsif3ekhxgn8irlm.jpg',
                        },
                        startDate: '2024-08-01',
                        endDate: '2024-08-07',
                    },
                    {
                        _id: 't1004',
                        stay: {
                            _id: '622f337a75c7d36e498aaafb',
                            name: 'Fresh and modern 1BR in Bed-Stuy',
                            price: 79,
                            imgUrl: 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436912/xle8ueqxjeazbs4bp09p.jpg',
                        },
                        startDate: '2023-10-12',
                        endDate: '2023-10-16',
                    },
                    {
                        _id: 't1013',
                        stay: {
                            _id: '622f337a75c7d36e498aab04',
                            name: 'Grand apartment Sagrada Familia',
                            price: 169,
                            imgUrl: 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436811/ym5nh1anownexsyzgbqq.jpg',
                        },
                        startDate: '2026-07-25',
                        endDate: '2026-07-29',
                    },
                    {
                        _id: 't1014',
                        stay: {
                            _id: '622f337a75c7d36e498aab05',
                            name: 'Spacious and quiet duplex apartment in Poble Sec',
                            price: 130,
                            imgUrl: 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436397/nde7l2hrwezdfzbvhczj.jpg',
                        },
                        startDate: '2026-10-03',
                        endDate: '2026-10-07',
                    },
                ],
            },
            {
                _id: 'u103',
                fullname: 'User 3',
                imgUrl: 'https://robohash.org/user3?set=set5',
                username: 'user3',
                password: 'secret',
                trips: [
                    {
                        _id: 't1005',
                        stay: {
                            _id: '622f337a75c7d36e498aaafc',
                            name: 'Habitación centro de Barcelona',
                            price: 40,
                            imgUrl: 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436983/pivldxmrxssnhyzixhes.jpg',
                        },
                        startDate: '2024-07-20',
                        endDate: '2024-07-23',
                    },
                    {
                        _id: 't1006',
                        stay: {
                            _id: '622f337a75c7d36e498aaafd',
                            name: 'DOUBLE ROOM IN THE HEART OF BCN',
                            price: 25,
                            imgUrl: 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436793/httqod38otalkzp9kynq.jpg',
                        },
                        startDate: '2023-11-05',
                        endDate: '2023-11-09',
                    },
                    {
                        _id: 't1015',
                        stay: {
                            _id: '622f337a75c7d36e498aab06',
                            name: '*CoZy Private Williamsburg Home*',
                            price: 225,
                            imgUrl: 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436394/kscsvxyn0uro9tjhefeb.jpg',
                        },
                        startDate: '2026-08-20',
                        endDate: '2026-08-24',
                    },
                    {
                        _id: 't1016',
                        stay: {
                            _id: '622f337a75c7d36e498aab07',
                            name: 'Newly and comfortable apt',
                            price: 463,
                            imgUrl: 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436867/yocip4igdbruuh2grzpf.jpg',
                        },
                        startDate: '2026-11-14',
                        endDate: '2026-11-18',
                    },
                ],
            },
            {
                _id: 'u104',
                fullname: 'User 4',
                imgUrl: 'https://robohash.org/user4?set=set5',
                username: 'user4',
                password: 'secret',
                trips: [
                    {
                        _id: 't1007',
                        stay: {
                            _id: '622f337a75c7d36e498aaafe',
                            name: 'Home, Sweet, Harlem. Welcome!',
                            price: 110,
                            imgUrl: 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436390/om97cgufeacwlric2r5w.jpg',
                        },
                        startDate: '2024-08-15',
                        endDate: '2024-08-19',
                    },
                    {
                        _id: 't1008',
                        stay: {
                            _id: '622f337a75c7d36e498aaaff',
                            name: 'Heroísmo IV',
                            price: 29,
                            imgUrl: 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436823/af6elioxovkhvp6cg1un.jpg',
                        },
                        startDate: '2023-12-01',
                        endDate: '2023-12-05',
                    },
                    {
                        _id: 't1017',
                        stay: {
                            _id: '622f337a75c7d36e498aab08',
                            name: '302 Kanai A Nalu Ocean front/view',
                            price: 400,
                            imgUrl: 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437013/gz1hfzv47xzfwcmosadc.jpg',
                        },
                        startDate: '2026-07-18',
                        endDate: '2026-07-22',
                    },
                    {
                        _id: 't1018',
                        stay: {
                            _id: '622f337a75c7d36e498aab09',
                            name: 'Spacious, Sunny Room in Park Slope',
                            price: 85,
                            imgUrl: 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436380/ez5caladc00mgsssl6ws.jpg',
                        },
                        startDate: '2026-12-10',
                        endDate: '2026-12-14',
                    },
                ],
            },
            {
                _id: 'u105',
                fullname: 'User 5',
                imgUrl: 'https://robohash.org/user5?set=set5',
                username: 'user5',
                password: 'secret',
                trips: [
                    {
                        _id: 't1009',
                        stay: {
                            _id: '622f337a75c7d36e498aab00',
                            name: 'Monte dos Burgos - Cosy Room',
                            price: 26,
                            imgUrl: 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436993/yzxnnw83e9qyas022au4.jpg',
                        },
                        startDate: '2024-07-28',
                        endDate: '2024-08-02',
                    },
                    {
                        _id: 't1010',
                        stay: {
                            _id: '622f337a75c7d36e498aab01',
                            name: 'Nice Cosy Room In Taksim',
                            price: 105,
                            imgUrl: 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437241/wt0seud4ot4cmdrztdzz.jpg',
                        },
                        startDate: '2023-09-18',
                        endDate: '2023-09-22',
                    },
                    {
                        _id: 't1019',
                        stay: {
                            _id: '622f337a75c7d36e498aab0a',
                            name: 'Apartamento en casco antiguo',
                            price: 55,
                            imgUrl: 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436509/rii32aibnhkoeejsohie.jpg',
                        },
                        startDate: '2026-09-28',
                        endDate: '2026-10-02',
                    },
                    {
                        _id: 't1020',
                        stay: {
                            _id: '622f337a75c7d36e498aab0b',
                            name: 'Elegant Flat in the Center',
                            price: 190,
                            imgUrl: 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437330/mmhkmfvg8o3freucyekc.jpg',
                        },
                        startDate: '2027-01-15',
                        endDate: '2027-01-19',
                    },
                ],
            },
        ]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
    }
}