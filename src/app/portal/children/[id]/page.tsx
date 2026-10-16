import { notFound } from "next/navigation";
import { DEMO_STUDENTS } from "@/lib/demo-data";
import { StudentProfileView } from "@/components/portal/student-profile-view";

export default async function ChildDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const student = DEMO_STUDENTS.find((s) => s.id === id);

  if (!student) {
    notFound();
  }

  return <StudentProfileView student={student} backUrl="/portal/children" />;
}
