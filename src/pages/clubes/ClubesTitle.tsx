import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import cleanString from '@/utils/cleanString'
import style from './Clubes.module.scss'

export default function ClubesTitle({param}: any) {
  const router = useRouter()
  const [team, setTeam] = useState<string>('')
  // Estilo do time escolhido
  const [titleStyle, setTitleStyle] = useState<string>('')

  useEffect(() => {
    // Checa o time recebido por parâmetro na url
    // Se não for um time aceito no switch, redireciona
    function checkTeam(): void {
      // Remove todos os caracteres que não são utilizados na variável, por segurança
      const team = cleanString(param)

      switch (team) {
        case 'botafogo':
          setTeam(team.toUpperCase())
          setTitleStyle(style.botafogo)
          break
        case 'flamengo':
          setTeam(team.toUpperCase())
          setTitleStyle(style.flamengo)
          break
        case 'fluminense':
          setTeam(team.toUpperCase())
          setTitleStyle(style.fluminense)
          break
        case 'vasco':
          setTeam(team.toUpperCase())
          setTitleStyle(style.vasco)
          break
        default:
          router.push('/pagina-nao-encontrada')
          break
      }
    }

    checkTeam()
  })

  return (
    <h1 className={titleStyle}>{team}</h1>
  )
}
