export interface NodeDetail {
  description: string
  longDescription?: string
  /** Optional hero/cover image path (under public/, e.g. /images/foo.jpg) */
  image?: string
  links?: { label: string; url: string }[]
  date?: string
  skills?: string[]
}

export interface GraphNode {
  id: string
  title: string
  shortDescription: string
  type: 'project' | 'experience'
  tags: string[]
  href: string
  detail: NodeDetail
}

export interface GraphLink {
  source: string
  target: string
}

export const nodes: GraphNode[] = [
  {
    id: 'ncaa-tennis',
    title: 'NCAA Division 1 Athlete',
    shortDescription: 'Team Captain, Men\'s Tennis',
    type: 'project',
    tags: ['Leadership', 'Time Management', 'Teamwork'],
    href: '/project/ncaa-tennis',
    detail: {
      description: 'NCAA Division 1 Men\'s Tennis Student-Athlete at UC San Diego.',
      longDescription: 'Voted Team Captain for the 2021-2022 and 2022-2023 seasons. Organized captain practices and communication between team and coaches. Selected for Triton Athlete Council - Student-Athlete Advisory Committee, working with the athletic department to enhance the student athlete experience.',
      date: 'Sept 2020 – Mar 2023',
      image: '/images/ncaa-tennis.jpg',
      skills: ['Leadership', 'Teamwork', 'Time Management'],
      links: [{ label: 'ucsdtritons.com', url: 'https://ucsdtritons.com/sports/mens-tennis/roster/eric-cito/12844' }],
    },
  },
  {
    id: 'neurotech-prosthetics',
    title: 'NeuroTech Club - Prosthetics',
    shortDescription: 'BCI & robotic arm control',
    type: 'project',
    tags: ['Machine Learning', 'Engineering', 'Teamwork'],
    href: '/project/neurotech-prosthetics',
    detail: {
      description: 'Triton NeuroTech: built a robotic arm using Arduino with EMG and neural networks for control.',
      longDescription: 'Collaborated in a team to build a robotic arm using Arduino, integrating Electromyography (EMG) readings and implementing neural networks to filter and interpret brain signals for control. Successfully implemented a prototype. Coordinated events to enhance publicity of Brain-Computer Interfaces (BCI) to the public and students.',
      date: 'Sep 2022 – June 2023',
      image: '/images/neurotech-prosthetics.jpg',
      skills: ['Arduino', 'EMG', 'Neural Networks', 'BCI'],
      links: [{ label: 'neurotech.ucsd.edu', url: 'https://neurotech.ucsd.edu' }],
    },
  },
  {
    id: 'donkey-car',
    title: 'Self-Driving RC Car',
    shortDescription: 'AI autopilot for small-scale cars',
    type: 'project',
    tags: ['Machine Learning', 'Computer Vision', 'Linux'],
    href: '/project/donkey-car',
    detail: {
      description: 'Open-source self-driving platform for small-scale remote-controlled cars.',
      longDescription: 'Configured Raspberry Pi to gather operational data from steering, throttle, and camera for model training, adapting from the Donkey Car platform. Deployed model on Raspberry Pi for real-time autopilot. Raced in events and placed as high as second out of 26 teams.',
      date: 'Sep 2019 – June 2020',
      image: '/images/donkey-car.jpg',
      skills: ['Python', 'Raspberry Pi', 'Computer Vision', 'ML'],
      links: [{ label: 'donkeycar.com', url: 'https://www.donkeycar.com' }],
    },
  },
  {
    id: 'fortune-website',
    title: 'Fortune Telling Website',
    shortDescription: 'JavaScript & UI/UX project',
    type: 'project',
    tags: ['JavaScript', 'HTML', 'CSS', 'UI/UX'],
    href: '/project/fortune-website',
    detail: {
      description: 'A fortune telling website built with JavaScript, HTML, and CSS.',
      longDescription: 'Collaborative web project showcasing front-end skills and creative UI/UX design for an interactive fortune telling experience.',
      image: '/images/fortune-website.jpg',
      skills: ['JavaScript', 'HTML', 'CSS', 'UI/UX'],
      links: [{ label: 'View project', url: 'https://cse110-sp23-group26.github.io' }],
    },
  },
  {
    id: 'first-robotics',
    title: 'FIRST Robotics',
    shortDescription: 'FLL & FTC, computer vision',
    type: 'project',
    tags: ['Engineering', 'Teamwork', 'Computer Vision', 'C'],
    href: '/project/first-robotics',
    detail: {
      description: 'Competed in FIRST Lego League and FIRST Tech Challenge from elementary through high school.',
      longDescription: 'Implemented computer vision techniques for autonomous ball shooting and navigation on the competition field. Used 3D printing and CAD for robotic parts. Volunteered 50+ hours showcasing robotics to elementary schools to inspire future STEM generations.',
      date: 'Sep 2008 – June 2019',
      image: '/images/first-robotics.jpg',
      skills: ['Computer Vision', 'C', 'CAD', '3D Printing'],
      links: [{ label: 'teaminspiration.global', url: 'https://www.teaminspiration.global' }],
    },
  },
  {
    id: 'ucsf-lab',
    title: 'UCSF Neuromodulation Lab',
    shortDescription: 'QSM & DBS imaging pipeline',
    type: 'experience',
    tags: ['Research', 'Machine Learning', 'Neuro'],
    href: '/project/ucsf-lab',
    detail: {
      description: 'Advancing neuromodulation therapies using brain MRI and deep learning.',
      longDescription: 'Co-developing a modular Quantitative Susceptibility Mapping (QSM) pipeline for Deep Brain Stimulation (DBS) surgical planning. Co-developing a 2D U-Net model to segment implanted DBS electrodes. Collaborating with MRI technicians on acquisition and protocol verification. Findings to be presented at ISMRM 2026.',
      date: 'July 2025 – Present',
      skills: ['Python', 'PyTorch', 'QSM', 'DICOM', 'MRI'],
      links: [{ label: 'morrisonlab.ucsf.edu', url: 'https://morrisonlab.ucsf.edu' }],
    },
  },
  {
    id: 'salk-lab',
    title: 'Salk Computational Neurobiology',
    shortDescription: 'Deep Isolation Forest, fMRI',
    type: 'experience',
    tags: ['Research', 'Machine Learning', 'Neuro'],
    href: '/project/salk-lab',
    detail: {
      description: 'ML and resting-state fMRI for neuropsychiatric diagnostics.',
      longDescription: 'Developed quantitative diagnostic metrics using machine learning on resting-state fMRI from the ABCD Study (12,000 participants). Designed an outlier analysis pipeline using Deep Isolation Forest (DIF). Identified sources of data variability including regional hotspots, MRI vendor discrepancies, and framewise displacement. Presented at IEEE Brain Discovery, CAMP Symposium, and UC San Diego Summer Research Conference.',
      date: 'Nov 2023 – May 2025',
      skills: ['Python', 'PyTorch', 'fMRI', 'Outlier Detection'],
      links: [],
    },
  },
  {
    id: 'ucsd-systems-neuro',
    title: 'UCSD Systems Neuroscience Lab',
    shortDescription: 'Hippocampal LFP & spatial memory',
    type: 'experience',
    tags: ['Research', 'Neuro', 'Signal Processing'],
    href: '/project/ucsd-systems-neuro',
    detail: {
      description: 'Spatial memory and hippocampal network dynamics.',
      longDescription: 'Analyzed local field potential (LFP) recordings from hippocampal CA1 neurons in rats during maze-navigation tasks. Applied signal-processing and filtering to isolate burst oscillations. Contributed to research on functional dynamics of hippocampal networks and how humans perceive and mentally map space.',
      date: 'Aug 2021 – Dec 2021',
      skills: ['MATLAB', 'Signal Processing', 'LFP'],
      links: [],
    },
  },
  {
    id: 'triton-neurotech',
    title: 'Triton NeuroTech',
    shortDescription: 'Student Software Engineer, BCI',
    type: 'experience',
    tags: ['Engineering', 'Neuro', 'Teamwork'],
    href: '/project/triton-neurotech',
    detail: {
      description: 'Robotic arm control via EMG and neural networks.',
      longDescription: 'Same initiative as NeuroTech Club - Prosthetics project: built robotic arm with Arduino, EMG, and neural networks. Coordinated events for BCI publicity. This node represents the formal role; the project node represents the technical deliverable.',
      date: 'Sep 2022 – June 2023',
      skills: ['Arduino', 'EMG', 'Neural Networks'],
      links: [{ label: 'neurotech.ucsd.edu', url: 'https://neurotech.ucsd.edu' }],
    },
  },
  {
    id: 'weill-cornell',
    title: 'Weill Cornell / MSK Lewis Lab',
    shortDescription: 'Radiotracers & antibody imaging',
    type: 'experience',
    tags: ['Research', 'Engineering'],
    href: '/project/weill-cornell',
    detail: {
      description: 'HER2-targeting antibodies and molecular imaging for cancer.',
      longDescription: 'Conducted research on HER2-targeting antibodies, studying how bioconjugation levels affect radiotracer synthesis and immunoreactivity. Synthesized immunoconjugates, purified via size-exclusion chromatography, and quantified DFO-to-antibody ratios. Found immunoreactivity stable with 60-fold DFO excess while association rate decreased. First Place at Weill Cornell Medicine Catalyst Program Poster Session.',
      date: 'June 2018 – Sep 2018',
      skills: ['Lab Techniques', 'Chromatography', 'Bioconjugation'],
      links: [{ label: 'Catalyst Program poster (PDF)', url: '/Poster_ECS_Sai_Fixed.pdf' }],
    },
  },
]

export const links: GraphLink[] = [
  { source: 'neurotech-prosthetics', target: 'triton-neurotech' },
  { source: 'neurotech-prosthetics', target: 'ucsf-lab' },
  { source: 'neurotech-prosthetics', target: 'salk-lab' },
  { source: 'ucsf-lab', target: 'salk-lab' },
  { source: 'ucsf-lab', target: 'ucsd-systems-neuro' },
  { source: 'salk-lab', target: 'ucsd-systems-neuro' },
  { source: 'donkey-car', target: 'first-robotics' },
  { source: 'donkey-car', target: 'salk-lab' },
  { source: 'ncaa-tennis', target: 'triton-neurotech' },
  { source: 'first-robotics', target: 'triton-neurotech' },
  { source: 'fortune-website', target: 'donkey-car' },
  { source: 'weill-cornell', target: 'ucsf-lab' },
]

function toForceGraphNodes(): Array<{ id: string; [key: string]: unknown }> {
  return nodes.map((n) => ({ ...n, id: n.id, name: n.title }))
}

function toForceGraphLinks(): Array<{ source: string; target: string }> {
  return links.map((l) => ({ source: l.source, target: l.target }))
}

export const graphData = {
  nodes: toForceGraphNodes(),
  links: toForceGraphLinks(),
}

export function getNodeById(id: string): GraphNode | undefined {
  return nodes.find((n) => n.id === id)
}
