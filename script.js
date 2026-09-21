/* Apply the saved theme immediately (this file loads in <head>) so the page never flashes the wrong colours */
try{var savedTheme=localStorage.getItem("theme");if(savedTheme==="light"||savedTheme==="dark")document.documentElement.setAttribute("data-theme",savedTheme)}catch(e){}

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
