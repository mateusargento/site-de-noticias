import Head from 'next/head'
import axios from '@/services/newsRequest'
import Greatings from '@/components/Greatings'
import Headlines from '@/components/Headlines'
import NewsList from '@/components/NewsList'
import style from './styles/Index.module.scss'

// Lista as notícias
export async function getServerSideProps() {
  let news: any[] = []

  const axiosResult = await axios.listNews({})

  if (axiosResult && axiosResult.status == 200) {
    news = axiosResult.data.result
  }

  return {
    props: {
      newsList: news
    }
  }
}

export default function Home({ newsList }: { newsList: any }) {
  return (
    <main>
      <Head>
        <title>Nome da Empresa, seu site de notícias sobre futebol</title>
        <meta name="description" content="Notícias do seu time do coração sempre de forma objetiva e atualizada." />

        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="Nome da Empresa, seu site de notícias sobre futebol" />
        <meta itemProp="description" content="Notícias do seu time do coração sempre de forma objetiva e atualizada." />
        <meta itemProp="image" content={`${process.env.SERVERDOMAIN}/public/images/logo.png`} />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content={process.env.CLIENTDOMAIN} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Nome da Empresa, seu site de notícias sobre futebol" />
        <meta property="og:description" content="Notícias do seu time do coração sempre de forma objetiva e atualizada." />
        <meta property="og:image" content={`${process.env.SERVERDOMAIN}/public/images/logo.png`} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nome da Empresa, seu site de notícias sobre futebol" />
        <meta name="twitter:description" content="Notícias do seu time do coração sempre de forma objetiva e atualizada." />
        <meta name="twitter:image" content={`${process.env.SERVERDOMAIN}/public/images/logo.png`} />
      </Head>

      <div className={style.greatingsContent}>
        <Greatings />
      </div>

      <Headlines newsList={newsList} />

      <hr className={style.hr} />
      <div className={style.ad}>
        Área de anúncio
      </div>
      <hr className={style.hr} />

      <NewsList style={{ width: "65vw" }} newsList={newsList} />
    </main >
  )
}
