import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PlusCircle } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useAtom } from 'jotai'
import { professorAtom } from '@/components/admin/professors/configure/configure.store'
import PublicationCard, { Publication } from './publication-card'
import PublicationForm from './publication-form'

export default function PublicationsTab() {
  const [professor, setProfessor] = useAtom(professorAtom)
  const [publications, setPublications] = useState(
    professor?.publications || [],
  )
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingPublication, setEditingPublication] = useState<
    Publication | undefined
  >()

  const handleAddPublication = () => {
    setEditingPublication(undefined)
    setIsFormOpen(true)
  }

  const handleDeletePublication = (index: number) => {
    const updatedPublications = [...publications]
    updatedPublications.splice(index, 1)
    setPublications(updatedPublications)

    setProfessor(prev =>
      prev
        ? {
            ...prev,
            publications: updatedPublications,
          }
        : null,
    )
  }

  const handleEditPublication = (publication: Publication) => {
    setEditingPublication(publication)
    setIsFormOpen(true)
  }

  const handleSubmitPublication = async (publication: Publication) => {
    if (editingPublication !== undefined) {
      const updatedPublications = [...publications]
      const editingIndex = publications.findIndex(
        p => p.title === editingPublication.title,
      )
      updatedPublications[editingIndex] = publication
      setPublications(updatedPublications)

      setProfessor(prev =>
        prev
          ? {
              ...prev,
              publications: updatedPublications,
            }
          : null,
      )
    } else {
      setPublications([...publications, publication])

      setProfessor(prev =>
        prev
          ? {
              ...prev,
              publications: [...(prev.publications || []), publication],
            }
          : null,
      )
    }
  }

  const handleFormSuccess = () => {
    setIsFormOpen(false)
    setEditingPublication(undefined)
  }

  const onCloseForm = useCallback(() => {
    setIsFormOpen(false)
    setEditingPublication(undefined)
  }, [])

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Suas Publicações</h3>
          <Button onClick={handleAddPublication}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Adicionar Publicação
          </Button>
        </div>

        <div className="space-y-4">
          {publications.map((publication, index) => (
            <PublicationCard
              key={index}
              publication={publication as any}
              onDelete={() => handleDeletePublication(index)}
              onEdit={handleEditPublication}
            />
          ))}

          {publications.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhuma publicação cadastrada. Clique em &quot;Adicionar
              Publicação&quot; para começar.
            </div>
          )}
        </div>
      </CardContent>

      <PublicationForm
        isOpen={isFormOpen}
        onClose={() => onCloseForm()}
        onSuccess={handleFormSuccess}
        publication={editingPublication}
        onSubmit={handleSubmitPublication}
      />
    </Card>
  )
}
