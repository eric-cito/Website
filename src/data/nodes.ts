export interface NodeDetail {
  description: string
  longDescription?: string
  /** Optional hero/cover image path (under public/, e.g. /images/foo.jpg) */
  image?: string
  /** How the detail page fits the image: 'cover' (default) crops to 16:9, 'contain' shows all of it */
  imageFit?: 'cover' | 'contain'
  /** Optional muted looping video shown in place of the image, which becomes its poster */
  video?: string
  links?: { label: string; url: string }[]
  date?: string
  /** Principal investigator of the lab (experience entries) */
  pi?: string
  skills?: string[]
  /** Conferences, symposia, or poster sessions where this work was presented */
  conferences?: string[]
  /** Extra photos shown on the detail page, after the description */
  gallery?: { src: string; alt: string }[]
  /** Small print shown at the bottom of the detail page */
  footnote?: string
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
      description: 'Advancing neuromodulation therapies for patients with neurological conditions by extracting quantitative information from brain MRI to study and predict patients’ neural and clinical responses to brain stimulation.',
      longDescription: 'Developing a modular quantitative susceptibility mapping (QSM) imaging pipeline to enhance visualization of deep-brain structures for deep brain stimulation (DBS) surgical planning, and a 2D U-Net deep learning model to automatically segment implanted DBS leads and localize lead placement across brain regions. Investigating longitudinal changes in motor network functional connectivity following pallidal DBS for cervical dystonia, and machine learning-based prediction of DBS outcomes based on whole-brain DBS lead trajectories. Findings presented at the International Congress of Parkinson’s Disease and Movement Disorders 2026, the ISMRM Annual Meeting 2026, the UCSF PROPEL Symposium 2026, and UCSF Research AI Day 2026.',
      date: 'July 2025 – Present',
      pi: 'Melanie A. Morrison, PhD',
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
      longDescription: 'Developed quantitative diagnostic metrics for neuropsychiatric disorders using machine learning and resting-state fMRI data from the Adolescent Brain Cognitive Development (ABCD) Study (12,000 participants), in collaboration with Drs. Margot Wagner and Alessandra Camassa. Designed and implemented an outlier analysis pipeline using Deep Isolation Forest (DIF), a deep-learning–based method for robust outlier detection.',
      date: 'Nov 2023 – May 2025',
      pi: 'Terrence Sejnowski, PhD',
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
      pi: 'Douglas A. Nitz, PhD',
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
      pi: 'Jason S. Lewis, PhD',
      skills: ['Bioconjugation', 'Chromatography', 'Radiochemistry', 'Assay Design'],
      conferences: ['Weill Cornell Medicine Catalyst Program Poster Session'],
      links: [{ label: 'Catalyst Program poster (PDF)', url: '/Poster_ECS_Sai_Fixed.pdf' }],
    },
  },
  {
    id: 'lead-trajectory-outcomes',
    title: 'DBS Lead Trajectories & Clinical Outcomes',
    shortDescription: 'Data-driven relationship between deep brain stimulation lead trajectories and clinical outcomes in Parkinson’s disease.',
    type: 'project',
    tags: ['Machine Learning', 'Medical Imaging', 'Deep Brain Stimulation', 'Python'],
    href: '/project/lead-trajectory-outcomes',
    detail: {
      description: 'Develop and validate a data-driven approach to identify brain regions intersected by leads and associate trajectories with change in Parkinson’s medication requirements and cognitive outcomes after DBS.',
      longDescription: 'The effect of deep brain stimulation (DBS) leads penetrating non-target brain structures en route to the surgical target may contribute to observed variability in patient outcomes. Understanding whether lead trajectory influences clinical response could improve surgical planning and prognostic assessment. We retrospectively studied 100 individuals with Parkinson’s disease with DBS targeting the STN (n=41) or GPi (n=59). A 328-region composite atlas in MNI space combined the Zhang whole-brain atlas, SMILE thalamic/deep grey nuclei atlas, and DKT gray matter cortical atlas. Leads were segmented in ITK-SNAP on postoperative CT (83%) or MRI (17%), and ANTs SyN mapped the atlas into native space. To assess localization robustness, lead masks were shifted (±1–2 mm), dilated (0.5–1.5 mm), and eroded (0.25–0.5 mm) across 25 perturbations; regions present in ≥80% of perturbations were retained. Bootstrapped LASSO selected stable features, and ridge regression estimated outcome effects alongside clinical covariates. Caudate, fronto-occipital fasciculus, and cerebral peduncle intersections were associated with greater medication reduction; caudate intersection with greater memory decline, and other regions with apathy and impulsivity. Trajectory-associated regions explained additional outcome variability beyond DBS target, suggesting that trajectory anatomy may capture outcome-relevant differences in electrode placement. Given limited cognitive data and potential for imaging processing errors, findings remain exploratory. Ongoing work will refine the image processing pipeline and substantially increase the cohort to assess reproducibility.',
      image: '/images/lead-trajectory-outcomes.jpg',
      video: '/videos/lead-trajectory-pipeline.mp4',
      date: 'Oct 2026 – Present',
      skills: ['Python', 'ANTs', 'ITK-SNAP', 'LASSO', 'Ridge Regression', 'Bootstrapping'],
      links: [
        { label: 'ISMRM abstract (PDF)', url: '/Lead_Trajectory_Outcomes_Abstract.pdf' },
        { label: 'morrisonlab.ucsf.edu', url: 'https://morrisonlab.ucsf.edu' },
      ],
    },
  },
  {
    id: 'dbs-electrode-segmentation',
    title: 'DBS Lead Segmentation',
    shortDescription: '2D U-Net segmentation of multi-target deep brain stimulation lead trajectories on postoperative imaging. Manuscript in review; to be released as a 3D Slicer extension for public use.',
    type: 'project',
    tags: ['Deep Learning', 'Medical Imaging', 'PyTorch', 'U-Net'],
    href: '/project/dbs-electrode-segmentation',
    detail: {
      description: 'Develop an automated, open-source tool for accurate lead segmentation from postoperative CT and MRI.',
      longDescription: 'Response to deep brain stimulation (DBS) may depend on the entire lead trajectory, not just electrode contact locations. To understand this relationship, a robust lead segmentation tool is needed. No reliable open-source tools exist to segment deep brain stimulation lead trajectories. Leveraging deep learning to achieve fast yet reliable segmentation, our tool can be applied widely to inform surgical targeting strategies and to better understand variance in clinical outcomes. Postoperative CT volumes were collected for 124 patients with movement disorders and DBS targeting the basal ganglia, thalamus, or cerebellum. Ground truth annotations were generated in ITK-SNAP through meticulous, multi-rater manual segmentation. Each 3D CT volume was processed slice-wise (with z-score normalization) to generate 2D training samples (512×512 pixels), and lead slices were oversampled in the training set to address the class imbalance. A 2D U-Net convolutional neural network was implemented using PyTorch and trained on an NVIDIA A100 high-performance GPU cluster, using a combination of Weighted Dice Loss (30%), Focal Loss (30%), and Binary Cross Entropy (40%). On the test set (n=20), average slice- and volume-based Dice scores were 0.78±0.001 and 0.80±0.067 with minimal false negatives and positives. The model showed promising results for segmenting leads from postoperative MRI images. CT-to-MRI transfer learning will enable robust MRI-based segmentation. The model has since been trained and tested on 200 patients.',
      image: '/images/dbs-electrode-segmentation.jpg',
      video: '/videos/dbs-electrode-segmentation.mp4',
      date: 'July 2025 – Present',
      skills: ['Python', 'PyTorch', 'U-Net', 'ITK-SNAP', 'HD-BET', 'Medical Image Segmentation'],
      conferences: ['ISMRM 2026', 'UCSF Research AI Day'],
      links: [
        {
          label: 'ISMRM 2026 abstract',
          url: 'https://echo.ismrm.org/abstracts/view/5317a3c4-9494-4a49-bf54-841fe6cece57',
        },
        { label: 'ISMRM 2026 abstract (PDF)', url: '/ISMRM2026_Seg_Abstract.pdf' },
        { label: 'UCSF Research AI Day poster (PDF)', url: '/UCSF_Research_AI_Day_Poster.pdf' },
        { label: 'morrisonlab.ucsf.edu', url: 'https://morrisonlab.ucsf.edu' },
      ],
    },
  },
  {
    id: 'qsm-reconstruction-pipeline',
    title: 'QSM Reconstruction Pipeline for DBS Neurosurgical Planning',
    shortDescription: 'Modular framework for automated QSM integration into deep brain stimulation neurosurgical planning systems. Manuscript in review; to be released on GitHub for public use.',
    type: 'project',
    tags: ['Medical Imaging', 'QSM', 'Python', 'MRI'],
    href: '/project/qsm-reconstruction-pipeline',
    detail: {
      description: 'Make QSM accessible for neurosurgical planning by developing software that overcomes processing and compatibility barriers.',
      longDescription: 'Precise lead placement is critical for effective deep brain stimulation and depends on preoperative imaging quality. Quantitative susceptibility mapping (QSM) improves target visualization, but clinical adoption remains limited. Major scanner manufacturers lack routine on-scanner QSM processing capabilities, and QSM images are typically output in NIfTI rather than DICOM formats, rendering them incompatible with clinical PACS for straightforward access in surgical planning software. We developed an end-to-end MRI framework made up of (1) Input, (2) Processing, (3) DICOM Generation, and (4) Output stages. This modular set up allows any stage to be replaced, depending on user needs and institutional IT infrastructure. The framework retrieves DICOMs from clinical PACS, performs brain extraction with HD-BET, produces the QSM image with the QSMxT pipeline, and registers it to an FGATIR anatomical reference using ANTs. A custom executable converts the FGATIR-aligned QSM image into orientation-safe DICOM files compatible with both Medtronic’s StealthStation and Brainlab Elements, which are transmitted back to clinical PACS. The framework was tested on GE and Philips DICOMs, demonstrating compatibility with StealthStation and Brainlab. Run time and registration error ranged 216s–486s and 0.80mm–1.73mm across five patients. An open-source, modular tool for automated clinical integration of QSM can enhance surgical planning for deep brain stimulation and other neuro applications. The framework can be adapted to any non-conventional image contrast, accelerating clinical translation of advanced MRI.',
      image: '/images/qsm-pipeline-title.jpg',
      video: '/videos/qsm-pipeline.mp4',
      gallery: [
        {
          src: '/images/qsm-reconstruction-pipeline.jpg',
          alt: 'FGATIR, QSM, and FGATIR-aligned QSM images showing deep brain stimulation targets',
        },
      ],
      date: 'July 2025 – Present',
      skills: ['Python', 'QSM', 'DICOM', 'PACS', 'ANTs', 'HD-BET', 'QSMxT'],
      conferences: ['ISMRM 2026'],
      links: [
        {
          label: 'ISMRM 2026 abstract',
          url: 'https://echo.ismrm.org/abstracts/view/ed86a125-ca8a-4083-a0cd-49962d4c78a0',
        },
        { label: 'ISMRM 2026 abstract (PDF)', url: '/ISMRM2026_QSM_Abstract.pdf' },
        { label: 'morrisonlab.ucsf.edu', url: 'https://morrisonlab.ucsf.edu' },
      ],
    },
  },
  {
    id: 'dystonia-dbs-fmri',
    title: 'Longitudinal DBS-fMRI in Cervical Dystonia',
    shortDescription: 'Longitudinal motor network responses to pallidal DBS in cervical dystonia: an ongoing DBS-fMRI study.',
    type: 'project',
    tags: ['fMRI', 'Deep Brain Stimulation', 'Functional Connectivity', 'Dystonia'],
    href: '/project/dystonia-dbs-fmri',
    detail: {
      description: 'This longitudinal MRI study in cervical dystonia uses functional MRI (fMRI) to evaluate neural mechanisms underlying clinical response to deep brain stimulation (DBS).',
      longDescription: 'This longitudinal MRI study in cervical dystonia uses functional MRI (fMRI) to evaluate neural mechanisms underlying clinical response to deep brain stimulation (DBS), with the goal of identifying imaging biomarkers for early DBS programming. DBS treats dystonia effectively, but its mechanisms remain unclear and ~20% of patients benefit little, with improvement being slow. Prior fMRI work has used single postoperative timepoints; multi-timepoint imaging is needed to capture pre-to-post effects. Negative pallidal-sensorimotor and positive pallidal-cerebellar connectivity predict DBS-induced improvement across dystonia subtypes, but this has never been validated longitudinally. Cohort: 12 patients (11 GPi / 1 VIM; mean age 57.4 ± 11.5; 7F/5M) with 13 preoperative and 18 postoperative fMRI runs, acquired preop and postop with DBS ON/OFF and preprocessed in the CONN Toolbox. Pallidal-cerebellar and pallidal-sensorimotor connectivity generally declined over time, with transient increases during early optimization. DBS ON vs. OFF differences were most pronounced in the first year; in some patients, connectivity approached control levels. For all runs included, no group-level trends were observed. Lower pallidal-cerebellar connectivity trended with worse TWSTRS scores; higher pallidal-sensorimotor connectivity with worse pain only. These early results suggest pallidal connectivity is modulated by DBS over time and may contribute to dystonia severity and treatment response, though further investigation is needed.',
      image: '/images/dystonia-dbs-fmri.jpg',
      date: '2026',
      skills: ['fMRI', 'CONN Toolbox', 'Functional Connectivity', 'Deep Brain Stimulation'],
      conferences: ['MDS Congress 2026'],
      links: [
        { label: 'MDS Congress ePoster (PDF)', url: '/MDS_2026_DBS_fMRI_Poster.pdf' },
        {
          label: 'Published abstract',
          url: 'https://www.mdsabstracts.org/abstract/longitudinal-motor-network-responses-to-pallidal-dbs-in-cervical-dystonia-an-ongoing-dbs-fmri-study/',
        },
        { label: 'morrisonlab.ucsf.edu', url: 'https://morrisonlab.ucsf.edu' },
      ],
    },
  },
  {
    id: 'deep-isolation-forest-outliers',
    title: 'Deep Isolation Forest Outlier Analysis',
    shortDescription: 'Deep Isolation Forest outlier analysis of large multimodal adolescent neuroimaging data.',
    type: 'project',
    tags: ['Machine Learning', 'Anomaly Detection', 'fMRI', 'Python'],
    href: '/project/deep-isolation-forest-outliers',
    detail: {
      description: 'Quantitative diagnostic metrics for neuropsychiatric disorders using machine learning and resting-state fMRI.',
      longDescription: 'Conducted research under Dr. Margot Wagner and Dr. Alessandra Camassa on developing quantitative diagnostic metrics for neuropsychiatric disorders using machine learning and resting-state fMRI data from the Adolescent Brain Cognitive Development (ABCD) Study (12,000 participants). Outliers in neuroimaging data offer crucial insights about data quality, acquisition variability, and potential confounding factors that may impact analysis. We applied Deep Isolation Forest (DIF) to detect outliers from resting-state functional connectivity data, and used tuned L1 logistic regression to predict outliers (AUC = 0.775). MRI brand (Philips) was the strongest predictor, but Philips scanners had the fewest outliers; motion (framewise displacement) strongly influenced outlier classification, and collection sites greatly influenced outlier status.',
      image: '/images/deep-isolation-forest-outliers.jpg',
      imageFit: 'contain',
      date: 'Nov 2023 – May 2025',
      skills: ['Python', 'PyTorch', 'Deep Isolation Forest', 'fMRI', 'Statistics'],
      conferences: ['CAMP Symposium'],
      links: [{ label: 'CAMP Symposium poster (PDF)', url: '/CAMP_Symposium_Poster.pdf' }],
      footnote: 'The poster lists me as E. Silberman, my previous last name. My last name is now Cito.',
    },
  },
  {
    id: 'neurotech-prosthetics',
    title: 'EMG-Controlled Robotic Arm',
    shortDescription: 'A robotic arm built using Arduino, integrating Electromyography (EMG) readings and neural networks.',
    type: 'project',
    tags: ['Neurotechnology', 'Neural Networks', 'Signal Processing', 'Arduino'],
    href: '/project/neurotech-prosthetics',
    detail: {
      description: 'Collaborated in a team to build a robotic arm using Arduino, integrating Electromyography (EMG) readings.',
      longDescription: 'Collaborated in a team to build a robotic arm using Arduino, integrating Electromyography (EMG) readings and implementing different neural networks to filter and interpret brain signals for control of the robotic arm. Successfully implemented a prototype. Coordinated and organized events to enhance the publicity of Brain-Computer Interfaces (BCI) to the public and students.',
      date: 'Sep 2022 – June 2023',
      image: '/images/neurotech-prosthetics.jpg',
      imageFit: 'contain',
      skills: ['Python', 'Neural Networks', 'EMG', 'Signal Processing', 'Arduino'],
      links: [{ label: 'neurotech.ucsd.edu', url: 'https://neurotech.ucsd.edu' }],
    },
  },
  {
    id: 'donkey-car',
    title: 'Self-Driving RC Car',
    shortDescription: 'Open-source self-driving platform for small-scale remote-controlled cars.',
    type: 'project',
    tags: ['Computer Vision', 'Deep Learning', 'Python', 'Edge Deployment'],
    href: '/project/donkey-car',
    detail: {
      description: 'Open-source self-driving platform for small-scale remote-controlled cars, adapted from the Donkey Car platform.',
      longDescription: 'Open-source self-driving platform for small-scale remote-controlled cars. Configured Raspberry Pi to gather operational data from steering, throttle, and camera to be used for model training, adapting from the open-source Donkey Car platform. Deployed model on Raspberry Pi, enabling real-time autopilot functionality. Raced in events and placed as high as second place out of 26 teams.',
      date: 'Sep 2019 – June 2020',
      image: '/images/donkey-car-race.jpg',
      video: '/videos/donkey-car-race.mp4',
      skills: ['Python', 'Computer Vision', 'Deep Learning', 'Raspberry Pi', 'Linux'],
      links: [{ label: 'donkeycar.com', url: 'https://www.donkeycar.com' }],
    },
  },
  {
    id: 'first-robotics',
    title: 'FIRST Robotics',
    shortDescription: 'Part of Team Inspiration, “To learn, to share, to inspire” robotics team.',
    type: 'project',
    tags: ['Computer Vision', 'Robotics', 'C++'],
    href: '/project/first-robotics',
    detail: {
      description: 'Implemented Computer Vision techniques to enable autonomous ball shooting and navigation on the robotic competition field.',
      longDescription: 'Part of Team Inspiration, “To learn, to share, to inspire” robotics team. Competed in robotics competitions housing several levels from elementary school to high school, including FIRST Lego League (FLL) and FIRST Tech Challenge (FTC). Implemented Computer Vision techniques to enable autonomous ball shooting and navigation on the robotic competition field. Worked with 3-D printing using CAD developing robotic pieces. Volunteered 50+ hours showcasing robotics to elementary schools, inspiring the future generation of the field of STEM. Partnered with FIRST Global to coach team Benin as well as donated 10 robotics kits to kick start their robotics program.',
      date: 'Sep 2008 – June 2019',
      image: '/images/first-robotics.jpg',
      imageFit: 'contain',
      skills: ['C++', 'Computer Vision', 'CAD', '3D Printing'],
      links: [{ label: 'teaminspiration.global', url: 'https://www.teaminspiration.global' }],
    },
  },
  {
    id: 'weill-cornell-poster',
    title: 'Weill Cornell Catalyst Poster',
    shortDescription: 'The Impact of Bioconjugation on Antibody Immunoreactivity. First Place, Weill Cornell Medicine Catalyst Program Poster Session.',
    type: 'project',
    tags: ['Biotech', 'Assay Development', 'Analytical Chemistry'],
    href: '/project/weill-cornell-poster',
    detail: {
      description: 'Develop and optimize radiotracers and antibody-based molecular imaging agents to advance cancer treatment.',
      longDescription: 'Conducted research under postdoctoral mentor Dr. Sai Sharma on HER2-targeting antibodies, studying how different levels of bioconjugation affect radiotracer synthesis and antibody immunoreactivity. Synthesized immunoconjugates by reacting trastuzumab with increasing molar excess of isothiocyanato-desferrioxamine (p-SCN-DFO), purified products via size-exclusion chromatography, and quantified DFO-to-antibody ratios. Found that while immunoreactivity remained stable even with 60-fold DFO excess, the association rate decreased compared to unconjugated trastuzumab, suggesting altered binding kinetics to the HER2 antigen, which could reduce therapeutic efficacy. Presented at the Weill Cornell Medicine Catalyst Program Poster Session, First Place Award.',
      date: 'June 2018 – Sep 2018',
      image: '/images/weill-cornell-poster.jpg',
      imageFit: 'contain',
      skills: ['Bioconjugation', 'Chromatography', 'Radiochemistry', 'Assay Design'],
      conferences: ['Weill Cornell Medicine Catalyst Program Poster Session'],
      links: [{ label: 'Catalyst Program poster (PDF)', url: '/Poster_ECS_Sai_Fixed.pdf' }],
    },
  },
  {
    id: 'ncaa-tennis',
    title: 'NCAA Division 1 Athlete',
    shortDescription: 'Team Captain, Men\'s Tennis at UC San Diego.',
    type: 'project',
    tags: ['Leadership', 'Teamwork'],
    href: '/project/ncaa-tennis',
    detail: {
      description: 'NCAA Division 1 Men’s Tennis Student-Athlete and Team Captain.',
      longDescription: 'Voted Team Captain for the seasons of 2021-2022 and 2022-2023. Organized and ran captain practices as well as communication between team and coaches. Selected for Triton Athlete Council - Student-Athlete Advisory Committee - worked closely with athletic department to enhance the student athlete experience. Co-started match making program to pair student-athletes with tutors struggling with STEM courses.',
      date: 'Sept 2020 – June 2024',
      image: '/images/tennis-action.jpg',
      gallery: [{ src: '/images/tennis-headshot.jpg', alt: 'Eric Cito, UC San Diego men\'s tennis roster photo' }],
      skills: ['Leadership', 'Teamwork', 'Time Management'],
      links: [
        { label: 'UCSD roster profile', url: 'https://ucsdtritons.com/sports/mens-tennis/roster/eric-cito/12844' },
        {
          label: 'Fab Five feature (UCSD Athletics)',
          url: 'https://ucsdtritons.com/news/2022/8/23/mens-tennis-fab-five-eric-silberman.aspx',
        },
      ],
      footnote: 'Photos courtesy of UC San Diego Athletics. The Fab Five feature lists me as Eric Silberman, my previous last name. My last name is now Cito.',
    },
  },
]

export const experienceNodes = nodes.filter((n) => n.type === 'experience')
export const projectNodes = nodes.filter((n) => n.type === 'project')

export function getNodeById(id: string): PortfolioNode | undefined {
  return nodes.find((n) => n.id === id)
}
