import { fitbox, Group, Path, rect } from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";

export const Silo = () => {
  const { width } = useWindowDimensions();
  const siloWidth = 150;
  const src = rect(0, 0, 520, 2025);
  const aspectRatio = 520 / 2025;
  const silo = rect(width * 0.25, 50, siloWidth, siloWidth / aspectRatio);
  return (
    <Group transform={fitbox("contain", src, silo)}>
      <Path
        path="M409.473 1559.22H486.85V1780.12H519.891V2024.68H0.904297V1559.22H409.473Z"
        color="#607F89"
      />
      <Path
        path="M486.848 1559.22V1780.12V2024.68H289.57V1559.22H486.848Z"
        color="#6C8E96"
      />
      <Path
        path="M360.671 0.900269H0.904297V1559.22H360.671V0.900269Z"
        color="#86A3B2"
      />
      <Path
        path="M327.209 29.5405H293.779V84.0702H327.209V29.5405Z"
        color="#1D4D68"
      />
      <Path
        path="M271.159 29.5405H237.729V84.0702H271.159V29.5405Z"
        color="#1D4D68"
      />
      <Path
        path="M215.108 29.5405H181.678V84.0702H215.108V29.5405Z"
        color="#1D4D68"
      />
      <Path
        path="M159.089 29.5405H125.659V84.0702H159.089V29.5405Z"
        color="#1D4D68"
      />
      <Path
        path="M103.038 29.5405H69.6082V84.0702H103.038V29.5405Z"
        color="#1D4D68"
      />
      <Path
        path="M44.5926 29.5405H11.1628V84.0702H44.5926V29.5405Z"
        color="#1D4D68"
      />
      <Path
        path="M282.938 0.900269V1128.97"
        style="stroke"
        color="#607F89"
        strokeMiter={10}
      />
      <Path
        path="M225.528 0.900269V1128.97"
        style="stroke"
        color="#607F89"
        strokeMiter={10}
      />
      <Path
        path="M168.118 0.900269V1128.97"
        style="stroke"
        color="#607F89"
        strokeMiter={10}
      />
      <Path
        path="M110.74 0.900269V1128.97"
        style="stroke"
        color="#607F89"
        strokeMiter={10}
      />
      <Path
        path="M53.331 0.900269V1128.97"
        style="stroke"
        color="#607F89"
        strokeMiter={10}
      />
      <Path
        path="M376.917 1134.99H0.90448V1559.22H376.917V1134.99Z"
        color="#7A99A5"
      />
      <Path
        path="M73.8151 1220.55H62.3589V1559.22H73.8151V1220.55Z"
        color="#A9CAD8"
      />
      <Path
        path="M73.8151 1220.55L125.659 1322.4V1559.22H73.8151V1220.55Z"
        color="#607F89"
      />
      <Path
        path="M137.115 1220.55H125.659V1559.22H137.115V1220.55Z"
        color="#A9CAD8"
      />
      <Path
        path="M137.083 1220.55L188.927 1322.4V1559.22H137.083V1220.55Z"
        color="#607F89"
      />
      <Path
        path="M200.383 1220.55H188.927V1559.22H200.383V1220.55Z"
        color="#A9CAD8"
      />
      <Path
        path="M200.384 1220.55L252.195 1322.4V1559.22H200.384V1220.55Z"
        color="#607F89"
      />
      <Path
        path="M263.65 1220.55H252.194V1559.22H263.65V1220.55Z"
        color="#A9CAD8"
      />
      <Path
        path="M263.65 1220.55L315.461 1322.4V1559.22H263.65V1220.55Z"
        color="#607F89"
      />
      <Path
        path="M326.919 1220.55H315.463V1559.22H326.919V1220.55Z"
        color="#A9CAD8"
      />
      <Path
        path="M326.917 1220.55L378.728 1322.4V1559.22H326.917V1220.55Z"
        color="#607F89"
      />
      <Path
        path="M360.671 0.900269L409.472 96.1089V1134.99V1559.22H378.729V1134.99H360.671V0.900269Z"
        color="#A9CAD8"
      />
    </Group>
  );
};
