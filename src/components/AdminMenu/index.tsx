import Link from 'next/link'
import { useRouter } from 'next/router'
import style from './AdminMenu.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faSoccerBall, faTags, faUser } from '@fortawesome/free-solid-svg-icons'
import { faImages } from '@fortawesome/free-regular-svg-icons'
import { Nunito_Sans } from 'next/font/google'
import { useEffect, useState } from 'react'

const nunito_sans = Nunito_Sans({ subsets: ['latin'] })

export default function AdminMenu() {
    const router = useRouter()
    const [pathName, setPathName] = useState<string>('')

    useEffect(() => {
        const path = router.pathname
        setPathName(path)
    }, [])

    return (
        <aside className={style.aside}>
            <h2>MENU</h2>
            <Link
                href="/admin-site/gerenciar-noticias"
                className={`
                        ${nunito_sans.className} 
                        ${style.button} 
                        ${pathName == '/admin-site/gerenciar-noticias' ? style.activeButton : null}
                    `}
            >
                <FontAwesomeIcon icon={faNewspaper} />
                <span className={style.buttonText}>Notícias</span>
            </Link>
            <Link
                href="/admin-site/gerenciar-imagens"
                className={`
                    ${nunito_sans.className} 
                    ${style.button} 
                    ${pathName == '/admin-site/gerenciar-imagens' ? style.activeButton : null}
                `}
            >
                <FontAwesomeIcon icon={faImages} />
                <span className={style.buttonText}>Imagens</span>
            </Link>
            <Link
                href="/admin-site/gerenciar-tags"
                className={`
                    ${nunito_sans.className} 
                    ${style.button} 
                    ${pathName == '/admin-site/gerenciar-tags' ? style.activeButton : null}
                    `}
            >
                <FontAwesomeIcon icon={faTags} />
                <span className={style.buttonText}>Tags</span>
            </Link>
            <Link
                href="/admin-site/gerenciar-campeonatos"
                className={`
                    ${nunito_sans.className} 
                    ${style.button} 
                    ${pathName == '/admin-site/gerenciar-campeonatos' ? style.activeButton : null}
                    `}
            >
                <FontAwesomeIcon icon={faSoccerBall} />
                <span className={style.buttonText}>Campeonatos</span>
            </Link>
            <Link
                href="/admin-site/meus-dados"
                className={`
                            ${nunito_sans.className} 
                            ${style.button} 
                            ${pathName == '/admin-site/meus-dados' ? style.activeButton : null}
                        `}
            >
                <FontAwesomeIcon icon={faUser} />
                <span className={style.buttonText}>Meus Dados</span>
            </Link>
        </aside>
    )
}
