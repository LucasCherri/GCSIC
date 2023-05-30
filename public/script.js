function calcularImpostos(event) {
  event.preventDefault();

  const empresa = document.getElementById("empresa").value;
  const valor = parseFloat(document.getElementById("preco").value);
  const cidade = document.getElementById("cidade").value;

  fetch("/INFS", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ empresa: empresa, preco: valor, cidade: cidade })
  })
    .then(response => response.json())
    .then(data => {
      const resultadoElement = document.getElementById("resultado");
      resultadoElement.innerHTML = `<p>Empresa: ${data.empresa}</p>
                                     <p>Imposto a pagar (${data.taxa}%): R$ ${data.imposto.toFixed(2)}</p>
                                     <p>Total: R$ ${data.total.toFixed(2)}</p>`;
    })
    .catch(error => console.error("Erro:", error));
}

document.getElementById("calculadoraForm").addEventListener("submit", calcularImpostos);
