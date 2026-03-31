import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { ellipseAddress } from '../utils/ellipseAddress'

const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [activeAddress, setActiveAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<number>(0)
  const [vaultBalance, setVaultBalance] = useState<number>(0)
  const [depositAmount, setDepositAmount] = useState<string>('0.1')
  const [loadingDeposit, setLoadingDeposit] = useState<boolean>(false)

  const networkName = 'testnet'
  const fakeAccount = 'TESTNETADDRESSABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGH'
  const milestones = [
    { label: 'Rookie Saver', value: 1, icon: '🥉' },
    { label: 'Bronze Streak', value: 5, icon: '🥈' },
    { label: 'Gold Champion', value: 10, icon: '🥇' },
  ]

  const nextMilestone = milestones.find((milestone) => vaultBalance < milestone.value) ?? milestones[milestones.length - 1]
  const progressToNext = Math.min(100, (vaultBalance / nextMilestone.value) * 100)

  const handleConnectWallet = () => {
    setActiveAddress(fakeAccount)
    setBalance(10)
    enqueueSnackbar('Connected to simulated TestNet wallet', { variant: 'success' })
  }

  const handleDisconnectWallet = () => {
    setActiveAddress(null)
    setBalance(0)
    enqueueSnackbar('Disconnected from simulated wallet', { variant: 'info' })
  }

  const handleDeposit = () => {
    if (!activeAddress) {
      enqueueSnackbar('Connect a wallet before depositing', { variant: 'warning' })
      return
    }

    const amount = Number(depositAmount)
    if (!amount || amount <= 0) {
      enqueueSnackbar('Enter a valid deposit amount', { variant: 'warning' })
      return
    }
    if (amount > balance) {
      enqueueSnackbar('Insufficient TestNet balance for this deposit', { variant: 'error' })
      return
    }

    setLoadingDeposit(true)
    setTimeout(() => {
      setBalance((prevBalance) => Number((prevBalance - amount).toFixed(6)))
      setVaultBalance((prevVault) => Number((prevVault + amount).toFixed(6)))
      enqueueSnackbar(`Deposited ${amount.toFixed(3)} ALGO to the vault`, { variant: 'success' })
      setLoadingDeposit(false)
    }, 400)
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="rounded-[36px] bg-white p-10 shadow-2xl shadow-slate-200/70">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Savings Vault</p>
            <h1 className="mt-3 text-5xl font-semibold text-slate-900">Vault Dashboard</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500">
              Simulate a TestNet savings vault with wallet, balance, deposit, milestone badges, and progress tracking.
            </p>
          </div>
          <div className="mb-8 flex flex-col gap-4 rounded-[28px] bg-slate-50 p-6 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Simulated TestNet Wallet</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Connect to start saving</p>
            </div>
            <button
              className="btn btn-primary rounded-full px-6 py-3 text-sm font-semibold"
              onClick={activeAddress ? handleDisconnectWallet : handleConnectWallet}
            >
              {activeAddress ? 'Disconnect Wallet' : 'Connect Wallet'}
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-[28px] bg-slate-50 p-8 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Wallet</p>
              <div className="mt-4 text-xl font-semibold text-slate-900">
                {activeAddress ? ellipseAddress(activeAddress) : 'Not connected'}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className={`badge ${activeAddress ? 'badge-success' : 'badge-outline'} text-sm`}>
                  {activeAddress ? 'Connected' : 'Not connected'}
                </span>
                <span className="text-sm text-slate-500">{networkName}</span>
              </div>
              {activeAddress && (
                <p className="mt-4 text-sm text-slate-500 break-all">{activeAddress}</p>
              )}
            </section>

            <section className="rounded-[28px] bg-slate-50 p-8 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Balance</p>
              <div className="mt-4 text-5xl font-semibold text-slate-900">
                {activeAddress ? `${balance.toFixed(6)} ALGO` : '0.000000 ALGO'}
              </div>
              <p className="mt-4 max-w-sm text-sm text-slate-500">
                Available funds to deposit into your simulated vault balance.
              </p>
            </section>
          </div>

          <section className="mt-8 rounded-[28px] bg-slate-50 p-8 shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Deposit</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">Top up your vault balance</p>
              </div>
              <div className="flex w-full flex-col gap-4 md:w-2/3 md:flex-row md:items-center">
                <input
                  type="number"
                  min="0.001"
                  step="0.001"
                  value={depositAmount}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-slate-900 shadow-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  onChange={(event) => setDepositAmount(event.target.value)}
                />
                <button
                  className="btn btn-primary h-14 w-full rounded-2xl md:w-56"
                  disabled={!activeAddress || loadingDeposit || Number(depositAmount) <= 0}
                  onClick={handleDeposit}
                >
                  {loadingDeposit ? 'Depositing...' : 'Deposit to Vault'}
                </button>
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-[28px] bg-slate-50 p-8 shadow-sm">
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Milestones</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">Unlock rewards as your vault grows</p>
              </div>
              <div className="text-sm text-slate-500">
                Progress to next milestone: {progressToNext.toFixed(0)}%
              </div>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-lime-400"
                style={{ width: `${progressToNext}%` }}
              />
            </div>
            <div className="mt-6 flex flex-col gap-4 md:flex-row">
              {milestones.map((milestone) => {
                const unlocked = vaultBalance >= milestone.value
                return (
                  <div
                    key={milestone.value}
                    className={`flex-1 rounded-3xl border p-5 shadow-sm transition ${
                      unlocked ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{milestone.icon}</span>
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{milestone.label}</p>
                    </div>
                    <p className="mt-4 text-3xl font-semibold text-slate-900">{milestone.value} ALGO</p>
                    <span className={`badge mt-4 ${unlocked ? 'badge-success' : 'badge-outline'}`}>
                      {unlocked ? 'Unlocked' : 'Locked'}
                    </span>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
