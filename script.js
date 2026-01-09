function sendOrder(id, age) {

  var sizeEl = document.getElementById("size" + id);
  var colorEl = document.getElementById("color" + id);
  var wilayaEl = document.getElementById("wilaya" + id);
  var msg = document.getElementById("msg" + id);

  if (
    sizeEl.selectedIndex === 0 ||
    colorEl.selectedIndex === 0 ||
    wilayaEl.selectedIndex === 0
  ) {
    msg.style.color = "red";
    msg.innerHTML =
      "&#1610;&#1585;&#1580;&#1609; &#1575;&#1582;&#1578;&#1610;&#1575;&#1585; &#1580;&#1605;&#1610;&#1593; &#1575;&#1604;&#1576;&#1610;&#1575;&#1606;&#1575;&#1578;";
    return;
  }

  var size = sizeEl.options[sizeEl.selectedIndex].text;
  var color = colorEl.options[colorEl.selectedIndex].text;
  var wilaya = wilayaEl.options[wilayaEl.selectedIndex].text;

  var productPrice = 3200;
  var delivery = (wilaya === "الجزائر" || wilaya === "وهران") ? 400 : 600;
  var total = productPrice + delivery;

  // حفظ الطلب للإحصائيات
  var orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push({ total: total, date: new Date().toLocaleDateString() });
  localStorage.setItem("orders", JSON.stringify(orders));

  msg.style.color = "green";
  msg.innerHTML =
    "&#9989; &#1578;&#1605; &#1575;&#1587;&#1578;&#1604;&#1575;&#1605; &#1591;&#1604;&#1576;&#1603;<br>" +
    "<strong>&#1575;&#1604;&#1605;&#1580;&#1605;&#1608;&#1593;: " + total + " &#1583;&#1580;</strong>";

  setTimeout(function () {
    window.location.href = "thankyou.html";
  }, 1500);
}
