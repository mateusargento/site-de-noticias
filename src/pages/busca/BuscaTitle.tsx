import { useState } from 'react'

export default function Title() {
  const [search, setSearch] = useState<string>('')
  const [titleStyle, setTitleStyle] = useState<string>('')

  return (
    <h1 className={titleStyle}>Você pesquisou por: "{search}"</h1>
  )
}
