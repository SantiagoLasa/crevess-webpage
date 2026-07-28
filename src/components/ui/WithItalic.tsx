// Renderiza un titular con una sola palabra en itálica — el gesto de marca.
// El padre pone el elemento (h1/h2) y las clases; esto devuelve los nodos.
export function WithItalic({ text, italic }: { text: string; italic?: string }) {
  if (!italic) return <>{text}</>;
  const at = text.indexOf(italic);
  if (at === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <em>{italic}</em>
      {text.slice(at + italic.length)}
    </>
  );
}
