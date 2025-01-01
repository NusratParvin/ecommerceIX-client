import { ChangePasswordForm } from "./_components/changePasswordForm";

export default function ChangePasswordPage() {
  return (
    <div className="mx-auto w-full md:w-11/12 min-h-screen py-10">
      <h1 className="text-2xl font-bold mb-6">Change Password</h1>
      <ChangePasswordForm />
    </div>
  );
}
