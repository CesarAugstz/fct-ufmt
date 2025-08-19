import { unstable_cache } from 'next/cache'
import { db } from '@/server/db'

export const getCollegeData = unstable_cache(
  async () => {
    const collegeData = await db.collegeData.findFirst({
      include: {
        logo: true,
        bannerImage: true,
        secondBannerImages: true,
      },
    })

    return collegeData
  },
  ['college-data'],
  {
    tags: ['college-data'],
    revalidate: 1,
  },
)
