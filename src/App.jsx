import { Canvas, extend } from "@react-three/fiber";
import "./App.css";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import Experience from "./Experience";
import { Perf } from "r3f-perf";

function App() {
  extend({ OrbitControls });

  return (
    <>
      <Canvas shadows>
        <Perf position="top-left" />
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
