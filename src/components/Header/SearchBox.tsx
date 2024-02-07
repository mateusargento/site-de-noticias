import { useState } from 'react'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import style from './Header.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Nunito_Sans } from 'next/font/google'

const nunito_sans = Nunito_Sans({ subsets: ['latin'] })

export default function SearchBox({ closeMenuMobile }: { closeMenuMobile?: Function }) {
    const router = useRouter()
    const [searchBoxValue, setSearchBoxValue] = useState<string>('')
    // Controla o botão de editar notícia enquanto a solicitação ainda não terminou
    // Usado para que não haja várias solicitações feitas de uma vez
    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)

    async function handleSubmit(e: any) {
        e.preventDefault()

        // Informa se está a requisição terminou ou não
        setIsButtonLoading(true)

        // Faz a validação dos dados
        try {
            await Yup.object().shape({
                searchBoxValue: Yup.string()
                    .required('É obrigatório preencher o campo de pesquisa para realizar uma busca')
                    .max(50, 'Sua pesquisa precisa ter no máximo 50 caracteres')
                    .trim()
            }).validate({ searchBoxValue: searchBoxValue })
        } catch (err: any) {
            toast.info(err.message)

            // Informa se está a requisição terminou ou não
            setIsButtonLoading(false)

            return false
        }

        // Informa se está a requisição terminou ou não
        setIsButtonLoading(false)

        const searchURL = "/busca?s="
        router.push(`${searchURL}${searchBoxValue}`)

        closeMenuMobile ? closeMenuMobile() : null
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    value={searchBoxValue}
                    onChange={(e) => setSearchBoxValue(e.target.value)}
                    className={`${style.searchBox} ${nunito_sans.className}`}
                    placeholder="Pesquisar notícia"
                    maxLength={50}
                />
            </form>
            <button
                type="button"
                className={style.searchBoxButton}
                onClick={handleSubmit}
                disabled={isButtonLoading}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} className={style.searchBoxIcon} />
            </button>
        </>
    )
}
