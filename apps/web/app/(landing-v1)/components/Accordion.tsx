import { ReactNode } from 'react'

let randId = 0

export function AccordionItem({
  label,
  initiallyOpen = false,
  children,
}: {
  label: string
  initiallyOpen?: boolean
  children: string | ReactNode
}) {
  const id = `cb${++randId}`
  return (
    <div className="accordion">
      <input
        type="checkbox"
        name={`accordion-${id}`}
        id={id}
        defaultChecked={initiallyOpen}
      />
      <label
        htmlFor={id}
        className="accordion__label text-text-primary font-prime flex flex-row text-xl"
      >
        <span className="inline-flex flex-1">{label}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="accordion__chevron mr-2 inline-block"
        >
          <path
            d="M19 9L12 16L5 9"
            stroke="#F4F5EF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </label>
      <div className="accordion__content pt-7">
        {typeof children === 'string' ? (
          <p className="text-text-primary font-prime text-lg">{children}</p>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
