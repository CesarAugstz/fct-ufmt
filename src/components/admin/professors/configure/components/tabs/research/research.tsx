import { FormMultipleTags } from '@/components/common/form/form-multiple-tags'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { PlusCircle } from 'lucide-react'
import { Fragment, useCallback, useState } from 'react'
import { useAtom } from 'jotai'
import { professorAtom } from '@/components/admin/professors/configure/configure.store'
import ResearchProjectCard, { ResearchProject } from './research-project-card'
import ResearchProjectForm from './research-project-form'

export default function ResearchTab() {
  const [professor, setProfessor] = useAtom(professorAtom)
  const [projects, setProjects] = useState(professor?.researchProjects || [])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<
    ResearchProject | undefined
  >()

  const handleAddProject = () => {
    setEditingProject(undefined)
    setIsFormOpen(true)
  }

  const handleDeleteProject = (index: number) => {
    const updatedProjects = [...projects]
    updatedProjects.splice(index, 1)
    setProjects(updatedProjects)

    setProfessor(prev =>
      prev
        ? {
            ...prev,
            researchProjects: updatedProjects,
          }
        : null,
    )
  }

  const handleEditProject = (project: ResearchProject) => {
    setEditingProject(project)
    setIsFormOpen(true)
  }

  const handleSubmitProject = async (project: ResearchProject) => {
    if (editingProject !== undefined) {
      const updatedProjects = [...projects]
      const editingIndex = projects.findIndex(
        p => p.title === editingProject.title,
      )
      updatedProjects[editingIndex] = project
      setProjects(updatedProjects)

      setProfessor(prev =>
        prev
          ? {
              ...prev,
              researchProjects: updatedProjects,
            }
          : null,
      )
    } else {
      setProjects([...projects, project])

      setProfessor(prev =>
        prev
          ? {
              ...prev,
              researchProjects: [...(prev.researchProjects || []), project],
            }
          : null,
      )
    }
  }

  const handleFormSuccess = () => {
    setIsFormOpen(false)
    setEditingProject(undefined)
  }

  const onCloseForm = useCallback(() => {
    setIsFormOpen(false)
    setEditingProject(undefined)
  }, [])

  const sections = [
    {
      title: 'Áreas de Pesquisa',
      fields: [
        {
          getComponent: () => (
            <FormMultipleTags name="researchAreas" label="Áreas de pesquisa" />
          ),
        },
      ],
    },
  ]

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="grid gap-8 gap-y-10">
          {sections.map(section => (
            <div key={section.title} className="grid">
              <h3 className="text-lg font-medium">{section.title}</h3>
              <Separator className="mb-4" />
              <div className="gap-4 gap-y-4 md:space-y-0 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
                {section.fields.map((field, index) => (
                  <Fragment key={index}>{field.getComponent()}</Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Seus Projetos de Pesquisa</h3>
            <Button onClick={handleAddProject}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar Projeto
            </Button>
          </div>

          <div className="space-y-4 mt-4">
            {projects.map((project, index) => (
              <ResearchProjectCard
                key={index}
                project={project as any}
                onDelete={() => handleDeleteProject(index)}
                onEdit={handleEditProject}
              />
            ))}

            {projects.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum projeto de pesquisa cadastrado. Clique em &quot;
                Adicionar Projeto &quot; para começar.
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <ResearchProjectForm
        isOpen={isFormOpen}
        onClose={() => onCloseForm()}
        onSuccess={handleFormSuccess}
        project={editingProject}
        onSubmit={handleSubmitProject}
      />
    </Card>
  )
}
