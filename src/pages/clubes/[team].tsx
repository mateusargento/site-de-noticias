import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from '@/services/newsRequest'
import NewsList from '@/components/NewsList'
import ClubesTitle from './ClubesTitle'
import style from './Clubes.module.scss'

// Lista as notícias referentes ao time escolhido
export async function getServerSideProps(ctx: any) {
  let news: any[] = []

  const axiosResult = await axios.listNews({
    team: ctx.query.team
  })

  if (axiosResult && axiosResult.status == 200) {
    news = axiosResult.data.result
  }

  return {
    props: {
      newsList: news
    }
  }
}

export default function Clubes({ newsList }: { newsList: any[] }) {
  const router = useRouter()
  // Utilizadas nas metatags
  const team = `${router.query.team![0].toUpperCase()}${router.query.team!.toString().substring(1)}`.replaceAll('<!-- -->', '')
  const title = `${router.query.team![0].toUpperCase()}${router.query.team!.toString().substring(1)} - Nome da Empresa`.replaceAll('<!-- -->', '')

  return (
    <main>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`Notícias do ${team} sempre de forma objetiva e atualizada.`} />

        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={`Notícias do ${team} sempre de forma objetiva e atualizada.`} />
        <meta itemProp="image" content={`${process.env.SERVERDOMAIN}/public/images/logo.png`} />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content={process.env.CLIENTDOMAIN} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={`Notícias do ${team} sempre de forma objetiva e atualizada.`} />
        <meta property="og:image" content={`${process.env.SERVERDOMAIN}/public/images/logo.png`} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={`Notícias do ${team} sempre de forma objetiva e atualizada.`} />
        <meta name="twitter:image" content={`${process.env.SERVERDOMAIN}/public/images/logo.png`} />
      </Head>

      {/* Título da página */}
      <ClubesTitle param={router.query.team} />

      <hr className={style.hr} />
      <div className={style.ad}>
        Área de anúncio
      </div>
      <hr className={style.hr} />

      <NewsList width="65vw" newsList={newsList} />
    </main>
  )
}
