const $=s=>document.querySelector(s),cv=$('#c'),g=cv.getContext('2d'),ui=$('#ui'),W=800,H=400,GY=330;
/* ---------- Ma'lumotlar ---------- */
const IT=[
{id:0,t:'w',n:'Mushtlar',d:0,sp:1,c:0},{id:1,t:'w',n:'Qilich',d:4,sp:1,c:120},
{id:2,t:'w',n:'Nunchaku',d:7,sp:1.25,c:300},{id:3,t:'w',n:'Katana',d:12,sp:1.1,c:30,gem:1},
{id:4,t:'a',n:'Mato kiyim',h:0,c:0},{id:5,t:'a',n:'Charm zirh',h:25,c:100},{id:6,t:'a',n:'Temir zirh',h:55,c:260},
{id:7,t:'c',n:'Qizil soya',col:'#05060a',gl:'#e8453c',c:0},{id:8,t:'c',n:"Ko'k aura",col:'#05060a',gl:'#3aa0ff',c:15,gem:1},
{id:9,t:'c',n:'Oltin soya',col:'#0a0805',gl:'#ffd24a',c:25,gem:1}];
const WD=[{n:'Soya vodiysi',s:['#1b1030','#5a2a3a','#c4603f']},{n:"Muz cho'qqilari",s:['#0d1b2e','#2c5a7a','#9fd3e8']},{n:"Olov qal'asi",s:['#220a0a','#6a1d12','#ff8a3a']}];
const NM=['Qaroqchi','Qorovul','Sakrovchi','BOSS Kuroi','Muzchi','Temirchi','Shamol','BOSS Frost','Olovchi','Ninja','Sher','BOSS Ejderxo'];
const SY=['rush','guard','jump','boss'];
const CL=['#2a1426','#26202e','#1f2a2a','#3a0f18','#16283a','#2a2f3a','#1c3030','#0f2a4a','#3a1a0a','#2a0f0f','#3a2a0a','#4a0a0a'];
const ST=NM.map((n,i)=>({n,y:SY[i%4],b:i%4==3,c:CL[i],hp:70+i*16,d:4.5+i*.9,g:30+i*12,x:20+i*8}));
const AI={rush:{a:.75,b:.1,j:0,k:.3},guard:{a:.4,b:.5,j:0,k:.4},jump:{a:.55,b:.15,j:.35,k:.5},boss:{a:.7,b:.35,j:.15,k:.5,sp:1}};
const QL=[{k:'win',t:'3 ta jangda yuting',n:3,gold:60},{k:'hit',t:'50 ta zarba uring',n:50,gold:40},{k:'boss',t:'Bitta bossni yenging',n:1,gem:3}];
/* ---------- Saqlash ---------- */
const day=new Date().toDateString(),Q0=()=>({win:0,hit:0,boss:0,cl:[0,0,0],day});
let S={lv:1,xp:0,gold:60,gem:5,st:0,own:[0,4,7],eq:{w:0,a:4,c:7},up:{},snd:1,mus:1,q:1,df:1,hist:[],qs:Q0()};
try{const s=JSON.parse(localStorage.getItem('sd2'));if(s)S=Object.assign(S,s)}catch(e){}
if(S.qs.day!==day)S.qs=Q0();
const save=()=>{try{localStorage.setItem('sd2',JSON.stringify(S))}catch(e){}};
/* ---------- Ovoz ---------- */
let AC;const au=()=>{if(!AC)try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}if(AC&&AC.state==='suspended')AC.resume();return AC};
addEventListener('pointerdown',au);
function tone(f,d,ty='square',v=.06,sl){if(!S.snd)return;const a=au();if(!a)return;const o=a.createOscillator(),n=a.createGain(),t=a.currentTime;o.type=ty;o.frequency.setValueAtTime(f,t);if(sl)o.frequency.exponentialRampToValueAtTime(sl,t+d);n.gain.setValueAtTime(v,t);n.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(n);n.connect(a.destination);o.start();o.stop(t+d)}
const SC={m:[220,262,330,262,196,247,294,247],f:[110,110,165,110,98,98,147,98]};let mi=0,mm='m';
setInterval(()=>{if(S.mus&&S.snd&&AC)tone(SC[mm][mi++%8],mm==='f'?.18:.32,'triangle',.035)},230);
const clk=()=>tone(660,.06,'triangle',.05);
/* ---------- Holat ---------- */
let mode='menu',F,P,E,balls=[],parts=[],shake=0,msg='',msgT=0,combo=0,comboT=0,endT=0,rt=60,pm;
const K={l:0,r:0,j:0,d:0,p:0,k:0,b:0,s:0};
const lerp=(a,b,t)=>a+(b-a)*t;
function pst(){const w=IT[S.eq.w],a=IT[S.eq.a],uw=S.up[w.id]||0,ua=S.up[a.id]||0;return{hp:100+S.lv*8+(a.h||0)*(1+.2*ua)+ua*6,dm:7+S.lv*.8+w.d*(1+.15*uw),sp:w.sp}}
const mk=(x,f)=>({x,y:GY,vx:0,vy:0,f,hp:100,max:100,dmg:7,sp:1,st:'idle',t:0,hit:0,stun:0,tm:Math.random()*5,blk:0,cr:0,rn:0,en:0,can:0,v:0,dt:0,sc:1,w:0,ar:4,col:'#05060a',gl:'#e8453c',inp:{l:0,r:0,j:0,d:0,p:0,k:0,b:0,s:0}});
/* ---------- Jang ---------- */
function fight(m,i){clk();try{screen.orientation.lock('landscape').catch(()=>{})}catch(e){}
  F={m,stage:i||0,s:ST[i||0],w:[0,0],rd:1};ui.hidden=true;$('#ctl').hidden=false;mm='f';round()}
function round(){
  const p=pst(),s=F.s,m=[.75,1,1.3][S.df];P=mk(180,1);
  Object.assign(P,{hp:p.hp,max:p.hp,dmg:p.dm,sp:p.sp,w:S.eq.w,ar:S.eq.a,col:IT[S.eq.c].col,gl:IT[S.eq.c].gl,can:S.lv>=2});
  E=mk(620,-1);
  if(F.m==='train')Object.assign(E,{hp:1e4,max:1e4,dummy:1,gl:'#888',col:'#1c1c24'});
  else{const b=s.b?1.5:1;Object.assign(E,{hp:s.hp*b*m,max:s.hp*b*m,dmg:s.d*m*(s.b?1.2:1),col:s.c,gl:s.b?'#ff3b30':'#f5a623',sc:s.b?1.2:1,can:s.b?1:0})}
  balls=[];parts=[];combo=0;rt=60;msg=F.m==='train'?"MASHG'ULOT":'RAUND '+F.rd;msgT=1.2;mode='intro'}
function strike(a,o){
  const k=a.st==='kick',rng=k?100:74,dx=(o.x-a.x)*a.f;
  if(dx>0&&dx<rng&&Math.abs(o.y-a.y)<70){
    if(!k&&o.cr){spark(o.x,o.y-30,'#888',3);return}
    let d=k?a.dmg*1.7:a.dmg;if(a===P&&combo>=2)d*=1.35;
    const hx=o.x-a.f*10,hy=o.y-70*(o.cr?.5:1);
    if(o.blk){d*=.12;o.hp-=d;o.vx=a.f*90;spark(hx,hy,'#8cf',5);tone(500,.08,'triangle',.06)}
    else{o.hp-=d;o.stun=.32;o.st='idle';o.vx=a.f*(k?280:150);shake=k?9:5;spark(hx,hy,'#e8453c',S.q?12:4);tone(k?110:160,.15,'sawtooth',.11,50);o.en=Math.min(100,o.en+4);
      if(a===P){combo++;comboT=1.6;S.qs.hit++}else if(o===P)combo=0}
    a.en=Math.min(100,a.en+(o.blk?3:9))}}
const spark=(x,y,c,n)=>{for(let i=0;i<n;i++)parts.push({x,y,vx:(Math.random()-.5)*300,vy:(Math.random()-.8)*250,l:.5,c})};
const ball=a=>balls.push({x:a.x+a.f*40,y:GY-65,vx:a.f*430,f:a.f,o:a,d:a.dmg*3.2});
function step(a,o,dt){
  const i=a.inp,gr=a.y>=GY;a.tm+=dt;a.blk=0;a.cr=0;
  if(a.stun>0){a.stun-=dt;a.vx*=.9}
  else if(a.st!=='idle'){
    a.t+=dt;const c=a.st==='cast',p=a.st==='punch',d=c?.4:(p?.28:.46)/a.sp,h=c?.15:(p?.1:.2)/a.sp;
    if(!a.hit&&a.t>=h){a.hit=1;c?ball(a):strike(a,o)}
    if(a.t>=d)a.st='idle';if(gr)a.vx*=.8}
  else{
    if(i.b&&gr){a.blk=1;a.vx=0}else if(i.d&&gr){a.cr=1;a.vx=0}
    else{
      const m=i.r-i.l;a.rn=m?a.rn+dt:0;a.vx=m*200*(1+Math.min(a.rn,.5)*.6);
      if(i.j&&gr)a.vy=-560;
      if(i.s&&a.can&&a.en>=100){a.st='cast';a.t=0;a.hit=0;a.en=0;tone(200,.4,'sawtooth',.08,800)}
      else if(i.p){a.st='punch';a.v=1-a.v;a.t=0;a.hit=0;tone(300,.1,'sine',.04,120)}
      else if(i.k){a.st='kick';a.t=0;a.hit=0;tone(250,.12,'sine',.04,90)}}
    a.f=o.x>a.x?1:-1}
  a.vy+=1500*dt;a.y+=a.vy*dt;if(a.y>=GY){a.y=GY;a.vy=0}
  a.x=Math.max(40,Math.min(W-40,a.x+a.vx*dt))}
function ai(a,o,dt){
  const i=a.inp,st=AI[F.s.y];a.dt-=dt;if(a.dt>0)return;
  a.dt=Math.max(.1,.4-F.stage*.015)*[1.3,1,.75][S.df]*(.6+Math.random()*.8);for(const k in i)i[k]=0;
  const d=Math.abs(a.x-o.x),dir=o.x>a.x?1:-1;
  if(st.sp&&a.en>=100&&d>150){i.s=1;return}
  if(o.st!=='idle'&&d<120&&Math.random()<st.b){i.b=1;return}
  if(d>(st.k>.45?120:100)){dir>0?i.r=1:i.l=1;if(Math.random()<st.j)i.j=1;return}
  const r=Math.random();
  if(r<st.a){Math.random()<st.k?i.k=1:i.p=1}else if(r<st.a+.12)i.b=1;else{dir>0?i.l=1:i.r=1}}
function endRound(pw){mode='end';endT=1.8;msg=pw?'ZARBA!':'YUTQAZDING';msgT=1.8;pw?F.w[0]++:F.w[1]++;tone(pw?600:150,.4,'triangle',.08)}
function after(){if(F.m==='train')return;if(F.w[0]>=2||F.w[1]>=2)return finish(F.w[0]>=2);F.rd++;round()}
function addXp(n){let u=0;S.xp+=n;while(S.xp>=S.lv*60){S.xp-=S.lv*60;S.lv++;u=1}return u}
function finish(win){
  mode='menu';mm='m';$('#ctl').hidden=true;const s=F.s;let gold=0,u=0,gem=0;
  if(win){gold=Math.round(s.g*[.8,1,1.3][S.df]);S.gold+=gold;u=addXp(s.x);if(s.b)gem=3;S.gem+=gem;S.st=Math.max(S.st,F.stage+1);S.qs.win++;if(s.b)S.qs.boss++}
  else{S.gold+=10;gold=10}
  S.hist.unshift((win?'✅ ':'❌ ')+s.n);S.hist=S.hist.slice(0,8);save();
  const nx=win&&F.stage<ST.length-1;
  show(`<h1>${win?"G'ALABA!":"MAG'LUBIYAT"}</h1><p>+${gold} 🪙${gem?' +'+gem+' 💎':''}${win?' · +'+s.x+' XP':''}</p>${u?`<p>⭐ Daraja oshdi: ${S.lv}!${S.lv==2?" Maxsus qobiliyat ochildi ✨":''}</p>`:''}
  <div class="gr">${nx?B('Keyingi bosqich ▶',`fight('story',${F.stage+1})`,'go'):B('Qayta urinish',`fight('story',${F.stage})`,'go')}${B('🛒 Do‘kon','shop(0)')}${B('Menyu','menu()')}</div>`)}
/* ---------- Chizish ---------- */
function limb(x,y,f,t1,l1,t2,l2){const x1=x+f*Math.sin(t1)*l1,y1=y+Math.cos(t1)*l1,x2=x1+f*Math.sin(t2)*l2,y2=y1+Math.cos(t2)*l2;g.beginPath();g.moveTo(x,y);g.lineTo(x1,y1);g.lineTo(x2,y2);g.stroke();return[x2,y2]}
function draw(a){
  const f=a.f,gr=a.y>=GY,col=a.col;let hip=58,fl=[.35,.1],bl=[-.35,-.05],fa=[.5,2],ba=[.2,1.9],ln=0,bob=gr?Math.sin(a.tm*5)*2:0;
  if(!gr){fl=[1,.2];bl=[-.2,-.9]}
  else if(Math.abs(a.vx)>20&&a.st==='idle'){const s=Math.sin(a.tm*13)*.6;fl=[.2+s,.1];bl=[-.2-s,-.1]}
  if(a.st==='punch'){const e=Math.sin(Math.min(a.t*a.sp/.28,1)*Math.PI);fa=a.v?[lerp(.5,1.5,e),lerp(2,1.5,e)]:[lerp(.5,1.2,e),lerp(2,1.9,e)];ba=a.v?ba:[lerp(.2,1.5,e),lerp(1.9,1.5,e)];ln=.2*e}
  if(a.st==='kick'){const e=Math.sin(Math.min(a.t*a.sp/.46,1)*Math.PI);fl=[lerp(.35,1.5,e),lerp(.1,1.5,e)];ln=-.25*e}
  if(a.st==='cast'){fa=[1.5,1.5];ba=[1.4,1.4];ln=.1}
  if(a.stun>0){ln=-.4;fa=[-.4,.3];ba=[-.6,.2]}
  if(a.blk){fa=[.9,2.7];ba=[.7,2.6];ln=.12}
  if(a.cr){hip=40;fl=[1.2,0];bl=[-1.1,.4];bob=0;ln=.1}
  g.save();g.translate(a.x,a.y);g.scale(a.sc,a.sc);g.translate(-a.x,-a.y);
  const hx=a.x,hy=a.y-hip+bob,sx=hx+f*Math.sin(ln)*46,sy=hy-Math.cos(ln)*46;
  g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(a.x,GY+4,34,7,0,0,7);g.fill();
  g.lineCap='round';g.lineJoin='round';g.strokeStyle=col;g.shadowColor=a.gl;g.shadowBlur=S.q?10:0;g.lineWidth=10;
  g.globalAlpha=.75;limb(hx,hy,f,bl[0],30,bl[1],30);limb(sx,sy,f,ba[0],24,ba[1],22);g.globalAlpha=1;
  g.lineWidth=13;g.beginPath();g.moveTo(hx,hy);g.lineTo(sx,sy);g.stroke();
  g.lineWidth=10;limb(hx,hy,f,fl[0],30,fl[1],30);const hd=limb(sx,sy,f,fa[0],24,fa[1],22);
  const hx2=sx+f*Math.sin(ln)*14,hy2=sy-Math.cos(ln)*14;
  g.fillStyle=col;g.beginPath();g.arc(hx2,hy2,12,0,7);g.fill();
  g.shadowBlur=0;
  if(a.ar>=5){g.fillStyle=a.gl;g.beginPath();g.arc(sx,sy+2,6,0,7);g.fill()}
  if(a.ar===6){g.strokeStyle=a.gl;g.lineWidth=3;g.beginPath();g.arc(hx2,hy2,13,Math.PI,0);g.stroke()}
  g.fillStyle='#ff3b30';g.fillRect(hx2+f*3,hy2-3,6*f,2.5);
  const th=Math.atan2(hd[0]-sx,hd[1]-sy-0.001),wd=Math.atan2(hd[1]-(sy+Math.cos(fa[0])*24),hd[0]-sx);
  const wx=hd[0],wy=hd[1],ang=Math.atan2(hd[0]-(sx+f*Math.sin(fa[0])*24),(hd[1]-(sy+Math.cos(fa[0])*24)));
  const ux=f*Math.sin(fa[1]),uy=Math.cos(fa[1]);
  g.lineWidth=3;
  if(a.w===1||a.w===3){g.strokeStyle=a.w===3?'#9ff':'#cfd8e8';g.lineWidth=a.w===3?3:5;g.beginPath();g.moveTo(wx,wy);g.lineTo(wx+ux*(a.w===3?54:38),wy+uy*(a.w===3?54:38));g.stroke()}
  if(a.w===2){g.strokeStyle='#caa46a';g.lineWidth=4;g.beginPath();g.moveTo(wx,wy);const m1=[wx+ux*18,wy+uy*18],sw=Math.sin(a.tm*12+a.t*20)*1.2;g.lineTo(m1[0],m1[1]);g.lineTo(m1[0]+f*Math.sin(fa[1]+sw)*18,m1[1]+Math.cos(fa[1]+sw)*18);g.stroke()}
  g.restore()}
function bg(){
  const w=WD[Math.floor((F?F.stage:0)/4)%3].s,s=g.createLinearGradient(0,0,0,H);s.addColorStop(0,w[0]);s.addColorStop(.7,w[1]);s.addColorStop(1,w[2]);
  g.fillStyle=s;g.fillRect(0,0,W,H);g.fillStyle='#f3d6a8';g.globalAlpha=.8;g.beginPath();g.arc(620,90,36,0,7);g.fill();g.globalAlpha=1;
  g.fillStyle='#0c0a12';g.globalAlpha=.8;g.beginPath();g.moveTo(0,GY);[[0,250],[120,190],[240,260],[380,170],[520,250],[660,200],[800,260],[800,GY]].forEach(p=>g.lineTo(p[0],p[1]));g.fill();g.globalAlpha=1;
  g.fillRect(0,GY,W,H-GY);if(S.q){g.fillStyle='rgba(255,255,255,.07)';g.fillRect(0,GY,W,2)}
  g.fillStyle='#0c0a12';[60,330,700].forEach(x=>{g.fillRect(x,GY-120,8,120);g.fillRect(x-24,GY-130,56,8);g.fillRect(x-14,GY-142,36,8)})}
function hud(){
  const q=(x,w,p,c,r)=>{g.fillStyle='#000a';g.fillRect(x,12,w,14);g.fillStyle=c;const v=Math.max(0,p)*(w-4);g.fillRect(r?x+w-2-v:x+2,14,v,10)};
  const eb=(x,e,r)=>{g.fillStyle='#000a';g.fillRect(x,30,140,6);g.fillStyle=e>=100?'#ffd24a':'#4aa8ff';const v=e*1.36;g.fillRect(r?x+138-v:x+2,31,v,4)};
  q(16,300,P.hp/P.max,'#3fd16b');q(484,300,E.hp/E.max,'#e8453c',1);
  if(P.can)eb(16,P.en);if(E.can)eb(644,E.en,1);
  g.fillStyle='#fff';g.font='bold 12px system-ui';g.textAlign='left';g.fillText('Shadow · '+S.lv+'-daraja',16,50);
  g.textAlign='right';g.fillText(F.m==='train'?"Qo'g'irchoq":F.s.n,784,50);g.textAlign='center';
  if(F.m!=='train'){g.font='bold 20px system-ui';g.fillText(Math.ceil(Math.max(0,rt)),400,28);
    [0,1].forEach(i=>{g.fillStyle=F.w[0]>i?'#3fd16b':'#444';g.beginPath();g.arc(30+i*18,64,5,0,7);g.fill();g.fillStyle=F.w[1]>i?'#e8453c':'#444';g.beginPath();g.arc(770-i*18,64,5,0,7);g.fill()})}
  if(combo>1){g.fillStyle='#ffd24a';g.font='bold 24px system-ui';g.fillText(combo+' KOMBO!',400,80)}
  if(msgT>0){g.fillStyle='#fff';g.font='bold 50px system-ui';g.fillText(msg,400,200)}}
/* ---------- Asosiy sikl ---------- */
let last=performance.now();
function loop(n){
  const dt=Math.min(.033,(n-last)/1000);last=n;
  if(['intro','fight','end'].includes(mode)){
    if(msgT>0)msgT-=dt;if(mode==='intro'&&msgT<=0)mode='fight';
    if(comboT>0){comboT-=dt;if(comboT<=0)combo=0}
    if(mode==='fight'){Object.assign(P.inp,K);if(!E.dummy)ai(E,P,dt);if(F.m!=='train'){rt-=dt;if(rt<=0)endRound(P.hp/P.max>=E.hp/E.max)}}
    else{for(const k in P.inp)P.inp[k]=E.inp[k]=0}
    step(P,E,dt);step(E,P,dt);
    const d=E.x-P.x;if(Math.abs(d)<40&&P.y>=GY-20&&E.y>=GY-20){const s=(40-Math.abs(d))/2*(d>=0?1:-1);P.x-=s;E.x+=s}
    balls.forEach(b=>{b.x+=b.vx*dt;const t=b.o===P?E:P;
      if(Math.abs(b.x-t.x)<30&&!t.cr&&Math.abs(b.y-(t.y-65))<60){if(t.blk)t.hp-=b.d*.15;else{t.hp-=b.d;t.stun=.4;t.st='idle';t.vx=b.f*250;shake=10;if(b.o===P)S.qs.hit++}spark(b.x,b.y,'#ffd24a',14);tone(120,.25,'sawtooth',.1,40);b.dead=1}
      if(b.x<-40||b.x>W+40)b.dead=1});balls=balls.filter(b=>!b.dead);
    if(F.m==='train'&&E.hp<E.max*.5)E.hp=E.max;if(F.m==='train'&&P.hp<P.max*.3)P.hp=P.max;
    if(mode==='fight'&&F.m!=='train'&&(P.hp<=0||E.hp<=0))endRound(E.hp<=0);
    if(mode==='end'){endT-=dt;if(endT<=0)after()}
    parts.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=700*dt;p.l-=dt});parts=parts.filter(p=>p.l>0)}
  g.save();if(shake>0){g.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);shake=Math.max(0,shake-40*dt)}
  bg();
  if(P&&mode!=='menu'||mode==='pause'&&P){draw(E);draw(P);
    balls.forEach(b=>{const r=g.createRadialGradient(b.x,b.y,2,b.x,b.y,20);r.addColorStop(0,'#fff');r.addColorStop(.4,'#ffd24a');r.addColorStop(1,'rgba(255,100,0,0)');g.fillStyle=r;g.beginPath();g.arc(b.x,b.y,20,0,7);g.fill()});
    parts.forEach(p=>{g.globalAlpha=Math.max(0,p.l*2);g.fillStyle=p.c;g.fillRect(p.x,p.y,4,4)});g.globalAlpha=1}
  g.restore();if(P&&(mode!=='menu'))hud();
  requestAnimationFrame(loop)}
/* ---------- Menyular ---------- */
const B=(t,f,c='')=>`<button class="${c}" onclick="clk();${f}">${t}</button>`;
const show=h=>{ui.innerHTML=`<div class="pn">${h}</div>`;ui.hidden=false};
function menu(){mode='menu';mm='m';$('#ctl').hidden=true;
  show(`<h1>SHADOW DUEL</h1><div class="pf"><b>Daraja ${S.lv}</b><i><u style="width:${S.xp/(S.lv*60)*100}%"></u></i><span>🪙 ${S.gold} &nbsp; 💎 ${S.gem}</span></div>
  <div class="gr">${B('▶ HIKOYA','story()','go')}${B('🥋 Mashg‘ulot',"fight('train')")}${B('🛒 Do‘kon / Inventar','shop(0)')}${B('🎁 Vazifalar','quests()')}${B('⚙ Sozlamalar','sett()')}</div>`)}
function story(){show('<h2>Hikoya</h2>'+WD.map((w,wi)=>`<h3>${w.n}</h3><div class="st">${[0,1,2,3].map(j=>{const i=wi*4+j,s=ST[i];return`<button ${i>S.st?'disabled':''} class="${i<S.st?'dn':''} ${s.b?'bs':''}" onclick="fight('story',${i})">${s.b?'👹':i+1}<small>${s.n}</small></button>`}).join('')}</div>`).join('')+B('← Orqaga','menu()'))}
const TB=['Qurollar','Zirhlar',"Ko'rinish"],TT=['w','a','c'];
function shop(t){const p=pst();
  show(`<h2>Do‘kon · 🪙 ${S.gold} 💎 ${S.gem}</h2><p style="margin:2px;font-size:12px">❤ ${Math.round(p.hp)} · ⚔ ${p.dm.toFixed(1)} · ⚡ ${p.sp}x</p>
  <div class="gr">${TB.map((n,i)=>`<button class="${i==t?'on':''}" onclick="clk();shop(${i})">${n}</button>`).join('')}</div>`+
  IT.filter(x=>x.t===TT[t]).map(x=>{const own=S.own.includes(x.id),eq=S.eq[x.t]===x.id,L=S.up[x.id]||0,st=x.t==='w'?`⚔ +${x.d}`:x.t==='a'?`❤ +${x.h}`:'✨';
    return`<div class="row"><span>${x.n} <small>${st}${L?' · Lv'+L:''}</small></span><span>${own?(eq?'<b>Kiyilgan</b>':B('Kiyish',`S.eq.${x.t}=${x.id};save();shop(${t})`)):B(x.c+(x.gem?'💎':'🪙'),`buy(${x.id},${t})`)}${own&&x.t!=='c'&&L<5&&(x.d||x.h)?B(`⬆ ${60*(L+1)}🪙`,`upg(${x.id},${t})`):''}</span></div>`}).join('')+B('← Orqaga','menu()'))}
function buy(id,t){const x=IT[id],k=x.gem?'gem':'gold';if(S[k]<x.c){tone(120,.2);return}S[k]-=x.c;S.own.push(id);S.eq[x.t]=id;save();shop(t)}
function upg(id,t){const L=S.up[id]||0,c=60*(L+1);if(S.gold<c){tone(120,.2);return}S.gold-=c;S.up[id]=L+1;save();shop(t)}
function quests(){
  show('<h2>Kundalik vazifalar</h2>'+QL.map((q,i)=>{const v=Math.min(S.qs[q.k],q.n),ok=v>=q.n,cl=S.qs.cl[i];
    return`<div class="row"><span>${q.t} (${v}/${q.n})</span><span>${cl?'✅':ok?B(`Olish ${q.gold?q.gold+'🪙':q.gem+'💎'}`,`claim(${i})`,'go'):'🔒'}</span></div>`}).join('')+
  `<h3>Jang tarixi</h3><div style="font-size:13px">${S.hist.join('<br>')||'Hali janglar yo‘q'}</div>`+B('← Orqaga','menu()'))}
function claim(i){const q=QL[i];S.gold+=q.gold||0;S.gem+=q.gem||0;S.qs.cl[i]=1;save();quests()}
function sett(){const T=(k,n)=>B(`${n}: ${S[k]?'Yoqilgan':'O‘chiq'}`,`S.${k}^=1;save();sett()`);
  show('<h2>Sozlamalar</h2><div class="gr">'+T('snd','🔊 Ovoz')+T('mus','🎵 Musiqa')+T('q','✨ Yuqori grafika')+B('Qiyinlik: '+['Oson','O‘rta','Qiyin'][S.df],'S.df=(S.df+1)%3;save();sett()')+'</div>'+B('← Orqaga','menu()'))}
function pause(){if(mode!=='fight'&&mode!=='intro')return;pm=mode;mode='pause';show(`<h1>PAUZA</h1><div class="gr">${B('▶ Davom etish','resume()','go')}${B('Chiqish','menu()')}</div>`)}
function resume(){mode=pm;ui.hidden=true;for(const k in K)K[k]=0}
$('#pz').onclick=pause;
document.querySelectorAll('#ctl [data-k]').forEach(b=>{const k=b.dataset.k,s=v=>e=>{e.preventDefault();K[k]=v;b.classList.toggle('on',!!v)};
  b.addEventListener('pointerdown',s(1));['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,s(0)))});
addEventListener('contextmenu',e=>e.preventDefault());
const map={a:'l',arrowleft:'l',d:'r',arrowright:'r',w:'j',arrowup:'j',s:'d',arrowdown:'d',j:'p',k:'k',l:'b',' ':'b',e:'s'};
addEventListener('keydown',e=>{const k=map[e.key.toLowerCase()];if(k){K[k]=1;e.preventDefault()}});
addEventListener('keyup',e=>{const k=map[e.key.toLowerCase()];if(k)K[k]=0});
menu();requestAnimationFrame(loop);
