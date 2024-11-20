export const useConstants = () => {
  const sizes = [
    { value: "FILHOTE", label: "Filhote" },
    { value: "PEQUENO", label: "Pequeno" },
    { value: "MEDIO", label: "Médio" },
    { value: "GRANDE", label: "Grande" },
  ];

  const colors = [
    { value: "BRANCO", label: "Branco" },
    { value: "PRETO", label: "Preto" },
    { value: "MARROM", label: "Marrom" },
    { value: "CINZA", label: "Cinza" },
    { value: "DOURADO", label: "Dourado" },
    { value: "BEGE", label: "Bege" },
    { value: "AMARELO", label: "Amarelo" },
    { value: "AZUL", label: "Azul" },
    { value: "VERMELHO", label: "Vermelho" },
    { value: "VERDE", label: "Verde" },
  ];

  const gender = [
    { value: "M", label: "Macho" },
    { value: "F", label: "Fêmea" },
  ];

  return { sizes, colors, gender };
};
