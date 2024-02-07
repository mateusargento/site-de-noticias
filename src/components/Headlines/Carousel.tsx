import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { News } from '@/models/news'
import formatNewsList from '@/utils/formatNewsList'
import formatDate from '@/utils/formatDate'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import style from './Headlines.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { Nunito_Sans } from 'next/font/google'

const nunito_sans = Nunito_Sans({ subsets: ['latin'] })

export default function Carousel(props: any) {
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

    // Lista de notícias para carousel (mobile)
    function carouselNewsList(): News[] {
        let array: News[] = []
        // Se não tiver resultados, retorna um array vazio
        if (headlinesList.length <= 1) return array

        // Se tiver resultados, apenas não retorna a notícia que já foi listada no maior espaço
        for (let i = 0; i <= 3; i++) {
            array.push(headlinesList[i])
        }

        return array
    }

    return (
        <Swiper
            slidesPerView={1.2}
            centeredSlides={true}
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop={true}
            className={style.swiper}
        >
            {/* Notícias */}
            {carouselNewsList().map((item, i) => <SwiperSlide className={style.swiperSlide} key={i}>
                <div className={style.headlineMobile}>
                    {/* Imagem */}
                    <Link href={item.link}>
                        <Image
                            src={`${process.env.SERVERDOMAIN}/public/images/${item.imageName}`}
                            width={800}
                            height={330}
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

                        <div className={style.tags}>
                            {/* Tags da notícia */}
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
            </SwiperSlide>)}
        </Swiper >
    )
}
