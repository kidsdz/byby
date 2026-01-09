const SHEET_URL = "PUT_YOUR_GOOGLE_SCRIPT_URL";
const PRODUCT_PRICE = 2500;

let BALADIYAT = {};

/* الولايات */
const WILAYAS = {
  "1":"أدرار","2":"الشلف","3":"الأغواط","4":"أم البواقي","5":"باتنة",
  "6":"بجاية","7":"بسكرة","8":"بشار","9":"البليدة","10":"البويرة",
  "11":"تمنراست","12":"تبسة","13":"تلمسان","14":"تيارت","15":"تيزي وزو",
  "16":"الجزائر","17":"الجلفة","18":"جيجل","19":"سطيف","20":"سعيدة",
  "21":"سكيكدة","22":"سيدي بلعباس","23":"عنابة","24":"قالمة","25":"قسنطينة",
  "26":"المدية","27":"مستغانم","28":"المسيلة","29":"معسكر","30":"ورقلة",
  "31":"وهران","32":"البيض","33":"إليزي","34":"برج بوعريريج","35":"بومرداس",
  "36":"الطارف","37":"تندوف","38":"تيسمسيلت","39":"الوادي","40":"خنشلة",
  "41":"سوق أهراس","42":"تيبازة","43":"ميلة","44":"عين الدفلى",
  "45":"النعامة","46":"عين تموشنت","47":"غرداية","48":"غليزان",
  "49":"تيميمون","50":"برج باجي مختار","51":"أولاد جلال",
  "52":"بني عباس","53":"عين صالح","54":"عين قزام",
  "55":"تقرت","56":"جانت","57":"المغير","58":"المنيعة"
};

/* أسعار التوصيل */
const DELIVERY_PRICES = {
  "الجزائر":400,"البليدة":500,"بومرداس":500,"تيبازة":500,
  "وهران":600,"سطيف":600,"قسنطينة":600,"عنابة":600,
  "بسكرة":800,"الجلفة":800,"ورقلة":1000,"غرداية":1000,
  "أدرار":1400,"بشار":1400,"تمنراست":1800,"إليزي":1800
};

/* تحميل البلديات */
fetch("baladiyat.json")
.then(r=>r.json())
.then(data=>{
  data.forEach(i=>{
    const w=WILAYAS[i.wilaya_id];
    if(!BALADIYAT[w]) BALADIYAT[w]=[];
    BALADIYAT[w].push(i.ar_name);
  });
  fillWilayas();
});

/* تعبئة الولايات */
function fillWilayas(){
  const w=document.getElementById("wilaya1");
  for(const id in WILAYAS){
    const name=WILAYAS[id];
    const price=DELIVERY_PRICES[name]||700;
    const o=document.createElement("option");
    o.value=name+"|"+price;
    o.textContent=`${name} - ${price} دج`;
    w.appendChild(o);
  }
}

/* إظهار النموذج */
function showForm(id){
  const s=document.getElementById("size"+id).value;
  const c=document.getElementById("color"+id).value;
  const m=document.getElementById("msg"+id);

  if(s.includes("اختر")||c.includes("اختر")){
    m.innerHTML="يرجى اختيار المقاس واللون";
    m.style.color="red";
    return;
  }
  document.getElementById("form"+id).classList.remove("hidden");
  m.innerHTML="";
}

/* تحديث الولاية */
function updateWilaya(id,price){
  const w=document.getElementById("wilaya"+id).value;
  const b=document.getElementById("baladiya"+id);
  const d=document.getElementById("delivery"+id);
  const t=document.getElementById("total"+id);

  b.innerHTML='<option value="">اختر البلدية</option>';
  if(!w)return;

  const [name,del]=w.split("|");
  d.innerHTML="سعر التوصيل: "+del+" دج";
  t.innerHTML="المجموع: "+(price+parseInt(del))+" دج";

  BALADIYAT[name]?.forEach(x=>{
    const o=document.createElement("option");
    o.textContent=x;
    b.appendChild(o);
  });
}

/* إرسال الطلب */
function sendOrder(id,price){
  const name=name1.value.trim();
  const phone=phone1.value.trim();
  const wilaya=wilaya1.value;
  const baladiya=baladiya1.value;
  const msg=msg1;

  if(!name||!phone||!wilaya||!baladiya){
    msg.innerHTML="يرجى ملء جميع الحقول";
    msg.style.color="red";return;
  }

  msg.innerHTML="جاري الإرسال...";
  msg.style.color="blue";

  fetch(SHEET_URL,{
    method:"POST",
    body:JSON.stringify({name,phone,wilaya,baladiya,price})
  })
  .then(()=>{
    msg.innerHTML="تم إرسال طلبك بنجاح ✅";
    msg.style.color="green";
  })
  .catch(()=>{
    msg.innerHTML="حدث خطأ";
    msg.style.color="red";
  });
    }
