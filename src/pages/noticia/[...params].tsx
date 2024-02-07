import Head from 'next/head'
import { News } from '@/models/news'
import axios from '@/services/newsRequest'
import NewsContent from './NewsContent'
import formatNewsList from '@/utils/formatNewsList'
import style from './Noticia.module.scss'

// Lista os dados da notícias escolhida
export async function getServerSideProps({ req, res }: { req: Request, res: Response }) {
    // Formata para que a URL fique da forma necessária para o funcionamento do filtro
    // Exemplo de resultado: /noticia/link-da-noticia-1
    function formatURL(url: string): string {
        const split1 = url.split('/')
        const split2 = split1[split1.length - 1].split('.')
        const newsURL = `/${split1[split1.length - 2]}/${split2[0]}`
        return newsURL
    }

    let news: any[] = []
    let redirect: object | undefined

    const requestURL = req.url
    const formattedURL = formatURL(requestURL)

    const axiosResult = await axios.listNews({ link: formattedURL })

    if (axiosResult && axiosResult.status == 200) {
        news = axiosResult.data.result.map((item: any) => {
            return formatNewsList(item)
        })
    }

    if (news.length <= 0) {
        redirect = {
            permanent: false,
            destination: '/pagina-nao-encontrada'
        }
    }

    return {
        props: {
            news: news
        },
        redirect: redirect
    }
}

export default function Noticia({ news }: { news: News[] }) {
    const title = `${news.length > 0 ? news[0].title : 'Notícia'} - Nome da Empresa`
    const text = news.length > 0 ? news[0].text.replaceAll(/<[^>]*>/g, ' ') : ''
    const image = news.length > 0
        ? `${process.env.SERVERDOMAIN}/public/images/${news[0].imageName}`
        : `${process.env.SERVERDOMAIN}/public/images/logo.png`

    return (
        <main className={style.main}>
            <Head>
                <title>{title}</title>
                <meta name="description" content={text} />

                {/* Google / Search Engine Tags */}
                <meta itemProp="name" content={title} />
                <meta itemProp="description" content={text} />
                <meta itemProp="image" content={text} />

                {/* Facebook Meta Tags */}
                <meta property="og:url" content={process.env.CLIENTDOMAIN} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={text} />
                <meta property="og:image" content={image} />

                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={text} />
                <meta name="twitter:image" content={image} />
            </Head>

            {/* Área do anúncio */}
            <br />
            <div className={style.ad}>
                Área de anúncio
            </div>
            <br />
            <hr className={style.hr} />

            <NewsContent news={news} />

            <hr className={style.hr} />

            <br />
            <br />

            {/* <NewsList newsList={newsList} /> */}
        </main>
    )
}
