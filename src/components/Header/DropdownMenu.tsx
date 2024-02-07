import { useState, useEffect, MouseEventHandler } from 'react'
import Link from 'next/link'
import style from './Header.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

type LinksArray = {
    key: string,
    label: string;
    url: string;
    menuMobileFunction?: MouseEventHandler<HTMLAnchorElement>;
}[]

export default function DropdownMenu(props: any) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [displayType, setDisplayType] = useState<'flex' | 'none'>('flex')
    // Utilizado para habilitar o clique no título do menu dropdown se for um dispositivo mobile
    // E desabilitar se for um dispositivo desktop
    const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile')

    // Dados recebidos das props
    const dropdownTitle = props.title
    const links: LinksArray = props.links
    const isDisplayFlex = props.isDropdownAvailable

    const dropdownLinks = links.map((item, i, arr) =>
        <div key={i}>
            <Link
                href={item.url}
                onClick={item.menuMobileFunction
                    ? item.menuMobileFunction
                    : () => { }}
            >
                {item.label}
            </Link>
            {(arr.length - 1) > i && <hr />}
        </div >
    )

    // Verifica se o menu mobile está aberto.
    // Caso o menu esteja aberto, deixa disponível os itens do menu dropdown
    // Caso o menu esteja fechado, torna os itens indisponíveis
    // Função necessária pois sem ela mesmo com o menu fechado os itens ficam clicaveis. Isso é, um bug
    useEffect(() => {
        function handleDisplayType() {
            if (isDisplayFlex) {
                setDisplayType('flex')
            } else {
                setDisplayType('none')
            }

            // Checa se é um smartphone ou desktop
            if (window.innerWidth >= 1024) {
                setDevice('desktop')
            }
        }

        handleDisplayType()
    }, [isDisplayFlex])

    // Controla a ação de abrir e fechar o menu dropdown mobile
    function handleDropdownMenu(e: any): void {
        let links: any
        let icon: any

        // Caso tenha clicado no ícone do menu dropdown
        if (e.target.parentElement.localName == 'span') {
            links = e.target.parentElement.nextElementSibling
            icon = e.target.parentElement.children[0]
        }
        // Caso tenha clicado no nome do menu dropdown
        else {
            links = e.target.nextElementSibling
            icon = e.target.children[0]
        }

        // Se existir esses elementos
        if (links && icon) {
            // Fecha o dropdown
            if (isOpen) {
                links.style.height = '0'
                links.style.padding = '0'
                links.style.visibility = 'hidden'
                links.style.opacity = '0'

                icon.style.transform = 'rotatex(0deg)'
                icon.style.transition = '0.15s linear'

                setIsOpen(false)
            }
            // Abre o dropdown
            else {
                // Adiciona 36px para cada link no menu dropdown
                links.style.height = `${36 * props.links.length}px`
                links.style.padding = '20px 15px'
                links.style.visibility = 'visible'
                links.style.opacity = '1'

                icon.style.transform = 'rotatex(-180deg)'
                icon.style.transition = '0.15s linear'

                setIsOpen(true)
            }
        }
    }

    return (
        <div className={style.dropdownContent}>
            <span
                className={style.link}
                style={{ cursor: 'pointer' }}
                onClick={device == 'mobile' ? handleDropdownMenu : () => { }}
            >
                {dropdownTitle}
                <FontAwesomeIcon icon={faChevronDown} className={style.icon} />
            </span>

            <div className={style.dropdownLinks} style={{ display: displayType }} >
                {dropdownLinks}
            </div>
        </div>
    )
}
