import { ParkingLot } from "./parking-lot";

export class Marker {
  lat: number;
  lng: number;
  label?: string;
  description?: string;
  draggable: boolean = false;
  lotData: ParkingLot
}
