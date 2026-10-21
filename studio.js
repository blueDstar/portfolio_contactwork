/* Original motion study: planar 2R inverse kinematics, SVG drawing and archive search.
   This is a conceptual web instrument, independent of project hardware or measurements. */
window.ResearchStudio = (() => {
  'use strict';
  const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let language=()=>document.documentElement.lang,reduced=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
  const L=(vi,en)=>language()==='vi'?vi:en;
  const content=v=>typeof v==='object'?v[language()]||v.vi:v;
  const source='https://www.mathworks.com/help/symbolic/derive-and-apply-inverse-kinematics-to-robot-arm.html';
  const state={pattern:'lissajous',phase:.12,playing:false,construction:true,manual:[],point:null};
  let initialized=false,frame=0,last=0,visible=false,stage=null,stageObserver=null,sectionObserver=null,drag=null;
  let traceArc=[0],traceLength=1;
  const labels={lissajous:'Lissajous',orbit:()=>L('Quỹ đạo','Orbit'),petal:()=>L('Cánh hoa','Petal'),manual:()=>L('Nét của bạn','Your gesture')};
  const label=id=>typeof labels[id]==='function'?labels[id]():labels[id];
  const notes=[
    {id:'01',project:'damiao-motor-control',image:'damiao-gui',tag:['PHẢN HỒI / TRUYỀN ĐỘNG','FEEDBACK / ACTUATION'],title:['Một lệnh gửi đi đã là một chuyển động?','Does a command mean a movement?'],text:['Tôi quan tâm đến khoảng cách giữa điều phần mềm yêu cầu và điều cơ cấu thực sự thực hiện. Ở Damiao, luồng lệnh và luồng feedback được nhìn riêng; GUI cũng ghi rõ khi dữ liệu đến từ DemoBus. Chính sự phân biệt này giúp đọc một mô hình đúng với bằng chứng đang có.','I am interested in the distance between what software requests and what a mechanism actually does. In the Damiao work, commands and feedback are inspected separately, and the GUI identifies DemoBus data. That distinction helps read a model against the evidence available.']},
    {id:'02',project:'smartwatch-vision-station',image:'vision-jig',tag:['QUAN SÁT / CƠ CẤU','OBSERVATION / MECHANISMS'],title:['Một góc nhìn làm thay đổi điều ta hiểu như thế nào?','How does a viewpoint change what we understand?'],text:['Một assembly không chỉ được hiểu qua phối cảnh đẹp nhất. Mặt trước, mặt bên và mặt bằng cho thấy quan hệ khác nhau giữa camera, sản phẩm và đồ gá. Tôi đặt các góc cùng một cấu hình cạnh trình tự mô phỏng để người xem có thể đối chiếu hình học với cách vận hành.','An assembly is understood through more than its best perspective. Front, side and plan views reveal different relationships between the camera, product and fixture. I place views of the same configuration beside the simulated sequence so geometry can be read against operation.']},
    {id:'03',project:'ros2-autonomous-vehicle',image:'car-bev',tag:['THỊ GIÁC / HÌNH HỌC','PERCEPTION / GEOMETRY'],title:['Làm sao để một đường trong ảnh trở nên có ý nghĩa?','When does a line in an image become meaningful?'],text:['Với xe tự hành, điều hấp dẫn nằm ở cách vùng làn trong ảnh được chuyển thành thông tin hình học có thể kiểm tra. IPM, centerline và telemetry mở ra nhiều lớp để quan sát cùng một tình huống. Dashboard là nơi các lớp này gặp nhau, trước khi bàn đến các kết quả cần đo trên xe thật.','In the vehicle work, I am drawn to how an image-space lane becomes inspectable geometric information. IPM, centre lines and telemetry offer different layers of the same situation. The dashboard brings them together before discussing results that require physical measurements.']}
  ];
  const project=slug=>window.PORTFOLIO.PROJECTS.find(p=>p.slug===slug);
  function projectPoint(x,y){
    let r=Math.hypot(x,y),clamped=r<18.5||r>216;
    if(r<.001){x=18.5;y=0;r=18.5;}
    const k=Math.min(216,Math.max(18.5,r))/r;
    return {x:x*k,y:y*k,clamped};
  }
  function inverse(x,y){
    const p=projectPoint(x,y),a=118,b=100;
    const q2=Math.acos(Math.max(-1,Math.min(1,(p.x*p.x+p.y*p.y-a*a-b*b)/(2*a*b))));
    const q1=Math.atan2(p.y,p.x)-Math.atan2(b*Math.sin(q2),a+b*Math.cos(q2));
    return {...p,q1,q2,elbow:{x:a*Math.cos(q1),y:a*Math.sin(q1)}};
  }
  function sample(phase,pattern=state.pattern){
    const t=phase*Math.PI*2;
    if(pattern==='orbit')return projectPoint(85+65*Math.cos(t),-20+65*Math.sin(t));
    if(pattern==='petal'){const r=70+45*Math.cos(5*t);return projectPoint(50+r*Math.cos(t),-5+r*Math.sin(t));}
    return projectPoint(45+108*Math.sin(2*t),-15+95*Math.sin(3*t));
  }
  function points(){return state.pattern==='manual'?state.manual:Array.from({length:481},(_,i)=>sample(i/480));}
  const path=pts=>pts.map((p,i)=>(i?'L':'M')+(400+p.x).toFixed(2)+','+(270-p.y).toFixed(2)).join(' ');
  function sheetGraphic(){
    const p=Array.from({length:481},(_,i)=>sample(i/480,'petal'));
    return `<svg viewBox="0 0 800 520" aria-hidden="true"><defs><pattern id="teaser-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="currentColor" opacity=".08"/></pattern></defs><rect width="800" height="520" fill="url(#teaser-grid)"/><circle cx="400" cy="270" r="218" fill="none" stroke="currentColor" opacity=".15" stroke-dasharray="3 8"/><path class="teaser-drawing" d="${path(p)}" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M400 270L340 168L477 233" stroke="currentColor" fill="none" stroke-width="8" stroke-linecap="round"/><g fill="#f3f0e9" stroke="currentColor" stroke-width="2"><circle cx="400" cy="270" r="10"/><circle cx="340" cy="168" r="9"/><circle cx="477" cy="233" r="7"/></g><path d="M35 50H110M35 50V100M765 470H690M765 470V420" fill="none" stroke="currentColor" opacity=".4"/><text x="40" y="465" font-family="monospace" font-size="12" fill="currentColor">2R / MOTION STUDY</text></svg>`;
  }
  function home(){return `<section class="research-door shell section"><div class="research-door-copy"><p class="eyebrow">01 / ${L('HÌNH HỌC, CHUYỂN ĐỘNG & CẢM NHẬN','GEOMETRY, MOTION & PERCEPTION')}</p><h2>${L('Chuyển động bắt đầu từ <em>một câu hỏi.</em>','Motion begins with <em>a question.</em>')}</h2><p>${L('Tôi tìm sự rõ ràng trong cơ cấu, tín hiệu và những thử nghiệm nhỏ. Với tôi, kỹ thuật cũng là một cách quan sát, tạo hình và làm cho ý tưởng trở nên hữu hình.','I look for clarity in mechanisms, signals and small experiments. Engineering is also a way to observe, give form and make an idea tangible.')}</p><a class="text-link" href="#/studio">${L('Bước vào Studio','Enter the Studio')} <span aria-hidden="true">↗</span></a><span class="research-door-foot mono">ROBOTICS R&D × CREATIVE EXPLORATION</span></div><a href="#/studio" class="research-door-plate" aria-label="${L('Khám phá thí nghiệm vẽ bằng cơ cấu hai khớp','Explore a two-joint drawing experiment')}"><div class="plate-top mono"><span>blueDStar / STUDY 001</span><span>↗</span></div>${sheetGraphic()}<div class="plate-bottom mono"><span>${L('Một cơ cấu. Vô số nét vẽ.','One mechanism. Many gestures.')}</span><span>${L('KHÁM PHÁ','EXPLORE')} →</span></div></a></section>`;}
  function noteMarkup(){return `<section class="field-notes" id="field-notes"><header><p class="eyebrow">02 / FIELD NOTES</p><h2>${L('Những câu hỏi<br>đi cùng công việc.','Questions that<br>stay with the work.')}</h2><p>${L('Ba ghi chú từ các dự án hiện có — cách tôi nhìn vào một hệ thống, các lớp dữ liệu và giới hạn của mô hình.','Three notes from existing projects: how I look at a system, its layers of information and the limits of a model.')}</p></header><div class="note-list">${notes.map((n,i)=>`<details class="field-note"${i===0?' open':''}><summary><span class="mono">${n.id}</span><span><span class="note-tag mono">${L(...n.tag)}</span><strong>${L(...n.title)}</strong></span><span class="note-plus" aria-hidden="true">+</span></summary><div class="note-body"><a class="note-image" href="#/work/${n.project}">${WorkshopMedia.image(n.image,{sizes:'(max-width:560px) calc(100vw - 44px), 520px'})}</a><div><p>${L(...n.text)}</p><a class="text-link" href="#/work/${n.project}">${esc(content(project(n.project).name))} <span aria-hidden="true">↗</span></a></div></div></details>`).join('')}</div></section>`;}
  function page(){
    const current=state.pattern==='manual'?state.point||{x:130,y:20}:sample(state.phase);
    const initial=inverse(current.x,current.y);
    return `<div class="studio-page shell"><header class="studio-intro"><div><p class="eyebrow">RESEARCH × FORM / blueDStar</p><h1 tabindex="-1">${L('Nét vẽ của<br><em>chuyển động.</em>','The shape<br><em>of motion.</em>')}</h1></div><div class="studio-lead"><span class="edition-stamp mono">STUDY 001<br>PLANAR / 2R</span><p>${L('Chọn một đường cong, kéo điểm bút và quan sát hai khớp tìm tư thế. Một thí nghiệm nhỏ về cách hình học trở thành chuyển động — và chuyển động để lại một nét vẽ.','Choose a curve, move the pen and watch two joints find their pose. A small experiment in geometry becoming motion, and motion leaving a mark.')}</p></div></header><section class="motion-instrument" aria-label="${L('Thí nghiệm động học hai khớp','Two-joint kinematic experiment')}"><div class="instrument-top"><p class="mono">01 / ${L('TỪ ĐIỂM ĐẾN CƠ CẤU','FROM POINT TO MECHANISM')}</p><span class="instrument-badge mono">${L('MÔ HÌNH HÌNH HỌC','GEOMETRIC MODEL')}</span></div><div class="instrument-grid"><div class="motion-paper"><div class="motion-stage" tabindex="0" role="group" aria-label="${L('Bản vẽ tương tác. Kéo điểm bút hoặc dùng các phím mũi tên để di chuyển.','Interactive drawing. Drag the pen point or use arrow keys to move it.')}"><svg viewBox="0 0 800 520" role="img" aria-labelledby="motion-title motion-description"><title id="motion-title">${L('Tay máy phẳng hai khớp vẽ đường cong','A planar two-joint arm traces a curve')}</title><desc id="motion-description">${L('Điểm bút được tính bằng động học nghịch, trong vùng với tới của hai thanh dài 118 và 100 đơn vị minh họa.','The pen pose is solved using inverse kinematics within the reach of links of 118 and 100 illustrative units.')}</desc><defs><pattern id="motion-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#252525" opacity=".08" stroke-width=".6"/></pattern></defs><rect width="800" height="520" fill="url(#motion-grid)"/><g class="construction-lines" fill="none" stroke="#252525" stroke-width=".7" opacity=".3"><path d="M70 270H730M400 35V500"/><circle cx="400" cy="270" r="218" stroke-dasharray="3 7"/><circle cx="400" cy="270" r="18"/><circle cx="400" cy="270" r="118" stroke-dasharray="2 9"/></g><g class="paper-labels" fill="#666" font-family="monospace" font-size="10"><text x="720" y="256">X</text><text x="413" y="48">Y</text><text x="425" y="291">O</text><text x="30" y="40">L₁ = 118 u</text><text x="30" y="58">L₂ = 100 u</text><text x="30" y="495">blueDStar / GEOMETRIC STUDY</text></g><path class="motion-guide" d="${path(points())}" fill="none" stroke="#252525" stroke-opacity=".13" stroke-width="1"/><path class="motion-trace" pathLength="1" d="${path(points())}" fill="none" stroke="#333" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><g class="motion-arm" fill="none" stroke="#171717" stroke-linecap="round"><path class="arm-shadow" stroke-opacity=".08" stroke-width="19"/><path class="arm-links" stroke-width="8"/><g fill="#f3f0e9" stroke-width="2"><circle class="base-joint" cx="400" cy="270" r="10"/><circle class="elbow-joint" r="8"/></g><circle class="pen-ring" r="16" stroke-width=".8" stroke-dasharray="2 4"/><circle class="pen-dot" r="4" fill="#171717" stroke="none"/><circle class="pen-handle" data-pen-handle r="23" fill="transparent" stroke="none"/></g></svg></div><div class="paper-caption"><span class="mono">${L('KÉO ĐIỂM BÚT / THỬ CÁC ĐƯỜNG CONG','DRAG THE PEN / EXPLORE THE CURVES')}</span><span class="pen-coordinate mono"></span></div></div><aside class="instrument-controls"><div><p class="control-heading mono">${L('CHỌN NÉT VẼ','CHOOSE A GESTURE')}</p><div class="pattern-options">${['lissajous','orbit','petal'].map((id,i)=>`<button data-pattern="${id}" aria-pressed="${state.pattern===id}"><span class="mono">0${i+1}</span>${label(id)}<span aria-hidden="true">↗</span></button>`).join('')}</div></div><div class="instrument-sliders"><label for="motion-phase">${L('Vị trí trên đường cong','Position on the curve')}<output data-phase-output>${Math.round(state.phase*100)}%</output></label><input id="motion-phase" data-motion-phase type="range" min="0" max="1000" step="1" value="${Math.round(state.phase*1000)}"${state.pattern==='manual'?' disabled':''}><label class="construction-toggle"><input type="checkbox" data-construction${state.construction?' checked':''}>${L('Hiện đường dựng hình','Show construction lines')}</label></div><dl class="joint-readouts"><div><dt>θ₁</dt><dd data-joint="1">${(initial.q1*180/Math.PI).toFixed(1)}°</dd></div><div><dt>θ₂</dt><dd data-joint="2">${(initial.q2*180/Math.PI).toFixed(1)}°</dd></div></dl><div class="instrument-actions"><button data-motion-play class="button">${state.playing?L('Tạm dừng','Pause'):L('Chuyển động','Animate')}<span aria-hidden="true">${state.playing?'Ⅱ':'▷'}</span></button><button data-motion-reset class="text-link">${L('Đặt lại','Reset')} <span aria-hidden="true">↺</span></button><button data-motion-export class="text-link">${L('Lưu nét vẽ SVG','Save drawing as SVG')} <span aria-hidden="true">↓</span></button></div><p class="instrument-status mono" aria-live="polite" id="studio-feedback"></p></aside></div><div class="instrument-footnote"><p>${L('Thí nghiệm tương tác trên web với đơn vị hình học minh họa. Đây không phải dữ liệu đo hoặc phần mềm điều khiển robot thật.','An interactive web study using illustrative geometric units. This is not measured data or a controller for physical hardware.')}</p><a href="${source}" target="_blank" rel="noopener noreferrer">${L('Nguyên lý động học','Kinematics reference')} ↗</a></div></section><section class="studio-method"><div><p class="eyebrow">THE QUESTION</p><h2>${L('Một điểm.<br>Hai góc.<br><em>Một nét riêng.</em>','One point.<br>Two angles.<br><em>A singular gesture.</em>')}</h2></div><div><p>${L('Bản vẽ bắt đầu từ vị trí đầu bút. Động học nghịch tìm hai góc khớp để đặt đầu bút ở đó. Khi điểm đặt đi qua một đường cong, những thanh liên kết phối hợp để tạo ra cùng một nét từ những chuyển động rất khác nhau.','The drawing starts with a pen position. Inverse kinematics finds two joint angles that place the pen there. As the target follows a curve, the links coordinate different joint motions to produce one continuous mark.')}</p><div class="kinematic-formula mono">x = L₁ cos θ₁ + L₂ cos(θ₁ + θ₂)<br>y = L₁ sin θ₁ + L₂ sin(θ₁ + θ₂)</div><p class="studio-method-small">${L('Kéo điểm ra ngoài vùng với tới sẽ đưa nó về biên hình học. Mô hình chưa xét động lực học, va chạm hoặc giới hạn của motor.','Points outside the reachable area are projected to its boundary. The model does not include dynamics, collisions or motor limits.')}</p><a href="#/work/damiao-motor-control" class="text-link">${L('Đọc dự án điều khiển Damiao','Read the Damiao control project')} <span aria-hidden="true">↗</span></a></div></section>${noteMarkup()}<section class="studio-closing"><p class="mono">OBSERVE / QUESTION / BUILD / REFINE</p><h2>${L('Để ý tưởng<br>có thể <em>chạm tới.</em>','Making ideas<br><em>tangible.</em>')}</h2><a href="#/contact" class="button light">${L('Trao đổi một ý tưởng','Start a conversation')} ↗</a></section></div>`;
  }
  function draw(){
    if(!stage)return;
    const p=state.pattern==='manual'?state.point||{x:130,y:20}:sample(state.phase),pose=inverse(p.x,p.y);
    const x=400+pose.x,y=270-pose.y,ex=400+pose.elbow.x,ey=270-pose.elbow.y;
    $('.arm-links',stage).setAttribute('d',`M400 270L${ex} ${ey}L${x} ${y}`);
    $('.arm-shadow',stage).setAttribute('d',`M404 275L${ex+4} ${ey+5}L${x+4} ${y+5}`);
    for(const sel of ['.pen-ring','.pen-dot','.pen-handle']){$(sel,stage).setAttribute('cx',x);$(sel,stage).setAttribute('cy',y);}
    $('.elbow-joint',stage).setAttribute('cx',ex);$('.elbow-joint',stage).setAttribute('cy',ey);
    $('[data-joint="1"]').textContent=(pose.q1*180/Math.PI).toFixed(1)+'°';$('[data-joint="2"]').textContent=(pose.q2*180/Math.PI).toFixed(1)+'°';
    $('.pen-coordinate').textContent=`X ${pose.x.toFixed(1)} / Y ${pose.y.toFixed(1)} u`;
    $('[data-phase-output]').textContent=Math.round(state.phase*100)+'%';$('[data-motion-phase]').value=Math.round(state.phase*1000);
    $('[data-motion-phase]').setAttribute('aria-valuetext',Math.round(state.phase*100)+'%');
    stage.dataset.x=pose.x;stage.dataset.y=pose.y;stage.dataset.q1=pose.q1;stage.dataset.q2=pose.q2;
    stage.dataset.pattern=state.pattern;stage.dataset.playing=String(state.playing);
    const at=state.phase*(traceArc.length-1),i=Math.floor(at),distance=traceArc[i]+((traceArc[i+1]??traceArc[i])-traceArc[i])*(at-i);
    $('.motion-trace',stage).style.strokeDashoffset=state.pattern==='manual'?'0':String(1-distance/traceLength);
  }
  function sync(){
    if(!stage)return;
    $$('[data-pattern]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.pattern===state.pattern)));
    $('[data-motion-phase]').disabled=state.pattern==='manual';
    $('[data-motion-play]').disabled=state.pattern==='manual';
    $('[data-motion-play]').innerHTML=(state.playing?L('Tạm dừng','Pause'):L('Chuyển động','Animate'))+`<span aria-hidden="true">${state.playing?'Ⅱ':'▷'}</span>`;
    const pts=points();traceArc=[0];
    for(let i=1;i<pts.length;i++)traceArc.push(traceArc[i-1]+Math.hypot(pts[i].x-pts[i-1].x,pts[i].y-pts[i-1].y));
    traceLength=traceArc.at(-1)||1;
    $('.motion-trace',stage).setAttribute('d',path(pts));
    $('.motion-trace',stage).style.strokeDasharray=state.pattern==='manual'?'none':'1';
    $('.motion-guide',stage).setAttribute('d',state.pattern==='manual'?'':path(points()));
    $('.construction-lines',stage).style.display=state.construction?'':'none';
    $('[data-construction]').checked=state.construction;
    $('#studio-feedback').textContent=state.pattern==='manual'?L('NÉT CỦA BẠN / KÉO ĐỂ VẼ','YOUR GESTURE / DRAG TO DRAW'):label(state.pattern)+' / '+(state.playing?L('ĐANG VẼ','DRAWING'):L('TẠM DỪNG','PAUSED'));
    draw();
  }
  function loop(now){
    frame=0;if(!stage||!visible||document.hidden||!state.playing)return;
    if(!last)last=now;
    if(now-last>=30){state.phase=(state.phase+Math.min(now-last,80)/22000)%1;last=now;draw();}
    frame=requestAnimationFrame(loop);
  }
  function play(){cancelAnimationFrame(frame);frame=0;last=0;if(state.playing&&visible&&!document.hidden)frame=requestAnimationFrame(loop);}
  function movePoint(x,y){
    const p=projectPoint(x,y);state.pattern='manual';state.playing=false;state.point=p;
    const prev=state.manual.at(-1);if(!prev||Math.hypot(prev.x-p.x,prev.y-p.y)>1){state.manual.push(p);if(state.manual.length>1200)state.manual.shift();}
    sync();play();
    if(p.clamped)$('#studio-feedback').textContent=L('ĐIỂM ĐƯỢC GIỚI HẠN TRONG VÙNG VỚI TỚI','POINT LIMITED TO THE REACHABLE AREA');
  }
  function eventPoint(event){const svg=$('svg',stage),m=svg.getScreenCTM().inverse();const p=new DOMPoint(event.clientX,event.clientY).matrixTransform(m);return {x:p.x-400,y:270-p.y};}
  function exportSVG(){
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1040" viewBox="0 0 800 520"><title>blueDStar — ${label(state.pattern)}</title><desc>Original web motion study. Planar 2R geometric model, not physical robot measurements.</desc><rect width="800" height="520" fill="#f3f0e9"/><path d="${path(points())}" fill="none" stroke="#171717" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><text x="30" y="485" font-family="monospace" font-size="11" fill="#444">blueDStar / MOTION STUDY / ${esc(label(state.pattern))}</text></svg>`;
  }
  function cleanup(){cancelAnimationFrame(frame);frame=0;last=0;stageObserver?.disconnect();sectionObserver?.disconnect();stage=null;visible=false;drag=null;}
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
  function mount(){
    decorateCase();stage=$('.motion-stage');if(!stage)return;
    if(!initialized){state.playing=!reduced();initialized=true;}
    sync();
    stageObserver=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;play();},{threshold:.05});stageObserver.observe(stage);
    stage.addEventListener('pointerdown',event=>{
      const direct=event.pointerType!=='touch'||!!event.target.closest('[data-pen-handle]');
      drag={id:event.pointerId,startX:event.clientX,startY:event.clientY,direct};
      if(direct){stage.setPointerCapture(event.pointerId);const p=eventPoint(event);movePoint(p.x,p.y);}
    });
    stage.addEventListener('pointermove',event=>{if(drag?.id===event.pointerId&&drag.direct){const p=eventPoint(event);movePoint(p.x,p.y);}});
    stage.addEventListener('pointerup',event=>{if(drag?.id!==event.pointerId)return;if(!drag.direct&&Math.hypot(event.clientX-drag.startX,event.clientY-drag.startY)<7){const p=eventPoint(event);movePoint(p.x,p.y);}if(stage.hasPointerCapture(event.pointerId))stage.releasePointerCapture(event.pointerId);drag=null;});
    stage.addEventListener('pointercancel',()=>{drag=null;});
    stage.addEventListener('keydown',event=>{
      const delta={ArrowLeft:[-5,0],ArrowRight:[5,0],ArrowUp:[0,5],ArrowDown:[0,-5]}[event.key];
      if(delta){event.preventDefault();const p=state.pattern==='manual'?state.point:sample(state.phase);movePoint(p.x+delta[0],p.y+delta[1]);}
      if(event.key===' '&&state.pattern!=='manual'){event.preventDefault();state.playing=!state.playing;sync();play();}
    });
  }
  const normalize=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d');
  let searchOpener=null;
  function results(){
    const dialog=$('#search-dialog'),input=$('#archive-query'),query=normalize(input.value.trim()),parts=query.split(/\s+/).filter(Boolean);
    const pages=[['/studio','Studio',L('Thí nghiệm chuyển động & ghi chú','Motion experiment & field notes')],['/about',L('Giới thiệu','About'),L('Hồ sơ, học vấn & công cụ','Profile, education & tools')],['/experience',L('Kinh nghiệm','Experience'),'LYK / Hilykan · DAT Group'],['/work',L('Tất cả dự án','All projects'),'Robotics / Embedded / CAD'],['/contact',L('Liên hệ','Contact'),'Email / GitHub / LinkedIn']];
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
    const b=event.target.closest?.('button');
    if(b?.matches('[data-search-open]')){openSearch(b);return;}
    if(b?.matches('[data-search-close]')){$('#search-dialog').close();return;}
    if(event.target.closest?.('.archive-results a'))$('#search-dialog').close();
    if(b?.matches('[data-case-read]')){$('#'+b.dataset.caseRead)?.scrollIntoView({behavior:reduced()?'instant':'smooth',block:'start'});return;}
    if(!stage||!b)return;
    if(b.matches('[data-pattern]')){state.pattern=b.dataset.pattern;state.phase=0;state.manual=[];state.point=null;sync();play();}
    if(b.matches('[data-motion-play]')){state.playing=!state.playing;sync();play();}
    if(b.matches('[data-motion-reset]')){Object.assign(state,{pattern:'lissajous',phase:.12,playing:false,construction:true,manual:[],point:null});sync();play();}
    if(b.matches('[data-motion-export]')){const blob=new Blob([exportSVG()],{type:'image/svg+xml;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='bluedstar-motion-study.svg';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#studio-feedback').textContent=L('ĐÃ LƯU NÉT VẼ SVG','SVG DRAWING SAVED');}
  });
  document.addEventListener('input',event=>{
    if(event.target.matches('#archive-query'))results();
    if(event.target.matches('[data-motion-phase]')){state.phase=Number(event.target.value)/1000;state.playing=false;sync();play();}
    if(event.target.matches('[data-construction]')){state.construction=event.target.checked;sync();}
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
  document.addEventListener('visibilitychange',play);
  document.addEventListener('DOMContentLoaded',()=>$('#search-dialog').addEventListener('close',()=>searchOpener?.isConnected&&searchOpener.focus({preventScroll:true})),{once:true});
  matchMedia('(prefers-reduced-motion:reduce)').addEventListener('change',event=>{if(event.matches){state.playing=false;sync();play();}});
  return {configure(options){language=options.language;reduced=options.reduced;refreshSearch();},home,page,mount,cleanup,refreshSearch,exportSVG,inverse};
})();
