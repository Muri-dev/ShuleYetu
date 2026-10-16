import { notFound } from "next/navigation";
import { DEMO_STUDENTS } from "@/lib/demo-data";
import { StudentProfileView } from "@/components/portal/student-profile-view";
import { getCurrentUser } from "@/lib/auth/authorization";

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  const student = DEMO_STUDENTS.find((s) => s.id === id);

  if (!student) {
    notFound();
  }

  return (
    <StudentProfileView
      student={student}
      backUrl="/portal/students"
      viewerRole={user?.roles[0]}
    />
  );
}
