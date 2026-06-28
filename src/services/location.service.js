export const locationImages = [
    new URL('../assets/images/a-1.jpg', import.meta.url).href,
    new URL('../assets/images/a-2.jpg', import.meta.url).href,
    new URL('../assets/images/a-3.jpg', import.meta.url).href,
    new URL('../assets/images/a-4.jpg', import.meta.url).href,
    new URL('../assets/images/a-5.jpg', import.meta.url).href,
    new URL('../assets/images/a-6.jpg', import.meta.url).href,
    new URL('../assets/images/a-7.jpg', import.meta.url).href,
    new URL('../assets/images/a-8.jpg', import.meta.url).href,
    new URL('../assets/images/a-9.jpg', import.meta.url).href,
    new URL('../assets/images/a-10.jpg', import.meta.url).href,
    new URL('../assets/images/a-11.jpg', import.meta.url).href,
    new URL('../assets/images/a-12.jpg', import.meta.url).href,
    new URL('../assets/images/a-13.jpg', import.meta.url).href,
    new URL('../assets/images/a-14.jpg', import.meta.url).href,
    new URL('../assets/images/a-15.jpg', import.meta.url).href,
]

export function getRandomLocationImage() {
    return locationImages[Math.floor(Math.random() * locationImages.length)]
}


export const locationDescriptions = [
    'Perfect for a family vacation',
    'Great for a romantic getaway',
    'Amazing beaches and sunshine',
    'Rich culture and history',
    'Adventure awaits you',
    'Stunning mountain views',
    'World-class dining and nightlife',
    'Hidden gem destination',
    'Perfect weather year-round',
    'Unforgettable experiences await',
]

export function getRandomLocationDescription() {
    return locationDescriptions[Math.floor(Math.random() * locationDescriptions.length)]
}