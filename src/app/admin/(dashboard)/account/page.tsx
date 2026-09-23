import AccountSettings from "@/components/admin/AccountSettings";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth/admin";
import { cmsModules, roleLabels } from "@/lib/cms/modules";

export default async function AccountPage() {
  const profile = await requireAdmin();
  const fullAccess = profile.role !== "editor";
  const modules = fullAccess ? cmsModules : cmsModules.filter((module) => profile.permissions.includes(module.key));

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Hệ thống"
        title="Tài khoản của tôi"
        description={
          <>
            Vai trò: <strong>{roleLabels[profile.role]}</strong>. {fullAccess ? "Bạn được sửa mọi mục." : `Bạn được sửa: ${modules.map((module) => module.label).join(", ") || "chưa có mục nào"}.`}
          </>
        }
      />
      <AccountSettings email={profile.email} fullName={profile.fullName ?? ""} />
    </div>
  );
}
