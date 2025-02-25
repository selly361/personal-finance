import { Metadata } from 'next/types'
import NewPotModal from './_components/NewPotModal'
import { Fragment } from 'react'

export const metadata = {
  title: 'Pots',
  description: 'Save and organize money for different goals.',
} as Metadata

async function Page() {
  return (
    <Fragment>
      <section className='w-full flex justify-between items-center'>
        <h1>Pots</h1>
        <NewPotModal />
      </section>
    </Fragment>
  )
}

export default Page
