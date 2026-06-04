import profileImage from '../assets/boy.png'
import projectImage from '../assets/P01.png'
import cvPdf from '../assets/CV.pdf'

export const initialContent = {
  profile: {
    name: '',
    role: '',
    location: '',
    email: '',
    phone: '',
    image: profileImage,
    resumeUrl: cvPdf,
    intro: '',
    story: '',
    objective: '',
    interests: [],
  },
  socials: [],
  stats: [],
  skills: [
    { name: 'Postman', category: 'API Testing' },
    { name: '.NET', category: 'Backend' },
    { name: 'Next.js', category: 'Frontend Framework' },
    { name: 'Angular', category: 'Frontend Framework' },
  ],
  services: [],
  projects: [
    {
      id: 'project-1',
      title: '',
      image: projectImage,
      status: '',
      category: '',
      description: '',
      techstack: [],
      dlink: '',
      clink: '',
    },
  ],
  experience: [],
  education: [],
  certifications: [
    {
      id: 'certificate-1',
      title: '',
      issuer: '',
      year: '',
      image: projectImage,
      verification: '',
      category: '',
    },
  ],
  feedback: [],
  github: {
    username: '',
    followers: '',
    following: '',
    publicRepos: '',
  },
}
