import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PlusCircle } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useAtom } from 'jotai'
import { professorAtom } from '@/components/admin/professors/configure/configure.store'
import ExtensionProjectCard, {
  ExtensionProject,
} from './extension-project-card'
import ExtensionProjectForm from './extension-project-form'

export default function ExtensionProjectsTab() {
  const [professor, setProfessor] = useAtom(professorAtom)
  const [projects, setProjects] = useState(professor?.extensionProjects || [])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<
    ExtensionProject | undefined
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
            extensionProjects: updatedProjects,
          }
        : null,
    )
  }

  const handleEditProject = (project: ExtensionProject) => {
    setEditingProject(project)
    setIsFormOpen(true)
  }

  const handleSubmitProject = async (project: ExtensionProject) => {
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
              extensionProjects: updatedProjects,
            }
          : null,
      )
    } else {
      setProjects([...projects, project])

      setProfessor(prev =>
        prev
          ? {
              ...prev,
              extensionProjects: [...(prev.extensionProjects || []), project],
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
