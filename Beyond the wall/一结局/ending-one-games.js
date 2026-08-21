(function(){
"use strict";

function mountOak(container, suppliedOptions) {
  if(!container)throw new Error("Missing ending-one game container: oak");
  const options=suppliedOptions||{};
  const host=document.createElement("div");
  host.className="ending-one-component-host";
  const shadow=host.attachShadow({mode:"open"});
  const style=document.createElement("style");
  style.textContent=":host{display:block;width:100%;height:100%;overflow:hidden}\n\n*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#050705}\nbody{display:grid;place-items:center;font-family:\"Microsoft YaHei\",monospace;touch-action:none}\n#frame{position:relative;width:min(100vw,177.777vh);width:min(100vw,177.777dvh);max-height:100vh;max-height:100dvh;aspect-ratio:16/9;background:#000;overflow:hidden;box-shadow:0 0 0 3px #3e4433}\ncanvas{display:block;width:100%;height:100%;image-rendering:pixelated;image-rendering:crisp-edges}\n\n";
  const content=document.createElement("div");
  content.className="ending-one-component-content";
  const frame=document.createElement("main");
  frame.id="frame";
  const canvas=document.createElement("canvas");
  canvas.id="game";canvas.width=640;canvas.height=360;canvas.tabIndex=0;
  canvas.setAttribute("aria-label","操控瑞德寻找石墙尽头的橡树");
  frame.appendChild(canvas);
  const audio=document.createElement("audio");
  audio.id="bgm";audio.src="../assets/ending-one/ending1_bgm.m4a";audio.preload="auto";audio.loop=true;
  content.append(frame,audio);
  shadow.append(style,content);
  container.replaceChildren(host);
  const instance=runOak(shadow,options);
  const destroy=instance.destroy;
  instance.destroy=function(){destroy();host.remove()};
  return instance;
}

function runOak(root,options){
  const document={getElementById:function(id){return root.querySelector("#"+id)}};
  let destroyed=false;
  const cleanups=[];
  const rafIds=new Set();
  const timerIds=new Set();
  function listen(target,type,handler,listenerOptions){target.addEventListener(type,handler,listenerOptions);cleanups.push(function(){target.removeEventListener(type,handler,listenerOptions)})}
  function requestAnimationFrame(callback){let id=window.requestAnimationFrame(function(time){rafIds.delete(id);if(!destroyed)callback(time)});rafIds.add(id);return id}
  function setTimeout(callback,delay){let id=window.setTimeout(function(){timerIds.delete(id);if(!destroyed)callback()},delay);timerIds.add(id);return id}
  function cleanup(){rafIds.forEach(function(id){window.cancelAnimationFrame(id)});timerIds.forEach(function(id){window.clearTimeout(id)});cleanups.splice(0).forEach(function(fn){fn()})}
const canvas=document.getElementById("game"),ctx=canvas.getContext("2d");
ctx.imageSmoothingEnabled=false;
const bgm=document.getElementById("bgm"),embedded=Boolean(options.embedded);let musicStarted=false,musicAttempting=false;
function startMusic(){
  if(embedded||musicStarted||musicAttempting)return;
  musicAttempting=true;bgm.volume=.45;
  const play=bgm.play();
  if(play&&play.then)play.then(()=>{musicStarted=true;musicAttempting=false}).catch((error)=>{
    musicAttempting=false;
    console.debug("[高墙之外] 第一结局音乐等待用户交互",error);
  });
  else{musicStarted=true;musicAttempting=false}
}
const WORLD_SCALE=1.035;
const screenX=v=>320+(v-320)*WORLD_SCALE,screenY=v=>180+(v-180)*WORLD_SCALE;
const map=new Image(),boxImage=new Image();
const sprites={front:new Image(),side:new Image(),back:new Image()};
map.src="../assets/ending-one/hope-road/oak_field.webp";
boxImage.src="../assets/ending-one/hope-road/iron_box_letter.webp";
sprites.front.src="../assets/main/images/red_walk_down_sheet.webp";
sprites.side.src="../assets/main/images/red_walk_side_sheet.webp";
sprites.back.src="../assets/main/images/red_walk_up_sheet.webp";
const key={l:0,r:0,u:0,d:0},joy={x:0,y:0};
let x=105,y=286,walkTime=0,direction=0,moving=false,last=0,notice="",noticeUntil=0,found=false,jumping=false,mode="field";
// Map coordinates at 640×360. The interaction hotspot is deliberately at the roots, not the canopy.
const oak={x:428,y:150,r:32};
const wrong=[{x:104,y:117,msg:"这棵树太年轻了。安迪说的树应该已经在那里站了很多年。"},
 {x:282,y:218,msg:"位置不对。我要找的是石墙的北端。"},
 {x:550,y:180,msg:"不是它。石墙尽头那棵树应该更古老。"}];
const walls=[{x:-10,y:149,w:374,h:19},{x:353,y:127,w:17,h:41}];
const trunks=[
  {x:104,y:105,r:18},{x:208,y:77,r:13},{x:104,y:244,r:18},
  {x:282,y:225,r:19},{x:485,y:257,r:19},{x:550,y:164,r:18},{x:429,y:116,r:29}
];
function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))}
function text(s,x,y,size=12,c="#eee4c5",align="left"){ctx.font=`${size}px "Microsoft YaHei",monospace`;ctx.textAlign=align;ctx.textBaseline="top";ctx.fillStyle=c;ctx.fillText(s,x,y)}
function panel(x,y,w,h){rect(x+3,y+3,w,h,"#050705");rect(x,y,w,h,"#77765b");rect(x+3,y+3,w-6,h-6,"#111711e8")}
function distance(a,b,c,d){return Math.hypot(a-c,b-d)}
function nearOak(){return distance(x,y,oak.x,oak.y)<oak.r+12}
function say(s,ms=3000){notice=s;noticeUntil=performance.now()+ms}
function drawSprite(){
  const facing=direction===0?"front":direction===3?"back":"side",sprite=sprites[facing];
  if(!sprite.complete)return;
  const col=moving?Math.floor(walkTime*1000/170)%4:0,sw=48,sh=64;
  const px=screenX(x),py=screenY(y),drawW=44,drawH=59;
  const drawX=Math.round(px-drawW/2),drawY=Math.round(py-drawH);
  if(direction===1){
    ctx.save();ctx.translate(Math.round(px),0);ctx.scale(-1,1);
    ctx.drawImage(sprite,col*sw,0,sw,sh,-drawW/2,drawY,drawW,drawH);ctx.restore();
  }else{
    ctx.drawImage(sprite,col*sw,0,sw,sh,drawX,drawY,drawW,drawH);
  }
}
function drawBoxScene(){
  if(boxImage.complete)ctx.drawImage(boxImage,0,0,640,360);else rect(0,0,640,360,"#15150f");
  rect(0,0,640,360,"rgba(12,9,5,.12)");
  panel(9,9,265,34);text("铁盒：安迪留给瑞德的信",20,19,11,"#f0d17d");
  panel(177,316,286,28);text("瑞德拾起信纸，读起安迪留下的话……",320,324,11,"#f1d386","center");
}
function render(t){
  if(mode==="box"){drawBoxScene();syncUseButton();return}
  if(map.complete){
    const mw=640*WORLD_SCALE,mh=360*WORLD_SCALE;
    ctx.drawImage(map,(640-mw)/2,(360-mh)/2,mw,mh);
  }else rect(0,0,640,360,"#4d5425");
  // Slight darkening preserves the restrained ending tone.
  rect(0,0,640,360,"rgba(8,12,7,.10)");
  drawSprite();
  panel(9,9,257,34);text(found?"任务完成：已找到目标橡树":"任务：沿石墙寻找那棵古老的橡树",20,19,11,found?"#f0cb6c":"#e5d9ad");
  panel(425,9,206,45);text("移动：虚拟摇杆 / WASD",437,17,10,"#d8cfad");text("挖掘按钮 / 空格键",437,33,10,"#d8cfad");
  if(nearOak()&&!found){panel(222,273,196,28);text("靠近橡树：按“挖掘”",320,281,11,"#f1cc6c","center");
    const pulse=(Math.sin(t*.008)+1)/2;rect(screenX(oak.x)-5,screenY(oak.y)-3,10,5,`rgba(31,42,31,${.45+pulse*.4})`)}
  if(found){const pulse=(Math.sin(t*.01)+1)/2;rect(screenX(oak.x)-6,screenY(oak.y)-4,12,7,`rgba(24,35,39,${.6+pulse*.35})`);text("◆",screenX(oak.x),screenY(oak.y)-20,14,"#5ba0b2","center")}
  if(notice&&performance.now()<noticeUntil){panel(70,310,500,36);text(notice,320,321,11,"#eee3c4","center")}
  syncUseButton();
}
function blocked(px,py){
  const radius=7;
  if(px<18||px>622||py<48||py>330)return true;
  for(const w of walls)if(px+radius>w.x&&px-radius<w.x+w.w&&py+radius>w.y&&py-radius<w.y+w.h)return true;
  for(const o of trunks)if(Math.hypot(px-o.x,py-o.y)<radius+o.r)return true;
  return false;
}
function update(dt){
  if(mode==="box"){moving=false;return}
  let dx=(key.r-key.l)+joy.x,dy=(key.d-key.u)+joy.y;
  const mag=Math.hypot(dx,dy);
  moving=mag>.08;
  if(moving){
    if(mag>1){dx/=mag;dy/=mag}
    if(Math.abs(dx)>Math.abs(dy))direction=dx<0?1:2;else direction=dy<0?3:0;
    const speed=74,stepX=dx*speed*dt,stepY=dy*speed*dt;
    // Axis-separated collision keeps Red sliding naturally along walls and tree trunks.
    if(!blocked(x+stepX,y))x+=stepX;
    if(!blocked(x,y+stepY))y+=stepY;
    walkTime+=dt;
  }
}
function investigate(){
  if(mode==="box"){
    return;
  }
  if(nearOak()){
    if(!found){found=true;say("就是它。树根下有一处异常的深色像素——黑曜石。再次调查打开铁盒。",4200)}
    else if(!jumping){
      jumping=true;say("瑞德移开黑曜石，泥土中露出了一个铁盒……",1800);
      setTimeout(()=>{mode="box";notice="";},750);
      setTimeout(()=>{
        if(typeof options.onComplete==="function")options.onComplete();
        else say("铁盒已经找到。请从结局页面继续。",10000);
      },2550);
    }
    return;
  }
  let best=null,bd=55;wrong.forEach(w=>{const d=distance(x,y,w.x,w.y);if(d<bd){bd=d;best=w}});say(best?best.msg:"这里没有值得调查的东西。继续沿石墙寻找。")
}
function loop(now){const dt=Math.min(.05,(now-last)/1000||0);last=now;update(dt);render(now);requestAnimationFrame(loop)}
const movementControls={a:"l",A:"l",d:"r",D:"r",w:"u",W:"u",s:"d",S:"d"};
canvas.addEventListener("keydown",e=>{startMusic();if(movementControls[e.key]){key[movementControls[e.key]]=1;e.preventDefault()}if(!e.repeat&&e.key===" "){investigate();e.preventDefault()}});
canvas.addEventListener("keyup",e=>{if(movementControls[e.key])key[movementControls[e.key]]=0});
// 点击地图不会移动瑞德，移动只由虚拟摇杆或 WASD 负责。
canvas.addEventListener("pointerdown",()=>{canvas.focus();startMusic()});
function syncUseButton(){
  const canDig=mode!=="box"&&nearOak();
  if(typeof options.onContext==="function")options.onContext({
    controlsVisible:true,joystickVisible:mode!=="box",actionVisible:canDig,
    actionEnabled:canDig,actionLabel:canDig?"挖掘":"",actionHighlighted:canDig
  });
}
function clearMovement(){Object.keys(key).forEach(k=>key[k]=0);joy.x=joy.y=0}
listen(window,"blur",clearMovement);
requestAnimationFrame(loop);canvas.focus();
if(!embedded)listen(window,"load",startMusic,{once:true});
return {
  canvas,
  getState(){return {x,y,mode,found,moving}},
  setMove(payload){joy.x=payload&&Number.isFinite(payload.x)?payload.x:0;joy.y=payload&&Number.isFinite(payload.y)?payload.y:0;startMusic()},
  actionDown(){startMusic();investigate()},
  actionUp(){},
  keyDown(keyValue,repeat){canvas.dispatchEvent(new KeyboardEvent("keydown",{key:keyValue,repeat:Boolean(repeat),bubbles:true,cancelable:true}))},
  keyUp(keyValue){canvas.dispatchEvent(new KeyboardEvent("keyup",{key:keyValue,bubbles:true,cancelable:true}))},
  destroy(){
    destroyed=true;clearMovement();cleanup();
    try{bgm.pause()}catch(error){console.debug("[高墙之外] 第一结局音乐清理失败",error)}
  }
};
}

function mountRoute(container, suppliedOptions) {
  if(!container)throw new Error("Missing ending-one game container: route");
  const options=suppliedOptions||{};
  const host=document.createElement("div");
  host.className="ending-one-component-host";
  const shadow=host.attachShadow({mode:"open"});
  const style=document.createElement("style");
  style.textContent=":host{display:block;width:100%;height:100%;overflow:hidden}\n\n*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#050705}\nbody{display:grid;place-items:center;font-family:\"Microsoft YaHei\",\"SimSun\",monospace;touch-action:none}\n#wrap{position:relative;width:min(100vw,177.777vh);width:min(100vw,177.777dvh);max-height:100vh;max-height:100dvh;aspect-ratio:16/9;background:#000;overflow:hidden}\ncanvas{display:block;width:100%;height:100%;image-rendering:pixelated;image-rendering:crisp-edges}\n\n";
  const content=document.createElement("div");
  content.className="ending-one-component-content";
  const wrap=document.createElement("main");
  wrap.id="wrap";
  const canvas=document.createElement("canvas");
  canvas.id="route";canvas.width=640;canvas.height=360;canvas.tabIndex=0;
  canvas.setAttribute("aria-label","驾驶汽车寻找前往边境的道路");
  wrap.appendChild(canvas);
  content.appendChild(wrap);
  shadow.append(style,content);
  container.replaceChildren(host);
  const instance=runRoute(shadow,options);
  const destroy=instance.destroy;
  instance.destroy=function(){destroy();host.remove()};
  return instance;
}

function runRoute(root,options){
  const document={getElementById:function(id){return root.querySelector("#"+id)}};
  let destroyed=false;
  const cleanups=[];
  const rafIds=new Set();
  const timerIds=new Set();
  function listen(target,type,handler,listenerOptions){target.addEventListener(type,handler,listenerOptions);cleanups.push(function(){target.removeEventListener(type,handler,listenerOptions)})}
  function requestAnimationFrame(callback){let id=window.requestAnimationFrame(function(time){rafIds.delete(id);if(!destroyed)callback(time)});rafIds.add(id);return id}
  function setTimeout(callback,delay){let id=window.setTimeout(function(){timerIds.delete(id);if(!destroyed)callback()},delay);timerIds.add(id);return id}
  function cleanup(){rafIds.forEach(function(id){window.cancelAnimationFrame(id)});timerIds.forEach(function(id){window.clearTimeout(id)});cleanups.splice(0).forEach(function(fn){fn()})}
const canvas=document.getElementById("route"),ctx=canvas.getContext("2d"),map=new Image();
const busSprites={n:new Image(),e:new Image(),s:new Image(),w:new Image()};
ctx.imageSmoothingEnabled=false;map.src="../assets/ending-one/route/route_map_no_signs.webp";
for(const d of Object.keys(busSprites))busSprites[d].src=`../assets/ending-one/route/player_bus_${d}.webp`;
const W=640,H=360;
// The supplied route map is a complete 1672 × 941 world.  The canvas is only
// the camera window, so the car must travel across the real map coordinates.
const WORLD_W=1672,WORLD_H=941;
const SOURCE_W=640,SOURCE_H=360;
const WORLD_SCALE_X=WORLD_W/SOURCE_W,WORLD_SCALE_Y=WORLD_H/SOURCE_H;
const WORLD_MOVEMENT_SCALE=(WORLD_SCALE_X+WORLD_SCALE_Y)*.5;
const CAMERA_VIEW_W=W,CAMERA_VIEW_H=H,CAMERA_SCALE=1;
const camera={x:0,y:0};
const HORIZONTAL_SPRITE_LIMIT=75*Math.PI/180;
const BUS_RENDER_SCALE=1.8;
const EXIT_RADIUS=28*WORLD_MOVEMENT_SCALE;
const DRIVE_MAX_SPEED=96*WORLD_MOVEMENT_SCALE,DRIVE_ACCEL=170*WORLD_MOVEMENT_SCALE;
const key={u:0,d:0,l:0,r:0},joy={x:0,y:0};
const nodes={
  start:{x:.035,y:.93},exit:{x:.790,y:.255}
};
// The original barriers were traced against a 640 × 360 reference.  Scale
// them into the complete map so collision positions stay on the roads.
const collisionBarrierSource=[
  [[180,85],[182,95],[191,105],[211,126],[225,135],[232,134],[261,130],[278,122],[310,113],[331,112],[361,129],[399,141],[410,136],[430,126],[458,100],[457,91]],
  [[140,108],[149,121],[181,148],[210,158],[207,180],[207,205],[211,245],[197,266],[178,280],[150,287],[125,291],[90,300],[55,308],[5,323],[5,310]],
  [[281,144],[289,144],[322,144],[340,151],[371,168],[379,178],[377,189],[366,198],[319,199],[305,199],[293,209],[264,210],[254,203],[250,189],[253,177],[263,160],[281,144]],
  [[519,125],[500,139],[475,156],[454,168],[441,181],[441,195],[444,206],[461,229],[480,241],[491,251],[470,271],[462,278],[451,278],[436,273],[414,262],[388,256],[360,250],[295,252],[283,255],[260,269],[248,282],[239,289],[225,301],[211,312],[177,333],[164,343],[118,351],[101,357]]
];
const forbiddenZoneSource=[
  [[0,0],[180,0],[180,85],[140,108],[149,121],[181,148],[210,158],[207,180],[207,205],[211,245],[197,266],[178,280],[150,287],[125,291],[90,300],[55,308],[5,323],[0,323]]
];
function worldPoint(point){return [point[0]*WORLD_SCALE_X,point[1]*WORLD_SCALE_Y]}
const collisionBarriers=collisionBarrierSource.map(barrier=>barrier.map(worldPoint));
const forbiddenZones=forbiddenZoneSource.map(zone=>zone.map(worldPoint));
const routeGameState={
  active:false,completed:false,carX:nodes.start.x*WORLD_W,carY:nodes.start.y*WORLD_H,vx:0,vy:0,speed:0,headingAngle:0,
  lastValidX:nodes.start.x*WORLD_W,lastValidY:nodes.start.y*WORLD_H
};
let screen="intro",last=0,sceneTime=0,toast="",toastUntil=0,engine=null,audioCtx=null;
function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))}
function text(s,x,y,size=12,c="#eee4c5",align="left"){ctx.font=`${size}px "Microsoft YaHei","SimSun",monospace`;ctx.textAlign=align;ctx.textBaseline="top";ctx.fillStyle=c;ctx.fillText(s,x,y)}
function wrap(s,x,y,max,size=12,c="#eee4c5",lh=18,align="left"){let row="",yy=y;ctx.font=`${size}px "Microsoft YaHei",monospace`;
  for(const ch of s){if(ctx.measureText(row+ch).width>max&&row){text(row,x,yy,size,c,align);yy+=lh;row=ch}else row+=ch}if(row)text(row,x,yy,size,c,align)}
function shadowText(s,x,y,size=12,c="#eee4c5",align="left"){
  ctx.save();ctx.shadowColor="rgba(0,0,0,.98)";ctx.shadowBlur=0;ctx.shadowOffsetX=2;ctx.shadowOffsetY=2;
  text(s,x,y,size,c,align);ctx.restore();
}
function drawSubtitle(s,y=280){
  ctx.save();ctx.shadowColor="rgba(0,0,0,.95)";ctx.shadowBlur=0;ctx.shadowOffsetX=2;ctx.shadowOffsetY=2;
  wrap(s,320,y+3,490,12,"#f4ead3",17,"center");ctx.restore();
}
function showToast(s,ms=3200){toast=s;toastUntil=performance.now()+ms}
function dist(a){return Math.hypot(routeGameState.carX-a.x*WORLD_W,routeGameState.carY-a.y*WORLD_H)}
function clamp(v,min,max){return Math.max(min,Math.min(max,v))}
function normalizeAngle(angle){while(angle<=-Math.PI)angle+=Math.PI*2;while(angle>Math.PI)angle-=Math.PI*2;return angle}
function horizontalDeviation(angle){return Math.atan2(Math.abs(Math.sin(angle)),Math.abs(Math.cos(angle)))}
function usesVerticalSprite(angle){return horizontalDeviation(angle)>HORIZONTAL_SPRITE_LIMIT}
function spriteInfo(angle){
  if(usesVerticalSprite(angle))return {key:Math.sin(angle)<0?"n":"s",rotation:0,w:24,h:32};
  const key=Math.cos(angle)>=0?"e":"w",baseAngle=key==="e"?0:Math.PI;
  return {key,rotation:normalizeAngle(angle-baseAngle),w:56,h:22};
}
function cross(ax,ay,bx,by,cx,cy){return (bx-ax)*(cy-ay)-(by-ay)*(cx-ax)}
function pointOnSegment(px,py,ax,ay,bx,by){
  return Math.abs(cross(ax,ay,bx,by,px,py))<.0001&&px>=Math.min(ax,bx)&&px<=Math.max(ax,bx)&&py>=Math.min(ay,by)&&py<=Math.max(ay,by);
}
function segmentsIntersect(ax,ay,bx,by,cx,cy,dx,dy){
  const abC=cross(ax,ay,bx,by,cx,cy),abD=cross(ax,ay,bx,by,dx,dy),cdA=cross(cx,cy,dx,dy,ax,ay),cdB=cross(cx,cy,dx,dy,bx,by);
  if(((abC>0&&abD<0)||(abC<0&&abD>0))&&((cdA>0&&cdB<0)||(cdA<0&&cdB>0)))return true;
  return pointOnSegment(cx,cy,ax,ay,bx,by)||pointOnSegment(dx,dy,ax,ay,bx,by)||pointOnSegment(ax,ay,cx,cy,dx,dy)||pointOnSegment(bx,by,cx,cy,dx,dy);
}
function pointInPolygon(x,y,polygon){
  let inside=false;
  for(let index=0,last=polygon.length-1;index<polygon.length;last=index++){
    const a=polygon[index],b=polygon[last];
    if(pointOnSegment(x,y,a[0],a[1],b[0],b[1]))return true;
    if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])inside=!inside;
  }
  return inside;
}
function hitsSolid(fromX,fromY,toX,toY){
  return forbiddenZones.some(zone=>pointInPolygon(toX,toY,zone))||collisionBarriers.some(barrier=>barrier.some((point,index)=>{
    if(!index)return false;const previous=barrier[index-1];
    return segmentsIntersect(fromX,fromY,toX,toY,previous[0],previous[1],point[0],point[1]);
  }));
}
function startAudio(){try{audioCtx=audioCtx||new(window.AudioContext||window.webkitAudioContext)();if(engine)return;
  const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type="square";o.frequency.value=55;g.gain.value=.009;o.connect(g);g.connect(audioCtx.destination);o.start();engine={o,g};
}catch(error){console.debug("[高墙之外] 驾车关卡引擎音效不可用",error)}}
function beep(ok=true){try{startAudio();const o=audioCtx.createOscillator(),g=audioCtx.createGain(),n=audioCtx.currentTime;o.type="square";o.frequency.value=ok?660:170;
  g.gain.setValueAtTime(.035,n);g.gain.exponentialRampToValueAtTime(.001,n+.14);o.connect(g);g.connect(audioCtx.destination);o.start(n);o.stop(n+.15)}catch(error){console.debug("[高墙之外] 驾车关卡提示音不可用",error)}}
function stopEngine(){if(engine){try{engine.o.stop()}catch(error){console.debug("[高墙之外] 驾车关卡引擎音效清理失败",error)}engine=null}}
function drawPlayerCar(c,x,y,headingAngle,animationFrame,scale=1){
  const sprite=spriteInfo(headingAngle),img=busSprites[sprite.key];
  if(!img.complete)return;
  const w=sprite.w*scale,h=sprite.h*scale;
  c.save();c.translate(Math.round(x),Math.round(y));c.rotate(sprite.rotation);
  c.drawImage(img,Math.round(-w/2),Math.round(-h/2),w,h);
  if(animationFrame){
    c.fillStyle="#6e7170";
    if(sprite.key==="e"||sprite.key==="w"){c.fillRect(Math.round(-w*.31),Math.round(h*.29),Math.max(1,2*scale),Math.max(1,scale));c.fillRect(Math.round(w*.25),Math.round(h*.29),Math.max(1,2*scale),Math.max(1,scale))}
    else{c.fillRect(Math.round(-w*.27),Math.round(h*.34),Math.max(1,scale),Math.max(1,2*scale));c.fillRect(Math.round(w*.23),Math.round(h*.34),Math.max(1,scale),Math.max(1,2*scale))}
  }
  c.restore();
}
function drawHUD(){
  shadowText("当前任务：穿过道路前往右上方出口",14,13,11,"#f0d07b");
  shadowText("虚拟摇杆 / WASD：驾驶",626,326,9,"#f1e7c9","right");
  if(toast&&performance.now()<toastUntil)drawSubtitle(toast,278);
}
function updateCamera(){
  camera.x=clamp(routeGameState.carX-CAMERA_VIEW_W*.5,0,WORLD_W-CAMERA_VIEW_W);
  camera.y=clamp(routeGameState.carY-CAMERA_VIEW_H*.5,0,WORLD_H-CAMERA_VIEW_H);
}
function worldToScreen(x,y){return {x:(x-camera.x)*CAMERA_SCALE,y:(y-camera.y)*CAMERA_SCALE}}
function drawWorldCar(x,y,headingAngle,animationFrame){
  const p=worldToScreen(x,y);drawPlayerCar(ctx,p.x,p.y,headingAngle,animationFrame,CAMERA_SCALE*BUS_RENDER_SCALE);
}
function renderMap(){
  updateCamera();
  if(map.complete&&map.naturalWidth)ctx.drawImage(map,Math.round(camera.x),Math.round(camera.y),CAMERA_VIEW_W,CAMERA_VIEW_H,0,0,W,H);
  else rect(0,0,W,H,"#70672f");
}
function drawIntro(){
  renderMap();drawWorldCar(routeGameState.carX,routeGameState.carY,routeGameState.headingAngle,0);
  drawSubtitle("安迪留下的钱足够我上路。拖动虚拟摇杆或使用 WASD 开始",313);
}
function drawDrive(){
  renderMap();drawWorldCar(routeGameState.carX,routeGameState.carY,routeGameState.headingAngle,Math.floor(sceneTime*9)%2);drawHUD();
}
function updateDrive(dt){
  let dx=key.r-key.l+joy.x,dy=key.d-key.u+joy.y,mag=Math.hypot(dx,dy);if(mag>1){dx/=mag;dy/=mag}
  if(mag>.08)routeGameState.headingAngle=Math.atan2(dy,dx);
  const max=DRIVE_MAX_SPEED,acc=mag?DRIVE_ACCEL:0,drag=Math.exp(-(mag?1.35:5.25)*dt);
  routeGameState.vx=(routeGameState.vx+dx*acc*dt)*drag;routeGameState.vy=(routeGameState.vy+dy*acc*dt)*drag;
  let speed=Math.hypot(routeGameState.vx,routeGameState.vy);if(speed>max){routeGameState.vx*=max/speed;routeGameState.vy*=max/speed;speed=max}
  const steps=Math.max(1,Math.ceil(speed*dt/3));
  for(let i=0;i<steps;i++){
    const nx=routeGameState.carX+routeGameState.vx*dt/steps,ny=routeGameState.carY+routeGameState.vy*dt/steps;
    const clampedX=clamp(nx,0,WORLD_W);
    const clampedY=clamp(ny,0,WORLD_H);
    if(!hitsSolid(routeGameState.carX,routeGameState.carY,clampedX,clampedY)){routeGameState.carX=clampedX;routeGameState.carY=clampedY}
    else{routeGameState.vx=routeGameState.vy=0;break}
  }
  routeGameState.lastValidX=routeGameState.carX;routeGameState.lastValidY=routeGameState.carY;
  routeGameState.speed=Math.hypot(routeGameState.vx,routeGameState.vy);
  if(engine){engine.o.frequency.value=48+speed/WORLD_MOVEMENT_SCALE*.55;engine.g.gain.value=speed>3*WORLD_MOVEMENT_SCALE?.008:.002}
  if(dist(nodes.exit)<EXIT_RADIUS)completeRoute();
}
function completeRoute(){
  if(routeGameState.completed)return;
  routeGameState.completed=true;routeGameState.active=false;routeGameState.vx=routeGameState.vy=routeGameState.speed=0;stopEngine();beep(true);
  showToast("已抵达右上方出口。",1800);
  if(typeof options.onComplete==="function")options.onComplete();
}
function update(dt){sceneTime+=dt;if(screen==="drive"&&!routeGameState.completed)updateDrive(dt)}
function updateDriveControls(){
  const canDrive=screen==="intro"||(screen==="drive"&&!routeGameState.completed);
  if(typeof options.onContext==="function")options.onContext({
    controlsVisible:true,joystickVisible:canDrive,actionVisible:screen==="intro",
    actionEnabled:screen==="intro",actionLabel:screen==="intro"?"开始":"",actionHighlighted:screen==="intro"
  });
}
function render(){if(screen==="intro")drawIntro();else drawDrive();updateDriveControls()}
function start(){if(screen!=="intro")return;screen="drive";sceneTime=0;routeGameState.active=true;startAudio();showToast("当前任务：穿过道路前往右上方出口。",2800)}
function loop(now){const dt=Math.min(.04,(now-last)/1000||0);last=now;update(dt);render();requestAnimationFrame(loop)}
const driveMovementControls={w:"u",W:"u",s:"d",S:"d",a:"l",A:"l",d:"r",D:"r"};
canvas.addEventListener("keydown",e=>{if(driveMovementControls[e.key]){if(screen==="intro")start();key[driveMovementControls[e.key]]=1;startAudio();e.preventDefault()}else if(!e.repeat&&e.key===" "&&screen==="intro"){start();e.preventDefault()}});
canvas.addEventListener("keyup",e=>{if(driveMovementControls[e.key])key[driveMovementControls[e.key]]=0});
canvas.addEventListener("pointerdown",()=>canvas.focus());
function clearMovement(){Object.keys(key).forEach(k=>key[k]=0);joy.x=joy.y=0}
listen(window,"blur",clearMovement);
requestAnimationFrame(loop);canvas.focus();
return {
  canvas,
  state:routeGameState,
  getState(){return {screen,completed:routeGameState.completed,x:routeGameState.carX,y:routeGameState.carY}},
  setMove(payload){
    joy.x=payload&&Number.isFinite(payload.x)?payload.x:0;
    joy.y=payload&&Number.isFinite(payload.y)?payload.y:0;
    if(Math.hypot(joy.x,joy.y)>.08&&screen==="intro")start();
    if(Math.hypot(joy.x,joy.y)>.08)startAudio();
  },
  actionDown(){if(screen==="intro")start()},
  actionUp(){},
  keyDown(keyValue,repeat){canvas.dispatchEvent(new KeyboardEvent("keydown",{key:keyValue,repeat:Boolean(repeat),bubbles:true,cancelable:true}))},
  keyUp(keyValue){canvas.dispatchEvent(new KeyboardEvent("keyup",{key:keyValue,bubbles:true,cancelable:true}))},
  destroy(){destroyed=true;clearMovement();stopEngine();cleanup()}
};
}

window.BeyondWallsEndingOneGames=Object.freeze({mountOak:mountOak,mountRoute:mountRoute});
})();
