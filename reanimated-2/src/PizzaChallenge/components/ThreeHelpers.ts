import { useState, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { decode, encode } from "base-64";
import { Asset } from "expo-asset";
import { Group, Matrix4, Quaternion, Vector3 } from "three";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export const useModel = (mod: ReturnType<typeof require>) => {
  const [model, setModel] = useState<Group | null>(null);
  const asset = Asset.fromModule(mod);
  useEffect(() => {
    (async () => {
      asset.downloadAsync();
      const loader = new GLTFLoader();
      loader.load(asset.uri || "", (gltf) => {
        setModel(gltf.scene);
      });
    })();
  }, [asset]);
  return model;
};

export const pivotMatrix = (z: number, angle: number) => {
  const quaternion = new Quaternion();
  quaternion.setFromAxisAngle(new Vector3(1, 0, 0), angle);
  const m = new Matrix4();
  m.compose(new Vector3(0, 0, 0), quaternion, new Vector3(1, 1, 1));
  const pivot = new Vector3(0, 0, z);
  const px = pivot.x,
    py = pivot.y,
    pz = pivot.z;
  const te = m.elements;
  te[12] += px - te[0] * px - te[4] * py - te[8] * pz;
  te[13] += py - te[1] * px - te[5] * py - te[9] * pz;
  te[14] += pz - te[2] * px - te[6] * py - te[10] * pz;
  return m;
};
