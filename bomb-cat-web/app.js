const screens=[...document.querySelectorAll('.screen')];
const back=document.querySelector('#back');
const stack=[];
let current='splash',round=3,draw=25,discard=8,draws=0;
const cards=[['炸弹猫','💣🐱','丢出炸弹，下一位玩家爆牌','red'],['拆弹','✂️💣','解除炸弹威胁，跳过当前惩罚','orange'],['跳过','⏩🐱','跳过下一位玩家的出牌回合','blue'],['预览','🔭🐱','查看牌堆顶的3张牌','purple'],['洗牌','🔀🃏','重新洗牌，打乱牌堆顺序','green'],['反转','🔁🐾','反转出牌顺序，改变游戏方向','cyan'],['护盾','🛡️🐱','获得护盾，免疫下一次惩罚','gold'],['指定目标','🎯😼','指定一名玩家，对其生效卡牌效果','pink']];
const hand=[['3','🐾','red'],['5','🐾','black'],['8','🐾','red'],['J','🐾','black'],['炸弹','💣','purple-card'],['交换','↔','blue-card'],['护盾','🛡','orange-card']];
function go(name,push=true){if(name===current)return;if(push&&current!=='splash')stack.push(current);current=name;screens.forEach(s=>s.classList.toggle('active',s.dataset.screen===name));back.classList.toggle('hide',['home','splash'].includes(name));document.querySelector('.profile').style.display=name==='splash'?'none':'flex';document.querySelector('.top-icons').style.display=['splash','battle'].includes(name)?'none':'flex';if(name==='battle')renderHand();}
function renderCards(){document.querySelector('#cardGallery').innerHTML=cards.map(c=>`<article class="feature-card ${c[3]}"><h3>${c[0]}</h3><div>${c[1]}</div><p>${c[2]}</p></article>`).join('')}
function renderHand(){document.querySelector('#hand').innerHTML=hand.map(c=>`<button class="game-card ${c[2]}"><b>${c[0]}</b><small>${c[1]}</small></button>`).join('')}
function syncBattle(){document.querySelector('#round').textContent=round;document.querySelector('#drawCount').textContent=draw;document.querySelector('#discardCount').textContent=discard;const left=Math.max(0,2-draws);document.querySelector('#drawBtn small').textContent=`本回合可抽 ${left} 次`;document.querySelector('#turnText').textContent=left?'轮到你了':'请出牌';}
document.addEventListener('click',e=>{const t=e.target.closest('[data-go]');if(t)go(t.dataset.go)});
back.onclick=()=>go(stack.pop()||'home',false);
document.querySelector('#drawBtn').onclick=()=>{if(draws>=2)return;draws++;draw=Math.max(0,draw-1);if(draws===1)hand.push(['跳过','⏩','blue-card']);if(draws===2)discard++;renderHand();syncBattle()};
document.querySelector('#playBtn').onclick=()=>{round++;draws=0;discard++;if(round>=6){go('result');return}syncBattle()};
renderCards();renderHand();syncBattle();setTimeout(()=>go('home',false),1200);
