import format from 'date-fns/format'
import isToday from 'date-fns/isToday'
import { isTomorrow, isYesterday } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import parseISO from 'date-fns/parseISO'

export default function formatDateMatch(date: string): string {
    // Se a data for no mesmo dia
    if (isToday(parseISO(date))) {
        return format(parseISO(date), "'Hoje,' HH'h'mm", { locale: ptBR })
    }
    // Se a data for no dia anterior
    else if (isYesterday(parseISO(date))) {
        return format(parseISO(date), "'Ontem,' HH'h'mm", { locale: ptBR })
    }
    // Se a data for no dia posterior
    else if (isTomorrow(parseISO(date))) {
        return format(parseISO(date), "'Amanhã,' HH'h'mm", { locale: ptBR })
    }
    // Caso seja em outro dia
    else {
        const formatDate = format(parseISO(date), "EEEEEE',' dd/MM/yyyy HH'h'mm", { locale: ptBR })
        return `${formatDate[0].toUpperCase()}${formatDate.substring(1)}`
    }
}
