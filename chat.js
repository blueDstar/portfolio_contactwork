/* Optional future adapter: blueDStarChat.connect(async ({message,history,language}) => text).
   No model, request, key, storage or fabricated bot reply is configured by default. */
window.blueDStarChat = (() => {
  'use strict';
  const dialog=document.querySelector('#chat-dialog'),launch=document.querySelector('[data-chat-open]');
  const input=dialog.querySelector('textarea'),form=dialog.querySelector('form'),send=form.querySelector('button');
  const log=dialog.querySelector('.chat-messages'),state=dialog.querySelector('.chat-state');
  let language='vi',handler=null,busy=false,history=[];
  const words={
    vi:{title:'Một cuộc trò chuyện mới.',welcome:'Xin chào, tôi là Đạt.',intro:'Chatbot đang được chuẩn bị. Trong lúc chờ, bạn có thể liên hệ với tôi qua email.',offline:'CHATBOT SẮP CÓ',ready:'SẴN SÀNG TRÒ CHUYỆN',waiting:'ĐANG TRẢ LỜI…',placeholder:'Chatbot sẽ sớm có mặt…',activePlaceholder:'Bạn muốn trao đổi điều gì?',send:'Gửi tin nhắn',close:'Đóng trò chuyện',message:'Tin nhắn',error:'Chưa nhận được phản hồi. Bạn có thể thử lại.'},
    en:{title:'A new conversation.',welcome:'Hello, I’m Dat.',intro:'The chatbot is being prepared. In the meantime, you can reach me by email.',offline:'CHATBOT COMING SOON',ready:'READY TO CHAT',waiting:'REPLYING…',placeholder:'The chatbot is coming soon…',activePlaceholder:'What would you like to talk about?',send:'Send message',close:'Close chat',message:'Message',error:'No reply received. You can try again.'}
  };
  const text=()=>words[language];
  function placeLauncher(){
    const base=innerWidth<=560?16:24;
    launch.style.bottom=base+'px';
    let box=launch.getBoundingClientRect(),bottom=base;
    for(const target of document.querySelectorAll('.hero-bottom,.contact-band .round-link')){
      const r=target.getBoundingClientRect();
      if(r.top<innerHeight&&r.bottom>0&&r.left<box.right&&r.right>box.left&&r.top<box.bottom&&r.bottom>box.top){
        bottom=Math.max(bottom,innerHeight-r.top+12);
        launch.style.bottom=bottom+'px';box=launch.getBoundingClientRect();
      }
    }
  }
  function refresh(){
    const t=text();
    dialog.querySelector('#chat-title').textContent=t.title;
    const welcome=dialog.querySelector('.chat-welcome');
    if(welcome){welcome.querySelector('h3').textContent=t.welcome;welcome.querySelector('p').textContent=t.intro;}
    dialog.querySelector('[data-chat-close]').setAttribute('aria-label',t.close);
    form.querySelector('label').textContent=t.message;
    input.placeholder=handler?t.activePlaceholder:t.placeholder;input.disabled=!handler||busy;
    send.disabled=!handler||busy||!input.value.trim();send.setAttribute('aria-label',t.send);
    state.textContent=busy?t.waiting:handler?t.ready:t.offline;
    dialog.dataset.connected=String(!!handler);placeLauncher();
  }
  function message(role,value){
    const p=document.createElement('p');p.className='chat-message '+role;p.textContent=value;log.append(p);log.scrollTop=log.scrollHeight;
  }
  launch.addEventListener('click',()=>{refresh();dialog.showModal();launch.setAttribute('aria-expanded','true');dialog.querySelector('[data-chat-close]').focus({preventScroll:true});});
  dialog.querySelector('[data-chat-close]').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{launch.setAttribute('aria-expanded','false');launch.focus({preventScroll:true});});
  addEventListener('scroll',placeLauncher,{passive:true});addEventListener('resize',placeLauncher,{passive:true});
  input.addEventListener('input',()=>{send.disabled=!handler||busy||!input.value.trim();});
  input.addEventListener('keydown',event=>{if(event.key==='Enter'&&!event.shiftKey&&!event.isComposing){event.preventDefault();form.requestSubmit();}});
  form.addEventListener('submit',async event=>{
    event.preventDefault();const value=input.value.trim();if(!handler||busy||!value)return;
    const adapter=handler;message('user',value);input.value='';busy=true;refresh();
    const previous=[...history];history.push({role:'user',content:value});
    try{
      const response=await adapter({message:value,history:previous,language});
      const reply=typeof response==='string'?response:response?.text;
      if(!reply)throw Error('Empty response');
      history.push({role:'assistant',content:reply});message('assistant',reply);
    }catch{message('chat-error',text().error);}
    finally{busy=false;refresh();if(dialog.open)input.focus({preventScroll:true});}
  });
  refresh();
  return {
    setLanguage(value){language=value==='en'?'en':'vi';refresh();},
    connect(adapter){if(typeof adapter!=='function')throw TypeError('Chat adapter must be a function');handler=adapter;refresh();},
    disconnect(){handler=null;refresh();}
  };
})();
