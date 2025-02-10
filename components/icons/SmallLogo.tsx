import * as React from 'react'

function SmallLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill='none' height={22} width={14} {...props}>
      <path
        d='M8.952 21.44H2.936v-11.2H.76V5.312h2.304C3.704 2.272 6.68 0 11.96 0h1.28v4.288H11c-1.664 0-2.464.16-2.432 1.024h4.672v4.928H8.952z'
        fill='#fff'
      />
    </svg>
  )
}

export default SmallLogo
