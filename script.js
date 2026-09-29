/* Apply the saved theme immediately (this file loads in <head>) so the page never flashes the wrong colours */
try{var savedTheme=localStorage.getItem("theme");if(savedTheme==="light"||savedTheme==="dark")document.documentElement.setAttribute("data-theme",savedTheme)}catch(e){}

/* Turn on the staggered reveal only when the browser can run it and the visitor allows motion */
var canReveal="IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(canReveal)document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded",function(){
  var burger=document.getElementById('burger'), menu=document.getElementById('menu');
  burger.addEventListener('click',function(){
    var open=menu.classList.toggle('open');
    burger.setAttribute('aria-expanded',open?'true':'false');
  });
  menu.addEventListener('click',function(e){
    if(e.target.tagName==='A'){menu.classList.remove('open');burger.setAttribute('aria-expanded','false');}
  });

  var root=document.documentElement, tbtn=document.getElementById('theme'), tlabel=document.getElementById('theme-label');
  function isDark(){var t=root.getAttribute('data-theme');return t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;}
  function paintTheme(){var d=isDark();tbtn.classList.toggle('is-dark',d);tlabel.textContent=d?'Light':'Dark';tbtn.setAttribute('aria-label',d?'Switch to light mode':'Switch to dark mode');}
  tbtn.addEventListener('click',function(){
    var next=isDark()?'light':'dark';
    root.setAttribute('data-theme',next);
    try{localStorage.setItem('theme',next);}catch(e){}
    paintTheme();
  });
  paintTheme();

  /* Sequential reveal: every text block starts hidden and appears one after another, on its own, as it comes into view */
  if(canReveal){
    var parts='h1, .role, .info, .lede, .cta-row, h2, .sec-note, .eyebrow, .about p, .value-title, .value li, .facts li, .service, .skillset, .shot, .pbody h3, .ptags, .pblock, .pbody .link, .degree, .cert-list li, .contact > .wrap > .contact-grid > div > p, .contact-list li, .form-card, footer';
    var items=Array.prototype.slice.call(document.querySelectorAll(parts));
    var STEP=170, queue=[], timer=null, last=Date.now()+250;
    function onScreen(el){var r=el.getBoundingClientRect();return r.bottom>0&&r.top<window.innerHeight;}
    function drain(){
      timer=null;
      while(queue.length){
        var el=queue.shift();
        el.classList.add('in');
        if(onScreen(el)){last=Date.now();break;}
      }
      if(queue.length)wait();
    }
    function wait(){if(timer)return;timer=setTimeout(drain,Math.max(0,last+STEP-Date.now()));}
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){if(en.isIntersecting){queue.push(en.target);io.unobserve(en.target);}});
      queue.sort(function(x,y){return items.indexOf(x)-items.indexOf(y);});
      wait();
    },{threshold:0.1,rootMargin:'0px 0px -6% 0px'});
    items.forEach(function(el){el.classList.add('rv');io.observe(el);});
  }

  document.getElementById('send').addEventListener('click',function(){
    var n=document.getElementById('f-name').value.trim();
    var e=document.getElementById('f-email').value.trim();
    var m=document.getElementById('f-msg').value.trim();
    var note=document.getElementById('note');
    if(!n||!m){note.textContent='Please add your name and a short message first.';note.style.color='var(--amber)';return;}
    note.textContent='This opens your email app with the message ready to send.';
    note.style.color='var(--ink-soft)';
    var body='Name: '+n+'\nEmail: '+e+'\n\n'+m;
    window.location.href='mailto:rahmamohammed3456@gmail.com?subject='+encodeURIComponent('Project enquiry from '+n)+'&body='+encodeURIComponent(body);
  });
});
