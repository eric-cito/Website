export interface SkillGroup {
  group: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    group: 'Languages & Machine Learning',
    items: ['Python', 'PyTorch', 'TensorFlow', 'NumPy', 'Pandas', 'C / C++', 'Java', 'MATLAB', 'R'],
  },
  {
    group: 'Medical Imaging & Signals',
    items: ['MRI / fMRI', 'QSM', 'DICOM', 'SimpleITK', 'ITK-SNAP', 'NeuroDSP', 'EMG / LFP', 'Signal Processing'],
  },
  {
    group: 'Systems & Tooling',
    items: ['Linux / UNIX', 'Bash', 'Git', 'Containers', 'Raspberry Pi', 'LaTeX'],
  },
  {
    group: 'Clinical & Research',
    items: ['PACS', 'APeX', 'MRI Safety', 'Human Subjects Protection'],
  },
]
