"use client";

import { Suspense, useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { Key, Studio } from "./ProjectKeyScene";
import { PROJECT_KEY as C } from "./config";
import { CLUSTER_CAMERA, CLUSTER_KEYS, type ClusterKeyId } from "./clusterConfig";

type Props = {
  pressed: ClusterKeyId | null;
  pointer: MutableRefObject<{ x: number; y: number }>;
  controls: MutableRefObject<(HTMLButtonElement | null)[]>;
  outlines: MutableRefObject<(SVGPolygonElement | null)[]>;
  reduced: boolean; active: boolean; compact: boolean;
  onReady: () => void; onError: () => void;
};

type Point = [number, number];
function hull(points: Point[]) {
  const sorted = points.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (a: Point, b: Point, c: Point) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  const half = (list: Point[]) => { const result: Point[] = []; for (const p of list) { while (result.length > 1 && cross(result[result.length - 2], result[result.length - 1], p) <= 0) result.pop(); result.push(p); } return result; };
  return [...half(sorted).slice(0, -1), ...half([...sorted].reverse()).slice(0, -1)];
}

function Assembly(props: Props) {
  const group = useRef<THREE.Group>(null);
  const time = useRef(0);
  const frames = useRef(0);
  const { camera, invalidate } = useThree();
  const corners = useMemo(() => CLUSTER_KEYS.map(key => {
    const points: THREE.Vector3[] = [];
    for (const [half, y] of [[1.71, .16], [1.71, .88], [1.25, 1.59]]) {
      for (const x of [-half, half]) for (const z of [-half, half]) points.push(new THREE.Vector3(x + key.position[0], y, z + key.position[2]));
    }
    return points;
  }), []);
  const temp = useMemo(() => new THREE.Vector3(), []);
  useEffect(() => { invalidate(); }, [props.pressed, props.reduced, props.active, invalidate]);

  useFrame((_, delta) => {
    if (!group.current || !props.active) return;
    const dt = Math.min(delta, .05);
    // First frames use the still-render orientation for an invisible handoff.
    if (frames.current > 20) time.current += dt;
    const amplitude = props.reduced ? 0 : props.compact ? .35 : 1;
    const phase = time.current * Math.PI * 2 / C.motion.idlePeriod;
    const rx = THREE.MathUtils.degToRad((Math.sin(phase) * C.motion.idleXDegrees + props.pointer.current.y * .8) * amplitude);
    const ry = THREE.MathUtils.degToRad((Math.sin(phase * .83) * C.motion.idleYDegrees + props.pointer.current.x * .8) * amplitude);
    group.current.rotation.x = props.reduced ? 0 : THREE.MathUtils.damp(group.current.rotation.x, rx, 5, dt);
    group.current.rotation.y = props.reduced ? 0 : THREE.MathUtils.damp(group.current.rotation.y, ry, 5, dt);
    group.current.updateMatrixWorld(true);
    // Project the actual group silhouette so hit areas and focus follow rotation.
    corners.forEach((points, i) => {
      const outline = hull(points.map(point => {
        temp.copy(point).applyMatrix4(group.current!.matrixWorld).project(camera);
        return [(temp.x + 1) * 50, (1 - temp.y) * 50] as Point;
      }));
      const button = props.controls.current[i];
      if (button) button.style.clipPath = `polygon(${outline.map(p => `${p[0].toFixed(3)}% ${p[1].toFixed(3)}%`).join(",")})`;
      props.outlines.current[i]?.setAttribute("points", outline.map(p => p.join(",")).join(" "));
    });
    frames.current++;
    if (frames.current === 20) props.onReady();
    if (!props.reduced || frames.current <= 20) invalidate();
  });

  return <group ref={group} position={[0, .1, 0]}>
    {CLUSTER_KEYS.map(key => <group key={key.id} position={[...key.position]}>
      <Key label={key.label} capColor={key.color} legendColor={key.ink} idlePhase={0} embedded grouped
        interaction={{ pressed: props.pressed === key.id, hovered: false, x: 0, y: 0 }}
        reducedMotion={props.reduced} compact={props.compact} active={props.active} onReady={props.onReady} onUnavailable={props.onError} />
    </group>)}
  </group>;
}

export default function KeyboardClusterScene(props: Props) {
  return <Canvas shadows="soft" frameloop="demand" dpr={[1, props.compact ? 2 : 1.5]}
    events={() => ({ enabled: false, priority: 0 })}
    camera={{ ...CLUSTER_CAMERA, near: .1, far: 80 }}
    gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
    onCreated={({ camera, gl }) => { camera.lookAt(0, .65, 0); gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = C.lighting.exposure; gl.domElement.addEventListener("webglcontextlost", props.onError, { once: true }); }}>
    <Suspense fallback={null}>
      <Studio compact={props.compact} embedded cluster />
      <Assembly {...props} />
      <ContactShadows key={`${props.pressed}-${props.reduced}`} position={[0, -.005, 0]} opacity={.45} scale={18} blur={2.5} far={4} resolution={props.compact ? 128 : 256} frames={props.reduced ? 1 : 20} color="#38312a" />
    </Suspense>
  </Canvas>;
}
