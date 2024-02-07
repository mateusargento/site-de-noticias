import { useState, useEffect, useContext } from 'react'
import { UserAdminContext } from '@/context/userAdminProvider'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import style from './GreatingsAdmin.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Nunito_Sans } from 'next/font/google'

const nunito_sans = Nunito_Sans({ subsets: ['latin'] })

export default function Greatings() {
    const router = useRouter()
    const [greatingsMessage, setGreatingsMessage] = useState<string>()
    const { userAdmin, logoutAdmin, isLoadingInfo } = useContext<any>(UserAdminContext)

    useEffect(() => {
        function loadData(): void {
            if (!isLoadingInfo && userAdmin) {
                setGreatingsMessage(`Olá, ${userAdmin.name} ${userAdmin.surname}`)
            }
        }

        loadData()
    }, [isLoadingInfo])

    function logout(): void {
        logoutAdmin()
        toast.info(`Você saiu da sua conta! Até logo 👋`)

        router.push('/admin-site/login')
    }

    return (
        <div className={style.greatings}>
            <div className={style.greatingsContent}>
                <FontAwesomeIcon icon={faUser} />
                {greatingsMessage}
                <button className={`${nunito_sans.className} ${style.logoutButton}`} onClick={logout}>Sair</button>
            </div>
        </div>
    )
}
