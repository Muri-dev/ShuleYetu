-- ============================================================================
-- Framer Elite — Database Schema Migration
-- Version: 001_initial_schema
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Profiles (extends auth.users) ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── User Roles ─────────────────────────────────────────────────────────────
CREATE TYPE user_role AS ENUM (
  'super_admin', 'school_admin', 'headteacher', 'teacher',
  'parent', 'inventory_officer', 'accountant', 'non_teaching_staff'
);

CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  assigned_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role ON user_roles(role);

-- ─── Role Permissions ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS role_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role user_role NOT NULL,
  permission TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(role, permission)
);

CREATE TABLE IF NOT EXISTS user_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  permission TEXT NOT NULL,
  is_granted BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, permission)
);

-- ─── Schools ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS schools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  motto TEXT,
  logo_url TEXT,
  address TEXT,
  county TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  established_year INTEGER,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── School Members (users ↔ schools) ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS school_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, school_id)
);

CREATE INDEX idx_school_members_user ON school_members(user_id);
CREATE INDEX idx_school_members_school ON school_members(school_id);

-- ─── Academic Years ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS academic_years (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_current BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT valid_year_dates CHECK (end_date > start_date)
);

CREATE INDEX idx_academic_years_school ON academic_years(school_id);

-- ─── Terms ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS terms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  term_number INTEGER NOT NULL CHECK (term_number BETWEEN 1 AND 4),
  is_current BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT valid_term_dates CHECK (end_date > start_date)
);

CREATE INDEX idx_terms_academic_year ON terms(academic_year_id);

-- ─── Departments ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  head_of_department_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Classes ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 12),
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_classes_school ON classes(school_id);

-- ─── Streams ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS streams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  class_teacher_id UUID REFERENCES profiles(id),
  capacity INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_streams_class ON streams(class_id);

-- ─── Subjects ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  department_id UUID REFERENCES departments(id),
  is_elective BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, code)
);

-- ─── Class Subjects ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS class_subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  is_mandatory BOOLEAN NOT NULL DEFAULT true,
  UNIQUE(class_id, subject_id)
);

-- ─── Teacher Assignments ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS teacher_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  stream_id UUID REFERENCES streams(id),
  academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_teacher_assignments_teacher ON teacher_assignments(teacher_id);
CREATE INDEX idx_teacher_assignments_class ON teacher_assignments(class_id);

-- ─── Students ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  admission_number TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  middle_name TEXT,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  nationality TEXT DEFAULT 'Kenyan',
  religion TEXT,
  photo_url TEXT,
  medical_info TEXT,
  special_needs TEXT,
  previous_school TEXT,
  admission_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'transferred', 'graduated', 'suspended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, admission_number)
);

CREATE INDEX idx_students_school ON students(school_id);
CREATE INDEX idx_students_status ON students(status);
CREATE INDEX idx_students_admission ON students(admission_number);

-- ─── Enrollments ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  stream_id UUID REFERENCES streams(id),
  academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'promoted', 'repeated', 'transferred')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, academic_year_id)
);

CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_class ON enrollments(class_id);
CREATE INDEX idx_enrollments_year ON enrollments(academic_year_id);

-- ─── Guardians ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS guardians (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  relationship TEXT NOT NULL,
  occupation TEXT,
  address TEXT,
  is_emergency_contact BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_guardians_user ON guardians(user_id);

-- ─── Student Guardians ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS student_guardians (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  guardian_id UUID NOT NULL REFERENCES guardians(id) ON DELETE CASCADE,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  UNIQUE(student_id, guardian_id)
);

-- ─── Assessment Types ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS assessment_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('cat', 'midterm', 'endterm', 'assignment', 'practical', 'project')),
  max_marks INTEGER NOT NULL CHECK (max_marks > 0),
  weight_percentage NUMERIC(5,2) NOT NULL CHECK (weight_percentage BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Assessments ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_type_id UUID NOT NULL REFERENCES assessment_types(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  term_id UUID NOT NULL REFERENCES terms(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  created_by UUID NOT NULL REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_assessments_class ON assessments(class_id);
CREATE INDEX idx_assessments_subject ON assessments(subject_id);
CREATE INDEX idx_assessments_term ON assessments(term_id);

-- ─── Marks ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS marks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  marks_obtained NUMERIC(6,2) NOT NULL CHECK (marks_obtained >= 0),
  remarks TEXT,
  entered_by UUID NOT NULL REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(assessment_id, student_id)
);

CREATE INDEX idx_marks_assessment ON marks(assessment_id);
CREATE INDEX idx_marks_student ON marks(student_id);

-- ─── Result Submissions ────────────────────────────────────────────────────
CREATE TYPE result_status AS ENUM ('draft', 'submitted', 'under_review', 'approved', 'returned', 'published');

CREATE TABLE IF NOT EXISTS result_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  submitted_by UUID NOT NULL REFERENCES profiles(id),
  status result_status NOT NULL DEFAULT 'draft',
  version INTEGER NOT NULL DEFAULT 1,
  submission_date TIMESTAMPTZ,
  admin_comments TEXT,
  reviewed_by UUID REFERENCES profiles(id),
  reviewed_at TIMESTAMPTZ,
  approved_by UUID REFERENCES profiles(id),
  approved_at TIMESTAMPTZ,
  published_by UUID REFERENCES profiles(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_result_submissions_assessment ON result_submissions(assessment_id);
CREATE INDEX idx_result_submissions_status ON result_submissions(status);

-- ─── Result Versions (Audit Trail) ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS result_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID NOT NULL REFERENCES result_submissions(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  marks_snapshot JSONB NOT NULL,
  changed_by UUID NOT NULL REFERENCES profiles(id),
  change_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Attendance Records ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS attendance_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused')),
  subject_id UUID REFERENCES subjects(id),
  recorded_by UUID NOT NULL REFERENCES profiles(id),
  remarks TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, date, COALESCE(subject_id, '00000000-0000-0000-0000-000000000000'::UUID))
);

CREATE INDEX idx_attendance_student ON attendance_records(student_id);
CREATE INDEX idx_attendance_class_date ON attendance_records(class_id, date);

-- ─── Inventory Categories ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS inventory_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES inventory_categories(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Inventory Items ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS inventory_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES inventory_categories(id),
  name TEXT NOT NULL,
  sku TEXT NOT NULL,
  description TEXT,
  unit TEXT NOT NULL DEFAULT 'piece',
  current_stock INTEGER NOT NULL DEFAULT 0 CHECK (current_stock >= 0),
  reorder_level INTEGER NOT NULL DEFAULT 0,
  unit_cost NUMERIC(12,2),
  location TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, sku)
);

CREATE INDEX idx_inventory_items_school ON inventory_items(school_id);

-- ─── Assets ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  asset_tag TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES inventory_categories(id),
  serial_number TEXT,
  purchase_date DATE,
  purchase_cost NUMERIC(12,2),
  condition TEXT NOT NULL DEFAULT 'new' CHECK (condition IN ('new', 'good', 'fair', 'poor', 'damaged', 'disposed')),
  assigned_to UUID REFERENCES profiles(id),
  location TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, asset_tag)
);

-- ─── Suppliers ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS suppliers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  contact_person TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Purchase Orders ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS purchase_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  supplier_id UUID NOT NULL REFERENCES suppliers(id),
  order_number TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'received', 'cancelled')),
  total_amount NUMERIC(12,2),
  ordered_by UUID NOT NULL REFERENCES profiles(id),
  approved_by UUID REFERENCES profiles(id),
  order_date DATE NOT NULL DEFAULT CURRENT_DATE,
  expected_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Purchase Order Items ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS purchase_order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  purchase_order_id UUID NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES inventory_items(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(12,2) NOT NULL,
  total_price NUMERIC(12,2) NOT NULL
);

-- ─── Stock Movements (Immutable) ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS stock_movements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID NOT NULL REFERENCES inventory_items(id),
  movement_type TEXT NOT NULL CHECK (movement_type IN ('receipt', 'issue', 'transfer_in', 'transfer_out', 'return', 'adjustment', 'damaged', 'lost')),
  quantity INTEGER NOT NULL CHECK (quantity != 0),
  previous_stock INTEGER NOT NULL,
  new_stock INTEGER NOT NULL CHECK (new_stock >= 0),
  reference_number TEXT,
  from_location TEXT,
  to_location TEXT,
  reason TEXT,
  performed_by UUID NOT NULL REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Prevent updates/deletes on stock_movements (immutable)
CREATE OR REPLACE FUNCTION prevent_stock_movement_modification()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'Stock movements are immutable and cannot be modified or deleted';
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_stock_movement_update
  BEFORE UPDATE OR DELETE ON stock_movements
  FOR EACH ROW EXECUTE FUNCTION prevent_stock_movement_modification();

CREATE INDEX idx_stock_movements_item ON stock_movements(item_id);
CREATE INDEX idx_stock_movements_type ON stock_movements(movement_type);

-- ─── Requisitions ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS requisitions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  requested_by UUID NOT NULL REFERENCES profiles(id),
  item_id UUID NOT NULL REFERENCES inventory_items(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'fulfilled', 'cancelled')),
  approved_by UUID REFERENCES profiles(id),
  approved_at TIMESTAMPTZ,
  fulfilled_at TIMESTAMPTZ,
  comments TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Announcements ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  target TEXT NOT NULL DEFAULT 'all' CHECK (target IN ('all', 'staff', 'teachers', 'parents', 'students', 'specific_class')),
  target_class_id UUID REFERENCES classes(id),
  is_public BOOLEAN NOT NULL DEFAULT false,
  published_by UUID NOT NULL REFERENCES profiles(id),
  published_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_announcements_school ON announcements(school_id);

-- ─── Notifications ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  is_read BOOLEAN NOT NULL DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = false;

-- ─── Events ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  location TEXT,
  is_all_day BOOLEAN NOT NULL DEFAULT false,
  created_by UUID NOT NULL REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Timetable Slots ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS timetable_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  stream_id UUID REFERENCES streams(id),
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES profiles(id),
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room TEXT,
  term_id UUID NOT NULL REFERENCES terms(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT valid_slot_times CHECK (end_time > start_time)
);

CREATE INDEX idx_timetable_class ON timetable_slots(class_id);
CREATE INDEX idx_timetable_teacher ON timetable_slots(teacher_id);

-- ─── Homework ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS homework (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  due_date DATE NOT NULL,
  attachment_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Documents ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size BIGINT,
  uploaded_by UUID NOT NULL REFERENCES profiles(id),
  category TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Audit Logs ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);

-- ─── School Settings ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS school_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  value JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, key)
);

-- ─── Invitations ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role user_role NOT NULL,
  token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  invited_by UUID NOT NULL REFERENCES profiles(id),
  accepted_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT now() + INTERVAL '7 days',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_invitations_token ON invitations(token);
CREATE INDEX idx_invitations_email ON invitations(email);

-- ─── Auto-Update Timestamps ─────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON profiles FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_schools
  BEFORE UPDATE ON schools FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_students
  BEFORE UPDATE ON students FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_inventory_items
  BEFORE UPDATE ON inventory_items FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_assets
  BEFORE UPDATE ON assets FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ─── Auto-Create Profile on Auth Signup ─────────────────────────────────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─── Stock Update Function (Transactional) ──────────────────────────────────
CREATE OR REPLACE FUNCTION process_stock_movement(
  p_item_id UUID,
  p_movement_type TEXT,
  p_quantity INTEGER,
  p_performed_by UUID,
  p_reference_number TEXT DEFAULT NULL,
  p_from_location TEXT DEFAULT NULL,
  p_to_location TEXT DEFAULT NULL,
  p_reason TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  v_current_stock INTEGER;
  v_new_stock INTEGER;
  v_movement_id UUID;
BEGIN
  -- Lock the row to prevent concurrent modifications
  SELECT current_stock INTO v_current_stock
  FROM inventory_items
  WHERE id = p_item_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Inventory item not found: %', p_item_id;
  END IF;

  -- Calculate new stock based on movement type
  IF p_movement_type IN ('receipt', 'transfer_in', 'return') THEN
    v_new_stock := v_current_stock + p_quantity;
  ELSIF p_movement_type IN ('issue', 'transfer_out', 'damaged', 'lost') THEN
    v_new_stock := v_current_stock - p_quantity;
    IF v_new_stock < 0 THEN
      RAISE EXCEPTION 'Insufficient stock. Current: %, Requested: %', v_current_stock, p_quantity;
    END IF;
  ELSIF p_movement_type = 'adjustment' THEN
    v_new_stock := p_quantity; -- Adjustment sets absolute value
  ELSE
    RAISE EXCEPTION 'Invalid movement type: %', p_movement_type;
  END IF;

  -- Create immutable stock movement record
  INSERT INTO stock_movements (
    item_id, movement_type, quantity, previous_stock, new_stock,
    reference_number, from_location, to_location, reason, performed_by
  ) VALUES (
    p_item_id, p_movement_type, p_quantity, v_current_stock, v_new_stock,
    p_reference_number, p_from_location, p_to_location, p_reason, p_performed_by
  ) RETURNING id INTO v_movement_id;

  -- Update item stock
  UPDATE inventory_items SET current_stock = v_new_stock WHERE id = p_item_id;

  RETURN v_movement_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- Row Level Security Policies
-- ============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE guardians ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_guardians ENABLE ROW LEVEL SECURITY;
ALTER TABLE marks ENABLE ROW LEVEL SECURITY;
ALTER TABLE result_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read their own, staff can read school members
CREATE POLICY profiles_select ON profiles
  FOR SELECT USING (
    id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM school_members sm1
      JOIN school_members sm2 ON sm1.school_id = sm2.school_id
      WHERE sm1.user_id = auth.uid() AND sm2.user_id = profiles.id
      AND sm1.is_active AND sm2.is_active
    )
  );

CREATE POLICY profiles_update ON profiles
  FOR UPDATE USING (id = auth.uid());

-- User Roles: visible to same-school members
CREATE POLICY user_roles_select ON user_roles
  FOR SELECT USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('super_admin', 'school_admin', 'headteacher')
    )
  );

-- Schools: visible to members
CREATE POLICY schools_select ON schools
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM school_members WHERE school_id = schools.id AND user_id = auth.uid() AND is_active)
    OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'super_admin')
    OR is_active -- public info for active schools
  );

-- Students: visible to school staff and linked parents
CREATE POLICY students_select ON students
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM school_members WHERE school_id = students.school_id AND user_id = auth.uid() AND is_active
    )
    OR EXISTS (
      SELECT 1 FROM guardians g
      JOIN student_guardians sg ON sg.guardian_id = g.id
      WHERE sg.student_id = students.id AND g.user_id = auth.uid()
    )
  );

-- Notifications: users see only their own
CREATE POLICY notifications_select ON notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY notifications_update ON notifications
  FOR UPDATE USING (user_id = auth.uid());

-- Audit logs: only super_admin and school_admin
CREATE POLICY audit_logs_select ON audit_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('super_admin', 'school_admin'))
  );
