import Markdown from '@/components/common/blocks/markdown'
import Title from '@/components/common/blocks/title'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params

  const markdownMockData = `# Faculdade de Ciências e Tecnologia - UFMT

## Bem-vindo ao Departamento de Ciência e Tecnologia

Este é um **documento de exemplo** para testar a renderização de *Markdown* no site da FCT-UFMT.

### Sobre a FCT

A Faculdade de Ciências e Tecnologia (FCT) da Universidade Federal de Mato Grosso é uma unidade acadêmica dedicada ao ensino, pesquisa e extensão nas áreas de ciências exatas e tecnológicas.

#### Cursos Oferecidos

- Engenharia de Computação
- Engenharia Civil
- Matemática
- Física
- Química

#### Cronograma Acadêmico

1. **Primeiro Semestre**: Março a Julho
2. **Segundo Semestre**: Agosto a Dezembro
3. **Férias**: Janeiro e Fevereiro

### Projetos de Pesquisa

> "A pesquisa é o coração da universidade, onde o conhecimento é gerado e transformado."

#### Áreas de Pesquisa Ativas

- [ ] Inteligência Artificial
- [x] Desenvolvimento Sustentável
- [x] Energia Renovável
- [ ] Biotecnologia

### Laboratórios

| Nome do Laboratório | Coordenador | Localização |
|---------------------|-------------|------------|
| Lab. de Computação | Prof. Silva | Bloco A, Sala 101 |
| Lab. de Física Aplicada | Profa. Santos | Bloco B, Sala 202 |
| Lab. de Química | Prof. Oliveira | Bloco C, Sala 303 |

### Código de Exemplo - Algoritmo em Python

\`\`\`python
def calcular_media(notas):
    return sum(notas) / len(notas)

# Exemplo de uso
notas_aluno = [8.5, 7.0, 9.5, 6.8]
media = calcular_media(notas_aluno)
print(f"A média do aluno é: {media:.1f}")
\`\`\`

### Imagens do Campus

![Campus UFMT](https://example.com/campus-ufmt.jpg)

### Links Úteis

- [Site Oficial da UFMT](https://www.ufmt.br)
- [Portal do Aluno](https://portal.ufmt.br)
- [Biblioteca Central](https://biblioteca.ufmt.br)

---

Para mais informações, entre em contato pelo email: fct@ufmt.br

*Última atualização: Março 2024*
`

  return (
    <>
      <Title title={slug.join(' ') ?? ''} subtitle="Subtítulo do título" />
      <Markdown content={markdownMockData} />
    </>
  )
}
