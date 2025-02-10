import * as React from 'react'

function PotsNavIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill='none' height={22} width={18} {...props}>
      <path
        d='M14.25 3.336V1.76a1.5 1.5 0 00-1.5-1.5h-7.5a1.5 1.5 0 00-1.5 1.5v1.576a3.755 3.755 0 00-3 3.674v10.5a3.75 3.75 0 003.75 3.75h9a3.75 3.75 0 003.75-3.75V7.01a3.755 3.755 0 00-3-3.674zm-6-1.576h1.5v1.5h-1.5zm-3 0h1.5v1.5h-1.5zm4.5 14.25v.75a.75.75 0 11-1.5 0v-.75H7.5a.75.75 0 110-1.5h2.25a.75.75 0 100-1.5h-1.5a2.25 2.25 0 110-4.5v-.75a.75.75 0 011.5 0v.75h.75a.75.75 0 110 1.5H8.25a.75.75 0 100 1.5h1.5a2.25 2.25 0 010 4.5zm3-12.75h-1.5v-1.5h1.5z'
        fill='#b3b3b3'
      />
    </svg>
  )
}

export default PotsNavIcon
