export function languagesFormatter(languages: []) {
  const formattedLanguages: any = [];

  languages.map((language) => {
    formattedLanguages.push(
      new Intl.DisplayNames("pt-BR", { type: "language" }).of(language)
    );
  });

  return formattedLanguages;
}
