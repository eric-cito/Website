export interface NodeDetail {
  description: string
  longDescription?: string
  /** Optional hero/cover image path (under public/, e.g. /images/foo.jpg) */
  image?: string
  links?: { label: string; url: string }[]
  date?: string
  skills?: string[]
  /** Conferences, symposia, or poster sessions where this work was presented */
  conferences?: string[]
}

export interface PortfolioNode {
  id: string
  title: string
  shortDescription: string
  type: 'project' | 'experience'
  tags: string[]
  href: string
  detail: NodeDetail
}

// Experience first (reverse-chronological), then projects (most technical first).
// Section order on the homepage follows this array order.
export const nodes: PortfolioNode[] = [
  {
    id: 'ucsf-lab',
    title: 'UCSF Neuromodulation Imaging Lab',
    shortDescription: 'Deep learning segmentation & quantitative MRI pipelines',
    type: 'experience',
    tags: ['Deep Learning', 'Medical Imaging', 'Python', 'PyTorch'],
    href: '/project/ucsf-lab',
    detail: {
      description: 'Deep learning segmentation and quantitative MRI reconstruction pipelines for surgical planning.',
      longDescription: 'Co-developing a 2D U-Net model that automatically segments implanted DBS electrodes from postoperative CT, and a modular Quantitative Susceptibility Mapping (QSM) reconstruction pipeline used for surgical targeting. Work spans the full pipeline: DICOM ingestion, preprocessing, model training and evaluation, and packaging the result into something clinicians can actually run. Collaborating with MRI technicians on acquisition and protocol verification. Two abstracts submitted to ISMRM 2026.',
      date: 'July 2025 – Present',
      skills: ['Python', 'PyTorch', 'U-Net', 'QSM', 'DICOM', 'SimpleITK'],
      conferences: ['ISMRM 2026', 'MDS Congress 2026', 'UCSF Research AI Day', 'UCSF PROPEL Symposium'],
      links: [{ label: 'morrisonlab.ucsf.edu', url: 'https://morrisonlab.ucsf.edu' }],
    },
  },
  {
    id: 'salk-lab',
    title: 'Salk Computational Neurobiology Lab',
    shortDescription: 'Anomaly detection across a 12,000-participant dataset',
    type: 'experience',
    tags: ['Machine Learning', 'Anomaly Detection', 'Data Pipelines', 'Python'],
    href: '/project/salk-lab',
    detail: {
      description: 'Anomaly detection and quality-control metrics over a 12,000-participant neuroimaging dataset.',
      longDescription: 'Built an outlier detection pipeline using Deep Isolation Forest (DIF) over resting-state fMRI from the ABCD Study, covering 12,000 participants. Developed quantitative diagnostic metrics and traced sources of variability across the dataset — regional hotspots, scanner-vendor discrepancies, and framewise displacement — turning a noisy multi-site dataset into something models could be trusted on. Presented at IEEE Brain Discovery, the CAMP Symposium, and the UC San Diego Summer Research Conference.',
      date: 'Nov 2023 – May 2025',
      skills: ['Python', 'PyTorch', 'Deep Isolation Forest', 'fMRI', 'Statistics'],
      conferences: ['IEEE Brain Discovery', 'CAMP Symposium', 'UC San Diego Summer Research Conference'],
      links: [],
    },
  },
  {
    id: 'ucsd-systems-neuro',
    title: 'UCSD Systems Neuroscience Lab',
    shortDescription: 'Time-series signal processing on neural recordings',
    type: 'experience',
    tags: ['Signal Processing', 'Time Series', 'MATLAB'],
    href: '/project/ucsd-systems-neuro',
    detail: {
      description: 'Spectral analysis and filtering of electrophysiology time-series data.',
      longDescription: 'Analyzed local field potential (LFP) recordings from hippocampal CA1 neurons during maze-navigation tasks. Applied digital filtering and spectral methods to isolate burst oscillations from noisy continuous recordings, supporting research into the functional dynamics of hippocampal networks and how spatial maps are formed.',
      date: 'Aug 2021 – Dec 2021',
      skills: ['MATLAB', 'Signal Processing', 'Spectral Analysis', 'LFP'],
      links: [],
    },
  },
  {
    id: 'triton-neurotech',
    title: 'Triton NeuroTech',
    shortDescription: 'Software Engineer — brain-computer interfaces',
    type: 'experience',
    tags: ['Neurotechnology', 'Neural Networks', 'Embedded Systems'],
    href: '/project/triton-neurotech',
    detail: {
      description: 'Real-time neural signal classification driving a robotic prosthetic arm.',
      longDescription: 'Student software engineer on the prosthetics team: built the signal processing and neural network layer that turns raw EMG readings into real-time control commands for a robotic arm, deployed on Arduino. Also coordinated outreach events introducing brain-computer interfaces to students and the public.',
      date: 'Sep 2022 – June 2023',
      skills: ['Python', 'Neural Networks', 'EMG', 'Arduino'],
      links: [{ label: 'neurotech.ucsd.edu', url: 'https://neurotech.ucsd.edu' }],
    },
  },
  {
    id: 'weill-cornell',
    title: 'Weill Cornell / Memorial Sloan Kettering Lewis Lab',
    shortDescription: 'Quantitative assays for targeted cancer therapeutics',
    type: 'experience',
    tags: ['Biotech', 'Assay Development', 'Analytical Chemistry'],
    href: '/project/weill-cornell',
    detail: {
      description: 'Quantitative bioconjugation and binding assays for targeted cancer imaging agents.',
      longDescription: 'Studied how bioconjugation levels affect radiotracer synthesis and immunoreactivity in HER2-targeting antibodies. Synthesized immunoconjugates, purified them via size-exclusion chromatography, and quantified DFO-to-antibody ratios. Found immunoreactivity held stable at 60-fold DFO excess while the association rate decreased — a usable ceiling for conjugation. First Place at the Weill Cornell Medicine Catalyst Program Poster Session.',
      date: 'June 2018 – Sep 2018',
      skills: ['Bioconjugation', 'Chromatography', 'Radiochemistry', 'Assay Design'],
      conferences: ['Weill Cornell Medicine Catalyst Program Poster Session'],
      links: [{ label: 'Catalyst Program poster (PDF)', url: '/Poster_ECS_Sai_Fixed.pdf' }],
    },
  },
  {
    id: 'dbs-electrode-segmentation',
    title: 'DBS Electrode Segmentation',
    shortDescription: 'A 2D U-Net that automatically segments implanted DBS electrodes from postoperative CT',
    type: 'project',
    tags: ['Deep Learning', 'Medical Imaging', 'PyTorch', 'U-Net'],
    href: '/project/dbs-electrode-segmentation',
    detail: {
      description: 'A 2D U-Net model that automatically segments implanted DBS electrodes from postoperative CT.',
      longDescription: 'Co-developed a 2D U-Net that segments implanted DBS electrodes directly from postoperative CT, replacing manual electrode localization with an automated pipeline covering DICOM ingestion, preprocessing, and model training and evaluation. Built to run in a form clinicians can actually use for surgical planning, developed alongside MRI technicians on acquisition and protocol verification.',
      date: 'July 2025 – Present',
      skills: ['Python', 'PyTorch', 'U-Net', 'DICOM', 'SimpleITK'],
      links: [{ label: 'morrisonlab.ucsf.edu', url: 'https://morrisonlab.ucsf.edu' }],
    },
  },
  {
    id: 'qsm-reconstruction-pipeline',
    title: 'QSM Reconstruction Pipeline',
    shortDescription: 'A modular Quantitative Susceptibility Mapping pipeline for DBS surgical targeting',
    type: 'project',
    tags: ['Medical Imaging', 'QSM', 'Python', 'MRI'],
    href: '/project/qsm-reconstruction-pipeline',
    detail: {
      description: 'A modular Quantitative Susceptibility Mapping (QSM) reconstruction pipeline used for surgical targeting.',
      longDescription: 'Built a modular QSM reconstruction pipeline used for DBS surgical targeting, spanning DICOM ingestion, preprocessing, and reconstruction, packaged so clinicians can run it directly. Developed alongside MRI technicians to verify acquisition and protocol.',
      date: 'July 2025 – Present',
      skills: ['Python', 'QSM', 'DICOM', 'SimpleITK'],
      links: [{ label: 'morrisonlab.ucsf.edu', url: 'https://morrisonlab.ucsf.edu' }],
    },
  },
  {
    id: 'neurotech-prosthetics',
    title: 'EMG-Controlled Robotic Arm',
    shortDescription: 'Neural networks decoding muscle signals into real-time control',
    type: 'project',
    tags: ['Neurotechnology', 'Neural Networks', 'Signal Processing', 'Arduino'],
    href: '/project/neurotech-prosthetics',
    detail: {
      description: 'A robotic prosthetic arm driven by neural networks decoding EMG signals.',
      longDescription: 'Built a robotic arm on Arduino that responds to Electromyography (EMG) readings in real time. Implemented the filtering stage to clean noisy muscle signals and trained neural networks to interpret them as control commands, delivering a working prototype. Also coordinated events promoting brain-computer interfaces to students and the public.',
      date: 'Sep 2022 – June 2023',
      image: '/images/neurotech-prosthetics.jpg',
      skills: ['Python', 'Neural Networks', 'EMG', 'Signal Processing', 'Arduino'],
      links: [{ label: 'neurotech.ucsd.edu', url: 'https://neurotech.ucsd.edu' }],
    },
  },
  {
    id: 'donkey-car',
    title: 'Self-Driving RC Car',
    shortDescription: 'End-to-end vision autopilot deployed on embedded hardware',
    type: 'project',
    tags: ['Computer Vision', 'Deep Learning', 'Python', 'Edge Deployment'],
    href: '/project/donkey-car',
    detail: {
      description: 'An end-to-end computer vision autopilot running in real time on a Raspberry Pi.',
      longDescription: 'Built the full loop: instrumented a Raspberry Pi to collect steering, throttle, and camera data, trained a vision model on that data, then deployed it back to the Pi for real-time autonomous driving — a complete data-collection-to-edge-inference pipeline. Adapted from the Donkey Car platform. Raced competitively and placed as high as second out of 26 teams.',
      date: 'Sep 2019 – June 2020',
      image: '/images/donkey-car.jpg',
      skills: ['Python', 'Computer Vision', 'Deep Learning', 'Raspberry Pi', 'Linux'],
      links: [{ label: 'donkeycar.com', url: 'https://www.donkeycar.com' }],
    },
  },
  {
    id: 'first-robotics',
    title: 'FIRST Robotics',
    shortDescription: 'Autonomous targeting and navigation with computer vision',
    type: 'project',
    tags: ['Computer Vision', 'Robotics', 'C++'],
    href: '/project/first-robotics',
    detail: {
      description: 'Computer vision for autonomous targeting and field navigation in competitive robotics.',
      longDescription: 'Competed in FIRST Lego League and FIRST Tech Challenge from elementary through high school. Implemented computer vision for autonomous ball targeting and navigation on the competition field, and used CAD and 3D printing to fabricate custom parts. Volunteered 50+ hours introducing robotics to elementary school students.',
      date: 'Sep 2008 – June 2019',
      image: '/images/first-robotics.jpg',
      skills: ['C++', 'Computer Vision', 'CAD', '3D Printing'],
      links: [{ label: 'teaminspiration.global', url: 'https://www.teaminspiration.global' }],
    },
  },
  {
    id: 'weill-cornell-poster',
    title: 'Weill Cornell Catalyst Poster',
    shortDescription: 'HER2 immunoconjugate poster — First Place, Weill Cornell Catalyst Program',
    type: 'project',
    tags: ['Biotech', 'Assay Development', 'Analytical Chemistry'],
    href: '/project/weill-cornell-poster',
    detail: {
      description: 'Quantitative bioconjugation and binding assays for targeted cancer imaging agents.',
      longDescription: 'Studied how bioconjugation levels affect radiotracer synthesis and immunoreactivity in HER2-targeting antibodies. Synthesized immunoconjugates, purified them via size-exclusion chromatography, and quantified DFO-to-antibody ratios. Found immunoreactivity held stable at 60-fold DFO excess while the association rate decreased — a usable ceiling for conjugation. First Place at the Weill Cornell Medicine Catalyst Program Poster Session.',
      date: 'June 2018 – Sep 2018',
      image: '/images/weill-cornell-poster.jpg',
      skills: ['Bioconjugation', 'Chromatography', 'Radiochemistry', 'Assay Design'],
      conferences: ['Weill Cornell Medicine Catalyst Program Poster Session'],
      links: [{ label: 'Catalyst Program poster (PDF)', url: '/Poster_ECS_Sai_Fixed.pdf' }],
    },
  },
  {
    id: 'ncaa-tennis',
    title: 'NCAA Division 1 Athlete',
    shortDescription: 'Team Captain, Men\'s Tennis at UC San Diego',
    type: 'project',
    tags: ['Leadership', 'Teamwork'],
    href: '/project/ncaa-tennis',
    detail: {
      description: 'NCAA Division 1 Men\'s Tennis Student-Athlete and two-season Team Captain.',
      longDescription: 'Voted Team Captain for the 2021-2022 and 2022-2023 seasons. Organized captain practices and served as the communication channel between team and coaches. Selected for the Triton Athlete Council - Student-Athlete Advisory Committee, working with the athletic department to improve the student-athlete experience — all while carrying a full engineering course load and research schedule.',
      date: 'Sept 2020 – Mar 2023',
      image: '/images/ncaa-tennis.jpg',
      skills: ['Leadership', 'Teamwork', 'Time Management'],
      links: [{ label: 'ucsdtritons.com', url: 'https://ucsdtritons.com/sports/mens-tennis/roster/eric-cito/12844' }],
    },
  },
]

export const experienceNodes = nodes.filter((n) => n.type === 'experience')
export const projectNodes = nodes.filter((n) => n.type === 'project')

export function getNodeById(id: string): PortfolioNode | undefined {
  return nodes.find((n) => n.id === id)
}
