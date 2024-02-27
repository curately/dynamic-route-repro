import { ServerError } from 'modules/shared/data-access/server-response'

type ErrorListProps = {
  errors: Array<ServerError>
  className?: string
  props?: React.HTMLProps<HTMLDivElement>
}

export function ErrorList({ errors, props, className = '' }: ErrorListProps) {
  return (
    <div className="flex flex-col" {...props}>
      {errors.map(error => (
        <p key={error.message} className="mb-2 text-sm text-red-600">
          {error.message}
        </p>
      ))}
    </div>
  )
}
