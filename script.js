const SHEET_URL = "PUT_YOUR_GOOGLE_SCRIPT_URL";
let BALADIYAT = {};
const WILAYAS = {
  "1": "أدرار",
  "2": "الشلف",
  "3": "الأغواط",
  "4": "أم البواقي",
  "5": "باتنة",
  "6": "بجاية",
  "7": "بسكرة",
  "8": "بشار",
  "9": "البليدة",
  "10": "البويرة",
  "11": "تمنراست",
  "12": "تبسة",
  "13": "تلمسان",
  "14": "تيارت",
  "15": "تيزي وزو",
  "16": "الجزائر",
  "17": "الجلفة",
  "18": "جيجل",
  "19": "سطيف",
  "20": "سعيدة",
  "21": "سكيكدة",
  "22": "سيدي بلعباس",
  "23": "عنابة",
  "24": "قالمة",
  "25": "قسنطينة",
  "26": "المدية",
  "27": "مستغانم",
  "28": "المسيلة",
  "29": "معسكر",
  "30": "ورقلة",
  "31": "وهران",
  "32": "البيض",
  "33": "إليزي",
  "34": "برج بوعريريج",
  "35": "بومرداس",
  "36": "الطارف",
  "37": "تندوف",
  "38": "تيسمسيلت",
  "39": "الوادي",
  "40": "خنشلة",
  "41": "سوق أهراس",
  "42": "تيبازة",
  "43": "ميلة",
  "44": "عين الدفلى",
  "45": "النعامة",
  "46": "عين تموشنت",
  "47": "غرداية",
  "48": "غليزان",
  "49": "تيميمون",
  "50": "برج باجي مختار",
  "51": "أولاد جلال",
  "52": "بني عباس",
  "53": "عين صالح",
  "54": "عين قزام",
  "55": "تقرت",
  "56": "جانت",
  "57": "المغير",
  "58": "المنيعة"
};
fetch("baladiyat.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      const wilayaName = WILAYAS[item.wilaya_id];
      if (!wilayaName) return;

      if (!BALADIYAT[wilayaName]) {
        BALADIYAT[wilayaName] = [];
      }

      BALADIYAT[wilayaName].push(item.ar_name);
    });

    fillWilayas();
    console.log("OK", BALADIYAT);
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
