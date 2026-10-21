/* Robotics studio: one focused view at a time, with project-linked questions.
   3D geometry is illustrative; perception media are recorded project material. */
window.ResearchStudio = (() => {
  'use strict';
  const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let language=()=>document.documentElement.lang,reduced=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
  const L=(vi,en)=>language()==='vi'?vi:en;
  const content=v=>typeof v==='object'?v[language()]||v.vi:v;
  const state={view:'arm',pose:[-24,-28,-68],cut:62,explode:0,playing:false,interactive:false,vision:'camera',color:false};
  let root=null,model=null,modulePromise=null,pending=null,mountID=0,sectionObserver=null;
  const views=['arm','cad','vision'];
  const viewLabel=id=>({arm:L('Cánh tay máy','Robot arm'),cad:L('Mặt cắt cơ cấu','Mechanism section'),vision:L('Thị giác robot','Robot perception')}[id]);
  const notes=[
    {id:'01',project:'damiao-motor-control',image:'damiao-gui',tag:['PHẢN HỒI / TRUYỀN ĐỘNG','FEEDBACK / ACTUATION'],title:['Một lệnh gửi đi đã là một chuyển động?','Does a command mean a movement?'],text:['Tôi quan tâm đến khoảng cách giữa điều phần mềm yêu cầu và điều cơ cấu thực sự thực hiện. Ở Damiao, luồng lệnh và luồng feedback được nhìn riêng; GUI cũng ghi rõ khi dữ liệu đến từ DemoBus. Chính sự phân biệt này giúp đọc một mô hình đúng với bằng chứng đang có.','I am interested in the distance between what software requests and what a mechanism actually does. In the Damiao work, commands and feedback are inspected separately, and the GUI identifies DemoBus data. That distinction helps read a model against the evidence available.']},
    {id:'02',project:'smartwatch-vision-station',image:'vision-jig',tag:['QUAN SÁT / CƠ CẤU','OBSERVATION / MECHANISMS'],title:['Một góc nhìn làm thay đổi điều ta hiểu như thế nào?','How does a viewpoint change what we understand?'],text:['Một assembly không chỉ được hiểu qua phối cảnh đẹp nhất. Mặt trước, mặt bên và mặt bằng cho thấy quan hệ khác nhau giữa camera, sản phẩm và đồ gá. Tôi đặt các góc cùng một cấu hình cạnh trình tự mô phỏng để người xem có thể đối chiếu hình học với cách vận hành.','An assembly is understood through more than its best perspective. Front, side and plan views reveal different relationships between the camera, product and fixture. I place views of the same configuration beside the simulated sequence so geometry can be read against operation.']},
    {id:'03',project:'ros2-autonomous-vehicle',image:'car-bev',tag:['THỊ GIÁC / HÌNH HỌC','PERCEPTION / GEOMETRY'],title:['Làm sao để một đường trong ảnh trở nên có ý nghĩa?','When does a line in an image become meaningful?'],text:['Với xe tự hành, điều hấp dẫn nằm ở cách vùng làn trong ảnh được chuyển thành thông tin hình học có thể kiểm tra. IPM, centerline và telemetry mở ra nhiều lớp để quan sát cùng một tình huống. Dashboard là nơi các lớp này gặp nhau, trước khi bàn đến các kết quả cần đo trên xe thật.','In the vehicle work, I am drawn to how an image-space lane becomes inspectable geometric information. IPM, centre lines and telemetry offer different layers of the same situation. The dashboard brings them together before discussing results that require physical measurements.']}
  ];
  const project=slug=>window.PORTFOLIO.PROJECTS.find(p=>p.slug===slug);

  function noteMarkup(){return `<section class="field-notes" id="field-notes"><header><p class="eyebrow">02 / FIELD NOTES</p><h2>${L('Những câu hỏi<br>đi cùng công việc.','Questions that<br>stay with the work.')}</h2><p>${L('Ba ghi chú từ các dự án hiện có — cách tôi nhìn vào một hệ thống, các lớp dữ liệu và giới hạn của mô hình.','Three notes from existing projects: how I look at a system, its layers of information and the limits of a model.')}</p></header><div class="note-list">${notes.map((n,i)=>`<details class="field-note"${i===0?' open':''}><summary><span class="mono">${n.id}</span><span><span class="note-tag mono">${L(...n.tag)}</span><strong>${L(...n.title)}</strong></span><span class="note-plus" aria-hidden="true">+</span></summary><div class="note-body"><a class="note-image" href="#/work/${n.project}">${WorkshopMedia.image(n.image,{sizes:'(max-width:560px) calc(100vw - 44px), 520px'})}</a><div><p>${L(...n.text)}</p><a class="text-link" href="#/work/${n.project}">${esc(content(project(n.project).name))} <span aria-hidden="true">↗</span></a></div></div></details>`).join('')}</div></section>`;}

  function home(){return `<section class="research-door shell section"><div class="research-door-copy"><p class="eyebrow">01 / ROBOTICS, AUTOMATION & AI</p><h2>${L('Chuyển động bắt đầu từ <em>một câu hỏi.</em>','Motion begins with <em>a question.</em>')}</h2><p>${L('Tôi nhìn vào một hệ robot qua cơ cấu, phản hồi và cách nó nhận biết môi trường. Mỗi góc nhìn mở ra một câu hỏi để kiểm tra, hiểu rõ hơn và tiếp tục cải tiến.','I look at a robot through its mechanisms, feedback and perception. Each view opens a question to investigate, understand and refine.')}</p><a class="text-link" href="#/studio">${L('Khám phá Studio','Explore the Studio')} <span aria-hidden="true">↗</span></a><span class="research-door-foot mono">ACTUATION / MECHANISMS / PERCEPTION</span></div><div class="home-inquiries">${[
    ['arm','ACTUATION',L('Tư thế nào tạo nên chuyển động?','What gives motion its shape?')],
    ['cad','MECHANISMS',L('Điều gì diễn ra bên trong cơ cấu?','What happens inside a mechanism?')],
    ['vision','PERCEPTION',L('Robot nhìn thấy điều gì?','What does a robot see?')]
  ].map(([view,tag,q],i)=>`<a href="#/studio" data-studio-open="${view}"><span class="mono">0${i+1} / ${tag}</span><span>${q}</span><span aria-hidden="true">↗</span></a>`).join('')}</div></section>`;}
  function range(key,label,min,max,value,unit='°'){return `<label class="lab-range" for="lab-${key}"><span>${label}</span><output data-lab-output="${key}">${Math.round(value)}${unit}</output><input id="lab-${key}" data-lab-range="${key}" type="range" min="${min}" max="${max}" step="1" value="${value}" aria-valuetext="${Math.round(value)}${unit}"></label>`;}
  function cameraButtons(){return `<div class="lab-camera-actions"><button data-lab-orbit aria-pressed="${state.interactive}" data-lab-3d-action>${L('Xoay góc nhìn 3D','Orbit the 3D view')} <span aria-hidden="true">↗</span></button><button data-lab-camera-reset data-lab-3d-action>${L('Góc ban đầu','Reset view')} ↺</button></div>`;}
  function controls(){
    if(state.view==='arm')return `<p class="control-heading mono">ACTUATION / 3D CONCEPT</p><h2>${L('Điều khiển<br>tư thế.','Explore<br>the pose.')}</h2><p class="lab-control-intro">${L('Thay đổi ba khớp chính và quan sát đầu công tác trong không gian.','Change three principal joints and observe the tool in space.')}</p><div class="lab-joints">${range('q0',L('Đế xoay','Base yaw'),-90,90,state.pose[0])}${range('q1',L('Khớp vai','Shoulder'),-70,60,state.pose[1])}${range('q2',L('Khớp khuỷu','Elbow'),-120,80,state.pose[2])}</div><div class="lab-presets" role="group" aria-label="${L('Tư thế minh họa','Illustrative poses')}">${['home','reach','fold'].map((v,i)=>`<button data-lab-pose="${v}">${[L('Khởi đầu','Home'),L('Vươn','Reach'),L('Gập','Fold')][i]}</button>`).join('')}</div><div class="lab-tcp mono"><span>TCP / u</span><output data-lab-tcp>— / — / —</output></div><button class="button lab-play" data-lab-play data-lab-3d-action>${L('Chạy chu kỳ','Run cycle')} <span aria-hidden="true">▷</span></button>${cameraButtons()}<p class="lab-interaction-hint mono">${L('MẶC ĐỊNH TĨNH / CHẠY KHI BẠN CHỌN','STATIC BY DEFAULT / PLAY ON REQUEST')}</p>`;
    if(state.view==='cad')return `<p class="control-heading mono">MECHANISMS / CUTAWAY</p><h2>${L('Nhìn qua<br>lớp vỏ.','Beyond<br>the housing.')}</h2><p class="lab-control-intro">${L('Dịch mặt cắt để thấy quan hệ giữa vỏ, ổ bi, bánh răng và trục.','Move the section plane to inspect the housing, bearings, gears and shaft.')}</p>${range('cut',L('Vị trí mặt cắt vỏ','Housing section'),0,100,state.cut,'%')}<div class="lab-presets"><button data-lab-cut-preset="0">${L('Khối kín','Closed')}</button><button data-lab-cut-preset="62">${L('Mở mặt cắt','Cutaway')}</button></div><label class="lab-check"><input data-lab-explode type="checkbox"${state.explode?' checked':''}>${L('Tách các cụm theo trục','Explode along the shaft')}</label><ol class="lab-layer-list"><li><span class="mono">01</span>${L('Vỏ & nắp bảo vệ','Housing & covers')}</li><li><span class="mono">02</span>${L('Ổ bi & trục','Bearings & shaft')}</li><li><span class="mono">03</span>${L('Cặp bánh răng','Gear pair')}</li></ol>${cameraButtons()}`;
    return `<p class="control-heading mono">PERCEPTION / PROJECT ARCHIVE</p><h2>${L('Nhìn từ<br>phía robot.','From the<br>robot’s view.')}</h2><p class="lab-control-intro">${L('Một khung nhận diện đã ghi từ camera trên xe và phép chiếu mặt đường.','A recorded perception frame from the onboard camera and a ground-plane view.')}</p><div class="lab-vision-switch" role="group" aria-label="${L('Tư liệu thị giác','Perception material')}"><button data-lab-vision="camera" aria-pressed="${state.vision==='camera'}">${L('Camera trên xe','Onboard camera')}</button><button data-lab-vision="ipm" aria-pressed="${state.vision==='ipm'}">IPM / Bird’s-eye</button></div><label class="lab-check"><input data-lab-color type="checkbox"${state.color?' checked':''}>${L('Hiện màu gốc của lớp nhận diện','Show original perception colours')}</label><ol class="lab-layer-list vision-pipeline"><li><span class="mono">01</span>Camera input</li><li><span class="mono">02</span>Segmentation</li><li><span class="mono">03</span>IPM / Centerline</li><li><span class="mono">04</span>ROS2 / Telemetry</li></ol><p class="lab-interaction-hint mono">${L('ẢNH ĐÃ GHI / KHÔNG PHẢI CAMERA LIVE','RECORDED MATERIAL / NOT A LIVE CAMERA')}</p>`;
  }
  function footnote(){return state.view==='arm'?L('Mô hình hình học 3D minh họa với đơn vị quy ước; chưa xét động lực học, va chạm và giới hạn motor.','Illustrative 3D geometry in arbitrary units; dynamics, collisions and motor limits are not modelled.'):state.view==='cad'?L('Mô hình truyền động nguyên lý tự dựng, không phải CAD của DM4310. Các góc CAD dự án thật có trong case study Vision Station.','An original actuator concept, not DM4310 CAD. Actual project CAD views are available in the Vision Station case study.'):L('Trích khung camera từ ảnh dashboard dự án; màu và nhãn nhận diện đã có trong ảnh nguồn. Không chạy model AI hoặc kết nối camera trực tiếp trên trang này.','Camera viewport from the project dashboard capture; its perception labels and colours are part of the source image. This page does not run inference or connect to a live camera.');}
  function related(){return state.view==='cad'?'smartwatch-vision-station':state.view==='vision'?'ros2-autonomous-vehicle':'damiao-motor-control';}
  function visionMarkup(){
    const full=WorkshopMedia.media['car-dashboard'].variants.at(-1);
    return `<div class="vision-source-tag mono">${L('KHUNG ĐÃ GHI / CAMERA TRÊN XE','RECORDED FRAME / ONBOARD CAMERA')}</div><div class="camera-viewport"${state.vision!=='camera'?' hidden':''}><img src="${esc(full.src)}" width="${full.width}" height="${full.height}" alt="${L('Khung camera trên xe với lớp phân đoạn làn từ dashboard dự án ROS2.','Onboard camera viewport with lane segmentation from the ROS2 project dashboard.')}" decoding="async"></div><figure class="ipm-viewport"${state.vision!=='ipm'?' hidden':''}>${WorkshopMedia.image('car-bev',{sizes:'(max-width:560px) calc(100vw - 44px), 700px'})}</figure><div class="vision-view-caption mono">${state.vision==='camera'?'CAMERA → SEGMENTATION':'IMAGE → GROUND PLANE'}</div>`;
  }
  function page(){return `<div class="studio-page shell"><header class="studio-intro"><div><p class="eyebrow">ROBOTICS / AUTOMATION / AI</p><h1 tabindex="-1">${L('Hiểu một<br><em>hệ robot.</em>','Inside<br><em>a robot.</em>')}</h1></div><div class="studio-lead"><span class="edition-stamp mono">blueDStar<br>RESEARCH STUDIO</span><p>${L('Từ chuyển động khớp đến cấu trúc bên trong và góc nhìn của camera. Ba cách tiếp cận để đọc một hệ thống, mỗi lần tập trung vào một lớp.','From joint motion to internal mechanisms and the camera’s view. Three ways to read a system, one focused layer at a time.')}</p></div></header><section class="robotics-lab" aria-label="${L('Khám phá robot, cơ cấu và thị giác','Explore robotics, mechanisms and perception')}"><div class="lab-tabs" role="tablist" aria-label="${L('Góc nhìn nghiên cứu','Research perspectives')}">${views.map((v,i)=>`<button id="lab-tab-${v}" role="tab" data-lab-view="${v}" aria-selected="${state.view===v}" aria-controls="lab-panel" tabindex="${state.view===v?0:-1}"><span class="mono">0${i+1}</span>${viewLabel(v)}</button>`).join('')}</div><div id="lab-panel" class="lab-panel" role="tabpanel" aria-labelledby="lab-tab-${state.view}"><div class="lab-visual"><div id="lab-visual-3d"${state.view==='vision'?' hidden':''}><div class="lab-webgl" data-status="idle" aria-busy="true"></div><div class="lab-poster">${WorkshopMedia.image(state.view==='cad'?'vision-isometric':'damiao-gui',{sizes:'(max-width:560px) calc(100vw - 44px), 850px'})}<p class="mono" data-lab-loading>${L('Đang tải mô hình 3D…','Loading the 3D model…')}</p></div><div class="lab-view-label mono"><span>blueDStar / 3D CONCEPT</span><span data-lab-model-label>${state.view==='cad'?'ACTUATOR SECTION':'ARTICULATED ARM'}</span></div></div><div id="lab-visual-vision" class="lab-vision${state.color?' original-color':''}"${state.view!=='vision'?' hidden':''}>${state.view==='vision'?visionMarkup():''}</div></div><aside id="lab-controls" class="lab-controls">${controls()}</aside></div><div class="lab-footer"><p data-lab-footnote>${footnote()}</p><a data-lab-related class="text-link" href="#/work/${related()}">${L('Đọc dự án liên quan','Read the related project')} ↗</a></div><p class="lab-status mono" role="status" aria-live="polite"></p></section><section class="studio-method"><div><p class="eyebrow">THE QUESTION</p><h2>${L('Điều gì khiến<br>một hệ robot<br><em>đáng tin?</em>','What makes<br>a robotic system<br><em>trustworthy?</em>')}</h2></div><div><p>${L('Một chuyển động hợp lý cần nhiều hơn một hình mô phỏng đẹp. Cơ cấu phải phù hợp, phản hồi phải có thể đọc được, và nhận thức phải được đối chiếu với môi trường. Tôi quan tâm đến cách ba lớp này gặp nhau trong cùng một hệ thống.','A plausible motion takes more than a convincing simulation. The mechanism must fit the task, feedback must be inspectable and perception must be checked against the environment. I am interested in where these layers meet in one system.')}</p><p class="studio-method-small">${L('Tôi bắt đầu bằng câu hỏi, đối chiếu với tư liệu đang có, rồi xác định điều gì cần thử nghiệm tiếp.','I start with a question, compare it with the available evidence and identify the next experiment.')}</p><a href="#/work" class="text-link">${L('Đối chiếu qua các dự án','Explore the project evidence')} ↗</a></div></section>${noteMarkup()}<section class="studio-closing"><p class="mono">OBSERVE / QUESTION / BUILD / REFINE</p><h2>${L('Để ý tưởng<br>có thể <em>chạm tới.</em>','Making ideas<br><em>tangible.</em>')}</h2><a href="#/contact" class="button light">${L('Trao đổi một ý tưởng','Start a conversation')} ↗</a></section></div>`;}
  function updatePoseUI({pose,tcp}){
    state.pose=pose;
    if(!root||state.view!=='arm')return;
    pose.forEach((value,i)=>{const input=$(`[data-lab-range="q${i}"]`,root),out=$(`[data-lab-output="q${i}"]`,root);if(input){input.value=value;input.setAttribute('aria-valuetext',Math.round(value)+'°');out.textContent=Math.round(value)+'°';}});
    const out=$('[data-lab-tcp]',root);if(out)out.textContent=tcp.map(n=>n.toFixed(2)).join(' / ');
  }
  function syncButtons(){if(!root)return;$$('[data-lab-3d-action]',root).forEach(b=>b.disabled=!model||$('.lab-webgl',root).dataset.status!=='ready');const b=$('[data-lab-play]',root);if(b)b.innerHTML=(state.playing?L('Tạm dừng','Pause'):L('Chạy chu kỳ','Run cycle'))+` <span aria-hidden="true">${state.playing?'Ⅱ':'▷'}</span>`;const orbit=$('[data-lab-orbit]',root);if(orbit)orbit.setAttribute('aria-pressed',state.interactive);}
  function stopAnimation(){state.playing=false;model?.setPlaying(false);syncButtons();}
  function fail3D(host){
    host.dataset.status='failed';host.setAttribute('aria-busy','false');
    const text=L('Thiết bị chưa mở được WebGL 2. Bạn vẫn có thể xem tư liệu dự án và mục Thị giác.','WebGL 2 is unavailable on this device. Project media and the Perception view remain available.');
    if(root){$('[data-lab-loading]',root).textContent=text;$('.lab-status',root).textContent=text;}
    syncButtons();
  }
  async function load3D(){
    if(!root||model||pending||state.view==='vision')return;
    const id=mountID,host=$('.lab-webgl',root);host.dataset.status='loading';
    pending=(async()=>{try{
      modulePromise ||= import('./robotics-lab.js');const module=await modulePromise;
      if(id!==mountID||!host.isConnected)return;
      model=module.createLab(host,state,{canvasLabel:L('Mô hình 3D robot minh họa. Bật xoay góc nhìn để kéo mô hình.','Illustrative 3D robot. Enable orbit to rotate the view.'),onPose:updatePoseUI,onContextLost:()=>{if(id===mountID){stopAnimation();fail3D(host);}}});
      model.setView(state.view==='vision'?'arm':state.view);model.setInteractive(state.interactive);
      host.dataset.status='ready';host.setAttribute('aria-busy','false');syncButtons();
    }catch(error){if(id===mountID){model=null;fail3D(host);}}finally{if(id===mountID)pending=null;}})();
  }
  function setView(view,focus=false){
    if(!views.includes(view))return;state.view=view;stopAnimation();state.interactive=false;
    if(!root)return;
    $$('[data-lab-view]',root).forEach(b=>{const selected=b.dataset.labView===view;b.setAttribute('aria-selected',selected);b.tabIndex=selected?0:-1;});
    $('#lab-panel',root).setAttribute('aria-labelledby','lab-tab-'+view);
    $('#lab-visual-3d',root).hidden=view==='vision';$('#lab-visual-vision',root).hidden=view!=='vision';
    if(view==='vision'&&!$('#lab-visual-vision',root).children.length)$('#lab-visual-vision',root).innerHTML=visionMarkup();
    $('#lab-controls',root).innerHTML=controls();$('[data-lab-footnote]',root).textContent=footnote();$('[data-lab-related]',root).href='#/work/'+related();
    $('[data-lab-model-label]',root).textContent=view==='cad'?'ACTUATOR SECTION':'ARTICULATED ARM';$('.lab-status',root).textContent='';
    if(model){model.setInteractive(false);if(view!=='vision')model.setView(view);if(view==='arm')model.updateArm(state.pose);}else load3D();
    syncButtons();if(focus)$(`[data-lab-view="${view}"]`,root).focus({preventScroll:true});
  }
  function cleanup(){mountID++;model?.dispose();model=null;pending=null;root=null;sectionObserver?.disconnect();state.playing=false;state.interactive=false;}
  function decorateCase(){
    const root=$('.documented-case');if(!root)return;
    const defs=[['.case-summary',L('Tổng quan','Overview')],['.system-section',L('Phương pháp','Approach')],['.mechanism-section',L('Góc nhìn','Views')],['.story-chapter',L('Tư liệu','Media')],['.case-scope',L('Phạm vi','Scope')]];
    const sections=defs.map(([selector,name])=>({el:$(selector,root),name})).filter(x=>x.el);
    const nav=document.createElement('nav');nav.className='case-reading-nav';nav.setAttribute('aria-label',L('Các phần của dự án','Project sections'));
    nav.innerHTML=`<span class="mono">READING / ${String(window.PORTFOLIO.PROJECTS.findIndex(p=>location.hash.endsWith(p.slug))+1).padStart(2,'0')}</span>`+sections.map((x,i)=>`<button data-case-read="case-part-${i}"${i===0?' aria-current="true"':''}>${x.name}</button>`).join('');
    sections.forEach((x,i)=>x.el.id='case-part-'+i);root.insertBefore(nav,$('.case-summary',root));
    sectionObserver=new IntersectionObserver(entries=>{for(const en of entries)if(en.isIntersecting)$$('[data-case-read]',nav).forEach(b=>{if(b.dataset.caseRead===en.target.id)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current');});},{rootMargin:'-140px 0px -45% 0px',threshold:0});
    sections.forEach(x=>sectionObserver.observe(x.el));
  }

  function mount(){decorateCase();root=$('.robotics-lab');if(root){syncButtons();load3D();}}
  const normalize=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d');
  let searchOpener=null;
  function results(){
    const dialog=$('#search-dialog'),input=$('#archive-query'),query=normalize(input.value.trim()),parts=query.split(/\s+/).filter(Boolean);
    const pages=[['/studio','Studio',L('Robot 3D, cơ cấu & thị giác','3D robot, mechanisms & perception')],['/about',L('Giới thiệu','About'),L('Hồ sơ, học vấn & công cụ','Profile, education & tools')],['/experience',L('Kinh nghiệm','Experience'),'LYK / Hilykan · DAT Group'],['/work',L('Tất cả dự án','All projects'),'Robotics / Embedded / CAD'],['/contact',L('Liên hệ','Contact'),'Email / GitHub / LinkedIn']];
    const items=[...pages.map(([route,title,detail])=>({route,title,detail})),...window.PORTFOLIO.PROJECTS.map(p=>({route:'/work/'+p.slug,title:content(p.name),detail:content(p.subtitle)+' · '+p.tech.join(' / ')}))];
    const matched=items.filter(x=>parts.every(p=>normalize(x.title+' '+x.detail).includes(p)));
    $('.archive-results',dialog).innerHTML=matched.map((x,i)=>`<li><a href="#${x.route}"><span class="mono">${String(i+1).padStart(2,'0')}</span><span><strong>${esc(x.title)}</strong><small>${esc(x.detail)}</small></span><span aria-hidden="true">↗</span></a></li>`).join('');
    $('.archive-status',dialog).textContent=matched.length?`${matched.length} ${L('kết quả / ↑ ↓ để di chuyển / Enter để mở','results / ↑ ↓ to navigate / Enter to open')}`:L('Chưa tìm thấy. Thử tên dự án hoặc công nghệ.','No matches. Try a project name or technology.');
  }
  function refreshSearch(){
    const dialog=$('#search-dialog');if(!dialog)return;
    $('#archive-title').textContent=L('Tìm trong sổ tay.','Explore the archive.');
    $('#archive-query').placeholder=L('Tên dự án, công nghệ hoặc trang…','Project, technology or page…');
    $('#archive-query').setAttribute('aria-label',L('Tìm dự án hoặc công nghệ','Search projects or technologies'));
    $('[data-search-close]',dialog).textContent=L('Đóng','Close')+' ×';if(dialog.open)results();
  }
  function openSearch(opener){
    searchOpener=opener||document.activeElement;refreshSearch();const d=$('#search-dialog');d.showModal();$('#archive-query').value='';results();$('#archive-query').focus();
  }

  document.addEventListener('click',event=>{
    const opener=event.target.closest?.('[data-studio-open]');if(opener)state.view=opener.dataset.studioOpen;
    const b=event.target.closest?.('button');
    if(b?.matches('[data-search-open]')){openSearch(b);return;}
    if(b?.matches('[data-search-close]')){$('#search-dialog').close();return;}
    if(event.target.closest?.('.archive-results a'))$('#search-dialog').close();
    if(b?.matches('[data-case-read]')){$('#'+b.dataset.caseRead)?.scrollIntoView({behavior:reduced()?'instant':'smooth',block:'start'});return;}
    if(!root||!b)return;
    if(b.matches('[data-lab-view]')){setView(b.dataset.labView);return;}
    if(b.matches('[data-lab-pose]')){stopAnimation();state.pose={home:[-24,-28,-68],reach:[12,-55,-26],fold:[-45,20,-118]}[b.dataset.labPose];model?.updateArm(state.pose);if(!model)updatePoseUI({pose:state.pose,tcp:[0,0,0]});}
    if(b.matches('[data-lab-play]')&&model){state.playing=!state.playing;model.setPlaying(state.playing);syncButtons();}
    if(b.matches('[data-lab-orbit]')&&model){state.interactive=!state.interactive;model.setInteractive(state.interactive);syncButtons();$('.lab-status',root).textContent=state.interactive?L('Kéo để xoay, dùng hai ngón để phóng to. Tắt Xoay để tiếp tục cuộn trên mô hình.','Drag to orbit; pinch to zoom. Disable orbit to scroll over the model.'):'';}
    if(b.matches('[data-lab-camera-reset]'))model?.resetCamera();
    if(b.matches('[data-lab-cut-preset]')){state.cut=Number(b.dataset.labCutPreset);model?.setSection(state.cut);const r=$('[data-lab-range="cut"]',root);r.value=state.cut;r.dispatchEvent(new Event('input',{bubbles:true}));}
    if(b.matches('[data-lab-vision]')){state.vision=b.dataset.labVision;$('#lab-visual-vision',root).innerHTML=visionMarkup();$$('[data-lab-vision]',root).forEach(x=>x.setAttribute('aria-pressed',x.dataset.labVision===state.vision));}
  });
  document.addEventListener('input',event=>{
    if(event.target.matches('#archive-query')){results();return;}
    if(!root)return;
    const el=event.target;
    if(el.matches('[data-lab-range]')){const key=el.dataset.labRange,value=Number(el.value),unit=key==='cut'?'%':'°';$(`[data-lab-output="${key}"]`,root).textContent=value+unit;el.setAttribute('aria-valuetext',value+unit);if(key==='cut'){state.cut=value;model?.setSection(value);}else{stopAnimation();state.pose[Number(key.slice(1))]=value;model?.updateArm(state.pose);}}
    if(el.matches('[data-lab-explode]')){state.explode=el.checked?1:0;model?.setExplode(state.explode);}
    if(el.matches('[data-lab-color]')){state.color=el.checked;$('#lab-visual-vision',root).classList.toggle('original-color',state.color);}
  });
  document.addEventListener('keydown',event=>{
    const tab=event.target.closest?.('[data-lab-view]');if(!tab)return;
    let index=views.indexOf(tab.dataset.labView);
    if(event.key==='ArrowRight')index=(index+1)%views.length;else if(event.key==='ArrowLeft')index=(index+views.length-1)%views.length;else if(event.key==='Home')index=0;else if(event.key==='End')index=2;else return;
    event.preventDefault();setView(views[index],true);
  });
  document.addEventListener('keydown',event=>{
    const d=$('#search-dialog');if(!d)return;
    if(d.open){
      if(event.key==='Escape'){event.preventDefault();event.stopImmediatePropagation();d.close();return;}
      const items=$$('.archive-results a',d),i=items.indexOf(document.activeElement);
      if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();items[(i+(event.key==='ArrowDown'?1:-1)+items.length)%items.length]?.focus();}
      if(event.key==='Enter'&&document.activeElement===$('#archive-query')){event.preventDefault();items[0]?.click();}
      return;
    }
    const typing=event.target.closest?.('input,textarea,select,[contenteditable=true]');
    if(!typing&&!$('dialog[open]')&&(event.key==='/'||((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'))){event.preventDefault();openSearch();}
  });

  document.addEventListener('DOMContentLoaded',()=>$('#search-dialog').addEventListener('close',()=>searchOpener?.isConnected&&searchOpener.focus({preventScroll:true})),{once:true});
  matchMedia('(prefers-reduced-motion:reduce)').addEventListener('change',event=>{if(event.matches)stopAnimation();});
  return {configure(options){language=options.language;reduced=options.reduced;refreshSearch();},home,page,mount,cleanup,refreshSearch,snapshot:()=>({view:state.view,pose:[...state.pose],cut:state.cut,explode:state.explode,playing:state.playing,vision:state.vision,color:state.color,model:model?.snapshot()||null})};
})();
