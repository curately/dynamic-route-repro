import { getDestination } from '@/destination/similar-destinations/data-access/similar-destinations-data-access'
import { SimilarDestinations } from '@/destination/similar-destinations/ui/similar-destinations'
import { ErrorList } from 'modules/shared/ui/error-list'

type Props = {
  prismaSlug: string
}
export async function DestinationTemplate({ prismaSlug }: Props) {
  const { data: destination, errors } = await getDestination(prismaSlug)
  if (errors) {
    return <ErrorList errors={errors} />
  }
  if (!destination) {
    return <div>No destination found</div>
  }

  return <SimilarDestinations />
}
