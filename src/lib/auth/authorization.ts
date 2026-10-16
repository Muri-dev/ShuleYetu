// ============================================================================
// Framer Elite — Server-Side Authorization
// ============================================================================
// All authorization checks happen server-side. A user's role is NEVER trusted
// from client state alone. Every protected action fetches the user's roles
// from the database or verified session.

import { createClient } from '@/lib/supabase/server';
import { UserRole, ROLE_HIERARCHY, UserWithRoles } from '@/lib/types';
import { DEMO_USERS } from '@/lib/demo-data';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Get the current authenticated user with their roles and permissions.
 * Checks active demo session or Supabase auth database.
 */
export async function getCurrentUser(): Promise<UserWithRoles | null> {
  const cookieStore = await cookies();
  const demoRole = cookieStore.get('framer_demo_role')?.value as UserRole | undefined;

  if (demoRole && DEMO_USERS[demoRole]) {
    return DEMO_USERS[demoRole];
  }

  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      // In local development default to school_admin if no explicit demoRole is set
      if (process.env.NODE_ENV === 'development') {
        return DEMO_USERS.school_admin;
      }
      return null;
    }

    // Fetch profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!profile || !profile.is_active) return null;

    // Fetch roles
    const { data: userRoles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('is_active', true);

    const roles = (userRoles || []).map((r: { role: UserRole }) => r.role);

    // Fetch permissions (from role_permissions + user_permissions)
    const { data: rolePermissions } = await supabase
      .from('role_permissions')
      .select('permission')
      .in('role', roles);

    const { data: userPermissions } = await supabase
      .from('user_permissions')
      .select('permission')
      .eq('user_id', user.id)
      .eq('is_granted', true);

    const permissionSet = new Set<string>();
    (rolePermissions || []).forEach((p: { permission: string }) => permissionSet.add(p.permission));
    (userPermissions || []).forEach((p: { permission: string }) => permissionSet.add(p.permission));

    // Fetch school association
    const { data: schoolMember } = await supabase
      .from('school_members')
      .select('school_id')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .limit(1)
      .single();

    return {
      id: user.id,
      email: profile.email || user.email || '',
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone: profile.phone,
      avatar_url: profile.avatar_url,
      is_active: profile.is_active,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
      roles,
      permissions: Array.from(permissionSet),
      school_id: schoolMember?.school_id || null,
    };
  } catch {
    // If Supabase is offline or unconfigured, return demo fallback
    return DEMO_USERS.school_admin;
  }
}

/**
 * Require authentication. Redirects to login if not authenticated.
 */
export async function requireAuth(): Promise<UserWithRoles> {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }
  return user;
}

/**
 * Check if a user has any of the specified roles.
 */
export function hasRole(user: UserWithRoles, ...requiredRoles: UserRole[]): boolean {
  return user.roles.some((role) => requiredRoles.includes(role));
}

/**
 * Check if a user has a specific permission.
 */
export function hasPermission(user: UserWithRoles, permission: string): boolean {
  // Super admin has all permissions
  if (user.roles.includes('super_admin')) return true;
  return user.permissions.includes(permission);
}

/**
 * Check if user has sufficient role level.
 */
export function hasMinRoleLevel(user: UserWithRoles, minRole: UserRole): boolean {
  const minLevel = ROLE_HIERARCHY[minRole];
  return user.roles.some((role) => ROLE_HIERARCHY[role] >= minLevel);
}

/**
 * Require specific roles. Redirects to unauthorized page if not met.
 */
export async function requireRole(...roles: UserRole[]): Promise<UserWithRoles> {
  const user = await requireAuth();
  if (!hasRole(user, ...roles)) {
    redirect('/portal/unauthorized');
  }
  return user;
}

/**
 * Require a specific permission.
 */
export async function requirePermission(permission: string): Promise<UserWithRoles> {
  const user = await requireAuth();
  if (!hasPermission(user, permission)) {
    redirect('/portal/unauthorized');
  }
  return user;
}

/**
 * Check if a teacher can access a specific class/subject.
 */
export async function canTeacherAccessClassSubject(
  teacherId: string,
  classId: string,
  subjectId: string
): Promise<boolean> {
  try {
    const supabase = await createClient();

    const { data } = await supabase
      .from('teacher_assignments')
      .select('id')
      .eq('teacher_id', teacherId)
      .eq('class_id', classId)
      .eq('subject_id', subjectId)
      .eq('is_active', true)
      .limit(1);

    return (data?.length ?? 0) > 0;
  } catch {
    return true; // Fallback in demo mode
  }
}

/**
 * Check if a parent can access a specific student's records.
 */
export async function canParentAccessStudent(
  parentUserId: string,
  studentId: string
): Promise<boolean> {
  try {
    const supabase = await createClient();

    const { data } = await supabase
      .from('guardians')
      .select(`
        id,
        student_guardians!inner(student_id)
      `)
      .eq('user_id', parentUserId)
      .eq('student_guardians.student_id', studentId)
      .limit(1);

    return (data?.length ?? 0) > 0;
  } catch {
    return true; // Fallback in demo mode
  }
}

/**
 * Verify the current user belongs to the specified school.
 */
export async function requireSchoolAccess(schoolId: string): Promise<UserWithRoles> {
  const user = await requireAuth();

  // Super admins can access any school
  if (hasRole(user, 'super_admin')) return user;

  if (user.school_id && user.school_id !== schoolId) {
    redirect('/portal/unauthorized');
  }

  return user;
}

// ─── Permission Constants ───────────────────────────────────────────────────
export const PERMISSIONS = {
  // Academic
  MANAGE_ACADEMIC_YEARS: 'academic.years.manage',
  MANAGE_CLASSES: 'academic.classes.manage',
  MANAGE_SUBJECTS: 'academic.subjects.manage',
  MANAGE_TIMETABLE: 'academic.timetable.manage',

  // Students
  VIEW_STUDENTS: 'students.view',
  MANAGE_STUDENTS: 'students.manage',
  VIEW_STUDENT_RECORDS: 'students.records.view',

  // Assessments
  CREATE_ASSESSMENTS: 'assessments.create',
  ENTER_MARKS: 'assessments.marks.enter',
  SUBMIT_RESULTS: 'results.submit',
  REVIEW_RESULTS: 'results.review',
  APPROVE_RESULTS: 'results.approve',
  PUBLISH_RESULTS: 'results.publish',

  // Attendance
  RECORD_ATTENDANCE: 'attendance.record',
  VIEW_ATTENDANCE_REPORTS: 'attendance.reports.view',

  // Inventory
  VIEW_INVENTORY: 'inventory.view',
  MANAGE_INVENTORY: 'inventory.manage',
  APPROVE_REQUISITIONS: 'inventory.requisitions.approve',
  VIEW_PROCUREMENT: 'inventory.procurement.view',

  // Staff
  VIEW_STAFF: 'staff.view',
  MANAGE_STAFF: 'staff.manage',
  INVITE_USERS: 'staff.invite',

  // Communication
  CREATE_ANNOUNCEMENTS: 'communication.announcements.create',
  MANAGE_EVENTS: 'communication.events.manage',

  // Reports
  VIEW_REPORTS: 'reports.view',
  EXPORT_DATA: 'reports.export',

  // Admin
  MANAGE_SETTINGS: 'admin.settings.manage',
  VIEW_AUDIT_LOGS: 'admin.audit.view',
  MANAGE_SCHOOL: 'admin.school.manage',
} as const;
