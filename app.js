const API_URL = "http://localhost:3000";

let generatedCode = "";

async function sendVerification() {

  const email = document.getElementById("email").value;

  const response = await fetch(`${API_URL}/send-code`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({ email })
  });

  const data = await response.json();

  generatedCode = data.code;

  alert("Código enviado correctamente");

  document
    .getElementById("verifyContainer")
    .classList
    .remove("hidden");
}

function verifyCode() {

  const userCode = document.getElementById("code").value;

  if (userCode === generatedCode) {

    alert("Email verificado");

    document
      .getElementById("uploadSection")
      .classList
      .remove("hidden");

  } else {
    alert("Código incorrecto");
  }
}

async function uploadFile() {

  const fileInput = document.getElementById("fileInput");

  const formData = new FormData();

  formData.append("file", fileInput.files[0]);

  const response = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    body: formData
  });

  const data = await response.json();

  document
    .getElementById("resultSection")
    .classList
    .remove("hidden");

  document.getElementById("resultData").innerHTML = `
    <p><strong>Texto detectado:</strong></p>
    <p>${data.text}</p>

    <p><strong>Números encontrados:</strong></p>
    <p>${data.numbers.join(", ")}</p>

    <p><strong>Total estimado:</strong></p>
    <h3>$${data.total}</h3>
  `;
}
