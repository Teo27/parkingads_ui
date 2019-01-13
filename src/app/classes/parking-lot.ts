export class ParkingLot{
    name: string
    is_open: boolean
    is_payment_active: boolean
    status_park_place: boolean
    longitude: number
    latitude: number
    max_count: number
    free_count: number
}

export class ParkingLotBook{
    lotname: string
    is_open: boolean
    is_payment_active: boolean
    status_park_place: boolean
    lat: number
    lng: number
    max_count: number
    free_count: number
    email?: string
}