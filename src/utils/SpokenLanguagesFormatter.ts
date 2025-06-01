interface SpokenLanguagesProps {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export function spokenLanguagesFormatter(languages: SpokenLanguagesProps[]) {
  const formattedLanguages: any = [];

  languages.map((language) => {
    formattedLanguages.push(
      new Intl.DisplayNames("pt-BR", { type: "language" }).of(
        language.iso_639_1
      )
    );
  });

  return formattedLanguages;
}
