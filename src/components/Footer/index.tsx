import Link from 'next/link'
import Image from 'next/image'
import logo from '@/assets/images/logo.svg'
import style from './Footer.module.scss'
import { Nunito_Sans } from 'next/font/google'

const nunito_sans = Nunito_Sans({ subsets: ['latin'] })

export default function Footer() {
  return (
    <footer className={nunito_sans.className}>
      <div className={style.footer}>
        {/* Logo */}
        <div className={style.logo}>
          <Image
            src={logo}
            width={155}
            height={50}
            alt="Logotipo da marca Nome da Empresa"
          />
        </div>

        <div>
          {/* Links */}
          <nav className={style.nav}>
            {/* Site */}
            <div className={style.section}>
              <p>SITE</p>
              <Link href="/">Página Inicial</Link>
            </div>

            {/* Clubes */}
            <div className={style.section}>
              <p>CLUBES</p>
              <Link href="/clubes/botafogo">Botafogo</Link>
              <Link href="/clubes/flamengo">Flamengo</Link>
              <Link href="/clubes/fluminense">Fluminense</Link>
              <Link href="/clubes/vasco">Vasco</Link>
            </div>

            {/* Tabelas */}
            <div className={style.section}>
              <p>TABELAS</p>
              <Link href="/tabela/brasileirao-serie-a">Campeonato Brasileiro Série A</Link>
              <Link href="/tabela/campeonato-carioca">Campeonato Carioca</Link>
              <Link href="/tabela/copa-do-brasil">Copa do Brasil</Link>
              <Link href="/tabela/libertadores">Copa Libertadores</Link>
              <Link href="/tabela/sul-americana">Copa Sul-Americana</Link>
            </div>

            {/* Suporte */}
            <div className={style.section}>
              <p>SUPORTE</p>
              <Link href="/contato">Contato</Link>
              <Link href="/contato-lgpd">Contato sobre LGPD</Link>
              <Link href="/politica-de-privacidade">Política de Privacidade</Link>
            </div>
          </nav>
        </div>
      </div>
      <div className={style.copyright}>
        <p>Nome da Empresa © 2024</p>
      </div>
    </footer>
  )
}
