import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCookies } from 'react-cookie'
import Button from '../Button'
import style from './LGPDAdvice.module.scss'

export default function LGPDAdvice() {
    const [visibility, setVisibility] = useState<'hidden' | 'visible'>('hidden')
    const [opacity, setOpacity] = useState<'0' | '1'>('0')
    const [cookies, setCookie, removeCookie] = useCookies()

    // Verifica se já aceitou ou não os cookies
    // Caso tenha aceitado, esconde a caixa de anúncios
    // Caso não tenha aceitado, continua mostrando
    useEffect(() => {
        function checkCookie() {

            if (!cookies.CookieConsentAccept || JSON.parse(cookies.CookieConsentAccept) !== true) {
                setVisibility('visible')
                setOpacity('1')
            }
        }

        checkCookie()
    }, [])

    function handleClick() {
        let expires: Date = new Date()
        expires.setHours(24 * 30)

        // Cria um cookie por o usuário ter clicado no botão "Aceito"
        setCookie('CookieConsentAccept', JSON.stringify(true), {
            expires: expires
        })

        // Esconde o aviso
        setVisibility('hidden')
        setOpacity('0')
    }

    return (
        <div className={style.advice} style={{ visibility: visibility, opacity: opacity }}>
            <div className={style.content}>
                {/* Mensagem */}
                <p>Este site utiliza ferramentas e serviços de terceiros que utilizam cookies. Ao clicar no botão "Aceito" ou utilizar nossos serviços, você concorda com o uso de cookies em nosso site. Leia nossa <Link href="/politica-de-privacidade">Política de Privacidade</Link>.</p>

                {/* Botão */}
                <Button
                    text={'Aceito'}
                    className={style.button}
                    action={handleClick}
                />
            </div>
        </div>
    )
}
