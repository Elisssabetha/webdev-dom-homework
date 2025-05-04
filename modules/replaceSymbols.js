export const replaceSymbols = (text) => {
    return text
      .trim()
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  };