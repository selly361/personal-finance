import * as React from 'react'

function BillPaidIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill='none' height={14} width={14} {...props}>
      <path
        d='M7 .5A6.5 6.5 0 1013.5 7 6.507 6.507 0 007 .5zm2.854 5.354l-3.5 3.5a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 11.708-.708L6 8.293l3.146-3.147a.5.5 0 11.708.708z'
        fill='#277c78'
      />
    </svg>
  )
}

export default BillPaidIcon
