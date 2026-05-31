declare module "dotted-map" {
  export interface DottedMapOptions {
    height?: number;
    grid?: "diagonal" | "vertical" | "horizontal";
  }

  export interface GetSVGOptions {
    radius?: number;
    color?: string;
    shape?: "circle" | "rect" | "polygon";
    backgroundColor?: string;
  }

  export default class DottedMap {
    points: { [key: string]: { x: number; y: number } };
    width: number;
    height: number;
    constructor(options?: DottedMapOptions);
    getPin(options: { lat: number; lng: number }): { x: number; y: number; lat: number; lng: number } | undefined;
    getSVG(options?: GetSVGOptions): string;
  }
}
