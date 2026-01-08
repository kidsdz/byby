const SHEET_URL = "PUT_YOUR_GOOGLE_SCRIPT_URL";
let BALADIYAT = {};

fetch("baladiyat.json")
.then(r=>r.json())
.then(data=>{
  data.forEach(w=>{
    const code=w.wilaya_code.padStart(2,"0");
    BALADIYAT[code]=w.cities.map(c=>c.commune_name);
  });
});

function showForm(id){
  const size=document.getElementById("size"+id).value;
  const color=document.getElementById("color"+id).value;
  const msg=document.getElementById("msg"+id);
  if(size.includes("اختر")||color.includes("اختر")){
    msg.innerHTML="&#1575;&#1582;&#1578;&#1585; &#1575;&#1604;&#1605;&#1602;&#1575;&#1587; &#1608;&#1575;&#1604;&#1604;&#1608;&#1606;";
    msg.style.color="red"; return;
  }
  document.getElementById("form"+id).style.display="block";
  msg.innerHTML="";
}

function updateWilaya(id,price){
  const w=document.getElementById("wilaya"+id).value;
  const d=document.getElementById("delivery"+id);
  const t=document.getElementById("total"+id);
  const b=document.getElementById("baladiya"+id);
  b.innerHTML="<option>&#1575;&#1582;&#1578;&#1585; &#1575;&#1604;&#1576;&#1604;&#1583;&#1610;&#1577;</option>";
  if(!w)return;
  const parts=w.split("|");
  d.innerHTML="&#1587;&#1593;&#1585; &#1575;&#1604;&#1578;&#1608;&#1589;&#1610;&#1604;: "+parts[1]+" &#1583;&#1580;";
  t.innerHTML="&#1575;&#1604;&#1605;&#1580;&#1605;&#1608;&#1593;: "+(price+parseInt(parts[1]))+" &#1583;&#1580;";
  if(BALADIYAT[parts[0]]){
    BALADIYAT[parts[0]].forEach(c=>{
      const o=document.createElement("option");
      o.textContent=c;
      b.appendChild(o);
    });
  }
}

function sendOrder(id,price){
  const name=document.getElementById("name"+id).value.trim();
  const phone=document.getElementById("phone"+id).value.trim();
  const wilaya=document.getElementById("wilaya"+id).value;
  const baladiya=document.getElementById("baladiya"+id).value;
  const msg=document.getElementById("msg"+id);

  if(!name||!phone||!wilaya||baladiya.includes("اختر")){
    msg.innerHTML="&#1610;&#1585;&#1580;&#1609; &#1573;&#1603;&#1605;&#1575;&#1604; &#1580;&#1605;&#1610;&#1593; &#1575;&#1604;&#1581;&#1602;&#1608;&#1604;";
    msg.style.color="red"; return;
  }

  msg.innerHTML="&#1580;&#1575;&#1585;&#1610; &#1575;&#1604;&#1573;&#1585;&#1587;&#1575;&#1604;...";
  msg.style.color="blue";

  fetch(SHEET_URL,{
    method:"POST",
    body:JSON.stringify({name,phone,wilaya,baladiya,price})
  })
  .then(()=>{
    msg.innerHTML="&#1578;&#1605; &#1573;&#1585;&#1587;&#1575;&#1604; &#1591;&#1604;&#1576;&#1603; &#1576;&#1606;&#1580;&#1575;&#1581; ✅";
    msg.style.color="green";
  })
  .catch(()=>{
    msg.innerHTML="&#1581;&#1583;&#1579; &#1582;&#1591;&#1571;";
    msg.style.color="red";
  });
}