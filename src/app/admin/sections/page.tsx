'use client';

import { useState, useEffect } from 'react';
import { BaseCard } from "@/components/ui/base-card";
import { SectionDialog } from "@/components/admin/sections/section-dialog";
import { Section } from "@/types/admin/section.types";
import { useToast } from '@/lib/hooks/toast';
import { SectionAccordion } from '@/components/admin/sections/section-accordion';

export default function SectionsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section | null>(null);
  const [parentForNewSection, setParentForNewSection] = useState<string | null>(null);
   const toast = useToast();

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      setIsLoading(true);
      
      setTimeout(() => {
        const mockSections = [
          { id: '1', name: 'About', slug: 'about', parentId: null, isVisible: true, order: 1 },
          { id: '2', name: 'Services', slug: 'services', parentId: null, isVisible: true, order: 2 },
          { id: '3', name: 'Team', slug: 'team', parentId: '1', isVisible: true, order: 1 },
          { id: '4', name: 'History', slug: 'history', parentId: '1', isVisible: false, order: 2 },
          { id: '5', name: 'Web Development', slug: 'web-dev', parentId: '2', isVisible: true, order: 1 },
          { id: '6', name: 'Mobile Development', slug: 'mobile-dev', parentId: '2', isVisible: true, order: 2 },
          { id: '7', name: 'Leadership', slug: 'leadership', parentId: '3', isVisible: true, order: 1 },
        ];
        
        const hierarchicalSections = organizeIntoHierarchy(mockSections);
        setSections(hierarchicalSections);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      toast.error("Failed to load sections");
      setIsLoading(false);
    }
  };

  const organizeIntoHierarchy = (flatSections: Section[]): Section[] => {
    const sectionMap = new Map<string, Section>();
    const rootSections: Section[] = [];

    flatSections.forEach(section => {
      sectionMap.set(section.id, { ...section, children: [] });
    });

    flatSections.forEach(section => {
      const sectionWithChildren = sectionMap.get(section.id)!;
      
      if (section.parentId && sectionMap.has(section.parentId)) {
        const parent = sectionMap.get(section.parentId)!;
        parent.children = [...(parent.children || []), sectionWithChildren];
      } else {
        rootSections.push(sectionWithChildren);
      }
    });

    return rootSections.sort((a, b) => a.order - b.order);
  };

  const handleAddSection = async (formData: any) => {
    try {
      setIsLoading(true);
      
      setTimeout(() => {
        const newSection = {
          id: `new-${Date.now()}`,
          name: formData.name,
          slug: formData.slug,
          parentId: parentForNewSection,
          isVisible: formData.isVisible,
          order: formData.order
        };
        
        const updatedSections = [...sections];
        if (!parentForNewSection) {
          updatedSections.push(newSection);
        } else {
          const addToParent = (items: Section[]): Section[] => {
            return items.map(item => {
              if (item.id === parentForNewSection) {
                return {
                  ...item,
                  children: [...(item.children || []), newSection]
                };
              }
              if (item.children?.length) {
                return {
                  ...item,
                  children: addToParent(item.children)
                };
              }
              return item;
            });
          };
          
          addToParent(updatedSections);
        }
        
        setSections(updatedSections);
        setIsAddDialogOpen(false);
        setParentForNewSection(null);
        setIsLoading(false);
        
        toast.success("Section created successfully");
      }, 500);
    } catch (error) {
      toast.error("Failed to create section");
      setIsLoading(false);
    }
  };

  const handleEditSection = async (formData: any) => {
    if (!currentSection) return;
    
    try {
      setIsLoading(true);
      
      setTimeout(() => {
        const updateSection = (items: Section[]): Section[] => {
          return items.map(item => {
            if (item.id === currentSection.id) {
              return {
                ...item,
                name: formData.name,
                slug: formData.slug,
                isVisible: formData.isVisible,
                order: formData.order
              };
            }
            if (item.children?.length) {
              return {
                ...item,
                children: updateSection(item.children)
              };
            }
            return item;
          });
        };
        
        const updatedSections = updateSection(sections);
        setSections(updatedSections);
        setIsEditDialogOpen(false);
        setIsLoading(false);
        
        toast.success("Section updated successfully");
      }, 500);
    } catch (error) {
      toast.error("Failed to update section");
      setIsLoading(false);
    }
  };

  const handleDeleteSection = async (id: string) => {
    if (!confirm("Are you sure you want to delete this section? This will also delete all child sections.")) {
      return;
    }
    
    try {
      setIsLoading(true);
      
      setTimeout(() => {
        const deleteSection = (items: Section[]): Section[] => {
          return items.filter(item => {
            if (item.id === id) {
              return false;
            }
            if (item.children?.length) {
              item.children = deleteSection(item.children);
            }
            return true;
          });
        };
        
        const updatedSections = deleteSection(sections);
        setSections(updatedSections);
        setIsLoading(false);
        
        toast.success("Section deleted successfully");
      }, 500);
    } catch (error) {
      toast.error("Failed to delete section");
      setIsLoading(false);
    }
  };

  const handleAddSubsection = (parentId: string) => {
    setParentForNewSection(parentId);
    setIsAddDialogOpen(true);
  };

  const handleEditClick = (section: Section) => {
    setCurrentSection(section);
    setIsEditDialogOpen(true);
  };

  return (
    <BaseCard 
      title="Sections Management" 
      onAdd={() => {
        setParentForNewSection(null);
        setIsAddDialogOpen(true);
      }}
      addButtonText="Add Top-Level Section"
      onUpdate={fetchSections}
      updateButtonText="Refresh"
      showEmptyState={sections.length === 0 && !isLoading}
      emptyStateMessage="No sections have been created yet. Click 'Add Top-Level Section' to create your first section."
    >
      {isLoading ? (
        <div className="flex justify-center py-8">
          <p>Loading sections...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sections.map(section => (
            <SectionAccordion
              key={section.id}
              section={section}
              onAddSubsection={handleAddSubsection}
              onEdit={handleEditClick}
              onDelete={handleDeleteSection}
            />
          ))}
        </div>
      )}

      <SectionDialog 
        type="add"
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddSection}
        parentId={parentForNewSection}
      />

      <SectionDialog 
        type="edit"
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditSection}
        section={currentSection}
      />
    </BaseCard>
  );
}
