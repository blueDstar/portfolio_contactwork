/* Curated media, a static CAD angle sequence, and a native-dialog lightbox.
   No generated mechanical views, autoplay, or 3D claims for static images. */
window.WorkshopMedia = (() => {
  'use strict';
  const MEDIA=window.WORKSHOP_MEDIA;
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let language=()=> 'vi',translate=k=>k,reduced=()=>false,installed=false;
  const L=value=>typeof value==='object'?value[language()]||value.vi:value;
  const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
  const selectedAngles=new Map();
  let lightbox=null,loadToken=0,swipe=null,ignoreClickUntil=0;

  function image(id,options={}){
    const m=MEDIA[id];if(!m)return '';
    const priority=options.priority?'fetchpriority="high" loading="eager"':'loading="lazy"';
    const pos=m.position||'50% 50%',mobile=m.mobilePosition||pos;
    return `<img src="${m.src}" srcset="${m.srcset}" sizes="${options.sizes||'(max-width: 768px) calc(100vw - 44px), 1000px'}" width="${m.width}" height="${m.height}" alt="${esc(L(m.alt))}" decoding="async" ${priority} data-media-id="${id}" class="${esc(options.className||'')}" style="--media-position:${esc(pos)};--media-mobile-position:${esc(mobile)}"${options.fallback?` data-fallback="${options.fallback}"`:''}>`;
  }
  function kindLabel(m){return translate({photo:'mediaPhoto',cad:'mediaCAD',simulation:'mediaSimulation',gui:'mediaGUI',reference:'mediaReference'}[m.kind]||'mediaStudio');}
  function figure(id,p,options={}){
    const m=MEDIA[id];if(!m)return '';
    const index=p.gallery.indexOf(id);
    return `<figure class="media-figure kind-${m.kind||'photo'} ${options.className||''}"><button class="gallery-image" data-gallery-open="${p.slug}" data-gallery-index="${index}" aria-label="${esc(translate('openImage')+': '+L(m.alt))}">${image(id,{sizes:options.sizes||'(max-width: 768px) calc(100vw - 44px), 1280px'})}<span class="image-open-label mono">${translate('openImage')} <span aria-hidden="true">↗</span></span></button><figcaption><span class="mono media-kind">${kindLabel(m)}</span><span>${esc(L(m.caption))}</span></figcaption></figure>`;
  }
  function viewer(p){
    if(!p.views?.length)return '';
    const index=Math.min(selectedAngles.get(p.slug)||0,p.views.length-1),id=p.views[index],m=MEDIA[id];
    return `<section class="mechanism-section" data-angle-project="${p.slug}"><div class="mechanism-heading"><div><p class="eyebrow">${translate('mechanismLabel')}</p><h2>${translate('exploreMechanism')}</h2></div><p>${translate('staticViews')}</p></div><div class="angle-stage" id="mechanism-stage" data-swipe="angles" aria-busy="false"><button class="angle-open" data-gallery-open="${p.slug}" data-gallery-index="${p.gallery.indexOf(id)}" aria-label="${esc(translate('openImage')+': '+L(m.alt))}">${image(id,{className:'angle-layer',sizes:'(max-width: 768px) calc(100vw - 44px), 1100px'})}</button><span class="angle-number mono" aria-hidden="true">${String(index+1).padStart(2,'0')} / ${String(p.views.length).padStart(2,'0')}</span></div><div class="angle-caption" aria-live="polite"><strong>${esc(L(m.viewLabel))}</strong><span>${esc(L(m.caption))}</span></div><div class="angle-controls"><button data-angle-step="-1" aria-label="${translate('previousImage')}">←</button><div class="angle-options" role="group" aria-label="${translate('viewAngles')}">${p.views.map((key,i)=>{const item=MEDIA[key];return `<button data-angle-index="${i}" aria-pressed="${i===index}" aria-controls="mechanism-stage"><img src="${item.thumbnail}" width="100" height="75" alt="" loading="lazy"><span>${esc(L(item.viewLabel))}</span></button>`;}).join('')}</div><button data-angle-step="1" aria-label="${translate('nextImage')}">→</button></div></section>`;
  }
  const project=slug=>window.PORTFOLIO.PROJECTS.find(p=>p.slug===slug);
  function selectAngle(slug,index,focus=false){
    const p=project(slug),section=$(`[data-angle-project="${slug}"]`);if(!p||!section)return;
    index=(index+p.views.length)%p.views.length;selectedAngles.set(slug,index);
    const stage=$('.angle-stage',section),token=(stage._loadToken||0)+1;stage._loadToken=token;
    $$('[data-angle-index]',section).forEach(b=>{const active=Number(b.dataset.angleIndex)===index;b.setAttribute('aria-pressed',String(active));if(active&&focus)b.focus({preventScroll:true});});
    const id=p.views[index],m=MEDIA[id],img=new Image();
    stage.setAttribute('aria-busy','true');
    img.className='angle-layer';img.alt=L(m.alt);img.width=m.width;img.height=m.height;
    img.loading='eager';img.decoding='async';
    const button=$('.angle-open',stage),old=$$('.angle-layer',button);
    old.filter(x=>x.dataset.pending==='true').forEach(x=>x.remove());
    const previous=old.filter(x=>x.isConnected);previous.slice(0,-1).forEach(x=>x.remove());
    previous.slice(-1).forEach(x=>{x.getAnimations().forEach(a=>a.cancel());x.style.opacity='1';});
    img.dataset.pending='true';img.style.opacity='0';button.append(img);
    // Selection is immediate; native load events complete the visual crossfade.
    // Do not wait on decode() of a detached image, which can be deferred in an
    // offscreen frame even though the user has already changed the selection.
    button.dataset.galleryIndex=p.gallery.indexOf(id);
    button.setAttribute('aria-label',translate('openImage')+': '+L(m.alt));
    $('.angle-number',stage).textContent=`${String(index+1).padStart(2,'0')} / ${String(p.views.length).padStart(2,'0')}`;
    $('.angle-caption',section).innerHTML=`<strong>${esc(L(m.viewLabel))}</strong><span>${esc(L(m.caption))}</span>`;
    const ready=()=>{
      if(!stage.isConnected||stage._loadToken!==token)return;
      delete img.dataset.pending;img.style.opacity='1';
      stage.setAttribute('aria-busy','false');
      if(reduced()){previous.forEach(x=>x.remove());return;}
      const incoming=img.animate([{opacity:0,transform:'translateX(8px)'},{opacity:1,transform:'translateX(0)'}],{duration:550,easing:'cubic-bezier(.22,1,.36,1)'});
      incoming.finished.then(()=>{previous.forEach(x=>x.remove());}).catch(()=>{});
    };
    img.onload=ready;
    img.onerror=()=>{if(stage.isConnected&&stage._loadToken===token){img.remove();stage.setAttribute('aria-busy','false');$('#status').textContent=translate('imageLoadError');}};
    img.sizes='(max-width: 768px) calc(100vw - 44px), 1100px';img.srcset=m.srcset;img.src=m.src;
    if(img.complete&&img.naturalWidth)ready();
  }
  function stepAngle(section,delta,focus=false){const slug=section.dataset.angleProject,p=project(slug);selectAngle(slug,(selectedAngles.get(slug)||0)+delta,focus);}

  function renderLightbox(){
    if(!lightbox)return;
    const p=project(lightbox.slug),id=p.gallery[lightbox.index],m=MEDIA[id],dialog=$('#image-dialog');
    const token=++loadToken;dialog.setAttribute('aria-busy','true');
    $('.lightbox-counter',dialog).textContent=`${lightbox.index+1} / ${p.gallery.length}`;
    $('.lightbox-title',dialog).textContent=L(p.name);
    $('[data-lightbox-original]',dialog).href=m.full;
    $('.lightbox-caption',dialog).innerHTML=`<span class="mono">${kindLabel(m)}</span><p>${esc(L(m.caption))}</p>`;
    $('[data-lightbox-color]',dialog).textContent=translate(lightbox.original?'originalColor':'monochrome');
    $('[data-lightbox-color]',dialog).setAttribute('aria-pressed',String(lightbox.original));
    dialog.classList.toggle('is-monochrome',!lightbox.original);
    const img=new Image();img.alt=L(m.alt);img.className='lightbox-photo';img.loading='eager';img.decoding='async';
    const full=m.variants.at(-1);img.width=full.width;img.height=full.height;
    $('.lightbox-stage',dialog).replaceChildren(img);
    const ready=()=>{
      if(!lightbox||token!==loadToken||!dialog.open)return;
      dialog.setAttribute('aria-busy','false');
      if(!reduced())img.animate([{opacity:.4,transform:'translateX(8px)'},{opacity:1,transform:'translateX(0)'}],{duration:280,easing:'ease-out'});
    };
    img.onload=ready;img.onerror=()=>{if(token===loadToken){$('.lightbox-stage',dialog).textContent=translate('imageLoadError');dialog.setAttribute('aria-busy','false');}};
    img.src=m.full;if(img.complete&&img.naturalWidth)ready();
  }
  function open(slug,index,opener){
    const p=project(slug);if(!p?.gallery?.length)return;
    const dialog=$('#image-dialog');
    lightbox={slug,index:Number(index)||0,openerIndex:Number(index)||0,original:true,opener,scroll:scrollY};
    dialog.innerHTML=`<div class="lightbox-top"><div><span class="mono lightbox-title"></span><span class="lightbox-counter mono" aria-live="polite"></span></div><button data-lightbox-close>${translate('close')} <span aria-hidden="true">×</span></button></div><div class="lightbox-stage" data-swipe="lightbox"></div><div class="lightbox-bottom"><div class="lightbox-caption"></div><div class="lightbox-controls"><button data-lightbox-step="-1" aria-label="${translate('previousImage')}">←</button><button data-lightbox-color aria-pressed="true">${translate('originalColor')}</button><button data-lightbox-step="1" aria-label="${translate('nextImage')}">→</button><a data-lightbox-original target="_blank" rel="noopener noreferrer">${translate('openOriginal')} ↗</a></div></div>`;
    dialog.showModal();renderLightbox();$('[data-lightbox-close]',dialog).focus({preventScroll:true});
  }
  function stepLightbox(delta){if(!lightbox)return;const length=project(lightbox.slug).gallery.length;lightbox.index=(lightbox.index+delta+length)%length;renderLightbox();}
  function close(){if($('#image-dialog').open)$('#image-dialog').close();}
  function configure(settings){
    language=settings.language;translate=settings.translate;reduced=settings.reduced;
    if(installed)return;installed=true;
    document.addEventListener('click',event=>{
      const button=event.target.closest?.('button');if(!button)return;
      if(button.matches('[data-gallery-open]')){if(performance.now()<ignoreClickUntil){event.preventDefault();return;}open(button.dataset.galleryOpen,button.dataset.galleryIndex,button);return;}
      const section=button.closest('[data-angle-project]');
      if(button.matches('[data-angle-index]')&&section){selectAngle(section.dataset.angleProject,Number(button.dataset.angleIndex));return;}
      if(button.matches('[data-angle-step]')&&section){stepAngle(section,Number(button.dataset.angleStep));return;}
      if(button.matches('[data-lightbox-step]')){stepLightbox(Number(button.dataset.lightboxStep));return;}
      if(button.matches('[data-lightbox-close]')){close();return;}
      if(button.matches('[data-lightbox-color]')&&lightbox){lightbox.original=!lightbox.original;$('#image-dialog').classList.toggle('is-monochrome',!lightbox.original);button.setAttribute('aria-pressed',String(lightbox.original));button.textContent=translate(lightbox.original?'originalColor':'monochrome');}
    });
    document.addEventListener('keydown',event=>{
      if($('#image-dialog').open&&lightbox){
        if(event.key==='Escape'){event.preventDefault();event.stopImmediatePropagation();close();return;}
        if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();stepLightbox(event.key==='ArrowLeft'?-1:1);return;}
      }
      const section=event.target.closest?.('[data-angle-project]');if(!section)return;
      const p=project(section.dataset.angleProject);
      if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){
        event.preventDefault();
        if(event.key==='Home'||event.key==='End')selectAngle(p.slug,event.key==='Home'?0:p.views.length-1,true);
        else stepAngle(section,event.key==='ArrowLeft'?-1:1,true);
      }
    });
    document.addEventListener('pointerdown',event=>{const zone=event.target.closest?.('[data-swipe]');if(zone)swipe={zone,x:event.clientX,y:event.clientY,id:event.pointerId};},{passive:true});
    document.addEventListener('pointerup',event=>{
      if(!swipe||event.pointerId!==swipe.id)return;
      const {zone,x,y}=swipe;swipe=null;const dx=event.clientX-x,dy=event.clientY-y;
      if(Math.abs(dx)<45||Math.abs(dx)<Math.abs(dy)*1.35)return;
      ignoreClickUntil=performance.now()+350;
      if(zone.dataset.swipe==='lightbox')stepLightbox(dx<0?1:-1);
      else {const section=zone.closest('[data-angle-project]');if(section)stepAngle(section,dx<0?1:-1);}
    },{passive:true});
    document.addEventListener('pointercancel',()=>{swipe=null;});
    $('#image-dialog').addEventListener('close',()=>{
      ++loadToken;const previous=lightbox;lightbox=null;
      if(!previous)return;
      const opener=previous.opener?.isConnected?previous.opener:$(`[data-gallery-open="${previous.slug}"][data-gallery-index="${previous.openerIndex}"]`);
      opener?.focus({preventScroll:true});scrollTo({top:previous.scroll,behavior:'instant'});
      $('#image-dialog').classList.remove('is-monochrome');
    });
  }
  return {configure,image,figure,viewer,renderLightbox,close,media:MEDIA};
})();
