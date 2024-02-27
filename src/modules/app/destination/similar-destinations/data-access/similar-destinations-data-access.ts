'use server'

import { createServerErrorResponse, createServerSuccessResponse } from 'modules/shared/data-access/server-response'
import { unstable_cache } from 'next/cache'
import 'server-only'

const testDestinations = [
  {
    name: 'Brighton',
    slug: '/brighton',
    similarDestinations: [
      {
        name: 'Hove',
        slug: '/hove',
      },
      {
        name: 'Worthing',
        slug: '/worthing',
      },
    ],
  },
  {
    name: 'Hove',
    slug: '/hove',
    similarDestinations: [
      {
        name: 'Brighton',
        slug: '/brighton',
      },
      {
        name: 'Worthing',
        slug: '/worthing',
      },
    ],
  },
  {
    name: 'Worthing',
    slug: '/worthing',
    similarDestinations: [
      {
        name: 'Hove',
        slug: '/hove',
      },
      {
        name: 'Brighton',
        slug: '/brighton',
      },
    ],
  },
]

type SimilarDestination = {
  name: string
  slug: string
  similarDestinations: {
    name: string
    slug: string
  }[]
}

export async function getDestinations(slug: string): Promise<SimilarDestination> {
  return testDestinations.filter(destination => destination.slug === slug)[0]
}

export const getDestination = async (slug: string) => {
  try {
    const destination = await getDestinations(slug)

    if (!destination) {
      return createServerErrorResponse<SimilarDestination['slug']>('Destination not found')
    }
    const similarDestinationDto: SimilarDestination['slug'] = destination.slug
    return createServerSuccessResponse(similarDestinationDto)
  } catch (error: any) {
    return createServerErrorResponse<SimilarDestination['slug']>(error.message || 'Unknown error.')
  }
}

export const getSimilarDestinations = unstable_cache(
  async (slug: string) => {
    try {
      const destination = await getDestinations(slug)
      if (!destination) {
        return createServerErrorResponse<SimilarDestination>('Destination not found')
      }
      const similarDestinationDto: SimilarDestination['similarDestinations'] = destination.similarDestinations
      return createServerSuccessResponse(similarDestinationDto)
    } catch (error: any) {
      return createServerErrorResponse<SimilarDestination['slug']>(error.message || 'Unknown error.')
    }
  },
  ['similar-destinations'],
  {
    tags: ['similar-destinations'],
    revalidate: 3600,
  },
)
