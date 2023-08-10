//<!--

const apiGET = async (url) => {
  const response = await fetch(url).catch(handleError);
  if (response.ok) {
    return await response.json();
  }
  handleError("Erro na chamada da API");
  return false;
};

const pegarConteudos = async (url) => {
  let secao = await apiGET(url);
  if (secao) {
    const elementoID = Object.keys(secao);
    if (elementoID.length) {
      const elemento = document.getElementById(elementoID[0]);
      if (elemento) {
        return [elemento, secao[elementoID[0]]];
      }
    }
  }
  return "";
};

const montaLista = (elemento, conteudo) => {
  if (Array.isArray(conteudo)) {
    const lista = criaElemento("ul", "");
    conteudo.forEach((value) => {
      const item = criaElemento("li", value);
      lista.appendChild(item);
    });
    elemento.appendChild(lista);
  }
};

const handleError = (err) => {
  console.warn(err);
  alert("Erro na conexão!");
};

const criaElemento = (tag, conteudo) => {
  const elemento = document.createElement(tag);
  elemento.innerText = conteudo;
  return elemento;
};

const isObject = (obj) =>
  typeof obj === "object" && obj !== null && !Array.isArray(obj);

(async () => {
  const secoes = await apiGET("js/secoes.json");
  if (secoes) {
    for (let secao in secoes) {
      if (Array.isArray(secoes[secao]) && secao == "secoes") {
        for (let secaoInterna of secoes[secao]) {
          const elemento = document.getElementById(secaoInterna.id);
          const titulo = criaElemento("h2", secaoInterna.title);
          const descricao = criaElemento("p", secaoInterna.content);
          elemento.appendChild(titulo);
          elemento.appendChild(descricao);
        }
      } else {
        const elemento = document.getElementById(secao);
        if (elemento) {
          const conteudo = secoes[secao];
          if (!!conteudo) {
            if (Array.isArray(conteudo)) {
              conteudo.forEach((value) => {
                if (isObject(value))
                  elemento.innerHTML += `<a href="${value.url}">${value.text}</a> `;
              });
            } else {
              elemento.innerText = conteudo;
            }
          }
        }
      }
    }
  }

  const experiencias = await pegarConteudos("js/experiencia.json");
  if (experiencias) {
    if (Array.isArray(experiencias) && experiencias.length == 2) {
      const [elemento, conteudo] = experiencias;
      conteudo.forEach((value) => {
        const tituloLink = criaElemento("a", value.title);
        tituloLink.setAttribute("href", value.url);
        const titulo = criaElemento("h3", "");
        titulo.appendChild(tituloLink);
        const tempoTrabalho = criaElemento("p", "");
        tempoTrabalho.innerHTML = `<em>${value.worktime}</em>`;
        const descricao = criaElemento("p", value.description);
        elemento.appendChild(titulo);
        elemento.appendChild(tempoTrabalho);
        elemento.appendChild(descricao);
      });
    }
  }

  const formacoes = await pegarConteudos("js/formacao.json");
  if (formacoes) {
    if (Array.isArray(formacoes) && formacoes.length == 2) {
      const [elemento, conteudo] = formacoes;
      conteudo.forEach((value) => {
        const titulo = criaElemento("h3", value.title + " - " + value.endTime);
        const descricao = criaElemento("p", value.description);
        elemento.appendChild(titulo);
        elemento.appendChild(descricao);
      });
    }
  }

  const cursos = await pegarConteudos("js/cursos.json");
  if (cursos) {
    montaLista(...cursos);
  }

  const certificacoes = await pegarConteudos("js/certificacoes.json");
  if (certificacoes) {
    montaLista(...certificacoes);
  }

  const voluntariasLideranca = await pegarConteudos(
    "js/experienciavoluntariaedelideranca.json"
  );
  if (voluntariasLideranca) {
    if (
      Array.isArray(voluntariasLideranca) &&
      voluntariasLideranca.length == 2
    ) {
      const [elemento, conteudo] = voluntariasLideranca;
      if (isObject(conteudo)) {
        const texto = criaElemento("p", conteudo.title);
        elemento.appendChild(texto);
        if (Array.isArray(conteudo.infos)) {
          const lista = criaElemento("ul", "");
          conteudo.infos.forEach((value) => {
            if (isObject(value)) {
              let links = "(";
              value.link.forEach((v, k) => {
                links += `<a href="${v}">${value.linkText[k]}</a> - `;
              });
              links = " " + links.trim().slice(0, -1).trim() + ")";
              const item = criaElemento("li", value.text);
              item.innerHTML += links;
              lista.appendChild(item);
            }
          });
          elemento.appendChild(lista);
        }
      }
    }
  }

  const contato = document.getElementById("frmmail");
  contato.onsubmit = () => {
    const formObrigatorios = document.querySelectorAll(".obrigatorio");
    let valido = true;
    let i = 0;
    while (valido && i < formObrigatorios.length) {
      const campo = formObrigatorios[i++];
      if (campo.value.length < 2) {
        alert(campo.name + " precisa ser preenchido");
        campo.focus();
        valido = false;
      }
    }
    return valido;
  };

})();

//-->
