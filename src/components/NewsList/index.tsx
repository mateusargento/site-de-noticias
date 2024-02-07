import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { News } from '@/models/news'
import axios from '@/services/newsRequest'
import formatNewsList from '@/utils/formatNewsList'
import formatDate from '@/utils/formatDate'
import { toast } from 'react-toastify'
import Button from '@/components/Button'
import style from './NewsList.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { Nunito_Sans } from 'next/font/google'

const nunito_sans = Nunito_Sans({ subsets: ['latin'] })

export default function NewsList(props: any) {
    const path = usePathname()
    const [newsList, setNewsList] = useState<News[]>([])
    // Controla se mostra o botão para carregar mais mensagens 
    // Ou mostra a mensagem que não há mais notícias para carregar
    const [isLoadMoreNewsActive, setIsLoadMoreNewsActive] = useState<boolean>(true)
    const [isNoMoreMessageActive, setIsNoMoreMessageActive] = useState<boolean>(true)
    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)
    // Largura da lista de notícias
    const [width, setWidth] = useState<object | undefined>(undefined)

    useEffect(() => {
        function handleNews() {
            let newsListFormatted: News[] = []
            setIsLoadMoreNewsActive(true)

            // Se não receber a lista de notícias
            if (props.newsList.length <= 0) {
                setNewsList([])
                setIsLoadMoreNewsActive(false)
                return false
            }

            // Alterando nomenclatura do banco de dados para a nomenclatura do modelo 'News'
            newsListFormatted = props.newsList.map((item: any) => {
                return formatNewsList(item)
            })

            let resultArray: News[] = []
            // Se não tiver resultados, retorna um array vazio
            if (newsListFormatted.length == 0) {
                return setNewsList([])
            }

            // Se for a página inicial
            // Lista a partir da 5ª notícia, pois as 4 primeiras estão na manchete
            if (path == '/') {
                for (let i = 4; i < newsListFormatted.length; i++) {
                    resultArray.push(newsListFormatted[i])
                }
            }
            // Se for a página de buscas ou a página de notícias mais lidas
            // Remove o botão de carregar mais notícias
            else if (path.substring(0, 6) == '/busca' || path.substring(0, 11) == '/mais-lidas') {
                resultArray = newsListFormatted

                setIsNoMoreMessageActive(false)
                setIsLoadMoreNewsActive(false)
            } else {
                resultArray = newsListFormatted
            }

            // Se for um smartphone, remove o tamanho padrão do desktop
            if ((window.innerWidth >= 1024) && (props.style)) {
                setWidth({
                    width: props.style.width
                })
            }

            setNewsList(resultArray)
        }

        handleNews()
    }, [props.newsList])

    // Função do botão de carregar mais notícias
    async function loadMoreNews() {
        let news: any[] = []
        let team = undefined
        // Se for uma solicitação vinda da página dos clubes
        path.substring(0, 8) == '/clubes/' ? team = path.substring(8) : null

        // Informa se está a requisição terminou ou não
        setIsButtonLoading(true)

        const axiosResult = await axios.listNews({
            team: team,
            createdAt: newsList[newsList.length - 1].createdAt
        })

        // Se a requisição for realizada
        if (axiosResult) {
            // Se a requisição for bem sucedida
            if (axiosResult.status == 200) {
                news = axiosResult.data.result.map((item: any) => {
                    return formatNewsList(item)
                })

                // Se não retornar resultados
                if (news.length <= 0) {
                    setIsLoadMoreNewsActive(false)
                }

                // Se retornar resultados
                setNewsList((oldList) => [...oldList, ...news])
            } else {
                // Se ocorrer um erro no servidor
                toast.error('Ocorreu um erro no servidor')
            }

            // Informa se está a requisição terminou ou não
            setIsButtonLoading(false)

            return false
        }

        // Se ocorrer um erro no servidor
        toast.error('Erro ao conectar-se com o servidor')

        // Informa se está a requisição terminou ou não
        setIsButtonLoading(false)
    }

    return (
        <>
            {/* Lista de notícias */}
            <div className={style.newsList} style={width}>

                {newsList.map((item, i) => <div key={i}>
                    <div className={style.newsListContent}>
                        {/* Imagem */}
                        <Link href={item.link}>
                            <Image
                                src={`${process.env.SERVERDOMAIN}/public/images/${item.imageName}`}
                                width={250}
                                height={150}
                                alt={item.imageDescription}
                            />
                        </Link>

                        <div className={style.newsListContentText}>
                            {path == '/mais-lidas' && <div>
                                <button className={`${nunito_sans.className} ${style.tagTopView}`}>
                                    {`${i + 1}ª MAIS LIDA`}
                                </button>
                            </div>}

                            {/* Título */}
                            <Link href={item.link} className={style.title}>
                                {item.title}
                            </Link>


                            {/* Horário de publicação */}
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                                {formatDate(item.createdAt)}
                            </span>

                            {/* Tags da notícia */}
                            <div className={style.tags}>
                                {item.tags!.map((item, i) => <div
                                    className={`${nunito_sans.className} genericBackground ${item.toLowerCase()}Background`}
                                    key={i}
                                >
                                    {item.toUpperCase()}
                                </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <hr className={style.hrNewsList} />
                </div>)}

                {isNoMoreMessageActive ? <>
                    <Button
                        text="Ver mais notícias"
                        action={loadMoreNews}
                        style={isLoadMoreNewsActive
                            ? { visibility: 'visible', opacity: '1' }
                            : { height: '0px', padding: '0px', visibility: 'hidden', opacity: '0' }}
                        isLoading={isButtonLoading}
                    />
                    <span
                        className="noMoreNewsAdvice"
                        style={!isLoadMoreNewsActive
                            ? { visibility: 'visible', opacity: '1' }
                            : { height: '0px', visibility: 'hidden', opacity: '0' }}
                    >
                        Não há mais notícias
                    </span>
                </> : null}
            </div >
        </>
    )
}
