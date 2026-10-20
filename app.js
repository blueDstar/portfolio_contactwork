/* Buildless application: semantic HTML, native scroll, native dialogs and one
   requestAnimationFrame coordinator for scroll/tilt. No WebGL/CDN dependency. */
(() => {
  'use strict';
  const {PROFILE:P,ASSETS:A,EXPERIENCES,PROJECTS,OBJECTS,MOTION}=window.PORTFOLIO;
  const $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>[...root.querySelectorAll(s)];
  const e=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const read=(key,fallback)=>{try{return localStorage.getItem(key)||fallback;}catch{return fallback;}};
  const write=(key,value)=>{try{localStorage.setItem(key,value);}catch{/* Private browsing can disable storage. */}};
  let lang=read('workshop-language','vi'); if(!['vi','en'].includes(lang))lang='vi';
  const L=value=>value&&typeof value==='object'?value[lang]||value.vi:value;
  const DICT={
    skip:['Đến nội dung chính','Skip to content'],about:['Giới thiệu','About'],experience:['Kinh nghiệm','Experience'],work:['Dự án','Work'],contact:['Liên hệ','Contact'],close:['Đóng','Close'],
    references:['Tham khảo nguyên lý hệ thống','System background references'],expImage:['Ảnh studio / Robotics','Studio image / Robotics'],contactSignal:['Kết nối ý tưởng với chuyển động.','Connecting ideas to motion.'],contactPortraitNote:['CÙNG TẠO NÊN ĐIỀU TIẾP THEO','LET’S BUILD WHAT COMES NEXT'],chatOpen:['Mở trò chuyện','Open chat'],chatTitle:['Trò chuyện cùng blueDStar','Chat with blueDStar'],
    footerNote:['Từ ý tưởng đến chuyển động.','From ideas to motion.'],explore:['Khám phá dự án','Explore projects'],scroll:['Cuộn để khám phá','Scroll to explore'],
    claim:['Tôi tạo nên những chuyển động.','I build things that move.'],portrait:['Nhân vật minh họa, có thể thay ảnh thật.','Illustrated stand-in; replaceable with a real portrait.'],illustration:['Minh họa','Illustration'],
    mediaPhoto:['ẢNH THỰC TẾ','PHOTOGRAPH'],mediaCAD:['CAD / RENDER','CAD / RENDER'],mediaSimulation:['MÔ PHỎNG','SIMULATION'],mediaGUI:['GUI / DỮ LIỆU','GUI / DATA'],mediaReference:['ẢNH THAM CHIẾU','REFERENCE IMAGE'],mediaStudio:['STUDIO','STUDIO'],
    previousImage:['Ảnh trước','Previous image'],nextImage:['Ảnh tiếp theo','Next image'],originalColor:['Màu gốc','Original colour'],monochrome:['Đen trắng','Monochrome'],imageLoadError:['Chưa tải được ảnh. Vui lòng thử lại.','The image could not load. Please try again.'],mechanismLabel:['CÙNG MỘT ASSEMBLY / DEFAULT','ONE ASSEMBLY / DEFAULT'],exploreMechanism:['Khám phá cơ cấu.','Explore the mechanism.'],staticViews:['Bốn góc nhìn tĩnh, cùng cấu hình CAD. Chọn một góc hoặc vuốt để quan sát.','Four static views of one CAD configuration. Select a view or swipe to inspect.'],viewAngles:['Góc nhìn CAD','CAD views'],problem:['Bài toán','The problem'],implementation:['Cách thực hiện','The approach'],scopeStatus:['Phạm vi & trạng thái','Scope & status'],limits:['Giới hạn xác nhận','Validation limits'],readingTitle:['Quan sát kỹ.<br>Thử nghiệm từng bước.','Look closely.<br>Build incrementally.'],readingCopy:['Tôi thích bắt đầu từ cách một cơ cấu hoạt động, kết nối nó với phần cứng và phần mềm, rồi thử nghiệm để hiểu điều gì cần cải tiến.','I like to start with how a mechanism works, connect it to electronics and software, then experiment to understand what to improve.'],openOriginal:['Mở tệp ảnh','Open image file'],
    introLabel:['01 / NGƯỜI CHẾ TẠO','01 / THE MAKER'],introFirst:['Kết nối cơ khí, phần cứng và phần mềm.','Connecting mechanics, electronics and software.'],introSecond:['Để ý tưởng trở thành một hệ robot có thể lắp ráp, thử nghiệm và cải tiến.','Turning ideas into robotic systems that can be assembled, tested and improved.'],moreAbout:['Về tôi','More about me'],
    galleryLabel:['02 / TỪ LINH KIỆN ĐẾN ROBOT','02 / FROM COMPONENTS TO ROBOTS'],galleryTitle:['Một thế giới.<br>Nhiều chuyển động.','One workshop.<br>Many ways to move.'],galleryIntro:['Chạm hoặc chọn một vật thể để khám phá câu chuyện kỹ thuật phía sau.','Tap or select an object to explore the engineering behind it.'],study:['Minh họa hướng quan tâm','Robotics study'],realProject:['Dự án đã thực hiện','Selected project'],research:['Minh họa nghiên cứu','Research illustration'],galleryNote:['Tất cả mô hình ở đây là minh họa SVG tự dựng.','All models here are original SVG illustrations.'],galleryScope:['Phạm vi thực tế được trình bày riêng trong từng dự án.','Actual work scope is documented in each project.'],oledNote:['Robot OLED là minh họa giao diện biểu cảm — một hướng quan tâm, không phải sản phẩm đã hoàn thành.','The OLED robot illustrates an expressive interface — an area of interest, not a completed product.'],
    selectedLabel:['03 / DỰ ÁN ĐÃ THỰC HIỆN','03 / SELECTED WORK'],selectedTitle:['Những gì tôi<br>đã xây dựng.','A closer look<br>at the work.'],allWork:['Tất cả dự án','All projects'],contactLabel:['BẮT ĐẦU MỘT CUỘC TRÒ CHUYỆN','START A CONVERSATION'],contactTitle:['Cùng tạo nên<br>chuyển động tiếp theo.','Let’s build<br>what moves next.'],
    aboutLabel:['CON NGƯỜI ĐẰNG SAU CÔNG VIỆC','THE PERSON BEHIND THE WORK'],aboutTitle:['Về tôi.','About me.'],education:['Học vấn','Education'],skills:['Công cụ & nền tảng','Tools & foundations'],languages:['Lập trình','Programming'],control:['Robot & điều khiển','Robotics & control'],hardware:['Phần cứng & thị giác','Hardware & vision'],design:['Thiết kế & phát triển','Design & development'],
    expLabel:['TỪ NGHIÊN CỨU ĐẾN TÍCH HỢP','FROM RESEARCH TO INTEGRATION'],expLead:['Những công việc tại giao điểm của thiết kế cơ khí, hệ thống nhúng và phần mềm.','Work at the intersection of mechanical design, embedded systems and software.'],expSelected:['KINH NGHIỆM ĐƯỢC CHỌN','SELECTED EXPERIENCE'],actuation:['Truyền động','Actuation'],cadFixtures:['CAD & đồ gá','CAD & fixtures'],simulation:['Mô phỏng','Simulation'],computerVision:['Thị giác máy tính','Computer vision'],edgeDeployment:['Triển khai tại biên','Edge deployment'],ragData:['RAG & dữ liệu','RAG & data'],
    workLabel:['DANH MỤC DỰ ÁN','PROJECT INDEX'],workLead:['Từ nhận thức đến chuyển động. Từ mô hình CAD đến cơ cấu có thể lắp ráp.','From perception to motion. From CAD models to assemblies.'],all:['Tất cả','All'],grid:['Lưới','Grid'],index:['Danh sách','Index'],results:['dự án','projects'],filterLabel:['Lọc dự án','Filter projects'],viewLabel:['Cách xem dự án','Project view'],
    backWork:['Trở về dự án','Back to work'],period:['GIAI ĐOẠN','PERIOD'],scope:['PHẠM VI','SCOPE'],technology:['CÔNG NGHỆ','TECHNOLOGIES'],overview:['Tổng quan','Overview'],contribution:['Đóng góp của tôi','My contribution'],system:['Hệ thống & thành phần','System & components'],approach:['Cách thiết kế / triển khai','Design / implementation approach'],evidence:['Tư liệu hiện có','Available evidence'],learnings:['Nhìn lại & bài học','Learnings & reflection'],evidenceText:['Nội dung mô tả phạm vi công việc đã được cung cấp. Chưa có ảnh, video thử nghiệm hoặc tài liệu kỹ thuật đính kèm; hình hiển thị là minh họa cơ khí tự dựng. Không có số liệu hiệu năng được công bố.','The text documents the supplied work scope. No project photos, test videos or technical documents are attached yet; the visual is an original mechanical illustration. No performance measurements are claimed.'],evidenceReal:['Tư liệu dự án được đính kèm bên dưới. Phạm vi công việc được mô tả trong nội dung; không có số liệu hiệu năng bổ sung.','Project media are attached below. Work scope is described in the text; no additional performance measurements are claimed.'],nextProject:['DỰ ÁN TIẾP THEO','NEXT PROJECT'],profileGit:['Xem hồ sơ GitHub','View GitHub profile'],viewProject:['Xem dự án','View project'],openImage:['Mở ảnh dự án','Enlarge project image'],
    contactLead:['Trao đổi về robotics, hệ thống nhúng hoặc một ý tưởng cần được đưa vào chuyển động.','Let’s talk about robotics, embedded systems, or an idea waiting to move.'],copy:['Sao chép email','Copy email'],copied:['Đã sao chép','Copied'],copyFallback:['Không thể sao chép tự động. Email đã được chọn; nhấn Ctrl/Cmd+C.','Automatic copy unavailable. Email selected; press Ctrl/Cmd+C.'],location:['ĐỊA ĐIỂM','LOCATION'],focus:['ĐỊNH HƯỚNG','FOCUS'],cvTitle:['Hồ sơ năng lực.','Curriculum vitae.'],cvIntro:['Chọn phiên bản ngôn ngữ. Chỉ có thể tải khi tệp PDF thật đã được bổ sung.','Choose a language. Downloads become available when real PDF files are attached.'],cvMissing:['CV chưa được gắn','CV not attached yet'],download:['Tải PDF','Download PDF'],vi:['Tiếng Việt','Vietnamese'],en:['Tiếng Anh','English'],cvAction:['Xem lựa chọn CV','View CV options'],menuOpen:['Mở menu','Open menu'],menuClose:['Đóng menu','Close menu'],objectClose:['Đóng thông tin vật thể','Close object information'],notFound:['Không tìm thấy giao diện này.','This page could not be found.'],home:['Về trang chủ','Back home'],mainNav:['Điều hướng chính','Main navigation'],desc:['Nguyễn Văn Đạt — Junior Robotics R&D Engineer. Robotics, hệ thống nhúng, điều khiển và thị giác máy tính.','Nguyen Van Dat — Junior Robotics R&D Engineer. Robotics, embedded systems, control and computer vision.']
  };
  const t=k=>DICT[k]?.[lang==='vi'?0:1]||k;
  const art=kind=>WorkshopArt.draw(kind);
  let filter='All',view=read('workshop-view','grid'); if(!['grid','index'].includes(view))view='grid';
  let experience='robotics',displayedRoute='',desiredRoute='',currentKey='',transitionToken=0,transitionTimers=[],detailTimer=0;
  let routeScroll=new Map(),workScroll=0,selectedObject=null,objectOpener=null,tooltipOwner=null;
  let observer=null,sceneObserver=null,frame=0,heroVisible=false,tiltElement=null,tiltTarget={x:0,y:0},tiltValue={x:0,y:0},lastFrame=0;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover: hover) and (pointer: fine)');
  const main=$('#main'),tooltip=$('#tooltip'),panel=$('#object-panel');
  const wm=window.WorkshopMedia;
  wm.configure({language:()=>lang,translate:t,reduced:()=>reduce.matches});
  const arrow='<span class="arrow" aria-hidden="true">↗</span>';
  const link=(hash,label,cls='text-link')=>`<a class="${cls}" href="${hash}">${label}${arrow}</a>`;
  function portrait(context='hero'){
    const id=A[context+'Portrait'];
    if(id&&wm.media[id])return `<figure class="portrait-pair photographic-portrait portrait-${context}"><div class="portrait-parallax">${wm.image(id,{priority:context==='hero',fallback:'assembly',sizes:context==='hero'?'(max-width: 560px) 75vw, (max-width: 860px) 50vw, 600px':'(max-width: 768px) calc(100vw - 44px), 600px'})}</div><figcaption class="mono">${e(L(wm.media[id].caption))}</figcaption></figure>`;
    const pose=(key,path,position)=>`<span class="portrait-pose ${key}">${path?`<img src="${e(path)}" data-fallback="${key}" width="640" height="720" alt="" style="object-position:${e(position)}">`:art(key)}</span>`;
    return `<div class="portrait-pair">${pose('assembly',A.portraitAssembly,A.assemblyPosition)}${pose('pointing',A.portraitPointing,A.pointingPosition)}<span class="portrait-note mono">${t('portrait')}</span></div>`;
  }
  function obj(id,cls='',extra=''){
    const o=OBJECTS.find(x=>x.id===id);
    return `<button class="object-button ${cls}" data-object="${id}" aria-label="${e(L(o.name))}: ${e(L(o.label))}" aria-expanded="false" aria-controls="object-panel" ${extra}><span class="object-float"><span class="object-hover"><span class="object-tilt">${art(o.art)}</span></span></span></button>`;
  }
  function media(p,number,cls=''){
    if(p.cover&&wm.media[p.cover]){const m=wm.media[p.cover];return `<a class="project-media has-photo kind-${m.kind} ${cls}" href="#/work/${p.slug}" aria-label="${e(L(p.name))}">${wm.image(p.cover,{sizes:'(max-width: 560px) calc(100vw - 44px), (max-width: 860px) 50vw, 760px'})}<span class="project-number mono">${String(number).padStart(2,'0')} / ${p.categories.join(' + ').toUpperCase()}</span><span class="media-caption mono">${t({cad:'mediaCAD',simulation:'mediaSimulation',reference:'mediaReference',photo:'mediaPhoto'}[m.kind]||'mediaGUI')}</span></a>`;}
    return `<a class="project-media ${cls}" href="#/work/${p.slug}" aria-label="${e(L(p.name))}">${p.image?`<img src="${e(p.image)}" data-fallback="${p.art}" alt="${e(L(p.name))}" width="800" height="640" loading="lazy">`:art(p.art)}<span class="project-number mono">${String(number).padStart(2,'0')} / ${p.categories.join(' + ').toUpperCase()}</span><span class="media-caption mono">${p.image?'':t('illustration')+' / '+e(L(p.subtitle))}</span></a>`;
  }
  function projectCard(p,i,featured=false){
    return `<article class="project-card${featured?' featured':''}" data-project="${p.slug}">${media(p,i+1)}<div class="project-info"><a class="project-heading" href="#/work/${p.slug}"><h3>${e(L(p.name))}</h3>${arrow}</a><p class="project-subtitle">${e(L(p.subtitle))}</p>${p.shortDescription?`<p class="project-description">${e(L(p.shortDescription))}</p>`:''}<div class="project-meta mono"><span>${p.dates}</span><span>${e(L(p.status))}</span></div><div class="project-tech">${p.tech.map(x=>`<span>${e(x)}</span>`).join('')}</div></div></article>`;
  }
  const contactBand=()=>`<section class="contact-band section shell reveal"><div><p class="eyebrow">${t('contactLabel')}</p><h2>${t('contactTitle')}</h2></div><a class="round-link" href="#/contact" aria-label="${t('contact')}" >↗</a></section>`;
  function home(){
    const gallery=[['arm','large'],['car',''],['humanoid',''],['hexapod',''],['stewart','']];
    return `<section class="hero shell photo-hero branded-hero" aria-label="blueDStar Robotics"><div class="hero-meta"><div><p class="hero-name">NGUYỄN VĂN ĐẠT</p><p class="hero-role">${P.role}</p></div><p class="hero-edition mono">blueDStar / ROBOTICS<br>HO CHI MINH CITY, VN</p></div><h1 class="hero-title" tabindex="-1"><span>blueDStar</span></h1><div class="hero-stage">${portrait()}<div class="hero-arm">${obj('arm')}</div>${['pi','motor','camera','esp32','encoder','gear'].map((id,i)=>`<div class="hero-component c-${id}">${obj(id)}<span class="hero-object-number" aria-hidden="true">0${i+1}</span></div>`).join('')}</div><button class="scroll-hint mono" data-scroll-gallery>${t('scroll')}</button><div class="hero-bottom"><div><p class="hero-claim">${t('claim')}</p><p class="hero-specialties mono">ROBOTICS R&D / EMBEDDED / CONTROL</p></div><div class="hero-controls">${link('#/work',t('explore'),'button light')}${link('#/experience',t('experience'))}</div></div></section>
    <section class="intro-section section shell reveal"><p class="section-label eyebrow">${t('introLabel')}</p><div><p class="intro-copy">${t('introFirst')} <span class="muted">${t('introSecond')}</span></p><div class="intro-bottom">${link('#/about',t('moreAbout'))}<span class="mono muted">ROBOTICS · EMBEDDED · VISION</span></div></div></section>
    <section id="robot-gallery" class="gallery section shell"><p class="section-label eyebrow">${t('galleryLabel')}</p><div class="gallery-header reveal"><h2>${t('galleryTitle')}</h2><p>${t('galleryIntro')}</p></div><div class="gallery-grid">${gallery.map(([id,cls],i)=>{const o=OBJECTS.find(x=>x.id===id);return `<button class="gallery-item object-button ${cls} reveal" data-object="${id}" aria-label="${e(L(o.name))}: ${e(L(o.label))}" aria-expanded="false" aria-controls="object-panel" style="--reveal-delay:${i*70}ms"><span class="gallery-meta"><span class="mono muted">0${i+1}</span><span class="mono">↗</span></span><span class="object-hover"><span class="object-tilt">${art(o.art)}</span></span><span><span class="gallery-name">${e(L(o.name))}</span><span class="gallery-type mono">${o.project?t('realProject'):id==='arm'?t('research'):t('study')}</span></span></button>`;}).join('')}</div><div class="gallery-caption mono"><span>${t('galleryNote')}</span><span>${t('galleryScope')}</span></div><div class="gallery-extra">${obj('oled')}<div><p class="eyebrow">06 / OLED ROBOT</p><p>${t('oledNote')}</p></div></div></section>
    <section class="selected-work section"><div class="shell"><p class="section-label eyebrow">${t('selectedLabel')}</p><div class="section-header reveal"><h2>${t('selectedTitle')}</h2>${link('#/work',t('allWork'))}</div><div class="work-grid">${projectCard(PROJECTS[0],0,true)}${projectCard(PROJECTS[1],1)}${projectCard(PROJECTS[2],2)}</div><div class="home-work-list">${PROJECTS.slice(3).map((p,i)=>`<a class="home-work-row" href="#/work/${p.slug}"><span class="mono">0${i+4}</span><div><h3>${e(L(p.name))}</h3><p class="mono">${e(L(p.status))}</p></div>${arrow}</a>`).join('')}</div></div></section>${contactBand()}`;
  }
  const pageTop=(label,title,lead='')=>`<section class="page-top shell"><p class="eyebrow">${label}</p><h1 class="page-title" tabindex="-1">${title}</h1>${lead?`<p class="page-lead">${lead}</p>`:''}</section>`;
  function about(){return `${pageTop(t('aboutLabel'),t('aboutTitle'))}<section class="about-layout shell real-about"><div class="about-portrait">${portrait('about')}</div><div class="about-copy"><p class="mono">${P.role}<br>${P.location}</p><p class="large-copy">${e(L(P.intro))}</p>${link('#/experience',t('experience'))}</div></section><section class="education shell"><p class="eyebrow">${t('education')}</p><div><h3>${e(L(P.education))}</h3><p>${e(L(P.university))}</p><p class="mono">${P.educationDates}</p></div></section><section class="skills-section section shell"><p class="section-label eyebrow">${t('skills')}</p><div class="skills-list">${[[t('languages'),'C / C++ · Python · MATLAB'],[t('control'),'ROS / ROS2 · CAN bus · PID / PD · PD-Fuzzy'],[t('hardware'),'Raspberry Pi · Jetson Nano · ESP32 / STM32 · Arduino · OpenCV · YOLO'],[t('design'),'SolidWorks · MATLAB/Simulink · LabVIEW · Linux/Ubuntu · Git · Docker']].map(([title,text])=>`<div class="skill-group reveal"><h3>${title}</h3><p>${text}</p></div>`).join('')}</div></section><section class="reading-interlude shell"><figure>${wm.image(A.readingPortrait,{sizes:'(max-width: 560px) 60vw, 400px'})}<figcaption class="mono">${e(L(wm.media[A.readingPortrait].caption))}</figcaption></figure><div><h2>${t('readingTitle')}</h2><p>${t('readingCopy')}</p></div></section>${contactBand()}`;}
  function expDetail(){
    const exp=EXPERIENCES.find(x=>x.id===experience),names={'Actuation':'actuation','CAD & Fixtures':'cadFixtures','Simulation':'simulation','Computer Vision':'computerVision','Edge Deployment':'edgeDeployment','RAG & Data':'ragData'};
    return `<div class="detail-intro company-intro"><div><p class="eyebrow">${t('expSelected')}</p><h2>${e(exp.company||exp.title)}</h2><p class="experience-role">${e(L(exp.role)||exp.title)}</p><p class="experience-summary">${e(L(exp.summary))}</p></div><figure class="company-mark">${wm.image(exp.logo,{sizes:'140px'})}</figure></div><ol class="experience-flow" aria-hidden="true">${exp.groups.map(g=>`<li><span></span>${t(names[g.name])}</li>`).join('')}</ol><div class="detail-groups">${exp.groups.map((g,i)=>`<section class="detail-group"><span class="mono">0${i+1}</span><div><h3>${t(names[g.name])}</h3><p>${e(L(g.text))}</p></div></section>`).join('')}</div>`;
  }
  function experiencePage(){return `${pageTop(t('expLabel'),'EXPERIENCE',t('expLead'))}<section class="experience-layout shell enhanced-experience"><aside class="experience-sidebar"><div class="timeline" role="tablist" aria-label="${t('experience')}" aria-orientation="vertical">${EXPERIENCES.map(exp=>`<button id="tab-${exp.id}" data-experience="${exp.id}" role="tab" aria-selected="${experience===exp.id}" tabindex="${experience===exp.id?0:-1}" aria-controls="experience-detail"><span class="mono">${exp.dates}</span><span class="timeline-company">${wm.image(exp.logo,{sizes:'54px'})}<span><strong>${exp.title}</strong><small>${e(exp.company)}</small></span></span></button>`).join('')}</div><figure class="experience-photo reveal">${wm.image(A.experiencePortrait,{sizes:'(max-width:560px) calc(100vw - 44px), 400px'})}<figcaption class="mono">${t('expImage')}</figcaption><span class="photo-crosshair" aria-hidden="true"></span></figure></aside><div id="experience-detail" class="experience-detail" role="tabpanel" aria-labelledby="tab-${experience}" tabindex="0">${expDetail()}</div></section>`;}
  function workPage(){return `${pageTop(t('workLabel'),'SELECTED WORK',t('workLead'))}<section class="work-page shell"><div class="work-toolbar"><div class="filters" role="group" aria-label="${t('filterLabel')}">${['All','Robotics','Embedded','CAD'].map(x=>`<button data-filter="${x}" aria-pressed="${filter===x}">${x==='All'?t('all'):x}</button>`).join('')}</div><div class="view-controls" role="group" aria-label="${t('viewLabel')}">${['grid','index'].map(x=>`<button data-view="${x}" aria-pressed="${view===x}">${t(x)}</button>`).join('')}</div></div><p id="work-count" class="work-count mono" aria-live="polite"></p><div id="work-results" class="work-grid ${view==='index'?'index-view':''}"></div></section>`;}
  function renderResults(animate=false){
    const root=$('#work-results');if(!root)return;
    const positions=new Map($$('.project-card',root).map(x=>[x.dataset.project,x.getBoundingClientRect()]));
    const items=PROJECTS.filter(p=>filter==='All'||p.categories.includes(filter));
    root.className='work-grid'+(view==='index'?' index-view':'');
    root.innerHTML=items.map(p=>projectCard(p,PROJECTS.indexOf(p))).join('');
    $('#work-count').textContent=`${String(items.length).padStart(2,'0')} / ${String(PROJECTS.length).padStart(2,'0')} ${t('results')}`;
    $$('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.filter===filter)));
    $$('[data-view]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.view===view)));
    if(animate&&!reduce.matches)$$('.project-card',root).forEach(x=>{const before=positions.get(x.dataset.project),after=x.getBoundingClientRect();x.animate(before?[{transform:`translate(${before.left-after.left}px,${before.top-after.top}px)`,opacity:.7},{transform:'translate(0,0)',opacity:1}]:[{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:280,easing:'cubic-bezier(.22,1,.36,1)'});});
  }
  function legacyProjectPage(p){
    const next=PROJECTS[(PROJECTS.indexOf(p)+1)%PROJECTS.length];
    return `<div class="case-top shell">${link('#/work','<span aria-hidden="true">←</span> '+t('backWork'))}<h1 class="case-title" tabindex="-1">${e(L(p.name))}</h1><p class="case-subtitle">${e(L(p.subtitle))}</p><dl class="case-facts"><div><dt>${t('period')}</dt><dd>${p.dates}</dd></div><div><dt>${t('scope')}</dt><dd>${e(L(p.status))}</dd></div><div><dt>${t('technology')}</dt><dd>${p.tech.map(e).join(' / ')}</dd></div></dl><figure class="case-hero">${p.image?`<button data-enlarge="${p.slug}" aria-label="${t('openImage')}"><img src="${e(p.image)}" data-fallback="${p.art}" alt="${e(L(p.name))}" width="1200" height="700"></button>`:art(p.art)}<figcaption class="mono">${p.image?'':t('illustration')+' / '+e(L(p.name))}</figcaption></figure><div class="case-content"><aside class="case-aside"><p class="mono">${p.categories.join(' / ').toUpperCase()}</p><p>${t('galleryScope')}</p>${p.repo?`<a class="text-link" href="${e(p.repo)}" target="_blank" rel="noopener noreferrer">Repository ${arrow}</a>`:link(P.github,t('profileGit')).replace('class="text-link"','class="text-link" target="_blank" rel="noopener noreferrer"')}</aside><div>${[['overview',p.overview],['contribution',p.contribution],['system',p.system],['approach',p.approach],['evidence',null],['learnings',p.learnings]].map(([key,text])=>`<section class="case-section"><h2>${t(key)}</h2><p class="${key==='system'?'system-strip':key==='evidence'?'evidence-note':''}">${key==='evidence'?t(p.image||p.video?'evidenceReal':'evidenceText'):e(L(text))}</p></section>`).join('')}${p.video?`<video class="project-video" src="${e(p.video)}" controls preload="metadata" aria-label="${e(L(p.name))}"></video>`:''}<a class="case-next" href="#/work/${next.slug}"><div><span class="mono muted">${t('nextProject')}</span><h3>${e(L(next.name))}</h3></div>${arrow}</a></div></div></div>`;
  }
  function projectPage(p){
    if(!p.cover||!p.gallery)return legacyProjectPage(p);
    const next=PROJECTS[(PROJECTS.indexOf(p)+1)%PROJECTS.length],cover=wm.media[p.cover];
    return `<div class="case-top shell documented-case">${link('#/work','<span aria-hidden="true">←</span> '+t('backWork'))}<h1 class="case-title" tabindex="-1">${e(L(p.name))}</h1><p class="case-subtitle">${e(L(p.subtitle))}</p><dl class="case-facts"><div><dt>${t('period')}</dt><dd>${p.dates}</dd></div><div><dt>${t('scope')}</dt><dd>${e(L(p.status))}</dd></div><div><dt>${t('technology')}</dt><dd>${p.tech.map(e).join(' / ')}</dd></div></dl><figure class="case-hero has-photo kind-${cover.kind}"><button data-gallery-open="${p.slug}" data-gallery-index="${p.gallery.indexOf(p.cover)}" aria-label="${t('openImage')}">${wm.image(p.cover,{sizes:'(max-width: 768px) calc(100vw - 44px), 1400px'})}<span class="case-open-label mono">${t('openImage')} ↗</span></button></figure><p class="cover-caption caption">${e(L(cover.caption))}</p><section class="case-summary"><div><p class="eyebrow">01 / ${t('overview')}</p><h2>${t('problem')}</h2><p class="summary-lead">${e(L(p.overview))}</p><p>${e(L(p.goal))}</p></div><aside><p class="eyebrow">${t('contribution')}</p><p>${e(L(p.contribution))}</p><a class="text-link" href="${p.repo||P.github}" target="_blank" rel="noopener noreferrer">${p.repo?'Repository':t('profileGit')} ${arrow}</a></aside></section><section class="system-section"><p class="eyebrow">02 / ${t('system')}</p><ol class="architecture-flow">${p.architecture.map((x,i)=>`<li><span class="mono">0${i+1}</span><span>${e(x)}</span></li>`).join('')}</ol><h2>${t('implementation')}</h2><div class="implementation-list">${p.approach.map((x,i)=>`<section><span class="mono">0${i+1}</span><div><h3>${e(L(x.title))}</h3><p>${e(L(x.text))}</p></div></section>`).join('')}</div></section>${wm.viewer(p)}${p.chapters.map((c,i)=>`<section class="story-chapter layout-${c.layout}"><header><p class="eyebrow">${String(i+3).padStart(2,'0')} / ${t('work')}</p><h2>${e(L(c.title))}</h2><p>${e(L(c.text))}</p></header><div class="chapter-media">${c.media.map(id=>wm.figure(id,p)).join('')}</div></section>`).join('')}<section class="case-scope"><div><p class="eyebrow">${t('scopeStatus')}</p><h2>${t('evidence')}</h2><p>${e(L(p.evidence))}</p></div><div class="validation-note"><h3>${t('limits')}</h3><p>${e(L(p.limits))}</p></div></section>${p.references?.length?`<aside class="system-references"><p class="mono">${t('references')}</p>${p.references.map(r=>`<a href="${e(r.url)}" target="_blank" rel="noopener noreferrer">${e(r.label)} <span aria-hidden="true">&nearr;</span></a>`).join('')}</aside>`:''}<a class="case-next documented-next" href="#/work/${next.slug}"><div><span class="mono muted">${t('nextProject')}</span><h3>${e(L(next.name))}</h3></div>${arrow}</a></div>`;
  }
  function contact(){return `<div class="contact-scene shell"><section class="contact-intro"><p class="eyebrow">LET’S MAKE IT MOVE.</p><h1 class="page-title" tabindex="-1">${t('contact')}.</h1><p class="page-lead">${t('contactLead')}</p><div class="contact-direct"><a id="contact-email" class="email-link" href="mailto:${P.email}">${P.email}</a><button class="copy-button text-link" data-copy>${t('copy')} <span aria-hidden="true">⧉</span></button></div><p class="contact-signal mono"><span aria-hidden="true"></span>${t('contactSignal')}</p></section><div class="contact-visual"><div class="contact-orbit orbit-one" aria-hidden="true"><span></span></div><div class="contact-orbit orbit-two" aria-hidden="true"></div><svg class="contact-traces" viewBox="0 0 500 600" fill="none" aria-hidden="true"><path class="trace-line" d="M20 470H100V400H185M480 150H410V240H330M25 90H120V150H170"/><path d="M30 530H470M60 40V560M440 40V560"/><circle cx="185" cy="400" r="4"/><circle cx="330" cy="240" r="4"/></svg><span class="visual-coordinate mono" aria-hidden="true">10° N / 106° E<br>ROBOTICS · R&D</span><figure class="contact-floating-portrait">${wm.image(A.contactPortrait,{priority:true,sizes:'(max-width:560px) 85vw, 500px'})}<figcaption class="mono">${t('contactPortraitNote')}</figcaption></figure><span class="contact-cross cross-one" aria-hidden="true">+</span><span class="contact-cross cross-two" aria-hidden="true">+</span></div></div><section class="contact-page shell"><div class="contact-socials contact-social-row"><a href="${P.github}" target="_blank" rel="noopener noreferrer">GitHub ${arrow}</a><a href="${P.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn ${arrow}</a><button data-cv aria-label="${t('cvAction')}">Curriculum vitae <span aria-hidden="true">↓</span></button></div><div class="contact-details"><div><p class="mono">${t('location')}</p><p>${P.location}</p></div><div><p class="mono">${t('focus')}</p><p>Robotics R&D / Embedded / Control</p></div></div></section>`;}
  function notFound(){return `<section class="not-found shell"><p class="eyebrow">THE MAKER’S WORKSHOP</p><h1 tabindex="-1">404</h1><p>${t('notFound')}</p>${link('#/home',t('home'),'button')}</section>`;}
  function routeInfo(hash){
    const path=hash.replace(/^#/,'').replace(/\/$/,'')||'/home';
    if(path==='/home')return {render:home,title:'blueDStar',nav:'/home'};
    if(path==='/about')return {render:about,title:t('about'),nav:'/about'};
    if(path==='/experience')return {render:experiencePage,title:t('experience'),nav:'/experience'};
    if(path==='/work')return {render:workPage,title:t('work'),nav:'/work'};
    if(path==='/contact')return {render:contact,title:t('contact'),nav:'/contact'};
    const p=PROJECTS.find(p=>path==='/work/'+p.slug);if(p)return {render:()=>projectPage(p),title:L(p.name),nav:'/work'};
    return {render:notFound,title:'404',nav:null};
  }
  function updateShell(hash){
    document.documentElement.lang=lang;
    $$('[data-i18n]').forEach(x=>x.textContent=t(x.dataset.i18n));
    const info=routeInfo(hash);
    $$('[data-nav] a,.wordmark').forEach(x=>{if(x.hash==='#'+info.nav)x.setAttribute('aria-current','page');else x.removeAttribute('aria-current');});
    /* Only the visible navigation has an active link in the accessibility tree. */
    $$('[data-language]').forEach(x=>{x.innerHTML=(lang==='vi'?'EN':'VI')+' <span aria-hidden="true">↗</span>';x.setAttribute('aria-label',lang==='vi'?'Switch to English':'Chuyển sang tiếng Việt');});
    $('[data-menu]').setAttribute('aria-label',t('menuOpen'));
    $('.desktop-nav').setAttribute('aria-label',t('mainNav'));
    document.title=`${info.title} — ${lang==='vi'?P.name:P.englishName}`;
    $('meta[name="description"]').content=t('desc');
    $('#image-dialog').setAttribute('aria-label',t('openImage'));
    $('[data-chat-open]').setAttribute('aria-label',t('chatOpen'));
    window.blueDStarChat?.setLanguage(lang);
  }
  function stopScene(){
    observer?.disconnect();sceneObserver?.disconnect();cancelAnimationFrame(frame);clearTimeout(detailTimer);frame=0;
    heroVisible=false;tiltElement=null;lastFrame=0;hideTooltip();closeObject(false);
  }
  function renderRoute(hash){stopScene();main.innerHTML=routeInfo(hash).render();displayedRoute=hash;updateShell(hash);renderResults();setupScene();}
  function saveScroll(){if(currentKey)routeScroll.set(currentKey,scrollY);if(displayedRoute==='#/work')workScroll=scrollY;}
  function focusTitle(){const title=$('h1',main);title?.focus({preventScroll:true});}
  function settleRoute(hash,key,restore,token){
    if(token!==transitionToken)return;
    renderRoute(hash);currentKey=key;
    const y=restore?routeScroll.get(key)??(hash==='#/work'?workScroll:0):0;
    scrollTo({top:y,behavior:'instant'});focusTitle();
    document.body.classList.remove('route-out');document.body.classList.add('route-in');
    transitionTimers.push(setTimeout(()=>{if(token===transitionToken)document.body.classList.remove('route-in');},reduce.matches?60:340));
  }
  function beginRoute(hash,key,restore=false,immediate=false){
    transitionTimers.forEach(clearTimeout);transitionTimers=[];
    const token=++transitionToken;desiredRoute=hash;updateShell(hash);hideTooltip();closeObject(false);
    $$('dialog[open]').forEach(d=>d.close());
    if(immediate){settleRoute(hash,key,restore,token);return;}
    document.body.classList.remove('route-in');document.body.classList.add('route-out');
    transitionTimers.push(setTimeout(()=>settleRoute(hash,key,restore,token),reduce.matches?60:280));
  }
  function go(hash,restore=false){
    if(hash===desiredRoute){if(hash==='#/home'){scrollTo({top:0,behavior:reduce.matches?'instant':'smooth'});focusTitle();}return;}
    saveScroll();const key=crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random());
    history.pushState({portfolioKey:key},'',hash);beginRoute(hash,key,restore);
  }
  let historyQueued=false;
  function onHistory(){if(historyQueued)return;historyQueued=true;queueMicrotask(()=>{historyQueued=false;const hash=location.hash||'#/home';const key=history.state?.portfolioKey||String(Date.now()+Math.random());if(hash===desiredRoute&&key===currentKey)return;saveScroll();if(!history.state?.portfolioKey)history.replaceState({portfolioKey:key},'',location.href);beginRoute(hash,key,true);});}
  addEventListener('popstate',onHistory);addEventListener('hashchange',onHistory);
  function setupScene(){
    const nodes=$$('.reveal',main);
    if('IntersectionObserver'in window){
      observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('pending');entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});
      nodes.forEach(x=>{if(x.getBoundingClientRect().top>innerHeight){x.classList.add('pending');observer.observe(x);}});
      sceneObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{entry.target.classList.toggle('scene-visible',entry.isIntersecting);if(entry.target.classList.contains('hero')){heroVisible=entry.isIntersecting;if(heroVisible)requestFrame();}}));
      $$('.hero,.gallery',main).forEach(x=>sceneObserver.observe(x));
    }else{nodes.forEach(x=>x.classList.add('visible'));heroVisible=!!$('.hero');$('.hero')?.classList.add('scene-visible');}
    document.body.classList.add('motion-ready');requestFrame();
  }
  function requestFrame(){if(!frame&&!document.hidden)frame=requestAnimationFrame(tick);}
  function tick(now){
    frame=0;const dt=Math.min(now-(lastFrame||now-16),40),alpha=1-Math.exp(-dt/100);lastFrame=now;
    const hero=$('.hero');if(hero&&heroVisible){
      const progress=Math.max(0,Math.min(scrollY/(hero.offsetHeight*.65),1));
      hero.classList.toggle('pose-b',progress>.32);
      hero.style.setProperty('--maker-y',reduce.matches?'0px':`${-Math.min(24,progress*24)}px`);
      hero.style.setProperty('--maker-opacity',reduce.matches?'1':String(1-progress*.22));
      hero.style.setProperty('--portrait-y',reduce.matches||innerWidth<=560?'0px':`${Math.min(progress*20,20)}px`);
      const mobile=innerWidth<=560;
      $$('.hero-component',hero).forEach((x,i)=>x.style.setProperty('--component-y',reduce.matches||(mobile&&!x.classList.contains('c-motor'))?'0px':`${progress*(i%2?28:14)}px`));
    }
    if(tiltElement&&!reduce.matches){
      tiltValue.x+=(tiltTarget.x-tiltValue.x)*alpha;tiltValue.y+=(tiltTarget.y-tiltValue.y)*alpha;
      tiltElement.style.setProperty('--rx',`${tiltValue.x}deg`);tiltElement.style.setProperty('--ry',`${tiltValue.y}deg`);
      if(Math.abs(tiltValue.x-tiltTarget.x)>.02||Math.abs(tiltValue.y-tiltTarget.y)>.02)requestFrame();
    }
  }
  addEventListener('scroll',()=>{
    hideTooltip();
    // Pose is content state: keep it in sync even when the browser throttles rAF
    // in an embedded/background preview. Visual parallax still uses one rAF.
    const hero=$('.hero');if(hero)hero.classList.toggle('pose-b',scrollY/(hero.offsetHeight*.65)>.32);
    if(heroVisible)requestFrame();
  },{passive:true});
  document.addEventListener('visibilitychange',()=>{document.body.classList.toggle('page-hidden',document.hidden);if(document.hidden){cancelAnimationFrame(frame);frame=0;lastFrame=0;}else requestFrame();});
  reduce.addEventListener('change',()=>{if(reduce.matches)$$('.object-tilt').forEach(x=>{x.style.removeProperty('--rx');x.style.removeProperty('--ry');});requestFrame();});
  function showTooltip(button){
    if(!fine.matches&&!button.matches(':focus-visible'))return;
    const o=OBJECTS.find(x=>x.id===button.dataset.object);if(!o)return;
    if(tooltipOwner&&tooltipOwner!==button)tooltipOwner.removeAttribute('aria-describedby');
    tooltipOwner=button;button.setAttribute('aria-describedby','tooltip');
    tooltip.innerHTML=`<strong>${e(L(o.name))}</strong><span>${e(L(o.label))}</span>`;tooltip.hidden=false;
    const r=button.getBoundingClientRect(),w=tooltip.offsetWidth,h=tooltip.offsetHeight;
    tooltip.style.left=Math.max(12,Math.min(r.left+r.width/2-w/2,innerWidth-w-12))+'px';
    tooltip.style.top=Math.max(90,Math.min(r.top-h-8,innerHeight-h-12))+'px';
  }
  function hideTooltip(){tooltip.hidden=true;tooltipOwner?.removeAttribute('aria-describedby');tooltipOwner=null;}
  function closeObject(returnFocus=false){
    panel.hidden=true;selectedObject=null;$$('.object-button.selected').forEach(x=>{x.classList.remove('selected');x.setAttribute('aria-expanded','false');});
    if(returnFocus&&objectOpener?.isConnected)objectOpener.focus({preventScroll:true});objectOpener=null;
  }
  function openObject(button){
    const o=OBJECTS.find(x=>x.id===button.dataset.object);if(selectedObject===o.id){closeObject();return;}
    closeObject();selectedObject=o.id;objectOpener=button;button.classList.add('selected');button.setAttribute('aria-expanded','true');hideTooltip();
    panel.innerHTML=`<div class="object-panel-top"><div><span class="caption mono">${e(L(o.label))}</span><h2 id="object-title">${e(L(o.name))}</h2></div><button data-close-object aria-label="${t('objectClose')}">×</button></div><p>${e(L(o.desc))}</p>${o.project?link('#/work/'+o.project,t('viewProject')):o.id==='arm'||o.id==='motor'?link('#/experience',t('experience')):''}`;
    panel.hidden=false;panel.setAttribute('tabindex','-1');panel.focus({preventScroll:true});
  }
  function selectExperience(id,focus=false){
    experience=id;const detail=$('#experience-detail');
    $$('[data-experience]').forEach(b=>{const active=b.dataset.experience===id;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;if(active&&focus)b.focus();});
    detail.setAttribute('aria-labelledby','tab-'+id);clearTimeout(detailTimer);detail.getAnimations().forEach(a=>a.cancel());
    const outgoing=reduce.matches?null:detail.animate([{opacity:1},{opacity:0,transform:'translateY(-4px)'}],{duration:120,fill:'forwards'});
    detailTimer=setTimeout(()=>{if(!detail.isConnected)return;outgoing?.cancel();detail.innerHTML=expDetail();detail.classList.remove('detail-animate');void detail.offsetWidth;detail.classList.add('detail-animate');},reduce.matches?0:120);
  }
  async function copyEmail(button){
    let copied=false;try{await navigator.clipboard.writeText(P.email);copied=true;}catch{
      const temp=document.createElement('textarea');temp.value=P.email;temp.style.cssText='position:fixed;left:-9999px;top:0';document.body.append(temp);temp.select();try{copied=document.execCommand('copy');}catch{}temp.remove();button.focus({preventScroll:true});
    }
    if(copied){button.textContent=t('copied');$('#status').textContent=t('copied');setTimeout(()=>{if(button.isConnected)button.textContent=t('copy');},1600);}
    else {const email=$('#contact-email');const range=document.createRange();range.selectNodeContents(email);const selection=getSelection();selection.removeAllRanges();selection.addRange(range);$('#status').textContent=t('copyFallback');button.textContent=t('copyFallback');}
  }
  function cvMarkup(){return `<div class="dialog-top"><span class="mono">CURRICULUM VITAE</span><button data-close-dialog>${t('close')}</button></div><h2 id="cv-title">${t('cvTitle')}</h2><p style="margin-top:22px">${t('cvIntro')}</p><div class="cv-options">${[['vi',A.cvVI],['en',A.cvEN]].map(([language,path])=>`<div class="cv-option">${t(language)}${path?`<a href="${e(path)}" target="_blank" rel="noopener noreferrer">${t('download')} ↗</a>`:`<span>${t('cvMissing')}</span>`}</div>`).join('')}</div>`;}
  function setLanguage(){
    const y=scrollY,hash=desiredRoute,oldFocus=document.activeElement?.dataset,openCV=$('#cv-dialog').open;
    lang=lang==='vi'?'en':'vi';write('workshop-language',lang);
    renderRoute(hash);scrollTo({top:y,behavior:'instant'});
    if(oldFocus?.language!==undefined)$('[data-language]').focus({preventScroll:true});
    if(openCV)$('#cv-dialog').innerHTML=cvMarkup();
    if($('#image-dialog').open)wm.renderLightbox();
    if(!reduce.matches)main.animate([{opacity:.65},{opacity:1}],{duration:160});
  }
  function closeMenu(){const dialog=$('#menu-dialog');if(dialog.open)dialog.close();const trigger=$('[data-menu]');trigger.setAttribute('aria-expanded','false');trigger.focus({preventScroll:true});}
  document.addEventListener('click',event=>{
    const target=event.target.closest?.('a,button,dialog');if(!target)return;
    if(target.matches('.skip-link')){event.preventDefault();main.focus({preventScroll:true});scrollTo({top:0,behavior:'instant'});return;}
    const route=target.closest('a[href^="#/"]');
    if(route&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey&&!event.altKey){event.preventDefault();const back=route.hash==='#/work'&&displayedRoute.startsWith('#/work/');closeMenu();go(route.hash,back);return;}
    if(target.matches('[data-language]')){setLanguage();return;}
    if(target.matches('[data-menu]')){$('#menu-dialog').showModal();target.setAttribute('aria-expanded','true');return;}
    if(target.matches('[data-close-dialog]')){const dialog=target.closest('dialog');if(dialog.id==='menu-dialog')closeMenu();else dialog.close();return;}
    if(target.matches('[data-cv]')){const d=$('#cv-dialog');d.innerHTML=cvMarkup();d.showModal();return;}
    if(target.matches('[data-copy]')){copyEmail(target);return;}
    if(target.matches('[data-experience]')){selectExperience(target.dataset.experience);return;}
    if(target.matches('[data-filter]')){filter=target.dataset.filter;renderResults(true);return;}
    if(target.matches('[data-view]')){view=target.dataset.view;write('workshop-view',view);renderResults(true);return;}
    if(target.matches('[data-scroll-gallery]')){$('#robot-gallery').scrollIntoView({behavior:reduce.matches?'instant':'smooth',block:'start'});return;}
    if(target.matches('[data-object]')){openObject(target);return;}
    if(target.matches('[data-close-object]')){closeObject(true);return;}
    if(target.matches('[data-enlarge]')){const p=PROJECTS.find(x=>x.slug===target.dataset.enlarge),d=$('#image-dialog');d.innerHTML=`<div class="dialog-top"><span class="mono">${e(L(p.name))}</span><button data-close-dialog>${t('close')}</button></div><img src="${e(p.image)}" alt="${e(L(p.name))}">`;d.showModal();return;}
  });
  document.addEventListener('click',event=>{if(!panel.hidden&&!event.target.closest('[data-object],#object-panel'))closeObject();
    if(event.target instanceof HTMLDialogElement){const r=event.target.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)event.target.close();}
  });
  $('#menu-dialog').addEventListener('close',()=>{const trigger=$('[data-menu]');trigger.setAttribute('aria-expanded','false');trigger.focus({preventScroll:true});});
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'){const dialog=$('dialog[open]');if(dialog){event.preventDefault();if(dialog.id==='menu-dialog')closeMenu();else dialog.close();}closeObject(true);hideTooltip();}
    const tab=event.target.closest?.('[data-experience]');if(!tab)return;
    const ids=EXPERIENCES.map(x=>x.id),i=ids.indexOf(experience);let next;
    if(event.key==='ArrowDown'||event.key==='ArrowRight')next=ids[(i+1)%ids.length];
    if(event.key==='ArrowUp'||event.key==='ArrowLeft')next=ids[(i+ids.length-1)%ids.length];
    if(event.key==='Home')next=ids[0];if(event.key==='End')next=ids.at(-1);
    if(next){event.preventDefault();selectExperience(next,true);}
  });
  document.addEventListener('pointerover',event=>{const b=event.target.closest('[data-object]');if(b&&!b.contains(event.relatedTarget))showTooltip(b);});
  document.addEventListener('pointerout',event=>{const b=event.target.closest('[data-object]');if(b&&!b.contains(event.relatedTarget)){hideTooltip();const el=$('.object-tilt',b);if(el){el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg');}if(tiltElement===el)tiltElement=null;}});
  document.addEventListener('focusin',event=>{const b=event.target.closest('[data-object]');if(b)showTooltip(b);});
  document.addEventListener('focusout',event=>{if(event.target.closest('[data-object]'))hideTooltip();});
  document.addEventListener('pointermove',event=>{if(reduce.matches||!fine.matches||event.pointerType==='touch')return;const b=event.target.closest('[data-object]');if(!b)return;const r=b.getBoundingClientRect(),el=$('.object-tilt',b);if(tiltElement!==el){tiltElement=el;tiltValue={x:0,y:0};}tiltTarget={x:Math.max(-4,Math.min(4,-((event.clientY-r.top)/r.height-.5)*8)),y:Math.max(-4,Math.min(4,((event.clientX-r.left)/r.width-.5)*8))};requestFrame();});
  /* Failed real media never produce a broken-image icon; retain original fallback. */
  document.addEventListener('error',event=>{const img=event.target;if(img.tagName==='IMG'&&img.dataset.fallback){const kind=img.dataset.fallback;const parent=img.parentElement;if(parent.matches('[data-enlarge]')){parent.replaceWith(document.createRange().createContextualFragment(art(kind)));}else img.outerHTML=art(kind);}},true);
  history.scrollRestoration='manual';
  const initialHash=location.hash||'#/home',initialKey=history.state?.portfolioKey||String(Date.now());
  history.replaceState({portfolioKey:initialKey},'',initialHash);currentKey=initialKey;desiredRoute=initialHash;
  renderRoute(initialHash);
})();
