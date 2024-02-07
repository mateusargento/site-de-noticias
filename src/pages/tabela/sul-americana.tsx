import { useRef, useState } from 'react'
import Head from 'next/head'
import TableTitle from './TabelaTitle'
import QualifyMatches from './QualifyMatches'
import axios from '@/services/championshipRequest'
import formatDateMatch from '@/utils/formatDateMatch'
import formatChampionshipList from '@/utils/formatChampionshipList'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import style from './Tabela.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

export type Matches = {
  homeTeam: string,
  homeScore: number | null,
  awayScore: number | null,
  awayTeam: string,
  datetime: string | null,
  stadium: string | null,
  matchWeek: string | number,
  group: string
}

// Requisição dos dados para preencher a tabela
export async function getServerSideProps(ctx: any) {
  let championshipTable: any[] = []
  let matches: Matches[] = []
  let currentMatchWeek: number = 1
  let currentStage: string = 'firstRound'

  // ID 5 é da Copa Sul-Americana
  const axiosResult = await axios.listChampionship({ id: 5 })

  if (axiosResult && axiosResult.status == 200) {
    const result = axiosResult.data.result

    // Caso retorne resultados
    const matchesResult = axiosResult.data.result[0].matches
    if ((result.length > 0) && (matchesResult !== '[]')) {
      const formattedResult = formatChampionshipList(axiosResult.data.result[0])

      championshipTable = JSON.parse(formattedResult.championshipTable!)
      matches = JSON.parse(formattedResult.matches!)
      currentMatchWeek = formattedResult.currentMatchWeek!
      currentStage = formattedResult.currentStage!
    }
  }

  return {
    props: {
      table: championshipTable,
      matches: matches,
      currentStage: currentStage,
      currentMatchWeek: currentMatchWeek,
    }
  }
}

export default function Clubes({
  table,
  matches,
  currentStage,
  currentMatchWeek
}: {
  table: any[],
  matches: Matches[],
  currentStage: string,
  currentMatchWeek: number
}) {
  // Utilizadas nas metatags
  const championship = `Copa Sul-Americana`.replaceAll('<!-- -->', '')
  const title = `Tabela ${championship} - Nome da Empresa`.replaceAll('<!-- -->', '')

  // Grupos da fase de grupos
  const [groups, setGroups] = useState<string[]>(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])
  const [allMatchWeeksGroupStage, setAllMatchWeeksGroupStage] = useState<string[]>(['1', '2', '3', '4', '5', '6'])
  // Lista todas as fases ou rodadas da competição
  const [allMatchWeeks, setAllMatchWeeks] = useState<{ key: string, label: string }[]>([
    { key: 'firstQualifyRound', label: 'Primeira Fase' },
    { key: 'groupStage', label: 'Fase de Grupos' },
    { key: 'playoffsRoundOf16', label: 'Playoffs Oitavas de Final' },
    { key: 'roundOf16', label: 'Oitavas de Final' },
    { key: 'quarterFinals', label: 'Quartas de Final' },
    { key: 'semiFinals', label: 'Semifinais' },
    { key: 'final', label: 'Final' }
  ])

  // Controla os botões dos slide shows
  const swiperRefMatchWeek = useRef<any>();
  const [matchWeekBeingShown, setMatchWeekBeingShown] = useState<number>(
    currentStage !== '' ? allMatchWeeks.findIndex((item) => item.key == currentStage) : 0
  )
  const swiperRefGroupStageMatchWeek = useRef<any>([]);
  const [groupStageMatchWeekBeingShown, setGroupStageMatchWeekBeingShown] = useState<number[]>([currentMatchWeek, currentMatchWeek, currentMatchWeek, currentMatchWeek, currentMatchWeek, currentMatchWeek, currentMatchWeek, currentMatchWeek])

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
      <TableTitle param='copa-sul-americana' />

      <hr className={style.hr} />
      <div className={style.ad}>
        Área de anúncio
      </div>
      <hr className={style.hr} />

      {/* Fase da competição */}
      <div className={style.matchWeekTitle}>
        <button onClick={() => {
          // Altera o slide
          swiperRefMatchWeek.current?.slidePrev()

          // Altera a fase da competição para ser exibido no título
          setMatchWeekBeingShown(swiperRefMatchWeek.current?.realIndex)
        }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h2>{allMatchWeeks[matchWeekBeingShown].label.toUpperCase()}</h2>
        <button onClick={() => {
          // Altera o slide
          swiperRefMatchWeek.current.slideNext()

          // Altera a fase da competição para ser exibido no título
          setMatchWeekBeingShown(swiperRefMatchWeek.current?.realIndex)
        }}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <Swiper
        slidesPerView={1}
        autoHeight={true}
        initialSlide={matchWeekBeingShown}
        centeredSlides={true}
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          swiperRefMatchWeek.current = swiper
        }}
        className={`${style.swiperGroupStage} swiper-no-swiping`}
        style={{ marginBottom: '70px' }}
      >
        {/* Primeira fase */}
        <SwiperSlide className={style.swiperSlide} >
          <QualifyMatches matches={matches} stage='firstQualifyRound' qualifyMatchesStyle='one-in-one' />
        </SwiperSlide>

        {/* Fase de grupos */}
        <SwiperSlide className={style.swiperSlide}>
          {
            groups.map((groupsItem, i) => {
              // Posição de classificação do time no grupo
              let pos = 0

              return (
                <div className={style.groupStageContent} key={i}>
                  <h3 className={style.groupStageTitle}>Grupo {groupsItem.toUpperCase()}</h3>
                  <div></div>

                  {/* Tabela de classificação dos grupos */}
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
                        table.map((item, i) => {
                          if (item.group == groupsItem) {
                            pos++

                            return (<tr key={i}>
                              <td className={
                                pos == 1 // Classificado
                                  ? style.qualified
                                  : pos == 2 // Playoffs Oitavas de Final
                                    ? style.playoffs
                                    : ''
                              }>
                                {pos}
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
                            </tr>)
                          }
                        })
                      }
                    </tbody>
                  </table>

                  {/* Rodadas */}
                  <div className={style.matches}>
                    <div className={style.matchesTitle}>
                      <button onClick={() => {
                        // Altera o slide
                        swiperRefGroupStageMatchWeek.current[i]?.slidePrev()

                        // Altera o número da rodada para ser exibido no título da rodada
                        setGroupStageMatchWeekBeingShown(oldValues => {
                          oldValues[i] = swiperRefGroupStageMatchWeek.current[i]?.realIndex + 1
                          return [...oldValues]
                        })
                      }}
                      >
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </button>
                      <span>Rodada {groupStageMatchWeekBeingShown[i]}</span>
                      <button onClick={() => {
                        // Altera o slide
                        swiperRefGroupStageMatchWeek.current[i]?.slideNext()

                        // Altera o número da rodada para ser exibido no título da rodada
                        setGroupStageMatchWeekBeingShown(oldValues => {
                          oldValues[i] = swiperRefGroupStageMatchWeek.current[i]?.realIndex + 1
                          return [...oldValues]
                        })
                      }}
                      >
                        <FontAwesomeIcon icon={faChevronRight} />
                      </button>
                    </div>

                    <Swiper
                      slidesPerView={1}
                      centeredSlides={true}
                      initialSlide={currentMatchWeek}
                      modules={[Navigation]}
                      onBeforeInit={(swiper) => {
                        swiperRefGroupStageMatchWeek.current[i] = swiper
                      }}
                      className={`${style.swiper} swiper-no-swiping`}
                    >
                      {
                        allMatchWeeksGroupStage.map((item, i) => <SwiperSlide className={style.swiperSlide} key={i}>
                          {
                            matches.map((match, i) => {
                              if ((match.matchWeek == item) && (match.group == groupsItem)) {
                                return (
                                  <div className={style.matchesContent} key={i}>
                                    <div className={style.matchInfo}>
                                      <p>{match.datetime ? formatDateMatch(match.datetime) : ''}</p>
                                      <p>{match.stadium ?? ''}</p>
                                    </div>
                                    <div className={style.matchScore}>
                                      <div className={style.matchTeam}>{match.homeTeam}</div>
                                      <div style={{ fontWeight: 'bold' }}>
                                        {match.homeScore ?? ''} X {match.awayScore ?? ''}
                                      </div>
                                      <div className={style.matchTeam}>{match.awayTeam}</div>
                                    </div>
                                  </div>
                                )
                              }
                            })
                          }
                        </SwiperSlide>)
                      }
                    </Swiper >
                  </div>
                </div >
              )
            })
          }

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
                Verde (1º): Classificado |
                Azul (2º): Playoffs Oitavas de Final
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Playoffs Oitavas de Final */}
        <SwiperSlide className={style.swiperSlide}>
          <QualifyMatches matches={matches} stage='playoffsRoundOf16' />
        </SwiperSlide>

        {/* Oitavas de final */}
        <SwiperSlide className={style.swiperSlide}>
          <QualifyMatches matches={matches} stage='roundOf16' />
        </SwiperSlide>

        {/* Quartas de final */}
        <SwiperSlide className={style.swiperSlide}>
          <QualifyMatches matches={matches} stage='quarterFinals' />
        </SwiperSlide>

        {/* Semifinais */}
        <SwiperSlide className={style.swiperSlide}>
          <QualifyMatches matches={matches} stage='semiFinals' />
        </SwiperSlide>

        {/* Final */}
        <SwiperSlide className={style.swiperSlide}>
          <QualifyMatches matches={matches} stage='final' />
        </SwiperSlide>
      </Swiper>
    </main >
  )
}
