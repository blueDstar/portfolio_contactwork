/* Original, code-native SVG illustrations. No stock portraits, models or external assets.
   The figures are stand-ins, not a likeness of Nguyễn Văn Đạt. */
window.WorkshopArt = (() => {
  let serial=0;
  const circle=(x,y,r,fill,extra='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
  const bolt=(x,y,r=5)=>circle(x,y,r,'#161819','stroke="#a4a6a5" stroke-width="1.5"')+`<path d="M${x-r/2} ${y}h${r}" stroke="#979b99"/>`;
  function draw(kind, options={}) {
    const id='art'+(++serial), m=`url(#${id}metal)`, dark=`url(#${id}dark)`, light=`url(#${id}light)`, skin=`url(#${id}skin)`;
    const board='#35604e', copper='#aa8050';
    const defs=`<defs>
      <linearGradient id="${id}metal" x1="0" y1="0" x2="1" y2=".8"><stop stop-color="#eeeeea"/><stop offset=".23" stop-color="#a5aaa7"/><stop offset=".48" stop-color="#4a504e"/><stop offset=".7" stop-color="#b2b8b3"/><stop offset="1" stop-color="#414744"/></linearGradient>
      <linearGradient id="${id}light" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f0efe8"/><stop offset=".48" stop-color="#a2a5a1"/><stop offset="1" stop-color="#424844"/></linearGradient>
      <linearGradient id="${id}dark"><stop stop-color="#151917"/><stop offset=".48" stop-color="#4c524e"/><stop offset="1" stop-color="#111513"/></linearGradient>
      <linearGradient id="${id}skin" x1="0" y1="0" x2="1" y2=".6"><stop stop-color="#cac7bf"/><stop offset=".5" stop-color="#8a8b83"/><stop offset="1" stop-color="#343a35"/></linearGradient>
      <radialGradient id="${id}lens"><stop stop-color="#57777c"/><stop offset=".35" stop-color="#0e2429"/><stop offset=".65" stop-color="#12191b"/><stop offset=".9" stop-color="#81908b"/><stop offset="1" stop-color="#161c1b"/></radialGradient>
    </defs>`;
    const pcb=(esp=false)=>`<g transform="translate(120 150) rotate(-12 200 140)"><path d="M0 0h400v250H0z" fill="${board}" stroke="#a0a89d" stroke-width="3"/><path d="M0 250h400v14H0z" fill="#172d26"/>
      ${Array.from({length:15},(_,i)=>`<path d="M${25+i*24} 24v20m0 156v22" stroke="${copper}" stroke-width="9"/>`).join('')}
      ${[0,1,2,3,4,5].map((i)=>`<path d="M${28+i*18} 70h${30+i*4}v${40+i*10}h${70+i*10}" fill="none" stroke="#6d9480" stroke-width="2"/>`).join('')}
      <rect x="135" y="67" width="126" height="118" rx="4" fill="${esp?m:'#171b19'}" stroke="#9da39b"/>
      ${esp?'<path d="M145 81h106v22H145z" fill="#a6aaa5"/><path d="M150 89h96" stroke="#535a54"/>':`<path d="M152 83h90v86h-90z" fill="${dark}" stroke="#6b726c"/>`}
      <rect x="300" y="53" width="74" height="59" fill="${m}"/><rect x="293" y="132" width="81" height="58" fill="${m}"/>
      <path d="M310 64h53v33h-53zM304 143h59v30h-59z" fill="#111715"/>
      ${Array.from({length:7},(_,i)=>`<rect x="${90+i*28}" y="${esp?30:214}" width="12" height="9" fill="${copper}"/>`).join('')}
      ${[[15,15],[385,15],[15,235],[385,235]].map(p=>bolt(...p,7)).join('')}
      <rect x="20" y="171" width="50" height="47" fill="${m}"/><path d="M28 180h33v24H28z" fill="#242b27"/>
      </g>`;
    const motor=()=>`<g transform="translate(310 290) rotate(-20)"><path d="M-120-115 40-150 155-75 140 75-20 122-140 45z" fill="${dark}" stroke="#7c837d" stroke-width="3"/>
      <path d="M-120-115v150L-20 122V-45z" fill="#242b26"/><path d="M-120-115 40-150 155-75-20-45z" fill="${m}"/>
      <ellipse cx="24" cy="3" rx="123" ry="120" fill="${m}" transform="rotate(-10)" stroke="#b5bab4" stroke-width="3"/>
      <ellipse cx="24" cy="3" rx="94" ry="94" fill="${dark}" stroke="#9da69c" stroke-width="2"/>
      <ellipse cx="24" cy="3" rx="70" ry="70" fill="#272f28" stroke="${copper}" stroke-width="14"/>
      ${Array.from({length:16},(_,i)=>`<path d="M24-70v18" stroke="#99754e" stroke-width="7" transform="rotate(${i*22.5} 24 3)"/>`).join('')}
      <circle cx="24" cy="3" r="42" fill="${m}"/><circle cx="24" cy="3" r="20" fill="#202722"/>
      <path d="M7-14 88-55l26 33L41 22z" fill="${m}"/><path d="M88-55 114-22l-7 12-27-33z" fill="#c4c9bf"/>
      ${[[24,-101],[119,3],[24,107],[-72,3]].map(p=>bolt(...p,7)).join('')}
      <path d="M-105 58q-75 36-64 108" fill="none" stroke="#544536" stroke-width="7"/><path d="M-96 66q-62 42-55 108" fill="none" stroke="#76796b" stroke-width="5"/>
      </g>`;
    const camera=()=>`<g transform="translate(130 150) rotate(-12 180 130)"><path d="M0 60 250 0l150 65-250 70z" fill="${m}"/><path d="M0 60v190l150 70V135z" fill="${dark}"/><path d="M150 135 400 65v190l-250 65z" fill="#424c44" stroke="#9ba59b" stroke-width="2"/><ellipse cx="274" cy="190" rx="95" ry="106" fill="${dark}" transform="rotate(16 274 190)"/><ellipse cx="284" cy="185" rx="76" ry="88" fill="url(#${id}lens)" transform="rotate(16 284 185)"/><ellipse cx="284" cy="185" rx="40" ry="47" fill="#0a1619"/><ellipse cx="269" cy="168" rx="15" ry="18" fill="#7b9490" opacity=".5"/>${[[169,150],[375,94],[168,292],[378,235]].map(p=>bolt(...p)).join('')}<path d="M45 132v85m18-76v85m18-76v85" stroke="#768077" stroke-width="5"/></g>`;
    const arm=()=>`<ellipse cx="310" cy="535" rx="200" ry="25" fill="#000" opacity=".4"/><g stroke-linejoin="round">
      <path d="m175 488 170-36 108 52-178 43z" fill="${m}" stroke="#929991"/><path d="M175 488v24l100 56 178-43v-21l-178 43z" fill="${dark}"/>
      ${[[200,491],[337,466],[425,508],[278,535]].map(p=>bolt(...p,6)).join('')}
      <path d="M262 481v-66l82-19v65z" fill="${dark}" stroke="#9aa298"/><ellipse cx="303" cy="415" rx="57" ry="25" fill="${m}"/>
      <path d="m269 415-53-140 52-29 69 151z" fill="${m}" stroke="#b5bcb3" stroke-width="2"/>
      <path d="m285 404-49-124 15-7 56 125z" fill="#303a32"/>
      <circle cx="241" cy="263" r="49" fill="${dark}" stroke="#929c92" stroke-width="3"/><circle cx="241" cy="263" r="32" fill="${m}"/><circle cx="241" cy="263" r="13" fill="#323c33"/>
      ${[0,1,2,3,4,5].map(i=>`<circle cx="241" cy="224" r="3" fill="#d5dad0" transform="rotate(${i*60} 241 263)"/>`).join('')}
      <path d="m226 222 120-117 35 41-110 126z" fill="${m}" stroke="#c2c8bc" stroke-width="2"/><path d="m244 220 106-96 10 12-104 103z" fill="#3d473d"/>
      <circle cx="366" cy="127" r="37" fill="${dark}" stroke="#b5bcb0" stroke-width="3"/><circle cx="366" cy="127" r="23" fill="${m}"/><circle cx="366" cy="127" r="9" fill="#1b261f"/>
      <path d="m392 111 80 44-20 40-78-35z" fill="${m}" stroke="#c4cabd" stroke-width="2"/>
      <ellipse cx="466" cy="177" rx="25" ry="30" fill="${dark}" transform="rotate(25 466 177)"/><path d="m481 168 25 16-8 17-24-16z" fill="${m}"/>
      <path d="m501 184 30-3 20 30-10 7-17-22-18 4m-9 1 8 29 31 12 3-12-24-11-5-21" fill="${m}" stroke="#b8c0b0" stroke-width="2"/>
      <path d="M323 402c-60-58-92-100-68-135s80-134 112-124 57 26 83 28" fill="none" stroke="#111a14" stroke-width="10"/><path d="M323 402c-60-58-92-100-68-135s80-134 112-124 57 26 83 28" fill="none" stroke="#7c8373" stroke-width="2"/>
      </g>`;
    const wheels=(x,y)=>`<g transform="translate(${x} ${y})"><ellipse rx="39" ry="57" fill="#151b17" stroke="#626b60" stroke-width="3"/><ellipse rx="23" ry="36" fill="${m}"/><ellipse rx="10" ry="18" fill="#242f25"/><path d="M-31-30-21-38m-17 27 13-8m-14 31 14-7m-9 28 12-9" stroke="#6d7569" stroke-width="3"/></g>`;
    const car=(mouse=false)=>`<ellipse cx="330" cy="489" rx="218" ry="25" fill="#000" opacity=".3"/>${wheels(215,337)}${wheels(445,322)}
      <path d="m115 364 267-73 142 76-263 84z" fill="${m}" stroke="#aeb7a8" stroke-width="2"/><path d="M115 364v46l146 90 263-89v-44l-263 84z" fill="${dark}"/>
      ${wheels(157,426)}${wheels(421,444)}<path d="m173 338 190-50 105 60-187 55z" fill="${board}" stroke="#879581" stroke-width="2"/>
      <g transform="translate(255 315) skewY(-16)"><rect width="118" height="70" fill="${m}"/><rect x="14" y="15" width="48" height="37" fill="#252f26"/><path d="M78 10v48m12-48v48m12-48v48" stroke="#4c584c" stroke-width="5"/></g>
      ${mouse?`<path d="M157 345v-65m40 59v-65m250 89v-65" stroke="${m}" stroke-width="12"/><circle cx="157" cy="279" r="15" fill="url(#${id}lens)"/><circle cx="197" cy="272" r="15" fill="url(#${id}lens)"/>`:`<path d="m359 293-9-112m25 108-5-112" stroke="${m}" stroke-width="10"/><path d="m325 175 72-16 20 35-73 18z" fill="${m}"/><ellipse cx="371" cy="190" rx="21" ry="17" fill="url(#${id}lens)"/><path d="M230 321v-90" stroke="#939d89" stroke-width="5"/><circle cx="230" cy="229" r="6" fill="#b8c1ab"/>`}
      ${[[137,366],[381,308],[496,367],[276,432]].map(p=>bolt(...p,5)).join('')}`;
    const stewart=()=>`<ellipse cx="319" cy="505" rx="214" ry="27" fill="#000" opacity=".3"/><path d="m110 431 138-75 221 58 52 59-232 61z" fill="${dark}" stroke="#899480" stroke-width="2"/>
      ${[[150,427,217,245],[241,476,217,245],[286,485,400,261],[468,456,400,261],[445,426,324,213],[207,396,324,213]].map(([x,y,x2,y2])=>`<path d="M${x} ${y} ${x2} ${y2}" stroke="#263226" stroke-width="15"/><path d="M${x} ${y} ${x2} ${y2}" stroke="${m}" stroke-width="8"/>${circle(x,y,12,dark)}${circle(x2,y2,10,m)}`).join('')}
      <path d="m135 245 147-78 209 60-107 101-233-43z" fill="${m}" stroke="#c0c7b5" stroke-width="2"/><path d="m135 245 16 40 233 43 107-101v16l-106 105-235-44z" fill="#3b4839"/>
      <path d="m185 242 105-53 151 44-65 65z" fill="#59664f" opacity=".55"/><ellipse cx="326" cy="232" rx="32" ry="11" fill="#182717" opacity=".5"/><circle cx="319" cy="204" r="29" fill="${light}"/>
      ${[[153,248],[282,181],[469,230],[380,313]].map(p=>bolt(...p)).join('')}`;
    const oled=()=>`<ellipse cx="318" cy="503" rx="153" ry="23" fill="#000" opacity=".3"/><path d="m218 390-22 77 83 15 12-69m77-14 2 78 85-19-28-75" fill="${dark}" stroke="#8b9884" stroke-width="3"/><path d="m212 291-42 70 24 40 30-29 13-57m190-16 42 54-19 40-27-19-21-59" fill="${m}"/>
      <rect x="223" y="280" width="197" height="141" rx="37" fill="${m}" stroke="#a8b3a0" stroke-width="3"/>
      <path d="M226 169q90-45 190 0l18 103q-109 45-225 0z" fill="${m}" stroke="#aeb8a6" stroke-width="3"/>
      <rect x="235" y="176" width="172" height="94" rx="25" fill="#102325"/><path d="M266 211q12-12 25 0m60 0q12-12 25 0" fill="none" stroke="#8abfc1" stroke-width="9" stroke-linecap="round"/><path d="M299 239q22 18 44-1" fill="none" stroke="#8abfc1" stroke-width="4" stroke-linecap="round"/>
      <path d="M318 155v-30" stroke="#83907e" stroke-width="5"/><circle cx="318" cy="119" r="9" fill="${light}"/><circle cx="321" cy="345" r="19" fill="${dark}"/><circle cx="321" cy="345" r="8" fill="#678f86"/>`;
    const hexapod=()=>`<ellipse cx="318" cy="490" rx="238" ry="25" fill="#000" opacity=".3"/>
      ${[[230,280,126,266,78,426],[242,333,121,361,93,493],[289,365,229,434,237,520],[389,288,472,274,548,406],[397,339,515,366,553,480],[366,368,423,448,425,517]].map(([x,y,a,b,c,d])=>`<path d="M${x} ${y} ${a} ${b} ${c} ${d}" fill="none" stroke="#262f25" stroke-width="26" stroke-linejoin="round"/><path d="M${x} ${y} ${a} ${b} ${c} ${d}" fill="none" stroke="${m}" stroke-width="14" stroke-linejoin="round"/>${circle(a,b,16,dark)}${bolt(a,b,7)}${circle(c,d,9,'#77886e')}`).join('')}
      <path d="m210 254 135-35 83 70-42 83-127-8-64-69z" fill="${m}" stroke="#a8b59e" stroke-width="3"/><path d="m230 265 106-23 65 50-26 52-104-5-49-46z" fill="${board}"/><path d="m276 273 54-8 32 28-18 29-55-3-25-29z" fill="#172519"/>${circle(303,285,8,'#91a18a')}${circle(338,285,8,'#91a18a')}`;
    const humanoid=()=>`<ellipse cx="322" cy="538" rx="126" ry="20" fill="#000" opacity=".3"/><g stroke="#9aa491" stroke-width="2"><path d="m270 346-21 105-10 65 58 9 13-66 10-92m30-21 16 100 13 70 57-10-13-76-22-93" fill="${m}"/><circle cx="276" cy="440" r="20" fill="${dark}"/><circle cx="397" cy="435" r="20" fill="${dark}"/><path d="m247 507-25 28 71 5 4-24m83-10 2 30 71-8-21-25" fill="${dark}"/><path d="m258 219-36 69-7 91 28 4 16-84 32-59m82-19 44 61 15 91-30 6-19-81-32-48" fill="${m}"/><circle cx="235" cy="288" r="20" fill="${dark}"/><circle cx="405" cy="285" r="20" fill="${dark}"/><path d="m257 203 62-20 64 18-10 111-31 55-56-6-32-53z" fill="${m}"/><path d="m279 221 40-12 42 12-8 64-32 20-35-18z" fill="${dark}"/><path d="M301 181v-25h39v29" fill="${dark}"/><path d="m278 88 46-15 44 17-2 54-30 28-38-9-22-29z" fill="${m}"/><path d="m288 111 65-2-6 21-52 2z" fill="#122a2d"/><path d="M299 117h11m19 0h12" stroke="#8aa9aa" stroke-width="4"/></g>`;
    const jig=(box=false)=>`<ellipse cx="325" cy="518" rx="220" ry="23" fill="#000" opacity=".3"/><g stroke="#939f8c" stroke-width="3"><path d="m128 413 257-62 153 87-258 82z" fill="${dark}"/><path d="m128 413 152 86 258-61v20l-258 82-152-86z" fill="${m}"/>
      <path d="M163 420V160l225-48v258M163 160l119 65 220-53M282 225v277m220-330v275" fill="none" stroke="${m}" stroke-width="15"/>
      <path d="m176 171 216-46 96 49-207 58z" fill="${box?'#4d5b45':'#263324'}" opacity=".6"/>
      ${box?'<path d="M180 187v218l104 65V243m104-98v225l99 54V192" fill="#7c8c73" opacity=".19"/><path d="m238 396 55-57 63 34 72 12 10 26-105 37-78-26z" fill="#b7c0aa"/>':`<path d="M382 153v84" stroke="${m}" stroke-width="12"/><path d="m347 231 58-14 27 29-63 17z" fill="${dark}"/><ellipse cx="383" cy="251" rx="17" ry="12" fill="url(#${id}lens)"/><path d="m245 399 90-25 80 45-92 28z" fill="${m}"/><path d="m294 368 20-38 42 21 8 47-32 18z" fill="#283a2a"/><path d="m299 365 18-23 26 14 9 34-25 15z" fill="#111d19"/><path d="m256 387 25 11 9 29m85-26-21 6-3 29" fill="none" stroke="${m}" stroke-width="10"/>`}</g>`;
    const gear=()=>`<g transform="translate(319 301) rotate(-17)">${Array.from({length:12},(_,i)=>`<path d="M-24-181h48l6 66h-60z" fill="${m}" stroke="#a6b09e" stroke-width="2" transform="rotate(${i*30})"/>`).join('')}<circle r="145" fill="${m}" stroke="#a9b39f" stroke-width="3"/><circle r="104" fill="${dark}"/><circle r="71" fill="${m}"/><circle r="40" fill="#182518"/>${[0,1,2,3,4,5].map(i=>`<circle cy="-124" r="8" fill="#243023" transform="rotate(${i*60})"/>`).join('')}</g>`;
    const encoder=()=>`<g transform="translate(320 300) rotate(-20)"><path d="M-110-100h220v190h-220z" fill="${dark}" stroke="#87967e" stroke-width="3"/><circle r="132" fill="${m}" stroke="#b7c0ae" stroke-width="3"/><circle r="105" fill="#36422e"/>${Array.from({length:32},(_,i)=>`<path d="M0-98v22" stroke="#c2c9b8" stroke-width="4" transform="rotate(${i*11.25})"/>`).join('')}<circle r="65" fill="${m}"/><circle r="32" fill="${dark}"/><path d="M-13-13 69-62 87-30 13 13z" fill="${m}"/>${[[-91,-91],[91,-91],[-91,91],[91,91]].map(p=>bolt(...p)).join('')}</g>`;
    function portrait(pointing=false) {
      return `<g stroke-linejoin="round"><ellipse cx="295" cy="686" rx="235" ry="25" fill="#000" opacity=".3"/>
      <path d="M178 469q72-24 154 7l36 151-61 62-57-116-51 113-76-12z" fill="${dark}" stroke="#677168"/><path d="m209 529 37 40-47 117-77-13m180-135 8 151" fill="none" stroke="#3b453d" stroke-width="3"/>
      <path d="m198 224 82-18 74 47 19 198q-93 63-209 13l-12-155z" fill="${dark}" stroke="#677169" stroke-width="1.4"/>
      <path d="M198 230q25 42 60 42 51 0 75-34l-22 114 22 116q-87 35-148-1l20-125z" fill="${light}"/>
      <path d="m222 217 6-45 65-9-6 68q-30 37-65-14z" fill="${skin}"/>
      <path d="m210 106 35-37 63 16 25 41-11 56-35 34-38-10-33-42z" fill="${skin}" stroke="#838c7d"/>
      <path d="M210 142q-31-80 32-91 62-13 89 44l-6 42-22-34q-25 12-67-4l-11 51-12 8z" fill="#111814"/>
      <path d="m323 140 16 24-17 7m-7 14-20 5" fill="none" stroke="#464f44" stroke-width="2"/><path d="m288 139 15 2" fill="none" stroke="#313c31" stroke-width="3"/>
      <path d="m181 232-25 27-25 118 38 11 36-97m118-52 30 29 29 101-36 14-44-90" fill="${dark}" stroke="#899080" stroke-width="1.5"/>
      <path d="m179 252-24 101m180-96 32 96" fill="none" stroke="#68715f" stroke-width="2"/>
      ${pointing?`<path d="m134 365 19 41 207-29 10-26-35 3-166 21-6-19m185 8 14 40 68-49-16-23-42 26" fill="${skin}" stroke="#85927d"/>
      <path d="m343 354 39-8 69-17 3 9-58 19 28-3 4 9-37 17-31-3zM413 331l35-22 73-15 2 9-65 19 32-1 2 8-35 18-28 8z" fill="${skin}" stroke="#8e9986"/>
      <path d="m400 352 14 6m41-33 12 7" stroke="#59674f" fill="none" stroke-width="2"/>`:
      `<path d="m134 365 12 30 83 45 30-27-92-50zm213-4 19 32-54 36-22-27 52-47z" fill="${skin}" stroke="#889180"/>
      <path d="m227 413 31-3 32 20-8 14-26-8-20 5-15-13zM291 402l23 9 16 24-10 12-11-21-22-9z" fill="${skin}" stroke="#9aa58c"/>
      <path d="M77 440h425v18H77z" fill="${m}"/><path d="M77 458h425v13H77z" fill="#283326"/><path d="M105 470v217m364-217v217" stroke="${dark}" stroke-width="15"/>
      <path d="m235 435 70-20 57 21-75 18z" fill="${board}" stroke="#8e9d81"/><rect x="268" y="420" width="34" height="19" fill="${m}"/><path d="m370 430 54 6m-54-3 54 6" stroke="#adb79e" stroke-width="4"/><path d="M127 429h55" stroke="#9ca78f" stroke-width="6"/><path d="m176 426 21 9" stroke="#4e6349" stroke-width="10"/>`}
      <path d="m128 675-19 20q37 21 93 0l-4-15m110 6 2 14q49 8 72-9l-21-30" fill="#172219" stroke="#596852"/>
      <path d="m207 298-9 113m104-113 12 99m-94-131 38 18 45-22" fill="none" stroke="#e4e5d9" stroke-opacity=".18" stroke-width="2"/>
      </g>`;
    }
    const painters={pi:()=>pcb(),esp32:()=>pcb(true),pcb:()=>pcb(),motor,camera,arm,car:()=>car(),mouse:()=>car(true),stewart,oled,hexapod,humanoid,jig:()=>jig(),box:()=>jig(true),gear,encoder,assembly:()=>portrait(),pointing:()=>portrait(true)};
    const tall=['assembly','pointing'].includes(kind);
    return `<svg class="workshop-svg" viewBox="0 0 640 ${tall?720:600}" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${defs}${(painters[kind]||painters.arm)()}</svg>`;
  }
  return {draw};
})();
