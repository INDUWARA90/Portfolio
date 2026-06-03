import { useState } from 'react'
import { FiPlus, FiRotateCcw, FiSave, FiTrash2, FiX } from 'react-icons/fi'
import ImageUploader from './ImageUploader'

const tabs = ['profile', 'projects', 'skills', 'socials']
const profileFields = ['name', 'role', 'email', 'phone', 'location', 'intro', 'story', 'objective']

function toList(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function AdminDashboard({ content, setContent, onReset, onClose }) {
  const [tab, setTab] = useState('profile')
  const [draft, setDraft] = useState(content)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

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

  function addProject() {
    setDraft((current) => ({
      ...current,
      projects: [
        {
          id: crypto.randomUUID(),
          title: 'New Project',
          image: '',
          status: 'Draft',
          featured: false,
          category: 'React',
          description: 'Write a short project description.',
          problem: '',
          role: 'Developer',
          features: ['Responsive layout'],
          techstack: ['React'],
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
      skills: [{ name: 'New Skill', category: 'Frontend', level: 70 }, ...current.skills],
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
      socials: [...current.socials, { label: 'New Link', href: 'https://' }],
    }))
  }

  function deleteSocial(index) {
    setDraft((current) => ({
      ...current,
      socials: current.socials.filter((_, socialIndex) => socialIndex !== index),
    }))
  }

  return (
    <div className="dashboard-modal fixed inset-0 z-50 overflow-auto bg-slate-950/88 p-4 text-white backdrop-blur">
      <div className="dashboard-panel mx-auto max-w-6xl rounded-md border border-white/10 bg-[#101828] p-5 shadow-2xl">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-5 light:border-slate-200 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-teal-300 light:text-sky-700">Dashboard</p>
            <h2 className="mt-2 text-3xl font-black">Manage Portfolio</h2>
            <p className="mt-2 text-sm text-slate-400 light:text-slate-600">Changes are saved to Firebase Firestore.</p>
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
            <button onClick={onClose} className="icon-button" aria-label="Close dashboard">
              <FiX />
            </button>
          </div>
        </div>

        {saveError && <p className="mt-4 rounded-md border border-red-400/25 bg-red-500/10 px-3 py-2 text-sm font-bold text-red-200 light:text-red-700">{saveError}</p>}

        <div className="mt-5 flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`rounded-md px-4 py-2 text-sm font-bold capitalize transition ${
                tab === item ? 'bg-teal-300 text-slate-950 light:bg-sky-600 light:text-white' : 'bg-white/10 text-slate-200 light:bg-slate-100 light:text-slate-700'
              }`}
            >
              {item}
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
      </div>
    </div>
  )
}

export default AdminDashboard
