
const K='sitcoffee_cart';
function cart(){try{return JSON.parse(localStorage.getItem(K))||[]}catch(e){return[]}}
function save(c){localStorage.setItem(K,JSON.stringify(c));badge()}
function add(n,p){let c=cart(),x=c.find(i=>i.n===n);x?x.q++:c.push({n,p,q:1});save(c);alert(n+' se agregó al pedido.')}
function badge(){let b=document.querySelector('[data-count]');if(b)b.textContent=cart().reduce((s,x)=>s+x.q,0)}
function render(){let box=document.querySelector('#items');if(!box)return;let c=cart();if(!c.length){box.innerHTML='<p>Tu pedido está vacío. <a href="tienda.html"><b>Ir a Menú / Tienda</b></a></p>';document.querySelector('#total').textContent='$0 MXN';return}
box.innerHTML=c.map((x,i)=>`<div class="row"><div><b>${x.n}</b><br><span class="price">$${x.p} MXN c/u</span></div><div><input style="width:70px" type="number" min="1" value="${x.q}" onchange="qty(${i},this.value)"> <button class="btn alt" onclick="del(${i})">Eliminar</button></div></div>`).join('');
document.querySelector('#total').textContent='$'+c.reduce((s,x)=>s+x.p*x.q,0).toLocaleString('es-MX')+' MXN'}
function qty(i,v){let c=cart();c[i].q=Math.max(1,+v||1);save(c);render()}
function del(i){let c=cart();c.splice(i,1);save(c);render()}
function clearCart(){localStorage.removeItem(K);badge();render()}
document.addEventListener('DOMContentLoaded',()=>{badge();render()})
