import { AuthGuard } from "@/modules/auth/ui/components/auth-guard"
import { OrganizationGuard } from "@/modules/auth/ui/components/organization-guard"

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <OrganizationGuard>
        <main className="flex flex-1 flex-col">
          {children}
        </main>
      </OrganizationGuard>
    </AuthGuard>
  )
}