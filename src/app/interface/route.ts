//route interface for main ts, format of data thats returned from server
export interface Route {
    routeName:string,
    routeId:string,
    routeTo:{toLocationAddress:string,toLocationPlaceId:string},
    routeFrom:{fromLocationAddress:string,fromLocationPlaceId:string},
    desiredRouteTime:number,
    realRouteTime:number,
    routeUrl:string,
}