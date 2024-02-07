import { useState, useEffect } from 'react'
import style from './Modal.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function Modal({
    children,
    show,
    title,
    width,
    height
}: {
    children: any,
    show: boolean,
    title: string,
    width?: string,
    height?: string,
}) {
    const [visibility, setVisibility] = useState<any>('hidden')
    const [opacity, setOpacity] = useState<any>(0)
    const [defaultWidth, setDefaultWidth] = useState<string>('50vw')

    useEffect(() => {
        function handleModal(): void {
            // Checa o tamanho padrão para o modal, verificando se é um smartphone ou desktop
            if (window.innerWidth < 1024) {
                setDefaultWidth('90vw')
            }

            if (show == true) {
                setVisibility('visible')
                setOpacity(1)
            } else {
                setVisibility('hidden')
                setOpacity(0)
            }
        }

        handleModal()
    }, [show])

    return (
        <div className={style.modal} style={{ visibility: visibility, opacity: opacity }}>
            <div
                className={style.content}
                style={{
                    width: width ? width : defaultWidth,
                    height: height ? height : '70vh'
                }}
            >
                <div className={style.header}>
                    <h1 className={style.title}>{title}</h1>
                    <FontAwesomeIcon icon={faXmark} onClick={() => {
                        setVisibility('hidden')
                        setOpacity(0)
                    }} />
                </div>
                <div className={style.children}>
                    {children}
                </div>
            </div>
        </div>
    )
}
