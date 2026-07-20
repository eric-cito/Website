import HeroSection from '../../components/home/HeroSection'
import PulseDivider from '../../components/home/PulseDivider'
import ExperienceSection from '../../components/home/ExperienceSection'
import ProjectsSection from '../../components/home/ProjectsSection'

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <PulseDivider />
      <ExperienceSection />
      <PulseDivider />
      <ProjectsSection />
    </div>
  )
}
