import { useEffect, useState } from "react"

const COMPETICIONES = [
  { nombre: "LaLiga", codigo: "PD" },
  { nombre: "Premier League", codigo: "PL" },
  { nombre: "Bundesliga", codigo: "BL1" },
  { nombre: "Serie A", codigo: "SA" },
  { nombre: "Ligue 1", codigo: "FL1" },
  { nombre: "Champions League", codigo: "CL" },
  { nombre: "Europa League", codigo: "EL" },
  { nombre: "Mundial", codigo: "WC" },
]

function App() {
  const [competicion, setCompeticion] = useState("PD")
  const [jornada, setJornada] = useState(1)
  const [partidos, setPartidos] = useState([])
  const [totalJornadas, setTotalJornadas] = useState(38)

  useEffect(() => {
    fetch(`/api-football/v4/competitions/${competicion}/matches?matchday=${jornada}`, {
      headers: {
        "X-Auth-Token": import.meta.env.VITE_FOOTBALL_API_KEY
      }
    })
      .then(res => res.json())
      .then(data => {
        setPartidos(data.matches || [])
        if (data.matches && data.matches.length > 0) {
          setTotalJornadas(data.matches[0].season.currentMatchday)
        }
      })
  }, [competicion, jornada])

  return (
    <div>
      <h1>Analizador de jornada</h1>

      <select value={competicion} onChange={e => { setCompeticion(e.target.value); setJornada(1) }}>
        {COMPETICIONES.map(c => (
          <option key={c.codigo} value={c.codigo}>{c.nombre}</option>
        ))}
      </select>

      <select value={jornada} onChange={e => setJornada(Number(e.target.value))}>
        {Array.from({ length: totalJornadas }, (_, i) => i + 1).map(j => (
          <option key={j} value={j}>Jornada {j}</option>
        ))}
      </select>

      {partidos.map(partido => (
        <div key={partido.id}>
          <span>{partido.homeTeam.name}</span>
          <span> vs </span>
          <span>{partido.awayTeam.name}</span>
          <span> — {partido.status}</span>
        </div>
      ))}
    </div>
  )
}

export default App