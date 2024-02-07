import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from '@/services/newsRequest'
import NewsList from '@/components/NewsList'
import style from './Busca.module.scss'

// Lista as notícias relacionadas a busca feita pelo usuário
export async function getServerSideProps({ req, res, query }: { req: Request, res: Response, query: any }) {
    let news: any[] = []
    const axiosResult = await axios.listNews({ search: query.s })

    if (axiosResult && axiosResult.status == 200) {
        news = axiosResult.data.result
    }

    return {
        props: {
            newsListRequest: news
        }
    }
}

export default function Busca({ newsListRequest }: { newsListRequest: any[] }) {
    const router = useRouter()
    // Título das metatags 
    const title = newsListRequest.length <= 0
        ? `Nenhum resultado para a sua pesquisa: ${router.query.s}`.replaceAll('<!-- -->', '')
        : `Você pesquisou por: ${router.query.s}`.replaceAll('<!-- -->', '')

    return (
        <main>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Notícias do seu time do coração sempre de forma objetiva e atualizada." />

                {/* Google / Search Engine Tags */}
                <meta itemProp="name" content={title} />
                <meta itemProp="description" content="Notícias do seu time do coração sempre de forma objetiva e atualizada." />
                <meta itemProp="image" content={`${process.env.SERVERDOMAIN}/public/images/logo.png`} />

                {/* Facebook Meta Tags */}
                <meta property="og:url" content={process.env.CLIENTDOMAIN} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content="Notícias do seu time do coração sempre de forma objetiva e atualizada." />
                <meta property="og:image" content={`${process.env.SERVERDOMAIN}/public/images/logo.png`} />

                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content="Notícias do seu time do coração sempre de forma objetiva e atualizada." />
                <meta name="twitter:image" content={`${process.env.SERVERDOMAIN}/public/images/logo.png`} />
            </Head>

            <h1 className={"title"}>
                {newsListRequest.length <= 0
                    ? 'Nenhum resultado para a sua pesquisa: '
                    : 'Você pesquisou por: '}
                <span className={style.span}>"{router.query.s}"
                </span></h1>

            <hr className={style.hr} />
            <div className={style.ad}>
                Área de anúncio
            </div>
            <hr className={style.hr} />

            <NewsList newsList={newsListRequest} />
        </main>
    )
}
