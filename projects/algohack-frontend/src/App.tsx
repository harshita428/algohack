import { useState } from 'react'

export default function App() {
  const [account, setAccount] = useState<string | null>(null)
  const [balance, setBalance] = useState<number>(10)
  const [vault, setVault] = useState<number>(0)
  const [amount, setAmount] = useState<number>(0.1)

  const milestones = [
    { value: 1, label: '🌱 First Step' },
    { value: 5, label: '🔥 Saver Streak' },
    { value: 10, label: '🏆 Vault Master' },
  ]

  const connectWallet = () => {
    setAccount('TESTNET-ADDR-1234')
  }

  const handleDeposit = () => {
    if (!account) {
      alert('Please connect wallet first')
      return
    }

    if (balance >= amount) {
      milestones.forEach((m) => {
        if (vault < m.value && vault + amount >= m.value) {
          alert(`🎉 Achievement Unlocked: ${m.label}`)
        }
      })
      setBalance(balance - amount)
      setVault(vault + amount)
    } else {
      alert('Insufficient balance')
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>💰 Savings Vault</h1>

        {/* Wallet */}
        <div style={styles.section}>
          <button style={styles.button} onClick={connectWallet}>
            {account ? 'Connected ✅' : 'Connect Wallet'}
          </button>
          <p>{account || 'Not connected'}</p>
        </div>

        {/* Balance */}
        <div style={styles.row}>
          <div style={styles.box}>
            <h3>Balance</h3>
            <p>{balance.toFixed(2)} ALGO</p>
          </div>
          <div style={styles.box}>
            <h3>Vault</h3>
            <p>{vault.toFixed(2)} ALGO</p>
          </div>
        </div>

        {/* Deposit */}
        <div style={styles.section}>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            style={styles.input}
          />
          <button style={styles.button} onClick={handleDeposit}>
            Deposit
          </button>
        </div>

        {/* Milestones */}
        <div style={styles.section}>
          <h3>🏆 Milestones</h3>
          <div style={styles.milestones}>
            {milestones.map((m) => {
              const unlocked = vault >= m.value

              return (
                <div
                  key={m.value}
                  style={{
                    ...styles.milestone,
                    backgroundColor: unlocked ? '#22c55e' : '#94a3b8',
                    transform: unlocked ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  <div>{unlocked ? '✅' : '🔒'}</div>
                  <div>{m.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    height: '100vh',
    background: '#1e293b',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    width: '350px',
    textAlign: 'center' as const,
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  },
  section: {
    margin: '20px 0',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  box: {
    flex: 1,
    background: '#f1f5f9',
    padding: '10px',
    borderRadius: '8px',
  },
  button: {
    padding: '10px 15px',
    background: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  input: {
    padding: '8px',
    width: '60%',
    marginRight: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  milestones: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  milestone: {
    padding: '10px',
    borderRadius: '8px',
    color: 'white',
    fontWeight: 'bold',
    width: '30%',
  },
}
