document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-cadastro");
  
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const cpfFormatado = form.cpf.value.replace(/\D+/g, '');

    const dados = {
      nome: form.nome.value,
      cpf: cpfFormatado,
      crf: form.crf.value,
      email: form.email.value,
      telefone: form.telefone.value,
      senha: form.senha.value
    };

    try {
      const response = await fetch("http://localhost:8080/api/fonoaudiologos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "tela_login.html";
      } else {
        alert("Erro ao cadastrar. Verifique os dados.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro na conexão com o servidor.");
    }
  });
});
