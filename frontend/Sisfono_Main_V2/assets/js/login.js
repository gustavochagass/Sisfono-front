document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuarioInput = document.getElementById("user");
    const senhaInput = document.getElementById("password");
    const cpfOuEmail = usuarioInput.value.trim();
    const senha = senhaInput.value.trim();
    const isEmail = cpfOuEmail.includes("@");
    const usuarioFormatado = isEmail
      ? cpfOuEmail
      : cpfOuEmail.replace(/\D+/g, "");

    const body = isEmail
      ? { email: usuarioFormatado, senha }
      : { cpf: usuarioFormatado, senha };

    try {
      const response = await fetch(
        "http://localhost:8080/api/fonoaudiologos/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        // Modificação principal aqui:
        const usuario = await response.json();
        alert(`Bem-vindo, ${usuario.nome}`);
        
        // Armazena dados do usuário no localStorage
        localStorage.setItem('userData', JSON.stringify(usuario));
        
        window.location.href = "tela_fonoPrincipal.html";
      } else {
        // Trata diferentes tipos de erros
        const errorData = await response.json();
        alert(errorData.message || "Usuário ou senha inválidos");
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      alert("Erro de conexão com o servidor.");
    }
  });
});