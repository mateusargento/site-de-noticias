import cleanString from '@/utils/cleanString'

type ListNewsParams = {
    id?: number,
    title: string,
    text: string,
    imageDescription: string,
    link: string,
    status: boolean,
    imageID: number,
    tags: number[],
    authorID?: string
}

type LinkNewsParams = {
    id?: number,
    title?: string,
    link?: string,
    search?: string,
    team?: string,
    createdAt?: string
}

class NewsRequest {
    // Lista as notícias
    async listNews(params: LinkNewsParams): Promise<any> {
        const axios = (await import('axios')).default

        let result: any
        let linkQuery: string = ''
        let searchQuery: string = ''
        let teamQuery: string = ''
        let createdAtQuery: string = ''

        if (params.link || params.search || params.team || params.createdAt) {
            const linkCleaned: string = params.link ? cleanString(params.link!) : ''
            const searchCleaned: string = params.search ? cleanString(params.search!) : ''
            const teamCleaned: string = params.team ? cleanString(params.team!) : ''
            const createdAtCleaned: string = params.createdAt ? cleanString(params.createdAt!) : ''

            linkQuery = `&link=${linkCleaned}`
            searchQuery = `&search=${searchCleaned}`
            teamQuery = `&team=${teamCleaned}`
            createdAtQuery = `&createdAt=${createdAtCleaned}`
        }

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.SERVERDOMAIN}/noticia?${linkQuery}${searchQuery}${teamQuery}${createdAtQuery}`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        await axios.request(config)
            .then((response) => {
                result = response;
            })
            .catch((error) => {
                result = error.response;
            });

        return result
    }

    // Adiciona uma nova notícia
    async addNews(params: ListNewsParams): Promise<any> {
        const axios = (await import('axios')).default
        let result: any

        let data: string = JSON.stringify({
            "title": params.title,
            "text": params.text,
            "imageDescription": params.imageDescription,
            "link": params.link,
            "status": params.status,
            "imageID": params.imageID,
            "authorID": params.authorID,
            "tags": params.tags
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.SERVERDOMAIN}/noticia`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };


        await axios.request(config)
            .then((response) => {
                result = response;
            })
            .catch((error) => {
                result = error.response;
            });

        return result
    }

    // Edita os dados de uma notícia
    async editNews(params: ListNewsParams): Promise<any> {
        const axios = (await import('axios')).default
        let result: any

        const id = parseInt(cleanString(params.id!.toString()))

        let data: string = JSON.stringify({
            "title": params.title,
            "text": params.text,
            "imageDescription": params.imageDescription,
            "link": params.link,
            "status": params.status,
            "imageID": params.imageID,
            "tags": params.tags
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${process.env.SERVERDOMAIN}/noticia/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };


        await axios.request(config)
            .then((response) => {
                result = response;
            })
            .catch((error) => {
                result = error.response;
            });

        return result
    }
}

export default new NewsRequest
