import { FiInfo } from 'react-icons/fi'

function EmptyState({ title = 'Content coming soon', message = 'More details will be shared here soon.' }) {
  return (
    <div className="empty-state rounded-md p-6 text-center md:p-8">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-md bg-[#6FCF97] text-xl text-[#1F6F5F]">
        <FiInfo />
      </div>
      <h3 className="mt-4 text-xl font-black text-[#1F6F5F] light:text-slate-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#1F6F5F]/68 light:text-slate-600">{message}</p>
    </div>
  )
}

export default EmptyState
