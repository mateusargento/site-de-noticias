import { useState, useEffect } from 'react'
import Link from 'next/link'
import DropdownMenu from './DropdownMenu'
import SearchBox from './SearchBox'
import style from './Header.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function MenuMobile({ isMenuMobileOpen }: { isMenuMobileOpen: boolean }) {
    const [visibility, setVisibility] = useState<'hidden' | 'visible'>('hidden')
    const [opacity, setOpacity] = useState<'0' | '1'>('0')
    const [isDropdownAvailable, setIsDropdownAvailable] = useState<boolean>(false)

    useEffect(() => {
        // Controla a abertura e fechamento do menu mobile
        function handleMenuMobile(): void {
            if (isMenuMobileOpen) {
                setVisibility('visible')
                setOpacity('1')
                setIsDropdownAvailable(true)
            } else {
                setVisibility('hidden')
                setOpacity('0')
                setIsDropdownAvailable(false)
            }
        }

        handleMenuMobile()
    }, [isMenuMobileOpen])

    function closeMenuMobile(): void {
        setVisibility('hidden')
        setOpacity('0')
        setIsDropdownAvailable(false)
    }

    return (
        <div className={style.menuContentMobile} style={{ visibility: visibility, opacity: opacity }}>
            {/* Icone do menu mobile */}
            <div className={style.menuIconMobileClose}>
                <FontAwesomeIcon icon={faTimes} width={200} onClick={closeMenuMobile} />
            </div>

            {/* Links */}
            <nav className={style.nav}>

                {/* Página Inicial */}
                <Link href="/" className={style.link} onClick={closeMenuMobile}>Página Inicial</Link>

                {/* Clubes (Dropdown) */}
                <DropdownMenu
                    title="Clubes"
                    isDropdownAvailable={isDropdownAvailable}
                    links={
                        [
                            {
                                key: "botafogo",
                                label: "BOTAFOGO",
                                url: "/clubes/botafogo",
                                menuMobileFunction: closeMenuMobile
                            },
                            {
                                key: "flamengo",
                                label: "FLAMENGO",
                                url: "/clubes/flamengo",
                                menuMobileFunction: closeMenuMobile
                            },
                            {
                                key: "fluminense",
                                label: "FLUMINENSE",
                                url: "/clubes/fluminense",
                                menuMobileFunction: closeMenuMobile
                            },
                            {
                                key: "vasco",
                                label: "VASCO",
                                url: "/clubes/vasco",
                                menuMobileFunction: closeMenuMobile
                            }
                        ]
                    }
                />

                {/* Tabelas (Dropdown) */}
                <DropdownMenu
                    title="Tabelas"
                    isDropdownAvailable={isDropdownAvailable}
                    links={
                        [
                            { 
                                key: "brasileirao", 
                                label: "CAMPEONATO BRASILEIRO SÉRIE A", 
                                url: "/tabela/brasileirao-serie-a",
                                menuMobileFunction: closeMenuMobile
                            },
                            { 
                                key: "cariocao", 
                                label: "CAMPEONATO CARIOCA", 
                                url: "/tabela/campeonato-carioca",
                                menuMobileFunction: closeMenuMobile
                            },
                            { 
                                key: "copa-do-brasil", 
                                label: "COPA DO BRASIL", 
                                url: "/tabela/copa-do-brasil",
                                menuMobileFunction: closeMenuMobile 
                            },
                            { 
                                key: "libertadores", 
                                label: "COPA LIBERTADORES", 
                                url: "/tabela/libertadores",
                                menuMobileFunction: closeMenuMobile 
                            },
                            { 
                                key: "sul-americana", 
                                label: "COPA SUL-AMERICANA", 
                                url: "/tabela/sul-americana",
                                menuMobileFunction: closeMenuMobile
                            }
                        ]
                    }
                />

                {/* Contato */}
                <Link href="/contato" className={style.link} onClick={closeMenuMobile}>Contato</Link>
            </nav>

            {/* Input de pesquisa */}
            <SearchBox closeMenuMobile={closeMenuMobile} />
        </div>
    )
}
