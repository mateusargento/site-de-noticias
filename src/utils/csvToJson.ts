export default function csvToJson(csv: string): string  {
    let csvToArray: string[] = csv.split('\n') // Transforma o valor de CSV para array
    const titles: string[] = csvToArray[0].split(',') // Os títulos dos dados
    let jsonResult: Object[] = [] // Resultado para retornar

    // Percorre cada linha de dados que será gerado um objeto
    for (let j = 1; j < csvToArray.length; j++) {
        // Array de valores para criar o objeto
        let dataArray = csvToArray[j].trim().split(',')

        // Transformando array em objeto
        let objectResult: any = {}
        for (let i = 0; i < titles.length; i++) {
            let title: string = titles[i].replaceAll("\r", "")
            objectResult[title] = dataArray[i]
        }

        // Criando o JSON. Inclui o objeto criado na array de objetos
        jsonResult.push(objectResult)
    }
    
    return JSON.stringify(jsonResult)
}