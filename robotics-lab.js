/* Original illustrative robot/actuator geometry. No project CAD or hardware
   measurements are implied. Three.js is bundled locally under MIT. */
import * as T from './assets/vendor/three/three.module.js';
import {OrbitControls} from './assets/vendor/three/OrbitControls.js';

export function createLab(host, initial, callbacks={}) {
  const renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
  renderer.outputColorSpace=T.SRGBColorSpace;
  renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
  renderer.localClippingEnabled=true;
  const canvas=renderer.domElement;canvas.className='robotics-canvas';canvas.tabIndex=0;
  canvas.setAttribute('role','img');canvas.setAttribute('aria-label',callbacks.canvasLabel||'Interactive robot concept model');
  host.append(canvas);
  const scene=new T.Scene(),camera=new T.PerspectiveCamera(36,1,.1,70);
  const controls=new OrbitControls(camera,canvas);
  controls.enableDamping=false;controls.enablePan=false;controls.minDistance=5;controls.maxDistance=15;
  controls.minPolarAngle=.18;controls.maxPolarAngle=Math.PI*.49;controls.enabled=false;
  controls.listenToKeyEvents(canvas);canvas.style.touchAction='pan-y';
  scene.add(new T.HemisphereLight(0xf3f0e9,0x252729,2.5));
  for(const [pos,intensity] of [[[3,6,5],4],[[-4,3,-3],3],[[0,1,6],1]]){
    const light=new T.DirectionalLight(0xffffff,intensity);light.position.set(...pos);scene.add(light);
  }
  const mat=(color,metalness=.35,roughness=.45)=>new T.MeshStandardMaterial({color,metalness,roughness});
  const silver=mat(0xaaaead),ivory=mat(0xe9e7df,.22,.5),dark=mat(0x262a2c,.45,.38),black=mat(0x111315,.2,.65),mid=mat(0x697173,.55,.3);
  const mesh=(g,m,parent,x=0,y=0,z=0)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);parent.add(o);return o;};
  const box=(w,h,d,m,p,x=0,y=0,z=0)=>mesh(new T.BoxGeometry(w,h,d),m,p,x,y,z);
  const cyl=(r,h,m,p,x=0,y=0,z=0)=>mesh(new T.CylinderGeometry(r,r,h,36),m,p,x,y,z);
  const disc=(r,h,m,p,x=0,y=0,z=0)=>{const o=cyl(r,h,m,p,x,y,z);o.rotation.x=Math.PI/2;return o;};
  const grid=new T.GridHelper(9,18,0x464a4a,0x242727);grid.position.y=-.075;scene.add(grid);
  const floor=mesh(new T.CircleGeometry(3.4,72),mat(0x191c1d,.05,.9),scene,0,-.09,0);floor.rotation.x=-Math.PI/2;
  const arm=new T.Group();scene.add(arm);
  box(1,.12,.9,mid,arm,0,0,0);
  for(const x of [-.38,.38])for(const z of [-.32,.32])cyl(.055,.022,black,arm,x,.075,z);
  cyl(.37,.3,dark,arm,0,.2,0);cyl(.39,.06,silver,arm,0,.36,0);
  const yaw=new T.Group();yaw.position.y=.4;arm.add(yaw);
  box(.38,.44,.38,ivory,yaw,0,.24,0);
  const shoulder=new T.Group();shoulder.position.y=.48;yaw.add(shoulder);
  function joint(parent,r){
    disc(r,.55,dark,parent);disc(r*.85,.035,silver,parent,0,0,.3);disc(r*.62,.04,mid,parent,0,0,.325);
    for(let i=0;i<6;i++){const a=i*Math.PI/3;disc(.025,.018,black,parent,Math.cos(a)*r*.72,Math.sin(a)*r*.72,.35);}
  }
  function link(parent,length,width){
    for(const z of [-.18,.18])box(width,length,.085,ivory,parent,0,length/2,z);
    box(width*.58,length*.82,.27,mid,parent,0,length/2,0);
    for(const y of [length*.18,length*.82])disc(.055,.44,dark,parent,0,y,0);
    box(width*.15,length*.55,.015,black,parent,-width*.33,length/2,.228);
  }
  joint(shoulder,.26);link(shoulder,1.6,.29);
  const elbow=new T.Group();elbow.position.y=1.6;shoulder.add(elbow);joint(elbow,.22);link(elbow,1.35,.24);
  const wrist=new T.Group();wrist.position.y=1.35;elbow.add(wrist);joint(wrist,.16);
  cyl(.13,.24,dark,wrist,0,.17,0);cyl(.16,.05,silver,wrist,0,.3,0);
  box(.38,.13,.23,dark,wrist,0,.39,0);
  const jaws=[];
  for(const sign of [-1,1]){const j=box(.065,.31,.12,silver,wrist,sign*.15,.57,0);jaws.push(j);box(.12,.055,.13,dark,j,-sign*.025,.15,0);}
  const tool=new T.Object3D();tool.position.y=.75;wrist.add(tool);
  mesh(new T.SphereGeometry(.037,14,10),new T.MeshBasicMaterial({color:0xf3f0e9}),tool);
  const workpiece=new T.Group();workpiece.position.set(2.05,0,0);arm.add(workpiece);
  box(.72,.1,.7,mid,workpiece,0,.08,0);box(.19,.55,.19,dark,workpiece,0,.4,0);
  box(.7,.07,.65,ivory,workpiece,0,.71,0);box(.32,.3,.32,silver,workpiece,0,.9,0);

  const cad=new T.Group();cad.position.y=1.5;cad.visible=false;scene.add(cad);
  const clip=new T.Plane(new T.Vector3(0,-1,0),1.8),housingMat=mat(0x9ca3a4,.62,.3);
  housingMat.clippingPlanes=[clip];housingMat.side=T.DoubleSide;
  const boltMat=dark.clone();boltMat.clippingPlanes=[clip];
  function ring(outer,inner,depth,material,parent,z){
    const shape=new T.Shape();shape.absarc(0,0,outer,0,Math.PI*2,false);
    const hole=new T.Path();hole.absarc(0,0,inner,0,Math.PI*2,true);shape.holes.push(hole);
    return mesh(new T.ExtrudeGeometry(shape,{depth,bevelEnabled:false,curveSegments:48}),material,parent,0,0,z);
  }
  const shell=ring(1.24,1.08,2.1,housingMat,cad,-1.05);
  const front=ring(1.29,.29,.14,housingMat,cad,1.05);
  const back=ring(1.29,.22,.14,housingMat,cad,-1.19);
  const driveParts=[];
  function gear(radius,teeth,z,centerX=0){
    const shape=new T.Shape();
    for(let i=0;i<=teeth*4;i++){const a=i/(teeth*4)*Math.PI*2,r=radius*(i%4===1||i%4===2?1:.89),x=r*Math.cos(a),y=r*Math.sin(a);i?shape.lineTo(x,y):shape.moveTo(x,y);}
    const hole=new T.Path();hole.absarc(0,0,.16,0,Math.PI*2,true);shape.holes.push(hole);
    const o=mesh(new T.ExtrudeGeometry(shape,{depth:.22,bevelEnabled:true,bevelThickness:.013,bevelSize:.013,bevelSegments:1}),silver,cad,centerX,0,z);driveParts.push(o);return o;
  }
  gear(.73,32,-.1,.18);gear(.3,14,-.1,-.78);
  const shaft=disc(.17,2.9,mid,cad,.18,0,0);driveParts.push(shaft);
  for(const z of [-.72,.72]){
    const bearing=new T.Group();bearing.position.set(.18,0,z);cad.add(bearing);
    ring(.46,.32,.1,mid,bearing,-.05);ring(.24,.17,.1,silver,bearing,-.05);
    for(let i=0;i<12;i++){const a=i*Math.PI/6;mesh(new T.SphereGeometry(.06,12,8),ivory,bearing,Math.cos(a)*.28,Math.sin(a)*.28,0);}
    driveParts.push(bearing);
  }
  for(let i=0;i<8;i++){
    const a=i*Math.PI/4,x=Math.cos(a)*1.15,y=Math.sin(a)*1.15;
    disc(.05,.16,boltMat,cad,x,y,1.2);
  }
  const cutGuide=new T.LineSegments(new T.EdgesGeometry(new T.BoxGeometry(2.8,.008,2.7)),new T.LineBasicMaterial({color:0x9ca2a0,transparent:true,opacity:.35}));cad.add(cutGuide);
  const initialZ=new Map(driveParts.map(p=>[p,p.position.z]));
  let mode='arm',pose=[...initial.pose],cut=initial.cut,explode=initial.explode,interactive=false,playing=false,visible=true,disposed=false,frame=0,last=0,elapsed=0;
  function notifyPose(){
    const pos=new T.Vector3();tool.getWorldPosition(pos);
    host.dataset.tcp=[pos.x,pos.y,pos.z].map(n=>n.toFixed(4)).join(',');
    host.dataset.pose=pose.map(n=>n.toFixed(2)).join(',');callbacks.onPose?.({pose:[...pose],tcp:[pos.x,pos.y,pos.z]});
  }
  function updatePose(values){
    pose=[...values];yaw.rotation.y=T.MathUtils.degToRad(pose[0]);shoulder.rotation.z=T.MathUtils.degToRad(pose[1]);elbow.rotation.z=T.MathUtils.degToRad(pose[2]);
    wrist.rotation.z=Math.PI-shoulder.rotation.z-elbow.rotation.z;
    scene.updateMatrixWorld(true);notifyPose();request();
  }
  function updateCut(value){cut=value;clip.constant=1.5+1.35-value/100*1.65;cutGuide.position.y=clip.constant-1.5;cutGuide.visible=value>0;host.dataset.section=value;request();}
  function updateExplode(value){
    explode=value;front.position.z=1.05+value*1.1;back.position.z=-1.19-value*.8;
    for(const p of driveParts)p.position.z=initialZ.get(p)*(1+value*.7);
    host.dataset.explode=value;request();
  }
  function resetCamera(){
    const narrow=host.clientWidth/Math.max(host.clientHeight,1)<1.1;
    if(mode==='arm'){camera.position.set(5.5,3.5,6.8);controls.target.set(.8,1.65,0);}
    else{camera.position.set(3.7,3.2,5.6).multiplyScalar(narrow?1.08:1);controls.target.set(0,1.5,0);}
    controls.update();request();
  }
  function render(now){
    frame=0;if(disposed||!visible||document.hidden)return;
    if(playing&&mode==='arm'){
      if(!last)last=now;elapsed+=Math.min(now-last,70)/1000;last=now;
      updatePose([-24+Math.sin(elapsed*.5)*34,-32+Math.sin(elapsed*.65)*16,-66+Math.sin(elapsed*.65+.6)*24]);
    }
    renderer.render(scene,camera);host.dataset.frames=String((Number(host.dataset.frames)||0)+1);
    if(playing&&mode==='arm')request();
  }
  function request(){if(!frame&&!disposed&&visible&&!document.hidden)frame=requestAnimationFrame(render);}
  function resize(){if(disposed)return;const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();request();}
  function setPlaying(value){playing=value;last=0;host.dataset.playing=String(value);request();}
  function setView(view){mode=view;arm.visible=view==='arm';cad.visible=view==='cad';grid.visible=true;floor.visible=true;host.dataset.model=view;resetCamera();resize();request();}
  function setInteractive(value){interactive=value;controls.enabled=value;canvas.style.touchAction=value?'none':'pan-y';host.dataset.interactive=String(value);canvas.style.cursor=value?'grab':'auto';request();}
  controls.addEventListener('change',()=>{host.dataset.camera=camera.position.toArray().map(n=>n.toFixed(3)).join(',');request();});
  const ro=new ResizeObserver(resize);ro.observe(host);
  const io=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;last=0;if(!visible){cancelAnimationFrame(frame);frame=0;}else request();},{threshold:.01});io.observe(host);
  const visibility=()=>{last=0;if(document.hidden){cancelAnimationFrame(frame);frame=0;}else request();};document.addEventListener('visibilitychange',visibility);
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();setPlaying(false);callbacks.onContextLost?.();});
  updatePose(pose);updateCut(cut);updateExplode(explode);setView('arm');setInteractive(false);setPlaying(false);
  return {setView,updateArm:updatePose,setSection:updateCut,setExplode:updateExplode,setInteractive,resetCamera,setPlaying,
    snapshot:()=>({mode,pose:[...pose],cut,explode,playing,interactive,geometries:renderer.info.memory.geometries}),
    dispose(){disposed=true;cancelAnimationFrame(frame);ro.disconnect();io.disconnect();controls.dispose();document.removeEventListener('visibilitychange',visibility);
      const geometries=new Set(),materials=new Set();scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)for(const m of [].concat(o.material))materials.add(m);});
      geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());renderer.dispose();renderer.forceContextLoss();canvas.remove();
    }
  };
}
