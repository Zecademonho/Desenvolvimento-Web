const alvo = 'fbfd2a996aa9f5ddb7e72b15b4f666c4';
const sal = '27/11/2004';
const mensagem =  document.getElementById('mensagem')

document.getElementById('btn_enviar').onclick = () =>{
    const entrada = document.getElementById('senha').value;
    if (hex_md5(entrada + sal) === alvo){
        mensagem.innerHTML = 'Bem vindo';
        sessionStorage.setItem('logado', '1');
        window.location.href = 'pag2.html';
    }else{
        mensagem.innerHTML = 'Senha incorreta';
    }
}