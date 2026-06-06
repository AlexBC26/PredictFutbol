export async function analizarPartido(local, visitante, competicion) {
  const response = await fetch("/api-anthropic/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `Analiza el partido de ${competicion} entre ${local} y ${visitante}. Dame un análisis táctico breve, la forma reciente de ambos equipos y tu predicción del resultado con porcentajes. Habla como un comentarista apasionado, no aburrido. Máximo 150 palabras.`
        }
      ]
    })
  })

  const data = await response.json()
  return data.content[0].text
}