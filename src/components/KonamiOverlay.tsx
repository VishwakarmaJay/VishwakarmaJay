import { useKonamiCode } from '../hooks/useKonamiCode'

export default function KonamiOverlay() {
  const { active, deactivate } = useKonamiCode()

  if (!active) return null

  return (
    <div className="fixed inset-0 z-[9000] bg-[rgba(8,12,20,0.97)] flex flex-col justify-center items-center text-center gap-5">
      <div className="text-[72px]">📱</div>
      <h2
        className="text-5xl font-bold text-accent"
        style={{ textShadow: '0 0 40px rgba(0,212,255,0.6)' }}
      >
        you found the flutter code 🎉
      </h2>
      <p className="text-[#667788] font-mono text-sm max-w-md">
        ↑↑↓↓←→←→BA — respect.
        <br />
        This easter egg runs on clean architecture and Riverpod.
        <br />
        Bonus fact:{' '}
        <strong className="text-accent2">
          I've survived App Store review rejections.
        </strong>
      </p>
      <button
        onClick={deactivate}
        className="font-mono text-xs px-6 py-3 bg-accent text-bg rounded-sm mt-4 cursor-pointer font-semibold"
        style={{ boxShadow: '0 0 20px rgba(0,212,255,0.4)' }}
      >
        close this madness
      </button>
    </div>
  )
}