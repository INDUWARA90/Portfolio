import { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { FiInbox, FiPlus, FiRotateCcw, FiSave, FiTrash2, FiX } from 'react-icons/fi'
import { auth } from '../../lib/firebase'
import { deleteContactMessage, getContactMessages } from '../../lib/messages'
import ImageUploader from './ImageUploader'

const tabs = [
  ['profile', 'Profile'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['achievements', 'Achievements'],
  ['certificates', 'Certificates'],
  ['feedback', 'Feedback'],
  ['github', 'GitHub'],
  ['socials', 'Socials'],
  ['messages', 'Messages'],
]
const profileFields = ['name', 'role', 'email', 'phone', 'location', 'intro', 'story', 'objective']

function toList(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function AdminDashboard({ content, setContent, onReset, user, onClose }) {
  const [tab, setTab] = useState('profile')
  const [draft, setDraft] = useState(content)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [messages, setMessages] = useState([])
  const [messagesLoading, setMessagesLoading] = useState(false)
  const [messagesError, setMessagesError] = useState('')
  const [deletingMessageId, setDeletingMessageId] = useState('')

  useEffect(() => {
    if (tab !== 'messages') return

    let isMounted = true

    async function loadMessages() {
      setMessagesLoading(true)
      setMessagesError('')

      try {
        const savedMessages = await getContactMessages()

        if (isMounted) {
          setMessages(savedMessages)
        }
      } catch (error) {
        if (isMounted) {
          setMessagesError(error.message)
        }
      } finally {
        if (isMounted) {
          setMessagesLoading(false)
        }
      }
    }

    loadMessages()

    return () => {
      isMounted = false
    }
  }, [tab])

  async function saveChanges() {
    setIsSaving(true)
    setSaveError('')

    try {
      await setContent(draft)
      onClose()
    } catch (error) {
      setSaveError(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  async function resetContent() {
    setIsSaving(true)
    setSaveError('')

    try {
      await onReset()
      onClose()
    } catch (error) {
      setSaveError(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  async function logout() {
    await signOut(auth)
    onClose()
  }

  function updateProfile(field, value) {
    setDraft((current) => ({
      ...current,
      profile: { ...current.profile, [field]: value },
    }))
  }

  function updateProject(id, field, value) {
    setDraft((current) => ({
      ...current,
      projects: current.projects.map((project) => (project.id === id ? { ...project, [field]: value } : project)),
    }))
  }

  function updateListItem(collection, index, field, value) {
    setDraft((current) => ({
      ...current,
      [collection]: (current[collection] || []).map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item)),
    }))
  }

  function addListItem(collection, item) {
    setDraft((current) => ({
      ...current,
      [collection]: [item, ...(current[collection] || [])],
    }))
  }

  function deleteListItem(collection, index) {
    setDraft((current) => ({
      ...current,
      [collection]: (current[collection] || []).filter((_, itemIndex) => itemIndex !== index),
    }))
  }

  function updateGithub(field, value) {
    setDraft((current) => ({
      ...current,
      github: { ...current.github, [field]: value },
    }))
  }

  function addProject() {
    setDraft((current) => ({
      ...current,
      projects: [
        {
          id: crypto.randomUUID(),
          title: '',
          image: '',
          status: '',
          category: '',
          description: '',
          techstack: [],
          dlink: '',
          clink: '',
        },
        ...current.projects,
      ],
    }))
  }

  function deleteProject(id) {
    setDraft((current) => ({
      ...current,
      projects: current.projects.filter((project) => project.id !== id),
    }))
  }

  function updateSkill(name, field, value) {
    setDraft((current) => ({
      ...current,
      skills: current.skills.map((skill) => (skill.name === name ? { ...skill, [field]: value } : skill)),
    }))
  }

  function addSkill() {
    setDraft((current) => ({
      ...current,
      skills: [{ name: '', category: '', level: '' }, ...current.skills],
    }))
  }

  function deleteSkill(name) {
    setDraft((current) => ({
      ...current,
      skills: current.skills.filter((skill) => skill.name !== name),
    }))
  }

  function updateSocial(index, field, value) {
    setDraft((current) => ({
      ...current,
      socials: current.socials.map((social, socialIndex) => (socialIndex === index ? { ...social, [field]: value } : social)),
    }))
  }

  function addSocial() {
    setDraft((current) => ({
      ...current,
      socials: [...current.socials, { label: '', href: '' }],
    }))
  }

  function deleteSocial(index) {
    setDraft((current) => ({
      ...current,
      socials: current.socials.filter((_, socialIndex) => socialIndex !== index),
    }))
  }

  async function deleteMessage(id) {
    setDeletingMessageId(id)
    setMessagesError('')

    try {
      await deleteContactMessage(id)
      setMessages((current) => current.filter((message) => message.id !== id))
    } catch (error) {
      setMessagesError(error.message)
    } finally {
      setDeletingMessageId('')
    }
  }

  return (
    <div className="dashboard-modal fixed inset-0 z-50 overflow-auto bg-slate-950/88 p-4 text-white backdrop-blur">
      <div className="dashboard-panel mx-auto max-w-6xl rounded-md border border-white/10 bg-[#101828] p-5 shadow-2xl">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-5 light:border-slate-200 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-teal-300 light:text-sky-700">Dashboard</p>
            <h2 className="mt-2 text-3xl font-black">Manage Portfolio</h2>
            <p className="mt-2 text-sm text-slate-400 light:text-slate-600">
              Signed in as {user?.email || 'admin'}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={resetContent} disabled={isSaving} className="btn-secondary gap-2 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60">
              <FiRotateCcw />
              Reset
            </button>
            <button onClick={saveChanges} disabled={isSaving} className="btn-primary gap-2 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60">
              <FiSave />
              {isSaving ? 'Saving' : 'Save'}
            </button>
            <button onClick={logout} className="btn-secondary gap-2 px-4 py-2 text-sm">
              <FiX />
              Logout
            </button>
            <button onClick={onClose} className="icon-button" aria-label="Close dashboard">
              <FiX />
            </button>
          </div>
        </div>

        {saveError && <p className="mt-4 rounded-md border border-red-400/25 bg-red-500/10 px-3 py-2 text-sm font-bold text-red-200 light:text-red-700">{saveError}</p>}

        <div className="mt-5 flex flex-wrap gap-2">
          {tabs.map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`rounded-md px-4 py-2 text-sm font-bold capitalize transition ${
                tab === id ? 'bg-teal-300 text-slate-950 light:bg-sky-600 light:text-white' : 'bg-white/10 text-slate-200 light:bg-slate-100 light:text-slate-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'profile' && (
          <div className="mt-6 space-y-5">
            <div className="rounded-md border border-white/10 p-4 light:border-slate-200">
              <h3 className="text-lg font-black">Profile Image</h3>
              <p className="mt-1 text-sm text-slate-400 light:text-slate-600">Upload to Cloudinary or paste a hosted image URL.</p>
              <div className="mt-4 max-w-md">
                <ImageUploader
                  folder="portfolio/profile"
                  imageUrl={draft.profile.image}
                  label={`${draft.profile.name} profile`}
                  onUploaded={(url) => updateProfile('image', url)}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {profileFields.map((field) => (
                <label key={field} className="text-sm font-bold capitalize text-slate-300 light:text-slate-700">
                  {field}
                  <textarea
                    value={draft.profile[field] || ''}
                    onChange={(event) => updateProfile(field, event.target.value)}
                    rows={['intro', 'story', 'objective'].includes(field) ? 4 : 2}
                    className="mt-2 w-full rounded-md border border-white/10 bg-white/10 p-3 text-white outline-none focus:border-teal-300 light:border-slate-200 light:bg-white light:text-slate-950 light:focus:border-sky-400"
                  />
                </label>
              ))}
              <label className="text-sm font-bold text-slate-300 light:text-slate-700">
                Resume URL
                <input
                  value={draft.profile.resumeUrl || ''}
                  onChange={(event) => updateProfile('resumeUrl', event.target.value)}
                  placeholder="https://..."
                  className="mt-2 dashboard-input"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-bold text-slate-300 light:text-slate-700">
                Technical interests
                <input
                  value={(draft.profile.interests || []).join(', ')}
                  onChange={(event) => updateProfile('interests', toList(event.target.value))}
                  placeholder="React, UI Design, Firebase"
                  className="mt-2 dashboard-input"
                />
              </label>
              <label className="text-sm font-bold text-slate-300 light:text-slate-700">
                Services
                <input
                  value={(draft.services || []).join(', ')}
                  onChange={(event) => setDraft((current) => ({ ...current, services: toList(event.target.value) }))}
                  placeholder="Web apps, Landing pages, Firebase setup"
                  className="mt-2 dashboard-input"
                />
              </label>
            </div>

            <div className="rounded-md border border-white/10 p-4 light:border-slate-200">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-lg font-black">Hero Stats</h3>
                <button
                  onClick={() => addListItem('stats', { value: '', label: '' })}
                  className="btn-primary gap-2 px-3 py-2 text-sm"
                >
                  <FiPlus />
                  Add Stat
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {(draft.stats || []).map((stat, index) => (
                  <div key={`${stat.label}-${index}`} className="grid gap-3 rounded-md border border-white/10 p-4 light:border-slate-200">
                    <input value={stat.value || ''} onChange={(event) => updateListItem('stats', index, 'value', event.target.value)} placeholder="Value" className="dashboard-input" />
                    <input value={stat.label || ''} onChange={(event) => updateListItem('stats', index, 'label', event.target.value)} placeholder="Label" className="dashboard-input" />
                    <button onClick={() => deleteListItem('stats', index)} className="inline-flex w-fit items-center gap-2 rounded-md bg-red-500/15 px-3 py-2 text-sm font-bold text-red-200 light:text-red-700">
                      <FiTrash2 />
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'projects' && (
          <div className="mt-6">
            <button onClick={addProject} className="btn-primary mb-4 gap-2 px-4 py-2 text-sm">
              <FiPlus />
              Add Project
            </button>
            <div className="space-y-4">
              {draft.projects.map((project) => (
                <article key={project.id} className="rounded-md border border-white/10 p-4 light:border-slate-200">
                  <div className="grid gap-3 md:grid-cols-2">
                    <input value={project.title} onChange={(event) => updateProject(project.id, 'title', event.target.value)} placeholder="Title" className="dashboard-input" />
                    <input value={project.status} onChange={(event) => updateProject(project.id, 'status', event.target.value)} placeholder="Status" className="dashboard-input" />
                    <input value={project.category} onChange={(event) => updateProject(project.id, 'category', event.target.value)} placeholder="Category" className="dashboard-input" />
                    <input value={project.dlink} onChange={(event) => updateProject(project.id, 'dlink', event.target.value)} placeholder="Live demo link" className="dashboard-input" />
                    <input value={project.clink} onChange={(event) => updateProject(project.id, 'clink', event.target.value)} placeholder="Code link" className="dashboard-input" />
                    <div className="md:col-span-2">
                      <ImageUploader
                        folder="portfolio/projects"
                        imageUrl={project.image}
                        label={`${project.title} project`}
                        onUploaded={(url) => updateProject(project.id, 'image', url)}
                      />
                    </div>
                    <textarea value={project.description} onChange={(event) => updateProject(project.id, 'description', event.target.value)} placeholder="Description" className="dashboard-input md:col-span-2" />
                    <input value={project.techstack.join(', ')} onChange={(event) => updateProject(project.id, 'techstack', toList(event.target.value))} placeholder="React, Firebase, Tailwind" className="dashboard-input md:col-span-2" />
                  </div>
                  <button onClick={() => deleteProject(project.id)} className="mt-3 inline-flex items-center gap-2 rounded-md bg-red-500/15 px-3 py-2 text-sm font-bold text-red-200 light:text-red-700">
                    <FiTrash2 />
                    Delete
                  </button>
                </article>
              ))}
            </div>
          </div>
        )}

        {tab === 'skills' && (
          <div className="mt-6">
            <button onClick={addSkill} className="btn-primary mb-4 gap-2 px-4 py-2 text-sm">
              <FiPlus />
              Add Skill
            </button>
            <div className="grid gap-3 md:grid-cols-2">
              {draft.skills.map((skill) => (
                <div key={skill.name} className="grid gap-3 rounded-md border border-white/10 p-4 light:border-slate-200">
                  <input value={skill.name} onChange={(event) => updateSkill(skill.name, 'name', event.target.value)} className="dashboard-input" />
                  <input value={skill.category} onChange={(event) => updateSkill(skill.name, 'category', event.target.value)} className="dashboard-input" />
                  <button onClick={() => deleteSkill(skill.name)} className="inline-flex w-fit items-center gap-2 rounded-md bg-red-500/15 px-3 py-2 text-sm font-bold text-red-200 light:text-red-700">
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'experience' && (
          <div className="mt-6 space-y-8">
            <section>
              <button
                onClick={() => addListItem('experience', {
                  title: '',
                  company: '',
                  period: '',
                  type: '',
                  description: '',
                  technologies: [],
                })}
                className="btn-primary mb-4 gap-2 px-4 py-2 text-sm"
              >
                <FiPlus />
                Add Experience
              </button>

              <div className="space-y-4">
                {(draft.experience || []).map((item, index) => (
                  <article key={`${item.title}-${index}`} className="rounded-md border border-white/10 p-4 light:border-slate-200">
                    <div className="grid gap-3 md:grid-cols-2">
                      <input value={item.title || ''} onChange={(event) => updateListItem('experience', index, 'title', event.target.value)} placeholder="Title" className="dashboard-input" />
                      <input value={item.company || ''} onChange={(event) => updateListItem('experience', index, 'company', event.target.value)} placeholder="Company / project" className="dashboard-input" />
                      <input value={item.period || ''} onChange={(event) => updateListItem('experience', index, 'period', event.target.value)} placeholder="Period" className="dashboard-input" />
                      <input value={item.type || ''} onChange={(event) => updateListItem('experience', index, 'type', event.target.value)} placeholder="Type" className="dashboard-input" />
                      <textarea value={item.description || ''} onChange={(event) => updateListItem('experience', index, 'description', event.target.value)} placeholder="Description" className="dashboard-input md:col-span-2" />
                      <input value={(item.technologies || []).join(', ')} onChange={(event) => updateListItem('experience', index, 'technologies', toList(event.target.value))} placeholder="React, Firebase, Tailwind" className="dashboard-input md:col-span-2" />
                    </div>
                    <button onClick={() => deleteListItem('experience', index)} className="mt-3 inline-flex items-center gap-2 rounded-md bg-red-500/15 px-3 py-2 text-sm font-bold text-red-200 light:text-red-700">
                      <FiTrash2 />
                      Delete
                    </button>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <button
                onClick={() => addListItem('education', {
                  institution: '',
                  degree: '',
                  period: '',
                  coursework: [],
                })}
                className="btn-primary mb-4 gap-2 px-4 py-2 text-sm"
              >
                <FiPlus />
                Add Education
              </button>

              <div className="space-y-4">
                {(draft.education || []).map((item, index) => (
                  <article key={`${item.institution}-${index}`} className="rounded-md border border-white/10 p-4 light:border-slate-200">
                    <div className="grid gap-3 md:grid-cols-2">
                      <input value={item.institution || ''} onChange={(event) => updateListItem('education', index, 'institution', event.target.value)} placeholder="Institution" className="dashboard-input" />
                      <input value={item.degree || ''} onChange={(event) => updateListItem('education', index, 'degree', event.target.value)} placeholder="Degree / course" className="dashboard-input" />
                      <input value={item.period || ''} onChange={(event) => updateListItem('education', index, 'period', event.target.value)} placeholder="Period" className="dashboard-input md:col-span-2" />
                      <input value={(item.coursework || []).join(', ')} onChange={(event) => updateListItem('education', index, 'coursework', toList(event.target.value))} placeholder="Coursework" className="dashboard-input md:col-span-2" />
                    </div>
                    <button onClick={() => deleteListItem('education', index)} className="mt-3 inline-flex items-center gap-2 rounded-md bg-red-500/15 px-3 py-2 text-sm font-bold text-red-200 light:text-red-700">
                      <FiTrash2 />
                      Delete
                    </button>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}

        {tab === 'certificates' && (
          <div className="mt-6">
            <button
              onClick={() => addListItem('certifications', {
                id: crypto.randomUUID(),
                title: '',
                issuer: '',
                year: '',
                image: '',
                verification: '',
                category: '',
              })}
              className="btn-primary mb-4 gap-2 px-4 py-2 text-sm"
            >
              <FiPlus />
              Add Certificate
            </button>

            <div className="space-y-4">
              {(draft.certifications || []).map((certificate, index) => (
                <article key={`${certificate.id}-${index}`} className="rounded-md border border-white/10 p-4 light:border-slate-200">
                  <div className="grid gap-3 md:grid-cols-2">
                    <input value={certificate.title || ''} onChange={(event) => updateListItem('certifications', index, 'title', event.target.value)} placeholder="Title" className="dashboard-input" />
                    <input value={certificate.issuer || ''} onChange={(event) => updateListItem('certifications', index, 'issuer', event.target.value)} placeholder="Issuer" className="dashboard-input" />
                    <input value={certificate.year || ''} onChange={(event) => updateListItem('certifications', index, 'year', event.target.value)} placeholder="Year" className="dashboard-input" />
                    <input value={certificate.category || ''} onChange={(event) => updateListItem('certifications', index, 'category', event.target.value)} placeholder="Category" className="dashboard-input" />
                    <input value={certificate.verification || ''} onChange={(event) => updateListItem('certifications', index, 'verification', event.target.value)} placeholder="Verification link" className="dashboard-input md:col-span-2" />
                    <div className="md:col-span-2">
                      <ImageUploader
                        folder="portfolio/certificates"
                        imageUrl={certificate.image}
                        label={`${certificate.title} certificate`}
                        onUploaded={(url) => updateListItem('certifications', index, 'image', url)}
                      />
                    </div>
                  </div>
                  <button onClick={() => deleteListItem('certifications', index)} className="mt-3 inline-flex items-center gap-2 rounded-md bg-red-500/15 px-3 py-2 text-sm font-bold text-red-200 light:text-red-700">
                    <FiTrash2 />
                    Delete
                  </button>
                </article>
              ))}
            </div>
          </div>
        )}

        {tab === 'achievements' && (
          <div className="mt-6">
            <button
              onClick={() => addListItem('achievements', {
                id: crypto.randomUUID(),
                title: '',
                issuer: '',
                year: '',
                category: '',
                description: '',
                image: '',
                link: '',
              })}
              className="btn-primary mb-4 gap-2 px-4 py-2 text-sm"
            >
              <FiPlus />
              Add Achievement
            </button>

            <div className="space-y-4">
              {(draft.achievements || []).map((achievement, index) => (
                <article key={`${achievement.id}-${index}`} className="rounded-md border border-white/10 p-4 light:border-slate-200">
                  <div className="grid gap-3 md:grid-cols-2">
                    <input value={achievement.title || ''} onChange={(event) => updateListItem('achievements', index, 'title', event.target.value)} placeholder="Title" className="dashboard-input" />
                    <input value={achievement.issuer || ''} onChange={(event) => updateListItem('achievements', index, 'issuer', event.target.value)} placeholder="Organization / context" className="dashboard-input" />
                    <input value={achievement.year || ''} onChange={(event) => updateListItem('achievements', index, 'year', event.target.value)} placeholder="Year" className="dashboard-input" />
                    <input value={achievement.category || ''} onChange={(event) => updateListItem('achievements', index, 'category', event.target.value)} placeholder="Category" className="dashboard-input" />
                    <input value={achievement.link || ''} onChange={(event) => updateListItem('achievements', index, 'link', event.target.value)} placeholder="Link" className="dashboard-input md:col-span-2" />
                    <div className="md:col-span-2">
                      <ImageUploader
                        folder="portfolio/achievements"
                        imageUrl={achievement.image}
                        label={`${achievement.title} achievement`}
                        onUploaded={(url) => updateListItem('achievements', index, 'image', url)}
                      />
                    </div>
                    <textarea value={achievement.description || ''} onChange={(event) => updateListItem('achievements', index, 'description', event.target.value)} placeholder="Description" className="dashboard-input md:col-span-2" />
                  </div>
                  <button onClick={() => deleteListItem('achievements', index)} className="mt-3 inline-flex items-center gap-2 rounded-md bg-red-500/15 px-3 py-2 text-sm font-bold text-red-200 light:text-red-700">
                    <FiTrash2 />
                    Delete
                  </button>
                </article>
              ))}
            </div>
          </div>
        )}

        {tab === 'feedback' && (
          <div className="mt-6">
            <button
              onClick={() => addListItem('feedback', {
                quote: '',
                name: '',
                role: '',
              })}
              className="btn-primary mb-4 gap-2 px-4 py-2 text-sm"
            >
              <FiPlus />
              Add Feedback
            </button>

            <div className="space-y-4">
              {(draft.feedback || []).map((item, index) => (
                <article key={`${item.name}-${index}`} className="rounded-md border border-white/10 p-4 light:border-slate-200">
                  <div className="grid gap-3 md:grid-cols-2">
                    <input value={item.name || ''} onChange={(event) => updateListItem('feedback', index, 'name', event.target.value)} placeholder="Name" className="dashboard-input" />
                    <input value={item.role || ''} onChange={(event) => updateListItem('feedback', index, 'role', event.target.value)} placeholder="Role / context" className="dashboard-input" />
                    <textarea value={item.quote || ''} onChange={(event) => updateListItem('feedback', index, 'quote', event.target.value)} placeholder="Quote" className="dashboard-input md:col-span-2" />
                  </div>
                  <button onClick={() => deleteListItem('feedback', index)} className="mt-3 inline-flex items-center gap-2 rounded-md bg-red-500/15 px-3 py-2 text-sm font-bold text-red-200 light:text-red-700">
                    <FiTrash2 />
                    Delete
                  </button>
                </article>
              ))}
            </div>
          </div>
        )}

        {tab === 'github' && (
          <div className="mt-6 max-w-3xl space-y-4">
            <p className="rounded-md border border-white/10 p-4 text-sm text-slate-300 light:border-slate-200 light:text-slate-700">
              The public GitHub panel fetches live data from the username below. The stat fields are used as fallback values if GitHub is unavailable.
            </p>
            <label className="block text-sm font-bold text-slate-300 light:text-slate-700">
              GitHub username
              <input value={draft.github?.username || ''} onChange={(event) => updateGithub('username', event.target.value)} placeholder="yourusername" className="mt-2 dashboard-input" />
            </label>
            <div className="grid gap-3 md:grid-cols-3">
              <label className="text-sm font-bold text-slate-300 light:text-slate-700">
                Public repos fallback
                <input value={draft.github?.publicRepos || ''} onChange={(event) => updateGithub('publicRepos', event.target.value)} className="mt-2 dashboard-input" />
              </label>
              <label className="text-sm font-bold text-slate-300 light:text-slate-700">
                Followers fallback
                <input value={draft.github?.followers || ''} onChange={(event) => updateGithub('followers', event.target.value)} className="mt-2 dashboard-input" />
              </label>
              <label className="text-sm font-bold text-slate-300 light:text-slate-700">
                Following fallback
                <input value={draft.github?.following || ''} onChange={(event) => updateGithub('following', event.target.value)} className="mt-2 dashboard-input" />
              </label>
            </div>
          </div>
        )}

        {tab === 'socials' && (
          <div className="mt-6">
            <button onClick={addSocial} className="btn-primary mb-4 gap-2 px-4 py-2 text-sm">
              <FiPlus />
              Add Link
            </button>
            <div className="space-y-3">
              {draft.socials.map((social, index) => (
                <div key={`${social.label}-${index}`} className="grid gap-3 rounded-md border border-white/10 p-4 light:border-slate-200 md:grid-cols-[0.4fr_1fr_auto]">
                  <input value={social.label} onChange={(event) => updateSocial(index, 'label', event.target.value)} className="dashboard-input" />
                  <input value={social.href} onChange={(event) => updateSocial(index, 'href', event.target.value)} className="dashboard-input" />
                  <button onClick={() => deleteSocial(index)} className="inline-flex items-center justify-center gap-2 rounded-md bg-red-500/15 px-3 py-2 text-sm font-bold text-red-200 light:text-red-700">
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'messages' && (
          <div className="mt-6">
            <div className="mb-4 flex items-center gap-3">
              <FiInbox className="text-xl text-teal-300" />
              <h3 className="text-xl font-black">Contact Messages</h3>
            </div>

            {messagesLoading && <p className="text-sm text-slate-400 light:text-slate-600">Loading messages...</p>}
            {messagesError && <p className="rounded-md border border-red-400/25 bg-red-500/10 px-3 py-2 text-sm font-bold text-red-200 light:text-red-700">{messagesError}</p>}

            {!messagesLoading && !messagesError && messages.length === 0 && (
              <p className="rounded-md border border-white/10 p-4 text-sm text-slate-400 light:border-slate-200 light:text-slate-600">No messages yet.</p>
            )}

            <div className="space-y-4">
              {messages.map((message) => (
                <article key={message.id} className="rounded-md border border-white/10 p-4 light:border-slate-200">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h4 className="text-lg font-black text-white light:text-slate-950">{message.subject || 'Portfolio inquiry'}</h4>
                      <p className="mt-1 text-sm text-slate-400 light:text-slate-600">
                        {message.name} / {message.email}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => deleteMessage(message.id)}
                        disabled={deletingMessageId === message.id}
                        className="inline-flex items-center gap-2 rounded-md bg-red-500/15 px-3 py-2 text-sm font-bold text-red-200 disabled:cursor-not-allowed disabled:opacity-60 light:text-red-700"
                      >
                        <FiTrash2 />
                        {deletingMessageId === message.id ? 'Deleting' : 'Delete'}
                      </button>
                    </div>
                  </div>

                  <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-300 light:text-slate-700">{message.message}</p>
                  {message.createdAt?.toDate && (
                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500 light:text-slate-500">
                      {message.createdAt.toDate().toLocaleString()}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
