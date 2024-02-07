import { useRef, useState } from 'react'
import Head from 'next/head'
import TableTitle from './TabelaTitle'
import QualifyMatches from './QualifyMatches'
import axios from '@/services/championshipRequest'
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
  let matches: Matches[] = []
  let currentStage: string = 'firstRound'

  // ID 3 é da Copa do Brasil
  const axiosResult = await axios.listChampionship({ id: 3 })

  if (axiosResult && axiosResult.status == 200) {
    const result = axiosResult.data.result

    // Caso retorne resultados
    const matchesResult = axiosResult.data.result[0].matches
    if ((result.length > 0) && (matchesResult !== '[]')) {
      const formattedResult = formatChampionshipList(axiosResult.data.result[0])

      matches = JSON.parse(formattedResult.matches!)
      currentStage = formattedResult.currentStage!
    }
  }


  return {
    props: {
      matches: matches,
      currentStage: currentStage
    }
  }
}

export default function Clubes({
  matches,
  currentStage
}: {
  matches: Matches[],
  currentStage: string
}) {
  // Utilizadas nas metatags
  const championship = `Copa do Brasil`.replaceAll('<!-- -->', '')
  const title = `Tabela ${championship} - Nome da Empresa`.replaceAll('<!-- -->', '')

  // Lista todas as fases ou rodadas da competição
  const [allMatchWeeks, setAllMatchWeeks] = useState<{ key: string, label: string }[]>([
    { key: 'firstRound', label: 'Primeira Fase' },
    { key: 'secondRound', label: 'Segunda Fase' },
    { key: 'thirdRound', label: 'Terceira Fase' },
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
      <TableTitle param='copa-do-brasil' />

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
        style={{ marginBottom: '70px'}}
      >
        {/* Primeira fase */}
        <SwiperSlide className={style.swiperSlide}>
          <QualifyMatches matches={matches} stage='firstRound' qualifyMatchesStyle='one-in-one' />
        </SwiperSlide>

        {/* Segunda fase */}
        <SwiperSlide className={style.swiperSlide}>
          <QualifyMatches matches={matches} stage='secondRound' qualifyMatchesStyle='one-in-one' />
        </SwiperSlide>

        {/* Terceira fase */}
        <SwiperSlide className={style.swiperSlide}>
          <QualifyMatches matches={matches} stage='thirdRound' />
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
