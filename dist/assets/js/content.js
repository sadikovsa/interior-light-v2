(() => {
 'use strict';
 const root=document.querySelector('.content-r3');
 if(!root)return;
 const copy=JSON.parse(document.querySelector('#r3-interface-copy').textContent);
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const cases=[...root.querySelectorAll('[data-r3-case]')];
 const filters=[...root.querySelectorAll('[data-r3-filter]')];
 filters.forEach(button=>{
  button.disabled=false;
  button.addEventListener('click',()=>{
   filters.forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
   cases.forEach(item=>{item.hidden=button.dataset.r3Filter!=='all'&&item.dataset.category!==button.dataset.r3Filter;});
   const visible=cases.filter(item=>!item.hidden).length;
   root.querySelector('[data-r3-count]').textContent=copy.filter.count.replace('{count}',visible);
   root.querySelector('.projects-empty').hidden=visible>0;
   window.ScrollTrigger?.refresh();
  });
 });
 const links=[...root.querySelectorAll('[data-r3-gallery]')];
 const dialog=document.querySelector('.r3-dialog');
 const image=dialog.querySelector('.gallery__image');
 const caption=dialog.querySelector('figcaption');
 const counter=dialog.querySelector('.gallery__count');
 const galleryStatus=dialog.querySelector('.r3-gallery-status');
 const controls=[...dialog.querySelectorAll('button')];
 let active=0,requested=0,restoreTarget,request=0,touch;
 async function display(index){
  requested=index;
  const job=++request, link=links[index];
  galleryStatus.textContent=copy.gallery.loading;
  const incoming=new Image();incoming.src=link.href;
  try { await incoming.decode();
   if(job!==request||!dialog.open)return;
   active=index;image.src=incoming.src;image.alt=link.querySelector('img').alt;
   image.width=incoming.naturalWidth;image.height=incoming.naturalHeight;
   caption.textContent=link.closest('figure').querySelector('figcaption').textContent;
   counter.textContent=copy.gallery.counter.replace('{current}',index+1).replace('{total}',links.length);
   galleryStatus.textContent='';
  }catch {if(job===request&&dialog.open){requested=active;galleryStatus.textContent=copy.gallery.error;}}
 }
 function change(step){return display((requested+step+links.length)%links.length);}
 links.forEach((link,index)=>link.addEventListener('click',event=>{
  if(typeof dialog.showModal!=='function')return;
  event.preventDefault();restoreTarget=link;dialog.showModal();controls[0].focus();display(index);
 }));
 dialog.querySelector('.gallery__close').addEventListener('click',()=>dialog.close());
 dialog.querySelector('[data-gallery-prev]').addEventListener('click',()=>change(-1));
 dialog.querySelector('[data-gallery-next]').addEventListener('click',()=>change(1));
 dialog.addEventListener('close',()=>{if(dialog.open)return;request++;requested=active;touch=null;galleryStatus.textContent='';restoreTarget?.focus({preventScroll:true});});
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
 dialog.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'){event.preventDefault();change(-1);}
  if(event.key==='ArrowRight'){event.preventDefault();change(1);}
  if(event.key==='Tab'){
   const first=controls[0],last=controls[controls.length-1];
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  }
 });
 image.addEventListener('touchstart',event=>{touch=event.changedTouches[0];},{passive:true});
 image.addEventListener('touchend',event=>{if(!touch)return;const end=event.changedTouches[0],x=end.clientX-touch.clientX,y=end.clientY-touch.clientY;if(Math.abs(x)>48&&Math.abs(x)>Math.abs(y))change(x<0?1:-1);touch=null;},{passive:true});
 root.querySelectorAll('.r3-faq-item').forEach(detail=>{
  const summary=detail.querySelector('summary'),answer=detail.querySelector('.r3-faq-answer');
  detail.open=false;
  let animation,intended=false;
  summary.addEventListener('click',event=>{
   event.preventDefault();intended=!intended;
   const height=detail.open?answer.getBoundingClientRect().height:0;
   const opacity=detail.open?Number(getComputedStyle(answer).opacity):0;
   animation?.cancel();
   if(reduced.matches){detail.open=intended;return;}
   detail.open=true;
   animation=answer.animate([{height:height+'px',opacity},{height:(intended?answer.scrollHeight:0)+'px',opacity:intended?1:0}],{duration:280,easing:'cubic-bezier(.22,1,.36,1)'});
   animation.onfinish=()=>{detail.open=intended;animation=null;};
  });
 });
 const form=root.querySelector('.r3-form'),submit=form.querySelector('.form-submit'),status=form.querySelector('.form-status');
 submit.disabled=false;
 form.addEventListener('submit',event=>event.preventDefault());
 submit.addEventListener('click',()=>{
  const errors=[];
  ['name','contact','message'].forEach(name=>{
   const input=form.elements.namedItem(name),value=input.value.trim();
   let error='';
   if(name==='name'&&!value)error=copy.errors.name;
   if(name==='message'&&!value)error=copy.errors.message;
   if(name==='contact'){
    const digits=value.replace(/\D/g,'');
    if(!value)error=copy.errors.contactEmpty;
    else if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)||(/^[+\d\s().-]+$/.test(value)&&digits.length>=7&&digits.length<=15)))error=copy.errors.contactInvalid;
   }
   root.querySelector('#'+name+'-error').textContent=error;
   input.setAttribute('aria-invalid',String(Boolean(error)));
   if(error)errors.push(input);
  });
  status.classList.toggle('is-error',errors.length>0);
  status.textContent=errors.length?copy.errors.summary:copy.success;
  if(errors.length)errors[0].focus();else status.focus({preventScroll:true});
 });
})();
