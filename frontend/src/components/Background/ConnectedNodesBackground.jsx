import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const ConnectedNodes = () => {
  const groupRef = useRef();
  const linesGroup = useRef(new THREE.Group()); // Initialize as a THREE.Group

  const NODE_COUNT = 50;
  const nodes = Array.from({ length: NODE_COUNT }, () => ({
    position: new THREE.Vector3(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    ),
  }));

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001; // Rotate the network slowly
    }
  });

  useEffect(() => {
    // Create lines connecting nodes
    const geometry = new THREE.BufferGeometry();
    const positions = [];

    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = node.position.distanceTo(otherNode.position);
          if (distance < 3) {
            positions.push(
              node.position.x,
              node.position.y,
              node.position.z,
              otherNode.position.x,
              otherNode.position.y,
              otherNode.position.z
            );
          }
        }
      });
    });

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 1,
    });
    const lineSegments = new THREE.LineSegments(geometry, material);

    linesGroup.current.add(lineSegments); // Add line segments to the group

    return () => {
      material.dispose();
      geometry.dispose();
    };
  }, [nodes]);

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((node, index) => (
        <mesh key={index} position={node.position}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#fff" />
        </mesh>
      ))}
      {/* Lines */}
      <primitive object={linesGroup.current} />
    </group>
  );
};

const CameraController = () => {
  const { camera } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalize mouse position to range [-1, 1]
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    // Smooth camera movement
    camera.position.x += (mousePosition.x * 5 - camera.position.x) * 0.05;
    camera.position.y += (mousePosition.y * 2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0); // Ensure the camera always looks at the origin
  });

  return null;
};

const ConnectedNodesBackground = () => {
  return (
    <Canvas className="threebackground">
      <ambientLight intensity={1} />
      <CameraController />
      <ConnectedNodes />
    </Canvas>
  );
};

export default ConnectedNodesBackground;
