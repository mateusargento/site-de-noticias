import Head from 'next/head'
import Image from 'next/image'
import Button from '@/components/Button'
import image from '@/assets/images/grass.jpg'
import style from './styles/NotFound.module.scss'

export default function NotFound() {
  return (
    <main>
      <Head>
        <title>Página não encontrada - Nome da Empresa</title>
        <meta name="description" content="Notícias do seu time do coração sempre de forma objetiva e atualizada." />

        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="Página não encontrada - Nome da Empresa" />
        <meta itemProp="description" content="Notícias do seu time do coração sempre de forma objetiva e atualizada." />
        <meta itemProp="image" content={`${process.env.SERVERDOMAIN}/public/images/logo.png`} />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content={process.env.CLIENTDOMAIN} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Página não encontrada - Nome da Empresa" />
        <meta property="og:description" content="Notícias do seu time do coração sempre de forma objetiva e atualizada." />
        <meta property="og:image" content={`${process.env.SERVERDOMAIN}/public/images/logo.png`} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Página não encontrada - Nome da Empresa" />
        <meta name="twitter:description" content="Notícias do seu time do coração sempre de forma objetiva e atualizada." />
        <meta name="twitter:image" content={`${process.env.SERVERDOMAIN}/public/images/logo.png`} />
      </Head>

      <Image
        src={image}
        width={1920}
        height={550}
        alt="Grama"
        className={style.imageBackground}
      />

      <div className={style.background}>
        <h1 className={style.title}>Oops!</h1>
        <div className={style.content}>
          <h2 className={style.subtitle}>404 - PÁGINA NÃO ENCONTRADA</h2>
          <p>A que você procura teve o nome alterado ou não existe.</p>
          <Button
            text="Voltar para a página inicial"
            redirect="/"
            className={style.button}
          />
        </div>
      </div>
    </main>
  )
}
