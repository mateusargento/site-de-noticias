import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import parseISO from 'date-fns/parseISO'

export default function formatDatePrintPage(date: string): string {
    return format(parseISO(date), "dd/MM/yyyy HH'h'mm", { locale: ptBR })
}
