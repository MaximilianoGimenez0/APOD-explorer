export const components = {
  filters: {
    title: "Explorar Arquivo",
    year: "Ano",
    month: "Mês",
    all: "Todos",
    filter: "Filtrar",
    search: "Buscar",
    random: "Descoberta Aleatória",
    apply: "Aplicar",
    or: "OU"
  },
  apodCard: {
    readMore: "Ler mais",
    exploreMystery: "Explorar mistério"
  },
  apodControls: {
    removeFromFavs: "Remover dos favoritos",
    addToFavs: "Adicionar aos favoritos",
    saved: "Salvo",
    save: "Salvar",
    share: "Compartilhar"
  },
  survey: {
    title: "Pesquisa",
    sending: "Enviando...",
    name: "Nome:",
    namePlaceholder: "Nome",
    lastName: "Sobrenome:",
    lastNamePlaceholder: "Sobrenome",
    birthDate: "Data de Nascimento:",
    gender: "Gênero:",
    genderMale: "Masculino",
    genderFemale: "Feminino",
    genderOther: "Outro",
    rating: "O que você achou da página?",
    ratingSelect: "Selecione uma opção",
    rating1: "Lamentável",
    rating2: "Ruim",
    rating3: "Poderia ser melhor",
    rating4: "Atende às minhas expectativas",
    rating5: "Adorei",
    email: "E-mail:",
    comment: "Comentário:",
    submit: "Enviar",
    cancel: "Cancelar",
    success: "Formulário enviado ✅",
    close: "Fechar",
    errors: {
      nameRequired: "O nome é obrigatório.",
      nameLetters: "Deve conter apenas letras.",
      lastNameRequired: "O sobrenome é obrigatório.",
      lastNameLetters: "Deve conter apenas letras.",
      birthDateRequired: "Selecione sua data de nascimento.",
      birthDateInvalid: "Selecione uma data válida.",
      genderRequired: "Selecione uma opção.",
      ratingRequired: "Selecione uma avaliação.",
      emailRequired: "O e-mail é obrigatório.",
      emailInvalid: "O e-mail é inválido.",
      sendError: "Erro ao enviar e-mail."
    }
  },
  errorFallback: {
    defaultTitle: "Sinais Perdidos no Cosmos",
    timeoutTitle: "Tempo Limite Excedido (10s)",
    notFoundTitle: "Descoberta Não Encontrada (404)",
    forbiddenTitle: "Acesso Não Autorizado (403)",
    defaultMessage: "Ocorreu um problema de comunicação ao conectar com os servidores da NASA.",
    timeoutMessage: "A API da NASA demorou mais de 10 segundos para responder. É possível que o serviço esteja com sobrecarga temporária.",
    notFoundMessage: "Nenhuma imagem ou registro astronômico foi encontrado para os critérios selecionados no arquivo da NASA.",
    forbiddenMessage: "A chave de API da NASA é inválida ou não possui permissões. Verifique a variável VITE_API_KEY no arquivo .env.",
    reloadCta: "Recarregar página",
    retryCta: "Tentar novamente",
    statusTimeout: "TIMEOUT (10s)",
    statusNotFound: "ERRO 404",
    statusForbidden: "ERRO 403",
    statusError: "ERRO DE SERVIÇO",
    hint: "Você pode tentar recarregar a página ou tentar a busca novamente em alguns instantes."
  }
} as const;

