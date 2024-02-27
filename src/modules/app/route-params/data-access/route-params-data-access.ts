'use server'

import { createServerErrorResponse, createServerSuccessResponse } from 'modules/shared/data-access/server-response'
import { unstable_cache } from 'next/cache'
import 'server-only'

type DestinationParamsDto = {
  destinationSlug: string
}

type Slug = Array<string>

export const getDestinationRouteParams = unstable_cache(
  async (slug: Slug) => {
    try {
      if (slug[0] === '/') {
        slug.shift()
      }
      const decodedPrismaSlug = decodeURI('/' + slug.join('/'))
      //const splitDecodedPrismaSlug = decodedPrismaSlug.split('?')
      //const prismaSlug = splitDecodedPrismaSlug[0].replaceAll('.prefetch', '')

      return createServerSuccessResponse<DestinationParamsDto>({ destinationSlug: decodedPrismaSlug })
    } catch (error) {
      return createServerErrorResponse<DestinationParamsDto>(error)
    }
  },
  ['destination-page-params'],
  {
    revalidate: 864000,
  },
)
