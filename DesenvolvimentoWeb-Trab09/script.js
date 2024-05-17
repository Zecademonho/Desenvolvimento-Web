const url = 'https://botafogo-atletas.mange.li/all';
let lista_jogadores;
// fazer botao pra filtrar so masculino ou so feminino

const container = document.createElement('container');
container.style.display = 'flex';
container.style.flexWrap = 'wrap';
container.style.gap = '.5em';
container.style.justifyContent = 'center';

const escudo = document.createElement('img');
escudo.src = 'midias/BOTAFOGO.png'

const divEscudo = document.createElement('div');
divEscudo.style.display = 'flex';
divEscudo.style.width = '5rem';
divEscudo.style.height = '5rem';

divEscudo.appendChild(escudo);

const divPesquisa = document.createElement('div');
divPesquisa.style.textAlign = 'center';
divPesquisa.style.marginTop = '15px';
divPesquisa.style.padding = '1rem';

const inputPesquisa = document.createElement('input');
inputPesquisa.type = 'text';
inputPesquisa.style.borderRadius = '10px';
divPesquisa.appendChild(inputPesquisa);

const header = document.createElement('div');
header.append(divEscudo);
header.append(divPesquisa);
header.style.backgroundColor = 'black';
header.style.borderRadius = '0 0 10px 10px'
header.style.display = 'flex';
header.style.justifyContent = 'space-between';
header.style.marginTop = '0';
header.style.marginBottom = '5px';

document.body.appendChild(header);
document.body.appendChild(container);

const handleClick = (e) => {
    const card = e.target.closest('article')
    const dados = card.dataset;

    for (const p in dados){
        document.cookie = `${p}=${dados[p]}`;
    }

    localStorage.setItem('atleta', JSON.stringify(dados));
    window.location.href = `pag2.html?altura=${dados.altura}&elenco=${dados.elenco}`;
}

const constroiCard = ( atleta ) => {
    const divCard = document.createElement('article');
    //divCard.className = 'card';
    divCard.style.backgroundColor = 'white';
    divCard.style.display = 'grid';
    divCard.style.width = 'fit-content';
    divCard.style.padding = '.5rem';
    divCard.style.border = '2px solid black';
    divCard.style.borderRadius = '10px';
    divCard.style.gridTemplateColumns = "10rem 20rem";
    divCard.style.gridTemplateAreas = "'a1 a2' 'a3 a3' 'a4 a4'";

    divCard.dataset.id = atleta.id;
    divCard.dataset.descricao = atleta.descricao;
    divCard.dataset.nome = atleta.nome;
    divCard.dataset.nomeCompleto = atleta.nome_completo;
    divCard.dataset.posicao = atleta.posicao;
    divCard.dataset.imagem = atleta.imagem;
    divCard.dataset.elenco = atleta.elenco;
    divCard.dataset.nascimento = atleta.nascimento;
    divCard.dataset.altura = atleta.altura;

    divCard.onclick = handleClick;

    const imagem = document.createElement('img');
    imagem.style.gridArea = 'a1';
    imagem.style.height = '8rem';
    imagem.style.width = '8rem';
    imagem.style.objectFit = 'cover';
    imagem.style.borderRadius = '50%';
    imagem.style.objectPosition = 'top';
    imagem.src = atleta.imagem;
    imagem.alt = atleta.nome;

    const titulo = document.createElement('section');
    //titulo.className = 'titulo';
    titulo.style.gridArea = 'a2';
    titulo.style.display = 'flex';
    titulo.style.flexDirection = 'column';
    titulo.style.alignItems = 'center';
    titulo.style.justifyContent = 'center';

    const pPosicao = document.createElement('p');
    pPosicao.style.fontWeight = 'bold';
    pPosicao.style.fontFamily = 'sans-serif';
    pPosicao.style.fontSize = '1rem';
    pPosicao.style.textTransform = 'uppercase';
    pPosicao.innerHTML = atleta.posicao;

    const pNome = document.createElement('p');
    pNome.style.fontWeight = 'bold';
    pNome.style.fontFamily = 'sans-serif';
    pNome.style.fontSize = '1.3rem';
    pNome.style.textTransform = 'uppercase';
    pNome.innerHTML = atleta.nome;

    const pDescri = document.createElement('p');
    //pDescri.className = 'descri'
    pDescri.style.gridArea = 'a3';
    pDescri.innerHTML = atleta.descricao;
    pDescri.style.overflow = 'hidden';
    pDescri.style.whiteSpace = 'nowrap';
    pDescri.style.textOverflow = 'ellipsis';

    const pNasci = document.createElement('p');
    //pNasci.className = 'nasci'
    pNasci.style.gridArea = 'a4';
    pNasci.innerHTML = atleta.nascimento;

    divCard.appendChild(imagem);
    
    divCard.appendChild(titulo);
    titulo.appendChild(pPosicao);
    titulo.appendChild(pNome);

    divCard.appendChild(pDescri);
    divCard.appendChild(pNasci);

    container.appendChild(divCard);
}


inputPesquisa.onkeyup = (event) => {
    const valor = event.target.value;
    const resultado = lista_jogadores.filter(
        (elemento) => elemento.posicao.toLowerCase().includes(valor.toLowerCase())
    )

    container.innerHTML= '';
    resultado.forEach(
        (jogador) => {
            constroiCard(jogador)
        }
    )
}

container.innerHTML = `
    <div style = 'text-align: center'>
        <img src = 'midias/loading.gif'/>
    </div>
`;

const pega_json = async(caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

pega_json(url).then(
    (r) => {
    container.innerHTML = '';
    lista_jogadores = r;
    r.forEach(
    (jogadora) => {
        constroiCard(jogadora)
    }
    )
    }
);
