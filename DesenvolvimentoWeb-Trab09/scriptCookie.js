const achaCookie = (key) => {
    const lista_cookies = document.cookie.
    split("; ");

    const find = lista_cookies.find(
        (e) => e.startsWith(key)
    );

    return find?.split("=")[1];
}

const constroiCard = ( atleta ) => {
    const divCard = document.createElement('article');
    //divCard.className = 'card';
    divCard.style.backgroundColor = 'white';
    divCard.style.display = 'grid';
    divCard.style.width = 'fit-content';
    divCard.style.padding = '.5rem';
    divCard.style.position = 'absolute';
    divCard.style.top = '50%';
    divCard.style.left = '50%';
    divCard.style.transform = 'translate(-50%, -50%)';
    divCard.style.border = '2px solid black';
    divCard.style.borderRadius = '10px';
    divCard.style.gridTemplateColumns = "10rem 20rem";
    divCard.style.gridTemplateAreas = "'a1 a2' 'a3 a3' 'a4 a4' 'a5 a5'";

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

    const pNasci = document.createElement('p');
    //pNasci.className = 'nasci'
    pNasci.style.gridArea = 'a4';
    pNasci.innerHTML = atleta.nascimento;

    const pExtra = document.createElement('p');
    pExtra.innerHTML = `elenco: ${atleta.elenco}| altura: ${atleta.altura}`;
    pExtra.style.gridArea = 'a5';

    divCard.appendChild(imagem);
    
    divCard.appendChild(titulo);
    titulo.appendChild(pPosicao);
    titulo.appendChild(pNome);

    divCard.appendChild(pDescri);
    divCard.appendChild(pNasci);
    divCard.appendChild(pExtra);

    document.body.appendChild(divCard);
}

const parametros = new URLSearchParams(window.location.search);

// com cookie
const obj = {};
obj.nome = achaCookie('nomeCompleto');
obj.posicao = achaCookie('posicao');
obj.imagem = achaCookie('imagem');
obj.descricao = achaCookie('descricao');
obj.nascimento = achaCookie('nascimento');

//com localStorage
const obj2 = JSON.parse(localStorage.getItem('atleta'));

obj.elenco = parametros.get('elenco');
obj.altura = parametros.get('altura');

constroiCard(obj);