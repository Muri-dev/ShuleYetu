// ============================================================================
// Framer Elite — Shared Type Definitions
// ============================================================================

// ─── Roles ──────────────────────────────────────────────────────────────────
export type UserRole =
  | 'super_admin'
  | 'school_admin'
  | 'headteacher'
  | 'teacher'
  | 'parent'
  | 'inventory_officer'
  | 'accountant'
  | 'non_teaching_staff';

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'Super Administrator',
  school_admin: 'School Administrator',
  headteacher: 'Headteacher',
  teacher: 'Teacher',
  parent: 'Parent / Guardian',
  inventory_officer: 'Inventory Officer',
  accountant: 'Accountant',
  non_teaching_staff: 'Non-Teaching Staff',
};

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  super_admin: 100,
  school_admin: 90,
  headteacher: 80,
  teacher: 60,
  inventory_officer: 50,
  accountant: 50,
  non_teaching_staff: 30,
  parent: 20,
};

// ─── Profile ────────────────────────────────────────────────────────────────
export interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string | null;
  avatar_url?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserWithRoles extends Profile {
  roles: UserRole[];
  permissions: string[];
  school_id?: string | null;
}

// ─── School ─────────────────────────────────────────────────────────────────
export interface School {
  id: string;
  name: string;
  code: string;
  motto?: string | null;
  logo_url?: string | null;
  address?: string | null;
  county?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  established_year?: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Academic ───────────────────────────────────────────────────────────────
export interface AcademicYear {
  id: string;
  school_id: string;
  name: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  created_at: string;
}

export interface Term {
  id: string;
  academic_year_id: string;
  name: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  term_number: number;
  created_at: string;
}

export interface Department {
  id: string;
  school_id: string;
  name: string;
  head_of_department_id?: string | null;
  created_at: string;
}

export interface ClassGrade {
  id: string;
  school_id: string;
  name: string;
  level: number;
  description?: string | null;
  created_at: string;
}

export interface Stream {
  id: string;
  class_id: string;
  name: string;
  class_teacher_id?: string | null;
  capacity?: number | null;
  created_at: string;
}

export interface Subject {
  id: string;
  school_id: string;
  name: string;
  code: string;
  department_id?: string | null;
  is_elective: boolean;
  created_at: string;
}

export interface ClassSubject {
  id: string;
  class_id: string;
  subject_id: string;
  is_mandatory: boolean;
}

export interface TeacherAssignment {
  id: string;
  teacher_id: string;
  class_id: string;
  subject_id: string;
  stream_id?: string | null;
  academic_year_id: string;
  is_active: boolean;
  created_at: string;
}

// ─── Student ────────────────────────────────────────────────────────────────
export type Gender = 'male' | 'female' | 'other';

export interface Student {
  id: string;
  school_id: string;
  admission_number: string;
  first_name: string;
  last_name: string;
  middle_name?: string | null;
  date_of_birth: string;
  gender: Gender;
  nationality?: string | null;
  religion?: string | null;
  photo_url?: string | null;
  medical_info?: string | null;
  special_needs?: string | null;
  previous_school?: string | null;
  admission_date: string;
  status: 'active' | 'inactive' | 'transferred' | 'graduated' | 'suspended';
  fee_status?: 'cleared' | 'partial' | 'overdue';
  term_tuition?: number;
  amount_paid?: number;
  fee_balance?: number;
  last_payment_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  student_id: string;
  class_id: string;
  stream_id?: string | null;
  academic_year_id: string;
  status: 'active' | 'promoted' | 'repeated' | 'transferred';
  created_at: string;
}

export interface Guardian {
  id: string;
  user_id?: string | null;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string | null;
  relationship: string;
  occupation?: string | null;
  address?: string | null;
  is_emergency_contact: boolean;
  created_at: string;
}

export interface StudentGuardian {
  id: string;
  student_id: string;
  guardian_id: string;
  is_primary: boolean;
}

// ─── Assessments & Results ──────────────────────────────────────────────────
export type AssessmentCategory = 'cat' | 'midterm' | 'endterm' | 'assignment' | 'practical' | 'project';

export interface AssessmentType {
  id: string;
  school_id: string;
  name: string;
  category: AssessmentCategory;
  max_marks: number;
  weight_percentage: number;
  created_at: string;
}

export interface Assessment {
  id: string;
  assessment_type_id: string;
  class_id: string;
  subject_id: string;
  term_id: string;
  title: string;
  date: string;
  created_by: string;
  created_at: string;
}

export type ResultStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'returned' | 'published';

export interface Mark {
  id: string;
  assessment_id: string;
  student_id: string;
  marks_obtained: number;
  remarks?: string | null;
  entered_by: string;
  created_at: string;
  updated_at: string;
}

export interface ResultSubmission {
  id: string;
  assessment_id: string;
  submitted_by: string;
  status: ResultStatus;
  version: number;
  submission_date: string;
  admin_comments?: string | null;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  approved_by?: string | null;
  approved_at?: string | null;
  published_by?: string | null;
  published_at?: string | null;
  created_at: string;
}

export interface ResultVersion {
  id: string;
  submission_id: string;
  version: number;
  marks_snapshot: Record<string, number>;
  changed_by: string;
  change_reason?: string | null;
  created_at: string;
}

// ─── Attendance ─────────────────────────────────────────────────────────────
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface AttendanceRecord {
  id: string;
  student_id: string;
  class_id: string;
  date: string;
  status: AttendanceStatus;
  subject_id?: string | null;
  recorded_by: string;
  remarks?: string | null;
  created_at: string;
}

// ─── Inventory ──────────────────────────────────────────────────────────────
export interface InventoryCategory {
  id: string;
  school_id: string;
  name: string;
  description?: string | null;
  parent_id?: string | null;
  created_at: string;
}

export interface InventoryItem {
  id: string;
  school_id: string;
  category_id: string;
  name: string;
  sku: string;
  description?: string | null;
  unit: string;
  current_stock: number;
  reorder_level: number;
  unit_cost?: number | null;
  location?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Asset {
  id: string;
  school_id: string;
  name: string;
  asset_tag: string;
  category_id: string;
  serial_number?: string | null;
  purchase_date?: string | null;
  purchase_cost?: number | null;
  condition: 'new' | 'good' | 'fair' | 'poor' | 'damaged' | 'disposed';
  assigned_to?: string | null;
  location?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Supplier {
  id: string;
  school_id: string;
  name: string;
  contact_person?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  is_active: boolean;
  created_at: string;
}

export type StockMovementType =
  | 'receipt'
  | 'issue'
  | 'transfer_in'
  | 'transfer_out'
  | 'return'
  | 'adjustment'
  | 'damaged'
  | 'lost';

export interface StockMovement {
  id: string;
  item_id: string;
  movement_type: StockMovementType;
  quantity: number;
  reference_number?: string | null;
  from_location?: string | null;
  to_location?: string | null;
  reason?: string | null;
  performed_by: string;
  created_at: string;
}

export type RequisitionStatus = 'pending' | 'approved' | 'rejected' | 'fulfilled' | 'cancelled';

export interface Requisition {
  id: string;
  school_id: string;
  requested_by: string;
  item_id: string;
  quantity: number;
  reason: string;
  status: RequisitionStatus;
  approved_by?: string | null;
  approved_at?: string | null;
  fulfilled_at?: string | null;
  comments?: string | null;
  created_at: string;
}

// ─── Communication ──────────────────────────────────────────────────────────
export type AnnouncementTarget = 'all' | 'staff' | 'teachers' | 'parents' | 'students' | 'specific_class';

export interface Announcement {
  id: string;
  school_id: string;
  title: string;
  content: string;
  target: AnnouncementTarget;
  target_class_id?: string | null;
  is_public: boolean;
  published_by: string;
  published_at?: string | null;
  expires_at?: string | null;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  link?: string | null;
  created_at: string;
}

export interface SchoolEvent {
  id: string;
  school_id: string;
  title: string;
  description?: string | null;
  start_date: string;
  end_date?: string | null;
  location?: string | null;
  is_all_day: boolean;
  created_by: string;
  created_at: string;
}

export interface TimetableSlot {
  id: string;
  class_id: string;
  stream_id?: string | null;
  subject_id: string;
  teacher_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  room?: string | null;
  term_id: string;
  created_at: string;
}

// ─── Audit ──────────────────────────────────────────────────────────────────
export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  old_values?: Record<string, unknown> | null;
  new_values?: Record<string, unknown> | null;
  ip_address?: string | null;
  user_agent?: string | null;
  created_at: string;
}

// ─── API Response ───────────────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// ─── Navigation ─────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  roles?: UserRole[];
  children?: NavItem[];
  badge?: string | number;
}
