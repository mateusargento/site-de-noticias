import { useState, useEffect } from 'react'
import Image from 'next/image'
import sun from '@/assets/images/sun.png'
import moon from '@/assets/images/moon.png'
import style from './Greatings.module.scss'

enum PartOfDay {
    morning,
    afternoon,
    night
}

export default function Greatings() {
    const [greatingsMessage, setGreatingsMessage] = useState<string>()
    const [partOfDay, setPartOfDay] = useState<PartOfDay>()

    useEffect(() => {
        function checkHours(): void {
            const date = new Date()
            const hours = date.getHours()

            if ((hours >= 5) && (hours <= 11)) {
                setGreatingsMessage(`Bom dia!`)
                setPartOfDay(PartOfDay.morning)
            }
            else if ((hours >= 12) && (hours <= 17)) {
                setGreatingsMessage(`Boa tarde!`)
                setPartOfDay(PartOfDay.afternoon)
            }
            else {
                setGreatingsMessage(`Boa noite!`)
                setPartOfDay(PartOfDay.night)
            }
        }

        checkHours()
    }, [])

    return (
        <div className={style.greatings}>
            <div className={style.greatingsContent}>
                {
                    (partOfDay == PartOfDay.morning || partOfDay == PartOfDay.afternoon) && <Image
                        src={sun}
                        width={25}
                        height={25}
                        alt="Sol"
                    />
                }
                {
                    partOfDay == PartOfDay.night ? <Image
                        src={moon}
                        width={25}
                        height={25}
                        alt="Lua"
                    /> : null
                }
                {greatingsMessage}
            </div>
        </div>
    )
}
