"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AuthLayout } from "@/components/auth/auth-layout"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log({ email, password, rememberMe })
    router.push("/")
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Login To Your Account</h1>
        </div>

        {/* Google Login Button */}
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.8055 10.2275C19.8055 9.51764 19.7516 8.83569 19.6363 8.17163H10.2002V11.8883H15.6016C15.3812 13.1196 14.6525 14.1759 13.5713 14.8328V17.2732H16.7582C18.6562 15.5732 19.8055 13.1346 19.8055 10.2275Z"
              fill="#4285F4"
            />
            <path
              d="M10.2002 20.0001C12.897 20.0001 15.1715 19.1142 16.7582 17.2732L13.5713 14.8328C12.6783 15.4447 11.5326 15.7918 10.2002 15.7918C7.5945 15.7918 5.38762 14.0617 4.58906 11.7101H1.30078V14.2269C2.87414 17.6726 6.2219 20.0001 10.2002 20.0001Z"
              fill="#34A853"
            />
            <path
              d="M4.58906 11.7101C4.40156 11.0982 4.29688 10.4566 4.29688 9.80006C4.29688 9.14351 4.40156 8.50193 4.58906 7.89006V5.37329H1.30078C0.619531 6.69443 0.230469 8.20349 0.230469 9.80006C0.230469 11.3966 0.619531 12.9057 1.30078 14.2268L4.58906 11.7101Z"
              fill="#FBBC05"
            />
            <path
              d="M10.2002 3.80825C11.6838 3.80825 13.0033 4.29825 14.0496 5.30458L16.8909 2.46325C15.1639 0.891935 12.8894 0 10.2002 0C6.2219 0 2.87414 2.32751 1.30078 5.77319L4.58906 8.28996C5.38762 5.93841 7.5945 4.20825 10.2002 4.20825Z"
              fill="#EA4335"
            />
          </svg>
          <span>Login With Google</span>
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or Login With Email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(!!checked)} />
              <Label htmlFor="remember" className="text-sm">
                Remember Me
              </Label>
            </div>
          </div>

          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            Login
          </Button>
        </form>

        <div className="text-center">
          <Link href="/auth/forgot-password" className="text-sm text-purple-600 hover:underline">
            Forgot Your Password?
          </Link>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't Have An Account?{" "}
            <Link href="/auth/register" className="text-purple-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
