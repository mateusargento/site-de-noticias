import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import cleanString from '@/utils/cleanString'
import style from './Tabela.module.scss'

export default function TabelaTitle({ param }: any) {
  const router = useRouter()
  const [table, setTable] = useState<string>('')

  useEffect(() => {
    // Checa o tabela recebido por parâmetro na url
    // Se não for uma tabela aceita no switch, redireciona
    function checkTable(): void {
      // Remove todos os caracteres que não são utilizados na variável, por segurança
      const table = cleanString(param)

      switch (table) {
        case 'campeonato-brasileiro-serie-a':
          setTable('CAMPEONATO BRASILEIRO SÉRIE A')
          break
        case 'campeonato-carioca':
          setTable('CAMPEONATO CARIOCA')
          break
        case 'copa-do-brasil':
          setTable('COPA DO BRASIL')
          break
        case 'copa-libertadores':
          setTable('COPA LIBERTADORES')
          break
        case 'copa-sul-americana':
          setTable('COPA SUL-AMERICANA')
          break
        default:
          router.push('/pagina-nao-encontrada')
          break
      }
    }

    checkTable()
  })

  return (
    <h1 className={style.title}>{table}</h1>
  )
}
