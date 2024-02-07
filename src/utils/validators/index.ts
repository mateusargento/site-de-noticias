import * as Yup from 'yup'

// Notícia
export const newsProperty = {
    id: Yup.number()
        .required('Erro ao selecionar uma notícia. Tente refazer do começo')
        .positive('Erro ao selecionar uma notícia. Tente refazer do começo')
        .integer('Erro ao selecionar uma notícia. Tente refazer do começo'),
    title: Yup.string()
        .required('Preencha o campo "Título"')
        .max(100, 'Digite no máximo 100 caracteres no campo "Título"')
        .trim(),
    text: Yup.string()
        .required('Preencha o campo "Conteúdo"')
        .notOneOf(['<p></p>'], 'Preencha o campo "Conteúdo"')
        .trim(),
    imageName: Yup.string()
        .required('Escolha uma imagem'),
    imageDescription: Yup.string()
        .required('Preencha o campo "Descrição da imagem"')
        .max(100, 'Digite no máximo 100 caracteres no campo "Descrição da imagem"')
        .trim(),
    link: Yup.string()
        .required('Preencha o campo "Link"')
        .max(200, 'Digite no máximo 200 caracteres no campo "Descrição da imagem"')
        .trim(),
    status: Yup.boolean().required('Escolha uma opção no campo "Status"'),
    authorID: Yup.string().uuid().required(),
    imageID: Yup.number()
        .required('Escolha uma imagem')
        .positive('Escolha uma imagem')
        .integer(),
    tags: Yup.array().of(Yup.number())
        .max(3, 'Selecione no máximo 3 tags')
        .min(1, 'Selecione no mínimo 1 tag')
}
