import * as React from 'react'

function BillDueIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill='none' height={14} width={14} {...props}>
      <path
        d='M7 .5A6.5 6.5 0 1013.5 7 6.507 6.507 0 007 .5zM6.5 4a.5.5 0 111 0v3.5a.5.5 0 11-1 0zm.5 6.5A.75.75 0 117 9a.75.75 0 010 1.5z'
        fill='#c94736'
      />
    </svg>
  )
}

export default BillDueIcon
