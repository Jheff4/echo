import { AuthLayout } from '@/modules/auth/ui/layouts/auth-layout'

export default function AuthLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>
}
