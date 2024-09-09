'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setError(null)
  setLoading(true)

  const result = await signIn('credentials', {
    redirect: false,
    email,
    password,
    callbackUrl: '/dashboard',
  })

  setLoading(false)

  if (result?.error) {
    console.log(`🚀 ~ file: page.tsx:21 ~ handleSubmit ~ result:`, result)
    setError('Invalid email or password')
  } else {
    window.location.href = result.url
  }
}

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col border-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
        {error && <p className="text-red-500">{error}</p>}
        <Link href="/signup">Don&lsquo;t have an account? Sign Up Instead</Link>
      </form>
    </div>
  )
}