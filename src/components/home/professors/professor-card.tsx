'use client'

import Link from 'next/link'
import { Book, Mail, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { getAnimationOnViewUp } from '@/utils/animations/on-view-up'
import { Course, Professor, User } from '@zenstackhq/runtime/models'
import ProfileImage from '@/components/common/profile-image'

type ProfessorWithRelations = Professor & {
  user: User
  courses?: Course[]
}

interface ProfessorCardProps {
  professor: ProfessorWithRelations
  index?: number
}

export default function ProfessorCard({
  professor,
  index = 0,
}: ProfessorCardProps) {
  return (
    <motion.div
      className="flex flex-col rounded-lg md:flex-row gap-6 py-8 group hover:bg-background-hover transition-colors"
      {...getAnimationOnViewUp(index, 'y', false)}
    >
      <div className="flex justify-center">
        <ProfileImage
          alt={professor.user.name || ''}
          src={professor.image || undefined}
          className="w-48 h-48 hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex-grow">
        {professor.courses && professor.courses.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {professor.courses.map(course => (
              <Badge key={course?.name} variant="secondary">
                {course.name}
              </Badge>
            ))}
          </div>
        )}

        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
          <Link href={`/home/professors/${professor.id}`}>
            {professor.user?.name || 'Professor'}
          </Link>
        </h3>

        {professor.user?.email && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Mail className="h-4 w-4" />
            {professor.user.email}
          </div>
        )}

        {professor.summary && (
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {professor.summary}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {professor.specialties.slice(0, 3).map(specialty => (
            <Badge key={specialty} variant="outline" className="bg-primary/5">
              {specialty}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          {professor.publications && professor.publications.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Book className="h-4 w-4" />
              {professor.publications.length} publicações
            </div>
          )}
          <Button variant="ghost" className="group" asChild>
            <Link
              href={`/home/professors/${professor.id}`}
              className="flex items-center gap-2"
            >
              Ver perfil
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
