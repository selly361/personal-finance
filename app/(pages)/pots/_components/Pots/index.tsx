import PotCard from './PotCard'
import { getPotsWithDetails } from '@/actions'

const Pots = async () => {
  const pots = await getPotsWithDetails()

  return (
    <div className='w-full flex flex-wrap gap-6 justify-between'>
      {pots.map((pot) => (
        <PotCard key={pot.id} {...pot} />
      ))}
    </div>
  )
}

export default Pots
