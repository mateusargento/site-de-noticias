import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import DropdownMenu from './DropdownMenu'
import MenuMobile from './MenuMobile'
import SearchBox from './SearchBox'
import logo from '@/assets/images/logo.svg'
import style from './Header.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Nunito_Sans } from 'next/font/google'

const nunito_sans = Nunito_Sans({ subsets: ['latin'] })

export default function Header() {
  const [isMenuMobileOpen, setIsMenuMobileOpen] = useState<boolean>(false)

  function openMenuMobile(): void {
    setIsMenuMobileOpen(false)
    setTimeout(() => {
      setIsMenuMobileOpen(true)
    }, 50);
  }

  return (
    <header className={`${style.header} ${nunito_sans.className}`}>
      {/* Logo */}
      <div className={style.logo}>
        <Link href="/">
          <Image
            src={logo}
            width={180}
            height={55}
            alt="Logotipo da marca Nome da Empresa"
          />
        </Link>
      </div>

      {/* Icone do menu mobile */}
      <div className={style.menuIconMobileOpen}>
        <FontAwesomeIcon icon={faBars} width={200} onClick={openMenuMobile} />
      </div>

      <div className={style.menuContent}>
        {/* Links */}
        <nav className={style.nav}>

          {/* Página Inicial */}
          <Link href="/" className={style.link}>Página Inicial</Link>

          {/* Clubes (Dropdown) */}
          <DropdownMenu
            title="Clubes"
            isDropdownAvailable={true}
            links={
              [
                { key: "botafogo", label: "BOTAFOGO", url: "/clubes/botafogo" },
                { key: "flamengo", label: "FLAMENGO", url: "/clubes/flamengo" },
                { key: "fluminense", label: "FLUMINENSE", url: "/clubes/fluminense" },
                { key: "vasco", label: "VASCO", url: "/clubes/vasco" }
              ]
            }
          />

          {/* Tabelas (Dropdown) */}
          <DropdownMenu
            title="Tabelas"
            isDropdownAvailable={true}
            links={
              [
                { key: "brasileirao", label: "CAMPEONATO BRASILEIRO SÉRIE A", url: "/tabela/brasileirao-serie-a" },
                { key: "cariocao", label: "CAMPEONATO CARIOCA", url: "/tabela/campeonato-carioca" },
                { key: "copa-do-brasil", label: "COPA DO BRASIL", url: "/tabela/copa-do-brasil" },
                { key: "libertadores", label: "COPA LIBERTADORES", url: "/tabela/libertadores" },
                { key: "sul-americana", label: "COPA SUL-AMERICANA", url: "/tabela/sul-americana" }
              ]
            }
          />

          {/* Contato */}
          <Link href="/contato" className={style.link}>Contato</Link>
        </nav>

        {/* Input de pesquisa */}
        <SearchBox />
      </div>

      <MenuMobile isMenuMobileOpen={isMenuMobileOpen} />
    </header>
  )
}
