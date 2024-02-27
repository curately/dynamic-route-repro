import Link from 'next/link'
import { Navigation as NavigationIcon } from 'react-feather'

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
export async function SimilarDestinations() {
  return (
    <ul>
      {testDestinations.map((destination, index) => {
        return (
          <li key={index} className="text-2xl">
            <Link href={destination.slug}>{destination.name}</Link>
            <ul>
              {destination.similarDestinations.map((similarDestination, index) => {
                return (
                  <li key={index} className="pl-4 text-base">
                    <Link href={similarDestination.slug}>{similarDestination.name}</Link>
                  </li>
                )
              })}
            </ul>
          </li>
        )
      })}
    </ul>
  )
}
