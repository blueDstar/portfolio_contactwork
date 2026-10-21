# Third-party software and model assets

The Studio's optional 3D viewer uses **Three.js 0.186.1** and its OrbitControls addon, by the three.js authors, distributed under the MIT license.

- Source package: https://www.npmjs.com/package/three/v/0.186.1
- Upstream: https://github.com/mrdoob/three.js
- Bundled files: `assets/vendor/three/three.module.js`, `three.core.js`, `OrbitControls.js`
- License: [`assets/vendor/three/LICENSE`](assets/vendor/three/LICENSE)
- Modification: OrbitControls' `three` import points to the bundled relative module. Library implementation is otherwise unchanged. The npm tarball's SHA-512 integrity was verified before selecting these files.

The library is served from this repository and loaded only when a 3D Studio view is requested. No runtime CDN is required. The arm and actuator concept models are original procedural geometry; project screenshots retain their existing attribution and scope.

## OpenArm geometry

The Home interest-gallery images `assets/interests/arm*.webp` and `arm-hero*.webp` are rendered derivatives of the OpenArm v1.0 URDF and visual meshes by Enactic, Inc.

- Source: https://github.com/enactic/openarm_description
- Revision: `206eb8a4cf2e5e564536b4f5366ef369843a4aa7`
- URDF: `assets/robot/openarm_v1.0/urdf/example/v1.urdf`
- Copyright 2025 Enactic, Inc.; Apache License 2.0, included in [`assets/interests/LICENSE-openarm.txt`](assets/interests/LICENSE-openarm.txt).
- Changes: joint pose, monochrome materials, camera, lighting and ground grid; single-arm isolation for the Hero. These are still images of the source geometry. Original meshes are not downloaded by site visitors.

## Unitree G1 geometry

The interest-gallery images `assets/interests/humanoid*.webp` are rendered derivatives of the G1 23-DOF URDF and visual meshes from Unitree Robotics.

- Source: https://github.com/unitreerobotics/unitree_ros/tree/master/robots/g1_description
- Revision: `5994d4faef0a9cadd3287f8de0199a67eeb2a259`
- URDF: `robots/g1_description/g1_23dof.urdf`
- Copyright 2016–2022 HangZhou YuShu TECHNOLOGY CO., LTD.; BSD 3-Clause license, included in [`assets/interests/LICENSE-unitree.txt`](assets/interests/LICENSE-unitree.txt).
- Changes: standing joint pose, monochrome materials, camera, lighting and ground grid. The images identify an area of research interest and do not imply authorship of the G1 or endorsement by Unitree.

The vehicle, hexapod, parallel platform, chatbot workstation, edge-computing board and vision-station gallery assets use original procedural geometry. They present system architectures and research interests; project evidence remains in the linked case studies. The optional Studio models remain separate procedural concept geometry.
