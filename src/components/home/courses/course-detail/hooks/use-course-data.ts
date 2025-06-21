'use client'

import { useFindUniqueCourse } from '@/lib/zenstack-hooks'
import { courseDetailMock } from '../mock/course-detail-mock'

export function useCourseData(slug: string) {
  const {
    data: course,
    isLoading,
    error,
  } = useFindUniqueCourse({
    where: { slug },
    include: {
      professors: {
        include: {
          user: true,
        },
      },
    },
  })

  const mockCourse = courseDetailMock.find(c => c.slug === slug)

  if (!mockCourse) {
    console.warn(`No mock course found for slug: ${slug}`)
  }

  const enrichedCourse = course
    ? {
        ...mockCourse,
        ...course,
        professors: course.professors.map(prof => ({
          ...prof,
          degrees:
            mockCourse?.professors.find(mp => mp.id === prof.id)?.degrees || [],
        })),
        poles: mockCourse?.poles || [],
        seminars: mockCourse?.seminars || [],
        faq: mockCourse?.faq || [],
        aboutContent: mockCourse?.aboutContent || '',
        admissionInfo: mockCourse?.admissionInfo || null,
        galleryImages: mockCourse?.galleryImages || [],
      }
    : mockCourse

  return {
    course: enrichedCourse,
    isLoading,
    error,
  }
}

export function useCourseAbout(slug: string) {
  const mockCourse = courseDetailMock.find(c => c.slug === slug)

  return {
    aboutContent: mockCourse?.aboutContent || '',
  }
}

export function useCourseAdmission(slug: string) {
  const mockCourse = courseDetailMock.find(c => c.slug === slug)

  return {
    admissionInfo: mockCourse?.admissionInfo || null,
  }
}

export function useCoursePoles(slug: string) {
  const mockCourse = courseDetailMock.find(c => c.slug === slug)

  return {
    poles: mockCourse?.poles || [],
  }
}

export function useCourseSeminars(slug: string) {
  const mockCourse = courseDetailMock.find(c => c.slug === slug)

  return {
    seminars: mockCourse?.seminars || [],
  }
}

export function useCourseFAQ(slug: string) {
  const mockCourse = courseDetailMock.find(c => c.slug === slug)

  return {
    faq: mockCourse?.faq || [],
  }
}
