import Hero from '../../components/home/Hero'
import NeuronGraph from '../../components/graph/NeuronGraph'

export default function HomePage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <Hero />
      <div className="flex-1 relative min-h-0 w-full">
        <NeuronGraph />
      </div>
    </div>
  )
}
