import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'

const faqData = [
  {
    id: 'administrative',
    title: 'Dúvidas Administrativas',
    items: [
      {
        text: 'Aproveitamento de disciplinas',
        href: 'faq/aproveitamento-de-disciplinas',
      },
      {
        text: 'Atividades complementares',
        href: 'faq/atividades-complementares',
      },
      {
        text: 'Biblioteca Virtual Universitária da Pearson',
        href: 'faq/biblioteca-virtual-universitaria-da-pearson',
      },
      { text: 'Seminário Integrador', href: 'faq/seminario-integrador' },
      { text: 'Transferência de Polo', href: 'faq/transferencia-de-polo' },
      {
        text: 'Carteirinha de Estudante',
        href: 'faq/carteirinha-de-estudante',
      },
      {
        text: 'Acessar o RGA – Registro Geral Acadêmico',
        href: 'faq/acessar-o-rga-registro-geral-academico',
      },
      { text: 'Matriz Curricular', href: 'faq/matriz-curricular' },
      { text: 'Calendário acadêmico', href: 'faq/calendario-academico' },
      { text: 'Eventos do curso', href: 'faq/eventos-do-curso' },
      { text: 'Informações sobre os Polos' },
      {
        text: 'Regularização de Matrícula',
        href: 'faq/regularizacao-de-matricula',
      },
      {
        text: 'Cronograma e avisos do curso',
        href: 'faq/cronograma-e-avisos-do-curso',
      },
      {
        text: 'Como solicitar Desistência do Curso',
        href: 'faq/como-solicitar-desistencia-do-curso',
      },
      { text: 'Como fazer rematrícula', href: 'faq/como-fazer-rematricula' },
    ],
  },
  {
    id: 'moodle',
    title: 'Moodle/AVA',
    items: [
      {
        text: 'Dúvidas sobre Moodle/AVA',
        href: 'faq/duvidas-sobre-o-ava-moodle',
      },
      { text: 'Atualizar E-mail no AVA', href: 'faq/atualizar-e-mail-no-ava' },
      { text: 'Alterar de senha', href: 'faq/alterar-senha' },
      { text: 'Primeiro Acesso', href: 'faq/primeiro-acesso' },
    ],
  },
  {
    id: 'portal',
    title: 'Portal Acadêmico',
    items: [
      {
        text: 'Relatórios de Notas e Faltas',
        href: 'faq/relatorios-de-notas-e-faltas',
      },
      { text: 'Planos de Ensino', href: 'faq/planos-de-ensino' },
      { text: 'Histórico Escolar', href: 'faq/historico-escolar' },
      { text: 'Comprovante de Matrícula' },
      { text: 'Grade Curricular', href: 'faq/grade-curricular' },
      { text: 'Alterar Senha', href: 'faq/alterar-senha-do-portal-academico' },
    ],
  },
  {
    id: 'contact',
    title: 'Fale Conosco',
    content: (
      <div className="space-y-6">
        <p className="text-muted-foreground text-lg leading-relaxed">
          Caso sua dúvida não tenha sido respondida aqui, entre em contato
          conosco. Estamos à disposição para ajudá-lo.
        </p>
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-2xl border border-primary/10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-foreground mb-4 text-lg">
                Secretaria da CEG do Bach. em Ciências e Tecnologia da FCT
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">E-mail</p>
                    <p className="font-medium text-foreground">
                      sec-bct.fct@ufmt.br
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ChatBCT</p>
                    <p className="font-medium text-foreground">
                      (65) 3615-8078
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
]

export default function Faq() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6 tracking-tight">
            Perguntas Frequentes
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Encontre respostas rápidas para as principais dúvidas sobre o curso
            de Ciências e Tecnologia
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-6 w-full">
          {faqData.map((section, sectionIndex) => (
            <AccordionItem
              key={section.id}
              value={section.id}
              className="border-0 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <AccordionTrigger className="px-8 py-6 text-left font-semibold text-lg text-card-foreground hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 rounded-t-2xl group transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md ${
                      sectionIndex === 0
                        ? 'bg-gradient-to-br from-primary to-primary/80'
                        : sectionIndex === 1
                          ? 'bg-gradient-to-br from-secondary to-secondary/80'
                          : sectionIndex === 2
                            ? 'bg-gradient-to-br from-accent to-accent/80'
                            : 'bg-gradient-to-br from-muted-foreground to-muted-foreground/80'
                    }`}
                  >
                    {sectionIndex + 1}
                  </div>
                  <span className="group-hover:text-primary transition-colors duration-300">
                    {section.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 pt-2">
                {section.content || (
                  <div className="grid gap-4">
                    {section.items?.map((item, index) => (
                      <div
                        key={index}
                        className="group flex items-start gap-4 p-4 rounded-xl hover:bg-muted/30 transition-all duration-200"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-0.5">
                          <span className="text-primary text-sm font-semibold">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        {item.href && item.href !== '#' ? (
                          <Link
                            href={item.href}
                            className="text-foreground hover:text-primary font-medium leading-relaxed group-hover:translate-x-1 transition-all duration-200 flex-1"
                          >
                            <span className="border-b border-transparent hover:border-primary/50 transition-colors duration-200">
                              {item.text}
                            </span>
                            <svg
                              className="inline-block w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </Link>
                        ) : (
                          <span className="text-muted-foreground font-medium leading-relaxed flex-1">
                            {item.text}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
