"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, SoftShadows } from "@react-three/drei";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import fontData from "three/examples/fonts/helvetiker_bold.typeface.json";
import { PROJECT_KEY as C, type KeyInteraction } from "./config";
import { arrowGeometry, capGeometry, housingGeometry, plasticGrain, profileGeometry } from "./geometry";

export type SceneProps = {
  label: string;
  capColor: string;
  legendColor: string;
  idlePhase: number;
  embedded: boolean;
  grouped?: boolean;
  interaction: KeyInteraction;
  reducedMotion: boolean;
  compact: boolean;
  active: boolean;
  onReady: () => void;
  onUnavailable: () => void;
};

export function Key({ interaction, reducedMotion, compact, active, label, capColor, legendColor, idlePhase, grouped = false }: SceneProps) {
  const object = useRef<THREE.Group>(null);
  const cap = useRef<THREE.Group>(null);
  const phase = useRef(idlePhase);
  const { invalidate } = useThree();
  const parts = useMemo(() => {
    const housing = housingGeometry();
    const keycap = capGeometry();
    const foot = profileGeometry([
      { width: 3.10, depth: 3.10, radius: .34, y: .015 },
      { width: 3.22, depth: 3.22, radius: .37, y: .05 },
      { width: 3.22, depth: 3.22, radius: .37, y: .12 },
    ]);
    // A planar UV projection gives the tiny procedural grain stable coordinates.
    for (const geometry of [housing, keycap, foot]) {
      const p = geometry.getAttribute("position");
      const uv = new Float32Array(p.count * 2);
      for (let i = 0; i < p.count; i++) { uv[i * 2] = p.getX(i) / 3.4; uv[i * 2 + 1] = (p.getZ(i) + p.getY(i)) / 3.4; }
      geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    }
    const legend = new TextGeometry(label.toUpperCase(), { font: new FontLoader().parse(fontData), size: .255, depth: .003, curveSegments: 5 });
    legend.computeBoundingBox();
    const bounds = legend.boundingBox!;
    const fit = Math.min(1, 1.95 / (bounds.max.x - bounds.min.x));
    legend.translate(-(bounds.max.x - bounds.min.x) / 2, 0, 0);
    legend.scale(fit, fit, 1);
    return { housing, keycap, foot, legend, arrow: arrowGeometry(), grain: plasticGrain() };
  }, [label]);
  useEffect(() => () => { Object.values(parts).forEach(resource => resource.dispose()); }, [parts]);
  useEffect(() => { invalidate(); }, [interaction, reducedMotion, active, invalidate]);

  useFrame((_, delta) => {
    if (!object.current || !cap.current || !active) return;
    const dt = Math.min(delta, .05);
    phase.current += dt;
    const amplitude = reducedMotion || grouped ? 0 : compact ? .35 : 1;
    const cycle = phase.current * Math.PI * 2 / C.motion.idlePeriod;
    const pointerX = interaction.hovered ? interaction.y * C.motion.pointerDegrees : 0;
    const pointerY = interaction.hovered ? interaction.x * C.motion.pointerDegrees : 0;
    const rx = THREE.MathUtils.degToRad((Math.sin(cycle) * C.motion.idleXDegrees + pointerX) * amplitude);
    const ry = THREE.MathUtils.degToRad((Math.sin(cycle * .83) * C.motion.idleYDegrees + pointerY) * amplitude);
    object.current.rotation.x = reducedMotion ? 0 : THREE.MathUtils.damp(object.current.rotation.x, rx, 5, dt);
    object.current.rotation.y = reducedMotion ? 0 : THREE.MathUtils.damp(object.current.rotation.y, ry, 5, dt);
    const target = interaction.pressed ? -C.motion.pressDepth : 0;
    const duration = interaction.pressed ? C.motion.pressDownSeconds : C.motion.pressUpSeconds;
    cap.current.position.y = reducedMotion ? target : THREE.MathUtils.damp(cap.current.position.y, target, 3 / duration, dt);
    if (Math.abs(cap.current.position.y - target) < .0001) cap.current.position.y = target;
    if (!reducedMotion || cap.current.position.y !== target) invalidate();
  });

  return <group ref={object} position={[0, .08, 0]}>
    <mesh geometry={parts.foot} castShadow receiveShadow><meshStandardMaterial color="#202528" roughness={.67} /></mesh>
    <mesh geometry={parts.housing} castShadow receiveShadow>
      <meshPhysicalMaterial color={C.colors.housing} roughness={C.material.housingRoughness} metalness={0} bumpMap={parts.grain} bumpScale={C.material.microBump} clearcoat={.06} clearcoatRoughness={.6} />
    </mesh>
    <mesh position={[0, .45, 0]} receiveShadow><boxGeometry args={[2.97, .15, 2.97]} /><meshStandardMaterial color={C.colors.recess} roughness={.92} /></mesh>
    <group ref={cap}>
      <group position={[0, .69, 0]}>
        <mesh geometry={parts.keycap} castShadow receiveShadow>
          <meshPhysicalMaterial color={capColor} roughness={C.material.capRoughness} metalness={0} bumpMap={parts.grain} bumpScale={C.material.microBump} clearcoat={.12} clearcoatRoughness={.45} />
        </mesh>
        <mesh geometry={parts.arrow} position={[.79, .811, .67]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color={legendColor} roughness={.62} />
        </mesh>
        <mesh geometry={parts.legend} position={[0, .805, -.29]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
          <meshStandardMaterial color={legendColor} roughness={.62} polygonOffset polygonOffsetFactor={-1} />
        </mesh>
      </group>
    </group>
  </group>;
}

export function Studio({ compact, embedded, cluster = false }: { compact: boolean; embedded: boolean; cluster?: boolean }) {
  return <>
    <ambientLight intensity={C.lighting.ambient} />
    {/* SoftShadows patches a global Three shader; never mount it in four canvases. */}
    {!embedded && <SoftShadows size={25} samples={compact ? 8 : 16} focus={.2} />}
    {/* Cluster uses contact shadows to avoid self-shadow artifacts between adjacent caps. */}
    <directionalLight position={[-3.8, 7, 5]} intensity={C.lighting.key} color="#fff3e3" castShadow={!cluster}
      shadow-mapSize={[compact ? 512 : 1024, compact ? 512 : 1024]} shadow-bias={-.00025} shadow-normalBias={.025}
      shadow-camera-left={-4} shadow-camera-right={4} shadow-camera-top={4} shadow-camera-bottom={-4} shadow-radius={5} />
    <directionalLight position={[4, 3, 1]} intensity={C.lighting.fill} color="#dce7f4" />
    <directionalLight position={[1, 4, -5]} intensity={C.lighting.rim} color="#fff7ec" />
    <Environment resolution={128} frames={1}>
      <Lightformer form="rect" intensity={3} color="#fff7ed" position={[-4, 5, 3]} rotation={[0, Math.PI / 4, 0]} scale={[4, 5, 1]} />
      <Lightformer form="rect" intensity={1.5} position={[4, 3, -3]} rotation={[0, -Math.PI / 3, 0]} scale={[2, 4, 1]} />
      <Lightformer form="rect" intensity={.8} position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[5, 5, 1]} />
    </Environment>
  </>;
}

function Ready({ onReady }: { onReady: () => void }) {
  useEffect(onReady, [onReady]);
  return null;
}

export default function ProjectKeyScene(props: SceneProps) {
  return <Canvas shadows="soft" frameloop="demand" dpr={[1, props.compact ? 1.25 : props.embedded ? 1.5 : 1.75]}
    // The native button handles every interaction. No raycasting or DOM event
    // connection is needed (including during rapid route unmount/remount).
    events={() => ({ enabled: false, priority: 0 })}
    camera={{ position: C.camera.position, fov: C.camera.fov, near: .1, far: 50 }}
    gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    onCreated={({ gl, camera }) => {
      camera.lookAt(0, .65, 0);
      gl.toneMapping = THREE.ACESFilmicToneMapping;
      gl.toneMappingExposure = C.lighting.exposure;
      gl.domElement.addEventListener("webglcontextlost", props.onUnavailable, { once: true });
    }}>
    <Suspense fallback={null}>
      <Studio compact={props.compact || props.embedded} embedded={props.embedded} />
      <Key {...props} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.012, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} /><shadowMaterial transparent opacity={props.embedded ? .06 : .18} />
      </mesh>
      <ContactShadows key={`${props.interaction.pressed}-${props.reducedMotion}`} position={[0, -.002, 0]} opacity={.42} scale={10} blur={2.5} far={3} resolution={props.compact ? 128 : 256} frames={props.reducedMotion ? 1 : 16} color="#38312a" />
      <Ready onReady={props.onReady} />
    </Suspense>
  </Canvas>;
}
