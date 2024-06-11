import React from "react";
import Lights from "./Lights";
import { OrbitControls } from "@react-three/drei";
import Level, { Axe, Limbo, Spinner } from "./Level";
import { Physics } from "@react-three/rapier";

const Experience = () => {
  return (
    <>
      <OrbitControls makeDefault />
      <Physics debug>
        <Lights />
        <Level types={[Axe, Spinner, Limbo]} count={5} />
      </Physics>
    </>
  );
};

export default Experience;
