import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PlusCircle } from 'lucide-react'
import { useCallback, useState } from 'react'
import { formMethodsAtom } from '@/components/admin/professors/configure/configure.store'
import ExtensionProjectCard, {
  ExtensionProject,
} from './extension-project-card'
import ExtensionProjectForm from './extension-project-form'
import { useAtomValue } from 'jotai'

export default function ExtensionProjectsTab() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<
    ExtensionProject | undefined
  >()
  const formMethods = useAtomValue(formMethodsAtom)
  const projects = formMethods?.watch('extensionProjects') ?? []

  const handleAddProject = () => {
    setEditingProject(undefined)
    setIsFormOpen(true)
  }

  const handleDeleteProject = (index: number) => {
    if (!formMethods) return

    const updatedProjects = [...projects]
    updatedProjects.splice(index, 1)
    formMethods.setValue('extensionProjects', updatedProjects)
  }

  const handleEditProject = (project: ExtensionProject) => {
    setEditingProject(project)
    setIsFormOpen(true)
  }

  const handleSubmitProject = async (project: ExtensionProject) => {
    if (!formMethods) return

    if (editingProject !== undefined) {
      const updatedProjects = [...projects]
      const editingIndex = projects.findIndex(
        p => p.title === editingProject.title,
      )
      updatedProjects[editingIndex] = project
      formMethods.setValue('extensionProjects', updatedProjects)
      return
    }
    formMethods.setValue('extensionProjects', [...projects, project])
  }

  const handleFormSuccess = () => {
    setIsFormOpen(false)
    setEditingProject(undefined)
  }

  const onCloseForm = useCallback(() => {
    setIsFormOpen(false)
    setEditingProject(undefined)
  }, [])

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Seus Projetos de Extensão</h3>
          <Button onClick={handleAddProject}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Adicionar Projeto
          </Button>
        </div>

        <div className="space-y-4">
          {projects.map((project, index) => (
            <ExtensionProjectCard
              key={index}
              project={project as any}
              onDelete={() => handleDeleteProject(index)}
              onEdit={handleEditProject}
            />
          ))}

          {projects.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum projeto de extensão cadastrado. Clique em &quot;Adicionar
              Projeto&quot; para começar.
            </div>
          )}
        </div>
      </CardContent>

      <ExtensionProjectForm
        isOpen={isFormOpen}
        onClose={() => onCloseForm()}
        onSuccess={handleFormSuccess}
        project={editingProject}
        onSubmit={handleSubmitProject}
      />
    </Card>
  )
}
