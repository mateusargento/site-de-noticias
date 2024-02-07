import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { News } from '@/models/news'
import NewsText from './NewsText'
import formatDate from '@/utils/formatDate'
import formatDatePrintPage from '@/utils/formatDatePrintPage'
import whatsapp from '@/assets/images/brands/whatsapp.png'
import twitter from '@/assets/images/brands/twitter.png'
import facebook from '@/assets/images/brands/facebook.png'
import share from '@/assets/images/brands/share.png'
import style from './Noticia.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { Nunito_Sans } from 'next/font/google'

const nunito_sans = Nunito_Sans({ subsets: ['latin'] })

export default function NewsContent({ news = [] }: { news: News[] }) {
    const router = useRouter()

    return (
        <>
            {news.length > 0 && <div className={style.content}>

                {/* Link para a página de impressão */}
                <span className={style.linkPrintPage}>{`${process.env.CLIENTDOMAIN}${router.asPath}`}</span>

                {/* Título */}
                <h1 className={style.title}>
                    {news[0].title}
                </h1>

                <div className={style.imageArea}>

                    {/* Imagem */}
                    <Image
                        src={`${process.env.SERVERDOMAIN}/public/images/${news[0].imageName}`}
                        width={1000}
                        height={550}
                        alt={news[0].imageDescription}
                        className={style.image}
                    />

                    {/* Descrição da imagem */}
                    <p className={style.imageDescription}>{news[0].imageDescription}</p>
                </div>

                <div className={style.newsInfo}>
                    <div className={style.newsInfoDateTimeAndAuthor}>
                        {/* Horário de publicação */}
                        <time dateTime={news[0].createdAt}>
                            <FontAwesomeIcon icon={faClock} className={style.icon} />
                            {formatDate(news[0].createdAt)}
                            {news[0].lastModify && ` - Atualizado: ${formatDate(news[0].lastModify)}`}
                        </time>

                        {/* Horário de publicação para página de impressão */}
                        <time dateTime={news[0].createdAt} className={style.dateTimePrintPage}>
                            {formatDatePrintPage(news[0].createdAt)}
                            {news[0].lastModify && ` - Atualizado: ${formatDatePrintPage(news[0].lastModify)}`}
                        </time>

                        {/* Autor da publicação */}
                        <span>Publicado por: {`${news[0].authorName} ${news[0].authorSurname}`}</span>
                    </div>

                    {/* Ícones de compartilhamento */}
                    <div className={style.shareIcons}>
                        <Link href="">
                            <Image
                                src={whatsapp}
                                width={24}
                                height={24}
                                alt={'Whatsapp'}
                            />
                        </Link>
                        <Link href="">
                            <Image
                                src={twitter}
                                width={24}
                                height={24}
                                alt={'Twitter'}
                            />
                        </Link>
                        <Link href="">
                            <Image
                                src={facebook}
                                width={24}
                                height={24}
                                alt={'Facebook'}
                            />
                        </Link>
                        <Link href="">
                            <Image
                                src={share}
                                width={24}
                                height={24}
                                alt={'Compartilhar'}
                            />
                        </Link>
                    </div>
                </div>

                {/* Converte o conteúdo string para HTML */}
                <NewsText text={news[0].text} />

                {/* Tags da notícia */}
                <div>
                    {news[0].tags!.map((item, i) => <button
                        className={`${nunito_sans.className} 
                            genericBackground
                            ${item.toLowerCase()}Background`
                        }
                        key={i}
                    >
                        {item.toUpperCase()}
                    </button>
                    )}
                </div>
            </div>}
        </>
    )
}
