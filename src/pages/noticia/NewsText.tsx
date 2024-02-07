import { useEffect } from 'react'
import style from './Noticia.module.scss'

export default function NewsText({ text }: { text: string }) {
    useEffect(() => {
        // Converte o conteúdo string para HTML 
        function addText(): void {
            document.getElementById('newsText')!.innerHTML = text
        }

        addText()
    }, [text])

    return (
        <article id="newsText" className={style.text}></article>
    )
}
