import style from './Shimmer.module.scss'

export default function Shimmer({
    width,
    height,
    margin
}: {
    width: string,
    height: string,
    margin?: string
}) {
    return (
        <div className={style.shimmer} style={{ width: width, height: height, margin: margin }}></div>
    )
}
