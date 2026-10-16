import { z } from 'zod';

// ─── Auth Schemas ───────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirm_password: z.string(),
  first_name: z.string().min(2, 'First name must be at least 2 characters').max(50),
  last_name: z.string().min(2, 'Last name must be at least 2 characters').max(50),
  phone: z.string().optional(),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
});

export const resetPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const updatePasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
});

// ─── Profile Schemas ────────────────────────────────────────────────────────
export const updateProfileSchema = z.object({
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  phone: z.string().optional(),
});

// ─── School Schemas ─────────────────────────────────────────────────────────
export const schoolSchema = z.object({
  name: z.string().min(3, 'School name must be at least 3 characters').max(200),
  code: z.string().min(2).max(20).regex(/^[A-Z0-9-]+$/, 'Code must be uppercase alphanumeric'),
  motto: z.string().max(200).optional(),
  address: z.string().max(500).optional(),
  county: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  established_year: z.number().min(1900).max(new Date().getFullYear()).optional(),
});

// ─── Academic Schemas ───────────────────────────────────────────────────────
export const academicYearSchema = z.object({
  name: z.string().min(4, 'Year name is required (e.g., "2026")').max(50),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  is_current: z.boolean().default(false),
});

export const termSchema = z.object({
  academic_year_id: z.string().uuid(),
  name: z.string().min(2).max(50),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  term_number: z.number().min(1).max(4),
  is_current: z.boolean().default(false),
});

export const classSchema = z.object({
  name: z.string().min(1).max(50),
  level: z.number().min(1).max(12),
  description: z.string().max(200).optional(),
});

export const streamSchema = z.object({
  class_id: z.string().uuid(),
  name: z.string().min(1).max(50),
  class_teacher_id: z.string().uuid().optional(),
  capacity: z.number().min(1).max(100).optional(),
});

export const subjectSchema = z.object({
  name: z.string().min(2).max(100),
  code: z.string().min(2).max(10).regex(/^[A-Z0-9]+$/, 'Code must be uppercase alphanumeric'),
  department_id: z.string().uuid().optional(),
  is_elective: z.boolean().default(false),
});

// ─── Student Schemas ────────────────────────────────────────────────────────
export const studentSchema = z.object({
  admission_number: z.string().min(3).max(20),
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  middle_name: z.string().max(50).optional(),
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  gender: z.enum(['male', 'female', 'other']),
  nationality: z.string().max(50).optional(),
  religion: z.string().max(50).optional(),
  medical_info: z.string().max(1000).optional(),
  special_needs: z.string().max(500).optional(),
  previous_school: z.string().max(200).optional(),
  admission_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const guardianSchema = z.object({
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  phone: z.string().min(10).max(15),
  email: z.string().email().optional(),
  relationship: z.string().min(2).max(50),
  occupation: z.string().max(100).optional(),
  address: z.string().max(500).optional(),
  is_emergency_contact: z.boolean().default(false),
});

export const enrollmentSchema = z.object({
  student_id: z.string().uuid(),
  class_id: z.string().uuid(),
  stream_id: z.string().uuid().optional(),
  academic_year_id: z.string().uuid(),
});

// ─── Assessment Schemas ─────────────────────────────────────────────────────
export const assessmentTypeSchema = z.object({
  name: z.string().min(2).max(100),
  category: z.enum(['cat', 'midterm', 'endterm', 'assignment', 'practical', 'project']),
  max_marks: z.number().min(1).max(1000),
  weight_percentage: z.number().min(0).max(100),
});

export const assessmentSchema = z.object({
  assessment_type_id: z.string().uuid(),
  class_id: z.string().uuid(),
  subject_id: z.string().uuid(),
  term_id: z.string().uuid(),
  title: z.string().min(3).max(200),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const markSchema = z.object({
  assessment_id: z.string().uuid(),
  student_id: z.string().uuid(),
  marks_obtained: z.number().min(0),
  remarks: z.string().max(500).optional(),
});

export const marksEntrySchema = z.object({
  assessment_id: z.string().uuid(),
  marks: z.array(z.object({
    student_id: z.string().uuid(),
    marks_obtained: z.number().min(0),
    remarks: z.string().max(500).optional(),
  })),
});

export const resultReviewSchema = z.object({
  submission_id: z.string().uuid(),
  action: z.enum(['approve', 'return']),
  comments: z.string().max(1000).optional(),
});

// ─── Attendance Schemas ─────────────────────────────────────────────────────
export const attendanceSchema = z.object({
  class_id: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  subject_id: z.string().uuid().optional(),
  records: z.array(z.object({
    student_id: z.string().uuid(),
    status: z.enum(['present', 'absent', 'late', 'excused']),
    remarks: z.string().max(200).optional(),
  })),
});

// ─── Inventory Schemas ──────────────────────────────────────────────────────
export const inventoryCategorySchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  parent_id: z.string().uuid().optional(),
});

export const inventoryItemSchema = z.object({
  category_id: z.string().uuid(),
  name: z.string().min(2).max(200),
  sku: z.string().min(2).max(50),
  description: z.string().max(500).optional(),
  unit: z.string().min(1).max(20),
  reorder_level: z.number().min(0),
  unit_cost: z.number().min(0).optional(),
  location: z.string().max(100).optional(),
});

export const stockMovementSchema = z.object({
  item_id: z.string().uuid(),
  movement_type: z.enum(['receipt', 'issue', 'transfer_in', 'transfer_out', 'return', 'adjustment', 'damaged', 'lost']),
  quantity: z.number().min(1),
  reference_number: z.string().max(50).optional(),
  from_location: z.string().max(100).optional(),
  to_location: z.string().max(100).optional(),
  reason: z.string().max(500).optional(),
});

export const requisitionSchema = z.object({
  item_id: z.string().uuid(),
  quantity: z.number().min(1),
  reason: z.string().min(5).max(500),
});

// ─── Communication Schemas ──────────────────────────────────────────────────
export const announcementSchema = z.object({
  title: z.string().min(3).max(200),
  content: z.string().min(10).max(5000),
  target: z.enum(['all', 'staff', 'teachers', 'parents', 'students', 'specific_class']),
  target_class_id: z.string().uuid().optional(),
  is_public: z.boolean().default(false),
  expires_at: z.string().optional(),
});

export const eventSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().max(2000).optional(),
  start_date: z.string(),
  end_date: z.string().optional(),
  location: z.string().max(200).optional(),
  is_all_day: z.boolean().default(false),
});

// ─── Type Exports ───────────────────────────────────────────────────────────
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
export type SchoolInput = z.infer<typeof schoolSchema>;
export type StudentInput = z.infer<typeof studentSchema>;
export type GuardianInput = z.infer<typeof guardianSchema>;
export type MarksEntryInput = z.infer<typeof marksEntrySchema>;
export type AttendanceInput = z.infer<typeof attendanceSchema>;
export type StockMovementInput = z.infer<typeof stockMovementSchema>;
export type RequisitionInput = z.infer<typeof requisitionSchema>;
export type AnnouncementInput = z.infer<typeof announcementSchema>;
