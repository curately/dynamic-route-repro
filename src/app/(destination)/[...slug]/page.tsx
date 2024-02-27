import { DestinationTemplate } from '@/destination/templates/destination-template'
import { getDestinationRouteParams } from '@/route-params/data-access/route-params-data-access'
import { ErrorList } from 'modules/shared/ui/error-list'
import { notFound } from 'next/navigation'

type Props = {
  params: { slug: Array<string> }
}
export async function generateStaticParams() {
  const routes = [
    {
      slug: ['/brighton'],
    },
  ]
  return routes.map(route => route.slug)
}
export default async function DestinationPage({ params }: Props) {
  const { data, errors } = await getDestinationRouteParams(params.slug)
  if (errors) {
    return <ErrorList errors={errors} />
  }
  if (!data) {
    notFound()
  }

  const { destinationSlug } = data

  return <DestinationTemplate prismaSlug={destinationSlug} />
}
