# Third-party software

The Studio's optional 3D viewer uses **Three.js 0.186.1** and its OrbitControls addon, by the three.js authors, distributed under the MIT license.

- Source package: https://www.npmjs.com/package/three/v/0.186.1
- Upstream: https://github.com/mrdoob/three.js
- Bundled files: `assets/vendor/three/three.module.js`, `three.core.js`, `OrbitControls.js`
- License: [`assets/vendor/three/LICENSE`](assets/vendor/three/LICENSE)
- Modification: OrbitControls' `three` import points to the bundled relative module. Library implementation is otherwise unchanged. The npm tarball's SHA-512 integrity was verified before selecting these files.

The library is served from this repository and loaded only when a 3D Studio view is requested. No runtime CDN is required. The arm and actuator concept models are original procedural geometry; project screenshots retain their existing attribution and scope.
