import React, { useEffect, useState } from 'react';
import { studentService } from '../services/studentService';
import { StudentRecord, EnrolmentStatus, SeatCategory } from '../types/student';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Pagination } from '../components/common/Pagination';
import { Search, UserPlus, Filter, ShieldCheck, AlertCircle, Eye } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

export const StudentListPage: React.FC = () => {
  const { notify } = useNotification();
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Detail Modal
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);

  // Add Student Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    apaar_id: '',
    institution_student_id: '',
    programme_name: 'B.Tech, Information Technology',
    academic_year: '2024-2025',
    seat_category: 'REGULAR' as SeatCategory,
    status: 'ACTIVE' as EnrolmentStatus,
  });

  const loadStudents = async () => {
    try {
      setIsLoading(true);
      const res = await studentService.getStudents({
        search,
        status: statusFilter,
        seat_category: categoryFilter,
        page: currentPage,
        limit: 10,
      });
      setStudents(res.items);
      setTotal(res.total);
    } catch {
      notify('error', 'Failed to load students');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [currentPage, statusFilter, categoryFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    loadStudents();
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.apaar_id) {
      notify('warning', 'Required fields', 'Please enter student name and 12-digit APAAR ID.');
      return;
    }
    try {
      await studentService.createStudent(newStudent);
      notify('success', 'Student added', `${newStudent.name} enrolment saved.`);
      setIsAddModalOpen(false);
      setNewStudent({
        name: '',
        apaar_id: '',
        institution_student_id: '',
        programme_name: 'B.Tech, Information Technology',
        academic_year: '2024-2025',
        seat_category: 'REGULAR',
        status: 'ACTIVE',
      });
      loadStudents();
    } catch {
      notify('error', 'Failed to add student');
    }
  };

  const getStatusBadge = (status: EnrolmentStatus) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="success">Active</Badge>;
      case 'PENDING_REVIEW':
        return <Badge variant="warning">Pending Review</Badge>;
      case 'TRANSFERRED':
        return <Badge variant="neutral">Transferred</Badge>;
      case 'WITHDRAWN':
        return <Badge variant="danger">Withdrawn</Badge>;
      case 'COMPLETED':
        return <Badge variant="info">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Enrolled Student Records
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Institutional roster linked with APAAR IDs and approved intake quota categories.
          </p>
        </div>

        <Button
          onClick={() => setIsAddModalOpen(true)}
          variant="primary"
          className="bg-[#0B3C88] font-bold"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Single Record
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border-2 border-slate-900 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student name, roll number, or APAAR ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-[#0B3C88] focus:outline-none"
          />
        </form>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white text-slate-700 focus:ring-2 focus:ring-[#0B3C88]"
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING_REVIEW">Pending Review</option>
            <option value="TRANSFERRED">Transferred</option>
            <option value="WITHDRAWN">Withdrawn</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white text-slate-700 focus:ring-2 focus:ring-[#0B3C88]"
          >
            <option value="">All Seat Categories</option>
            <option value="REGULAR">Regular Quota</option>
            <option value="SUPERNUMERARY">Supernumerary (EWS/TFW)</option>
            <option value="NRI">NRI / OCI</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="border-2 border-slate-900 rounded-2xl overflow-hidden bg-white shadow-sm">
        <table className="min-w-full divide-y-2 divide-slate-900 text-left">
          <thead className="bg-[#071830] text-white text-sm font-bold">
            <tr>
              <th className="py-3.5 px-6">Student Name</th>
              <th className="py-3.5 px-6">APAAR ID (Masked)</th>
              <th className="py-3.5 px-6">Roll / College ID</th>
              <th className="py-3.5 px-6">Category</th>
              <th className="py-3.5 px-6">Enrolment Status</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm font-medium text-slate-900">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50">
                <td className="py-4 px-6 font-bold text-slate-900">
                  {student.name}
                  {student.issues_count && student.issues_count > 0 ? (
                    <span className="ml-2 inline-flex items-center text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      <AlertCircle className="w-3 h-3 mr-1" /> Flagged
                    </span>
                  ) : null}
                </td>
                <td className="py-4 px-6 font-mono text-slate-700">
                  {student.apaar_id_masked || 'Missing ID'}
                </td>
                <td className="py-4 px-6 text-slate-600 font-mono text-xs">
                  {student.institution_student_id}
                </td>
                <td className="py-4 px-6">
                  <Badge variant="default">{student.seat_category}</Badge>
                </td>
                <td className="py-4 px-6">{getStatusBadge(student.status)}</td>
                <td className="py-4 px-6 text-right">
                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="text-[#0B3C88] hover:text-[#062047] font-bold text-sm inline-flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(total / 10)}
          onPageChange={setCurrentPage}
          totalItems={total}
          itemsPerPage={10}
        />
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Student Record: ${selectedStudent.name}`}
          maxWidth="lg"
        >
          <div className="space-y-5 text-slate-900">
            <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-500 font-semibold block">Full APAAR ID:</span>
                <span className="font-mono font-bold text-slate-900">
                  {selectedStudent.apaar_id || 'Not Provided'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block">College ID:</span>
                <span className="font-mono font-bold text-slate-900">
                  {selectedStudent.institution_student_id}
                </span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block">Programme:</span>
                <span className="font-bold text-slate-900">{selectedStudent.programme_name}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block">Admission Date:</span>
                <span className="font-bold text-slate-900">{selectedStudent.admission_date}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block">Seat Category:</span>
                <span className="font-bold text-slate-900">{selectedStudent.seat_category}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block">Enrolment Status:</span>
                <span className="font-bold text-slate-900">{selectedStudent.status}</span>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950 font-medium">
              Note: Full APAAR IDs are confidential and only revealed to authorized institution registrars. Verification shares only public academic attributes.
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="secondary" onClick={() => setSelectedStudent(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Student Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Single Student Record"
        maxWidth="lg"
      >
        <form onSubmit={handleCreateStudent} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1">Student Full Name *</label>
            <input
              type="text"
              required
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-[#0B3C88]"
              placeholder="e.g. Vikram Malhotra"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1">
              12-digit APAAR ID *
            </label>
            <input
              type="text"
              required
              maxLength={12}
              value={newStudent.apaar_id}
              onChange={(e) => setNewStudent({ ...newStudent, apaar_id: e.target.value.replace(/\D/g, '') })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-[#0B3C88]"
              placeholder="12-digit numeric identifier"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1">Institution Student ID</label>
              <input
                type="text"
                value={newStudent.institution_student_id}
                onChange={(e) => setNewStudent({ ...newStudent, institution_student_id: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-[#0B3C88]"
                placeholder="DIAET-2024-IT-099"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1">Seat Category</label>
              <select
                value={newStudent.seat_category}
                onChange={(e) => setNewStudent({ ...newStudent, seat_category: e.target.value as SeatCategory })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:ring-2 focus:ring-[#0B3C88]"
              >
                <option value="REGULAR">Regular Quota</option>
                <option value="SUPERNUMERARY">Supernumerary (EWS / TFW)</option>
                <option value="NRI">NRI / OCI</option>
                <option value="FOREIGN_NATIONAL">Foreign National</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="bg-[#0B3C88]">
              Save Student Record
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

