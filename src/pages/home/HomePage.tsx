import Hero from '../../components/home/Hero'
import NeuronGraph from '../../components/graph/NeuronGraph'

export default function HomePage() {
  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] min-h-0">
      <Hero />
      <div className="flex-1 relative min-h-0 w-full flex justify-center items-center">
        <NeuronGraph />
      </div>
    </div>
  )
}
