import React from "react";
import Lights from "./Lights";
import { OrbitControls } from "@react-three/drei";
import Level from "./Level";
import { Physics } from "@react-three/rapier";

const Experience = () => {
  return (
    <>
      <OrbitControls makeDefault />
      <Physics debug>
        <Lights />
        <Level />
      </Physics>
    </>
  );
};

export default Experience;
