import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import React, { useRef, useState } from "react";
import * as THREE from "three";
// THREE.ColorManagemen.legacyMode = false;

const boxGeomerty = new THREE.BoxGeometry(1, 1, 1);

const floor1Material = new THREE.MeshStandardMaterial({ color: "green" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "grey" });

const BlockStart = ({ position = [0, 0, 0] }) => {
  return (
    <group>
      <mesh
        geometry={boxGeomerty}
        material={floor1Material}
        scale={[4, 0.2, 4]}
        position={position || [0, 0.1, 0]}
        receiveShadow
      />
    </group>
  );
};

const Spinner = ({ position = [0, 0, 0] }) => {
  const obstacleRef = useRef();
  const [speed] = useState(
    (Math.random() + 0.2) * Math.random() < 0.5 ? -1 : 1
  );

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const rotation = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, speed * time, 0)
    );
    obstacleRef.current.setNextKinematicRotation(rotation);
  });
  return (
    <group>
      <mesh
        geometry={boxGeomerty}
        material={floor2Material}
        scale={[4, 0.2, 4]}
        position={position || [0, 0.1, 0]}
        receiveShadow
      />
      <RigidBody
        ref={obstacleRef}
        type="kinematicPosition"
        position={[0, 0.3, position[2]]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          castShadow
          geometry={boxGeomerty}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
        />
      </RigidBody>
    </group>
  );
};

const Limbo = ({ position = [0, 0, 0] }) => {
  const obstacleRef = useRef();
  const [timeOffSet] = useState(Math.random() * Math.PI * 2);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const y = Math.sin(time * timeOffSet) + 1.2;
    obstacleRef.current.setNextKinematicTranslation({
      x: 0,
      y,
      z: position[2],
    });
  });
  return (
    <group>
      <mesh
        geometry={boxGeomerty}
        material={floor2Material}
        scale={[4, 0.2, 4]}
        position={position || [0, 0.1, 0]}
        receiveShadow
      />
      <RigidBody
        ref={obstacleRef}
        type="kinematicPosition"
        position={[0, 0.3, 4]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          castShadow
          geometry={boxGeomerty}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
        />
      </RigidBody>
    </group>
  );
};
const Axe = ({ position = [0, 0, 0] }) => {
  const obstacleRef = useRef();
  const [timeOffSet] = useState(Math.random() * Math.PI * 2);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const z = Math.sin(time * timeOffSet);
    obstacleRef.current.setNextKinematicTranslation({
      x: z,
      y: position[1] + 0.75,
      z: position[2],
    });
  });
  return (
    <group>
      <mesh
        geometry={boxGeomerty}
        material={floor2Material}
        scale={[4, 0.2, 4]}
        position={position || [0, 0.1, 0]}
        receiveShadow
      />
      <RigidBody
        ref={obstacleRef}
        type="kinematicPosition"
        position={[0, 0.3, 4]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          castShadow
          geometry={boxGeomerty}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
        />
      </RigidBody>
    </group>
  );
};
const BlockEnd = ({ position = [0, 0, 0] }) => {
  return (
    <group>
      <mesh
        geometry={boxGeomerty}
        material={floor1Material}
        scale={[4, 0.2, 4]}
        position={position || [0, 0, 0]}
        receiveShadow
      />
    </group>
  );
};
const Level = () => {
  return (
    <>
      <BlockStart position={[0, 0, 16]} />
      <Spinner position={[0, 0, 12]} />
      <Limbo position={[0, 0, 8]} />
      <Axe position={[0, 0, 4]} />
      <BlockEnd position={[0, 0, 0]} />
    </>
  );
};

export default Level;
