let logado = false;

if (sessionStorage.getItem('logado')){
   document.body.innerHTML = `
   <h1> ESCONDIDA </h1>
   <button id="btn_sair">Sair</button>
   `
}
document.getElementById('btn_sair').onclick = () => {
    sessionStorage.removeItem('logado');
    window.location.href = 'index.html';
}
