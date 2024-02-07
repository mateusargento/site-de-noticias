import { useState } from 'react'
import Head from 'next/head'
import axiosContact from '@/services/contactRequest'
import * as Yup from 'yup'
import { contactProperty } from '@/utils/validators'
import errorInput from '@/utils/validators/errorInput'
import { toast } from 'react-toastify'
import inputStyle from '@/pages/styles/InputsStyles.module.scss'
import style from './Contato.module.scss'
import { Nunito_Sans } from 'next/font/google'

const nunito_sans = Nunito_Sans({ subsets: ['latin'] })

export default function Contato() {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [subject, setSubject] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    // Controla o botão de enviar enquanto a solicitação ainda não terminou
    // Usado para que não haja várias solicitações feitas de uma vez
    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)

    // Envia uma nova mensagem por e-mail
    async function handleSubmit(e: any) {

        e.preventDefault()

        // Faz a validação dos dados
        try {
            await Yup.object().shape({
                message: contactProperty.message,
                subject: contactProperty.subject,
                email: contactProperty.email,
                name: contactProperty.name
            }).validate({
                message: message,
                subject: subject,
                email: email,
                name: name
            })
        } catch (err: any) {
            toast.info(err.message)

            // Destaca o input que não passou na validação dos dados
            errorInput(err)

            return false
        }

        // Informa se a solicitação terminou ou não
        setIsButtonLoading(true)

        const axiosResult = await axiosContact.sendMessage({
            message: message,
            subject: subject,
            email: email,
            name: name
        })

        if (axiosResult) {
            if (axiosResult.status == 200) {
                // Se o envio do e-mail for bem sucedido
                if (axiosResult.data.responseCode == 200) {
                    toast.success(axiosResult.data.message)
                }
                // Caso não tenha sido bem sucedida por um motivo que não seja o servidor
                else {
                    toast.error(axiosResult.data.message)
                }
            } else {
                // Caso não tenha sido bem sucedida por um motivo do servidor
                toast.error(axiosResult.data)
            }
            // Informa se a solicitação terminou ou não
            setIsButtonLoading(false)

            return false
        }

        // Informa se a solicitação terminou ou não
        setIsButtonLoading(false)

        toast.error('Erro ao conectar-se com o servidor')
    }

    return (
        <main>
            <Head>
                <title>Contato - Nome da Empresa</title>
                <meta name="description" content="Entre em contato conosco." />

                {/* Google / Search Engine Tags */}
                <meta itemProp="name" content="Contato - Nome da Empresa" />
                <meta itemProp="description" content="Entre em contato conosco." />
                <meta itemProp="image" content={`${process.env.SERVERDOMAIN}/public/images/logo.png`} />

                {/* Facebook Meta Tags */}
                <meta property="og:url" content={process.env.CLIENTDOMAIN} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Contato - Nome da Empresa" />
                <meta property="og:description" content="Entre em contato conosco." />
                <meta property="og:image" content={`${process.env.SERVERDOMAIN}/public/images/logo.png`} />

                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contato - Nome da Empresa" />
                <meta name="twitter:description" content="Entre em contato conosco." />
                <meta name="twitter:image" content={`${process.env.SERVERDOMAIN}/public/images/logo.png`} />
            </Head>

            {/* Título da página */}
            <h1 className={"title"}>CONTATO</h1>

            {/* Aviso */}
            <p className={style.p}>
                A resposta, caso necessário, será enviada para o e-mail informado abaixo.
            </p>

            {/* Formulário */}
            <form className={style.form} onSubmit={handleSubmit}>

                {/* Nome */}
                <label className={inputStyle.label} htmlFor="name">Nome</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`${nunito_sans.className} ${inputStyle.input}`}
                    maxLength={50}
                />

                {/* E-mail */}
                <label className={inputStyle.label} htmlFor="email">E-mail</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${nunito_sans.className} ${inputStyle.input}`}
                />

                {/* Assunto */}
                <label className={inputStyle.label} htmlFor="subject">Assunto</label>
                <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={`${nunito_sans.className} ${inputStyle.input}`}
                    maxLength={50}
                />

                {/* Mensagem */}
                <label className={inputStyle.label} htmlFor="message">Mensagem</label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${nunito_sans.className} ${inputStyle.textarea}`}
                    rows={5}
                />

                {/* Botão de enviar */}
                <input
                    type="submit"
                    value={isButtonLoading
                        ? 'Aguarde um instante'
                        : 'Enviar'}
                    className={`${nunito_sans.className} ${inputStyle.submit}`}
                    onClick={handleSubmit}
                    disabled={isButtonLoading}
                />
            </form>
        </main>
    )
}
