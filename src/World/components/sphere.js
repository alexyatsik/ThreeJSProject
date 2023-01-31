import {Mesh, MeshBasicMaterial, SphereGeometry} from "three";

export function createSphere(radius, widthSegments, heightSegments, skin) {
  let mapType = 'color';
  if (typeof skin === "object")
    mapType = 'map';

  const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
  const material = new MeshBasicMaterial({
    [mapType] : skin
  })

  const sphere = new Mesh(geometry, material);

  return sphere;
}