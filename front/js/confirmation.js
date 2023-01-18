const orderId = new URL(location.href).searchParams.get("orderId");

const orderIdHtml = document.getElementById("orderId");
  orderIdHtml.innerText = orderId;