import { Matches } from './libertadores'
import formatDateMatch from '@/utils/formatDateMatch'
import style from './Tabela.module.scss'

export default function QualifyMatches({ matches = [], stage, qualifyMatchesStyle }: { matches: Matches[], stage: string, qualifyMatchesStyle?: 'one-in-one' }) {
    return (
        <>
            {
                // Lista as partidas das fases de classificação
                matches.map((match, i) => {
                    if (match.matchWeek == stage) {
                        // Define se os jogos listados são ida e volta ou jogo único
                        const styleChoosen = qualifyMatchesStyle == 'one-in-one'
                            ? style.matchesQualifyRoundSingleMatch
                            : style.matchesQualifyRoundTwoMatches

                        return (
                            <div className={`${style.matchesQualifyRound} ${styleChoosen}`} key={i} >
                                <div className={style.matchInfoQualifyRound}>
                                    <p>{match.datetime ? formatDateMatch(match.datetime) : ''}</p>
                                    <p>{match.stadium ?? ''}</p>
                                </div>
                                <div className={style.matchScoreQualifyRound}>
                                    <div className={style.matchTeam}>
                                        {match.homeTeam}
                                    </div>
                                    <div style={{ fontWeight: 'bold' }}>
                                        {match.homeScore ?? ''} X {match.awayScore ?? ''}
                                    </div>
                                    <div className={style.matchTeam}>
                                        {match.awayTeam}
                                    </div>
                                </div>
                            </div >
                        )
                    }
                })
            }
        </>
    )
}
