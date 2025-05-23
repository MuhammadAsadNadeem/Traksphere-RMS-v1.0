import "leaflet";

declare module "leaflet" {
  namespace Routing {
    interface ControlOptions {
      waypoints: L.LatLng[];
      routeWhileDragging?: boolean;
      createMarker?: (
        i: number,
        waypoint: L.Routing.Waypoint,
        n: number
      ) => L.Marker | null;
    }

    interface Waypoint {
      latLng: L.LatLng;
      name?: string;
    }

    function control(options: ControlOptions): L.Control;
  }
}
