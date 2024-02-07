import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { News } from '@/models/news'
import formatNewsList from '@/utils/formatNewsList'
import formatDate from '@/utils/formatDate'
import Carousel from './Carousel'
import style from './Headlines.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { Nunito_Sans } from 'next/font/google'

const nunito_sans = Nunito_Sans({ subsets: ['latin'] })

export default function Headlines(props: any) {
    const [headlinesList, setHeadlinesList] = useState<News[]>([])

    useEffect(() => {
        function handleNews(): void {
            let newsListFormatted: News[] = []

            // Se receber a lista de notícias
            if ((props.newsList) && (props.newsList.length > 0)) {
                // Alterando nomenclatura do banco de dados para a nomenclatura do modelo 'News'
                newsListFormatted = props.newsList.map((item: any) => {
                    return formatNewsList(item)
                })

                setHeadlinesList(newsListFormatted)
            }
        }

        handleNews()
    }, [])

    function smallNewsList(): News[] {
        let array: News[] = []
        // Se não tiver resultados, retorna um array vazio
        if (headlinesList.length <= 1) return array

        // Se tiver resultados, apenas não retorna a notícia que já foi listada no maior espaço
        for (let i = 1; i <= 3; i++) {
            array.push(headlinesList[i])
        }

        return array
    }

    return (
        <>
            <div className={style.headline}>

                {/* Notícia maior */}
                <div className={style.headlineLeft}>
                    {headlinesList[0] && <>

                        {/* Imagem */}
                        <Link href={headlinesList[0].link}>
                            <Image
                                src={`${process.env.SERVERDOMAIN}/public/images/${headlinesList[0].imageName}`}
                                width={1000}
                                height={330}
                                alt={headlinesList[0].imageDescription}
                                className={style.headlineLeftImage}
                            />
                        </Link>

                        <div>
                            {/* Título */}
                            <Link href={headlinesList[0].link} className={style.title}>
                                {headlinesList[0].title}
                            </Link>

                            {/* Horário de publicação */}
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                                {
                                    formatDate(headlinesList[0].createdAt)
                                }
                            </span>

                            <div className={style.tags}>
                                {/* Tags da notícia */}
                                {headlinesList[0].tags!.map((item, i) => <button
                                    className={`${nunito_sans.className} genericBackground ${item.toLowerCase()}Background`}
                                    key={i}
                                >
                                    {item.toUpperCase()}
                                </button>
                                )}
                            </div>
                        </div>
                    </>}
                </div>

                {/* Notícias menores */}
                <div className={style.headlineRight}>
                    {smallNewsList().map((item, i) => <div className={style.headlineRightItem} key={i}>
                        {/* Imagem */}
                        <Link href={item.link}>
                            <Image
                                src={`${process.env.SERVERDOMAIN}/public/images/${item.imageName}`}
                                width={150}
                                height={150}
                                alt={item.imageDescription}
                            />
                        </Link>

                        <div>
                            {/* Título */}
                            <Link href={item.link} className={style.title}>
                                {item.title}
                            </Link>

                            {/* Horário de publicação */}
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                                {
                                    formatDate(item.createdAt)
                                }
                            </span>

                            {/* Tags da notícia */}
                            <div className={style.tags}>
                                {item.tags!.map((item, i) => <button
                                    className={`${nunito_sans.className} genericBackground ${item.toLowerCase()}Background`}
                                    key={i}
                                >
                                    {item.toUpperCase()}
                                </button>
                                )}
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div >

            <Carousel newsList={props.newsList} />
        </>
    )
}
