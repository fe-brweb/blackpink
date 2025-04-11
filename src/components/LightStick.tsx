"use client";

import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const CursorModel = () => {
  const { scene } = useGLTF("./models/lightstick.glb");
  const cursorRef = useRef<THREE.Mesh>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const targetRotation = useRef(0); // 목표 회전값 (기본 0도)
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const addColor = (color: string, emissive: string) => {
    return new THREE.MeshStandardMaterial({
      color: color, // 원하는 색상
      metalness: 0.8, // 금속 느낌
      roughness: 0.6, // 반짝이는 효과 조절
      emissive: emissive, // 빛나는 느낌 추가
      emissiveIntensity: 0.1,
    });
  };

  useEffect(() => {
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        if (mesh.name === "Object_3") {
          mesh.material = addColor("#000000", "#000000");
        } else if (mesh.name === "Object_4") {
          mesh.material = addColor("#ffffff", "#ffffff");
        } else if (mesh.name === "Object_5") {
          mesh.material = addColor("#ff98a2", "#ff98a2");
        } else if (mesh.name === "Object_6") {
          mesh.material = addColor("#ff98a2", "#ff98a2");
        }
      }
    });
  }, [scene]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(({ viewport }) => {
    if (!cursorRef.current) return;

    const x = mousePos.x * (viewport.width / 2);
    const y = mousePos.y * (viewport.height / 2);

    cursorRef.current.position.lerp(new THREE.Vector3(x, y - 0.5, 0), 0.1);
  });

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  }, []);

  // 마우스 클릭(눌렀을 때) 이벤트
  const handleMouseDown = (event: MouseEvent) => {
    targetRotation.current = THREE.MathUtils.degToRad(-45); // -45도 회전
  };

  // 마우스 클릭(뗐을 때) 이벤트
  const handleMouseUp = () => {
    targetRotation.current = 0; // 원래 위치로 복귀
  };

  // 부드러운 애니메이션 적용 (lerp)
  useFrame(() => {
    if (!cursorRef.current) return;

    cursorRef.current.rotation.x = THREE.MathUtils.lerp(
      cursorRef.current.rotation.x,
      targetRotation.current,
      0.2, // 부드러운 보간 효과
    );
  });

  useEffect(() => {
    window.addEventListener("pointerdown", handleMouseDown);
    window.addEventListener("pointerup", handleMouseUp);

    return () => {
      window.removeEventListener("pointerdown", handleMouseDown);
      window.removeEventListener("pointerup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <mesh ref={cursorRef} rotation={[0, THREE.MathUtils.degToRad(-90), 0]}>
        <primitive object={scene} scale={0.8} />
      </mesh>
    </>
  );
};

const LightStick: React.FC = () => {
  return (
    <div className="!pointer-events-none fixed z-50 h-lvh w-full">
      <Canvas className="camera !pointer-events-none absolute">
        <directionalLight position={[1, 1, 1]} />
        <ambientLight intensity={5} />
        <CursorModel />
      </Canvas>
    </div>
  );
};

export default LightStick;
