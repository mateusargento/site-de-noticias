import { useRouter } from 'next/navigation'
import style from './Button.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol } from '@fortawesome/free-regular-svg-icons'
import { Nunito_Sans } from 'next/font/google'

const nunito_sans = Nunito_Sans({ subsets: ['latin'] })

export default function Button(props: any) {
    const router = useRouter()
    // Estilo adicional
    const buttonClassName = props.className
    const buttonStyle = props.style
    // Controla o carregamento de uma ação
    const isLoading = props.isLoading
    const loadingMessage = props.loadingMessage
    // Redirecionamento de página
    const redirectPage: string = props.redirect

    let redirectFunction: Function | null = null
    if (props.redirect) {
        redirectFunction = () => {
            router.push(redirectPage)
        }
    }

    return (
        <>
            <button type="button"
                className={`${nunito_sans.className} ${style.button} ${buttonClassName}`}
                style={buttonStyle}
                onClick={redirectFunction !== null ? redirectFunction : props.action}
                disabled={isLoading}
            >
                {isLoading
                    ? <FontAwesomeIcon icon={faFutbol} className={style.icon} bounce />
                    : props.text}
                {isLoading && (loadingMessage ? loadingMessage : 'Carregando')}
            </button>
        </>
    )
}
