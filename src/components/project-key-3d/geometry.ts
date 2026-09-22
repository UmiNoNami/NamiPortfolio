import * as THREE from "three";

type Ring = { width: number; depth: number; radius: number; y: number };

/** Rounded rectangular cross-sections produce taper and actual rolled edges. */
export function profileGeometry(rings: Ring[], closeTop = true) {
  const positions: number[] = [];
  const indices: number[] = [];
  const segments = 12;
  const count = (segments + 1) * 4;
  for (const ring of rings) {
    for (let corner = 0; corner < 4; corner++) {
      const angle = corner * Math.PI / 2;
      const cx = (corner === 0 || corner === 3 ? 1 : -1) * (ring.width / 2 - ring.radius);
      const cz = (corner < 2 ? 1 : -1) * (ring.depth / 2 - ring.radius);
      for (let step = 0; step <= segments; step++) {
        const a = angle + step / segments * Math.PI / 2;
        positions.push(cx + Math.cos(a) * ring.radius, ring.y, cz + Math.sin(a) * ring.radius);
      }
    }
  }
  for (let ring = 0; ring < rings.length - 1; ring++) {
    for (let i = 0; i < count; i++) {
      const a = ring * count + i;
      const b = ring * count + (i + 1) % count;
      const c = a + count;
      const d = b + count;
      indices.push(a, c, b, b, c, d);
    }
  }
  if (closeTop) {
    const center = positions.length / 3;
    positions.push(0, rings[rings.length - 1].y, 0);
    const offset = (rings.length - 1) * count;
    for (let i = 0; i < count; i++) indices.push(offset + i, center, offset + (i + 1) % count);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export function housingGeometry() {
  return profileGeometry([
    { width: 3.25, depth: 3.25, radius: .36, y: .08 },
    { width: 3.38, depth: 3.38, radius: .40, y: .13 },
    { width: 3.42, depth: 3.42, radius: .42, y: .21 },
    { width: 3.42, depth: 3.42, radius: .42, y: .61 },
    { width: 3.40, depth: 3.40, radius: .43, y: .69 },
    { width: 3.34, depth: 3.34, radius: .44, y: .76 },
    { width: 3.25, depth: 3.25, radius: .44, y: .80 },
    // Turn inward to make a real opening instead of a solid block.
    { width: 3.04, depth: 3.04, radius: .32, y: .80 },
    { width: 2.99, depth: 2.99, radius: .30, y: .76 },
    { width: 2.97, depth: 2.97, radius: .29, y: .44 },
  ], false);
}

export function capGeometry() {
  return profileGeometry([
    { width: 2.78, depth: 2.78, radius: .27, y: 0 },
    { width: 2.88, depth: 2.88, radius: .29, y: .04 },
    { width: 2.90, depth: 2.90, radius: .30, y: .11 },
    { width: 2.68, depth: 2.68, radius: .29, y: .63 },
    { width: 2.64, depth: 2.64, radius: .29, y: .70 },
    { width: 2.615, depth: 2.615, radius: .295, y: .735 },
    { width: 2.58, depth: 2.58, radius: .30, y: .765 },
    { width: 2.545, depth: 2.545, radius: .30, y: .790 },
    { width: 2.50, depth: 2.50, radius: .30, y: .807 },
    { width: 2.40, depth: 2.40, radius: .29, y: .82 },
    { width: 2.19, depth: 2.19, radius: .28, y: .815 },
    { width: 1.72, depth: 1.72, radius: .26, y: .797 },
    { width: .95, depth: .95, radius: .20, y: .786 },
    { width: .20, depth: .20, radius: .08, y: .784 },
  ]);
}

/** Thin molded/printed arrow, lying on the same top plane as the legend. */
export function arrowGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(-.13, -.11);
  shape.lineTo(.075, .095);
  shape.lineTo(-.055, .095);
  shape.lineTo(-.055, .13);
  shape.lineTo(.135, .13);
  shape.lineTo(.135, -.06);
  shape.lineTo(.1, -.06);
  shape.lineTo(.1, .07);
  shape.lineTo(-.105, -.135);
  shape.closePath();
  return new THREE.ShapeGeometry(shape);
}

export function plasticGrain() {
  const data = new Uint8Array(64 * 64 * 4);
  let seed = 83;
  for (let i = 0; i < data.length; i += 4) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const value = 110 + (seed % 36);
    data[i] = data[i + 1] = data[i + 2] = value;
    data[i + 3] = 255;
  }
  const texture = new THREE.DataTexture(data, 64, 64);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(12, 12);
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}
