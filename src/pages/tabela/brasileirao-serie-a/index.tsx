import { useRef, useState } from 'react'
import Head from 'next/head'
import TableTitle from '../TabelaTitle'
import axios from '@/services/championshipRequest'
import formatChampionshipList from '@/utils/formatChampionshipList'
import formatDateMatch from '@/utils/formatDateMatch'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import style from './Tabela.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

type Matches = {
  homeTeam: string,
  homeScore: number | null,
  awayScore: number | null,
  awayTeam: string,
  datetime: string | null,
  stadium: string | null,
  matchWeek: string | number
}

// Requisição dos dados para preencher a tabela
export async function getServerSideProps(ctx: any) {
  let championshipTable: any[] = []
  let matches: Matches[] = []
  let currentMatchWeek: number = 1

  // ID 1 é da Campeonato Brasileiro
  const axiosResult = await axios.listChampionship({ id: 1 })

  if (axiosResult && axiosResult.status == 200) {
    const result = axiosResult.data.result

    // Caso retorne resultados
    const matchesResult = axiosResult.data.result[0].matches
    if ((result.length > 0) && (matchesResult !== '[]')) {
      const formattedResult = formatChampionshipList(axiosResult.data.result[0])

      championshipTable = JSON.parse(formattedResult.championshipTable!)
      matches = JSON.parse(formattedResult.matches!)
      currentMatchWeek = formattedResult.currentMatchWeek!
    }
  }

  return {
    props: {
      table: championshipTable,
      matches: matches,
      currentMatchWeek: currentMatchWeek
    }
  }
}

export default function BrasileiraoSerieA({ table, matches, currentMatchWeek }: { table: any[], matches: Matches[], currentMatchWeek: number }) {
  // Utilizadas nas metatags
  const championship = `Campeonato Brasileiro Serie A`.replaceAll('<!-- -->', '')
  const title = `Tabela ${championship} - Nome da Empresa`.replaceAll('<!-- -->', '')

  // Lista todas as fases ou rodadas da competição
  function allMatchWeeks(): (string | number)[] {
    let list: Array<string | number> = []

    list = matches.map((item) => item.matchWeek)
    return list = [...new Set(list)]
  }

  // Controla os botões dos slide shows
  const swiperRef = useRef<any>();
  const [matchWeekBeingShown, setMatchWeekBeingShown] = useState<number>(currentMatchWeek)

  return (
    <main>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`Tabela ${championship} - Nome da Empresa`} />

        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={`Tabela ${championship} - Nome da Empresa`} />
        <meta itemProp="image" content={`${process.env.SERVERDOMAIN}/public/images/logo.png`} />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content={process.env.CLIENTDOMAIN} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={`Tabela ${championship} - Nome da Empresa.`} />
        <meta property="og:image" content={`${process.env.SERVERDOMAIN}/public/images/logo.png`} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={`Tabela ${championship} - Nome da Empresa`} />
        <meta name="twitter:image" content={`${process.env.SERVERDOMAIN}/public/images/logo.png`} />
      </Head>

      {/* Título da página */}
      <TableTitle param='campeonato-brasileiro-serie-a' />

      <hr className={style.hr} />
      <div className={style.ad}>
        Área de anúncio
      </div>
      <hr className={style.hr} />

      <div className={style.content}>
        {/* Tabela de classificação */}
        <table className={style.table}>
          <thead>
            <tr>
              <th>Pos</th>
              <th className={style.tableTeam}>Time</th>
              <th>P</th>
              <th>J</th>
              <th>V</th>
              <th>E</th>
              <th>D</th>
              <th>GP</th>
              <th>GC</th>
              <th>SG</th>
            </tr>
          </thead>
          <tbody>
            {
              table.map((item, i) => (
                <tr key={i}>
                  {/* Determina a cor do plano de fundo dependendo da classificação alcançada */}
                  <td className={
                    (i + 1) <= 4 // Libertadores
                      ? style.libertadores
                      : (i + 1) <= 6  // Pré Libertadores
                        ? style.prelibertadores
                        : (i + 1) <= 12 // Sulamericana
                          ? style.sulamericana
                          : (i + 1) >= 17 // Zona de Rebaixamento
                            ? style.zonarebaixamento
                            : ''
                  }>
                    {i + 1}
                  </td>
                  <td className={style.tableTeam}>{item.team}</td>
                  <td className={style.tablePoints}>{item.points}</td>
                  <td>{item.played}</td>
                  <td>{item.won}</td>
                  <td>{item.drawn}</td>
                  <td>{item.lost}</td>
                  <td>{item.goalsFor}</td>
                  <td>{item.goalsAgainst}</td>
                  <td>{item.goalsDifference}</td>
                </tr>
              ))
            }
          </tbody>
        </table>

        {/* Rodadas */}
        <div className={style.matches}>
          <div className={style.matchesTitle}>
            <button onClick={() => {
              swiperRef.current?.slidePrev()
              setMatchWeekBeingShown(swiperRef.current?.realIndex + 1)
            }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span>Rodada {matchWeekBeingShown}</span>
            <button onClick={() => {
              swiperRef.current?.slideNext()
              setMatchWeekBeingShown(swiperRef.current?.realIndex + 1)
            }}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <Swiper
            slidesPerView={1}
            centeredSlides={true}
            initialSlide={currentMatchWeek - 1}
            modules={[Navigation]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper
            }}
            className={`${style.swiper} swiper-no-swiping`}
          >
            {
              allMatchWeeks().map((item, i) => <SwiperSlide className={style.swiperSlide} key={i}>
                {
                  matches.map((match, i) => {
                    if (match.matchWeek == item) {
                      return (<div className={style.matchesContent} key={i}>
                        <div className={style.matchInfo}>
                          <p>{match.datetime ? formatDateMatch(match.datetime) : ''}</p>
                          <p>{match.stadium ?? ''}</p>
                        </div>
                        <div className={style.matchScore}>
                          <div className={style.matchTeam}>{match.homeTeam}</div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                            {match.homeScore ?? ''} X {match.awayScore ?? ''}
                          </div>
                          <div className={style.matchTeam}>{match.awayTeam}</div>
                        </div>
                      </div>)
                    }
                  })
                }
              </SwiperSlide>)

            }
          </Swiper >
        </div>
      </div>

      <div className={style.caption}>
        <p>LEGENDA:</p>
        <div className={style.list}>
          <p>
            Pos: Posição |
            P: Pontuação |
            J: Jogos |
            V: Vitórias |
            E: Empates |
            D: Derrotas |
            GP: Gols Pró |
            GC: Gols Contra |
            SG: Saldo de Gols
          </p>
        </div>
        <div className={style.list}>
          <p>
            Verde (1º ao 4º): Copa Libertadores |
            Amarelo (5º ao 6º): Pré Libertadores |
            Azul (7º ao 12º): Copa Sul-Americana |
            Vermelho  (17º ao 20º): Zona de Rebaixamento
          </p>
        </div>
      </div>
    </main>
  )
}
