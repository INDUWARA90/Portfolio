import profileImage from '../assets/Me.jpg'
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
  skills: [],
  services: [],
  projects: [
    {
      id: 'project-1',
      title: '',
      image: projectImage,
      status: '',
      featured: false,
      category: '',
      description: '',
      problem: '',
      role: '',
      features: [],
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
  testimonials: [],
  github: {
    username: '',
    followers: '',
    following: '',
    publicRepos: '',
    starredRepos: '',
  },
}
