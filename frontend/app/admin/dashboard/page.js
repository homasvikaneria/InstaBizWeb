'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { getEnquiriesApi, getEnquiryApi, updateEnquiryApi, deleteEnquiryApi } from '../../../lib/api';

const SERVICE_OPTIONS = [
  'Website Development',
  'Web/Mobile App Development',
  'CRM',
  'ERP/Odoo',
  'Custom Software',
  'Business Automation',
  'AI Automation',
  'API Integration',
  'Digital Marketing',
  'Other',
];

const STATUS_OPTIONS = ['Pending', 'Contacted', 'Resolved'];

const PAGE_SIZE = 10;

const getPaginationRange = (currentPage, totalPages) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let start = Math.max(2, currentPage - 1);
  let end = Math.min(totalPages - 1, currentPage + 1);

  if (currentPage <= 3) {
    start = 2;
    end = 4;
  } else if (currentPage >= totalPages - 2) {
    start = totalPages - 3;
    end = totalPages - 1;
  }

  const range = [1];
  if (start > 2) range.push('ellipsis-left');
  for (let i = start; i <= end; i++) range.push(i);
  if (end < totalPages - 1) range.push('ellipsis-right');
  range.push(totalPages);

  return range;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const { token, admin, isAuthenticated, loading: authLoading, logout } = useAuth();

  const [enquiries, setEnquiries] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [successBanner, setSuccessBanner] = useState(null);

  // Search and Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('All Services');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');

  // Inline Status update loading state
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Modal View state
  const [selectedId, setSelectedId] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewEnquiry, setViewEnquiry] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [viewError, setViewError] = useState(null);

  // Modal Edit state
  const [editId, setEditId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    service: '',
    message: '',
  });
  const [editFormErrors, setEditFormErrors] = useState({});
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editApiError, setEditApiError] = useState(null);

  // Modal Delete state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);
  const [deleteApiError, setDeleteApiError] = useState(null);

  // Reset pagination to page 1 whenever search query, service filter, or status filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedService, selectedStatus]);

  // Derived filtered enquiries list based on search query, service filter, and status filter
  const filteredEnquiries = enquiries.filter((item) => {
    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        (item.fullName && item.fullName.toLowerCase().includes(query)) ||
        (item.email && item.email.toLowerCase().includes(query)) ||
        (item.phone && item.phone.toLowerCase().includes(query)) ||
        (item.companyName && item.companyName.toLowerCase().includes(query)) ||
        (item.service && item.service.toLowerCase().includes(query)) ||
        (item.message && item.message.toLowerCase().includes(query)) ||
        (item.status && item.status.toLowerCase().includes(query));

      if (!matchesSearch) return false;
    }

    // 2. Service Filter
    if (selectedService && selectedService !== 'All Services') {
      if ((item.service || '').trim().toLowerCase() !== selectedService.trim().toLowerCase()) {
        return false;
      }
    }

    // 3. Status Filter
    if (selectedStatus && selectedStatus !== 'All Statuses') {
      if ((item.status || 'Pending').trim().toLowerCase() !== selectedStatus.trim().toLowerCase()) {
        return false;
      }
    }

    return true;
  });

  // Pagination derived state
  const totalFilteredCount = filteredEnquiries.length;
  const totalPages = Math.max(1, Math.ceil(totalFilteredCount / PAGE_SIZE));

  // If item deletion causes currentPage to exceed totalPages, automatically move to the last valid page
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Current page slice
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, totalFilteredCount);
  const paginatedEnquiries = filteredEnquiries.slice(startIndex, endIndex);

  const isFilterActive =
    searchQuery.trim() !== '' ||
    selectedService !== 'All Services' ||
    selectedStatus !== 'All Statuses';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedService('All Services');
    setSelectedStatus('All Statuses');
    setCurrentPage(1);
  };

  // Handle inline status update for an enquiry row
  const handleStatusChange = async (item, newStatus) => {
    if (!token || !item || item.status === newStatus) return;

    setUpdatingStatusId(item.id);

    const payload = {
      fullName: item.fullName,
      email: item.email,
      phone: item.phone,
      companyName: item.companyName,
      service: item.service,
      message: item.message,
      status: newStatus,
    };

    try {
      const response = await updateEnquiryApi(item.id, payload, token);
      if (response && response.data) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === item.id ? response.data : e))
        );
        setSuccessBanner(`Enquiry #${item.id} status updated to "${newStatus}".`);
        setTimeout(() => setSuccessBanner(null), 5000);
      }
    } catch (err) {
      if (err.status === 401) {
        logout();
        router.push('/admin');
        return;
      }
      setFetchError(err.message || 'Failed to update enquiry status.');
    } finally {
      setUpdatingStatusId(null);
    }
  };

  // Route protection: redirect unauthenticated users to /admin
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/admin');
    }
  }, [authLoading, isAuthenticated, router]);

  // Fetch enquiries list from backend
  const fetchEnquiries = useCallback(async () => {
    if (!token) return;

    setDataLoading(true);
    setFetchError(null);

    try {
      const response = await getEnquiriesApi(token);
      setEnquiries(response.data || []);
    } catch (err) {
      if (err.status === 401) {
        logout();
        router.push('/admin');
        return;
      }
      setFetchError(err.message || 'Failed to fetch enquiries. Please try again later.');
    } finally {
      setDataLoading(false);
    }
  }, [token, logout, router]);

  useEffect(() => {
    if (!authLoading && isAuthenticated && token) {
      fetchEnquiries();
    }
  }, [authLoading, isAuthenticated, token, fetchEnquiries]);

  // Handle single enquiry View click
  const handleViewEnquiry = async (id) => {
    if (!token) return;

    setSelectedId(id);
    setViewModalOpen(true);
    setViewLoading(true);
    setViewError(null);
    setViewEnquiry(null);

    try {
      const response = await getEnquiryApi(id, token);
      setViewEnquiry(response.data);
    } catch (err) {
      if (err.status === 401) {
        logout();
        router.push('/admin');
        return;
      }
      setViewError(err.message || 'Failed to fetch enquiry details.');
    } finally {
      setViewLoading(false);
    }
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedId(null);
    setViewEnquiry(null);
    setViewError(null);
  };

  // Handle single enquiry Edit click
  const handleOpenEditModal = (item) => {
    setEditId(item.id);
    setEditFormData({
      fullName: item.fullName || '',
      email: item.email || '',
      phone: item.phone || '',
      companyName: item.companyName || '',
      service: item.service || '',
      message: item.message || '',
    });
    setEditFormErrors({});
    setEditApiError(null);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditId(null);
    setEditFormErrors({});
    setEditApiError(null);
  };

  const validateEditForm = () => {
    const errors = {};
    if (!editFormData.fullName.trim()) {
      errors.fullName = 'Full name is required.';
    } else if (editFormData.fullName.trim().length > 100) {
      errors.fullName = 'Full name cannot exceed 100 characters.';
    }

    if (!editFormData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editFormData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!editFormData.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (!/^[0-9\s\-\+\(\)]{7,30}$/.test(editFormData.phone.trim())) {
      errors.phone = 'Please enter a valid phone number (7-30 characters).';
    }

    if (!editFormData.companyName.trim()) {
      errors.companyName = 'Company name is required.';
    } else if (editFormData.companyName.trim().length > 150) {
      errors.companyName = 'Company name cannot exceed 150 characters.';
    }

    if (!editFormData.service.trim()) {
      errors.service = 'Please select a service.';
    } else if (!SERVICE_OPTIONS.includes(editFormData.service)) {
      errors.service = 'Invalid service selection.';
    }

    if (!editFormData.message.trim()) {
      errors.message = 'Message is required.';
    } else if (editFormData.message.trim().length > 2000) {
      errors.message = 'Message cannot exceed 2000 characters.';
    }

    setEditFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!validateEditForm()) return;
    if (!token || !editId) return;

    setEditSubmitting(true);
    setEditApiError(null);

    const payload = {
      fullName: editFormData.fullName.trim(),
      email: editFormData.email.trim(),
      phone: editFormData.phone.trim(),
      companyName: editFormData.companyName.trim(),
      service: editFormData.service.trim(),
      message: editFormData.message.trim(),
    };

    try {
      const response = await updateEnquiryApi(editId, payload, token);
      if (response && response.data) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === editId ? response.data : item))
        );
        setSuccessBanner(`Enquiry #${editId} updated successfully.`);
        handleCloseEditModal();
        setTimeout(() => setSuccessBanner(null), 5000);
      }
    } catch (err) {
      if (err.status === 401) {
        logout();
        router.push('/admin');
        return;
      }
      setEditApiError(err.message || 'Failed to update enquiry.');
    } finally {
      setEditSubmitting(false);
    }
  };

  // Handle Delete modal actions
  const handleOpenDeleteModal = (item) => {
    setDeleteItem(item);
    setDeleteApiError(null);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteItem(null);
    setDeleteApiError(null);
  };

  const handleConfirmDelete = async () => {
    if (!token || !deleteItem) return;

    setDeleteSubmitting(true);
    setDeleteApiError(null);

    try {
      await deleteEnquiryApi(deleteItem.id, token);
      setEnquiries((prev) => prev.filter((item) => item.id !== deleteItem.id));
      setSuccessBanner(`Enquiry #${deleteItem.id} deleted successfully.`);
      handleCloseDeleteModal();
      setTimeout(() => setSuccessBanner(null), 5000);
    } catch (err) {
      if (err.status === 401) {
        logout();
        router.push('/admin');
        return;
      }
      if (err.status === 404) {
        setDeleteApiError('Enquiry could not be found. It may have already been deleted.');
      } else {
        setDeleteApiError(err.message || 'Failed to delete enquiry. Please try again.');
      }
    } finally {
      setDeleteSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/admin');
  };

  // While restoring auth state or if unauthenticated (awaiting redirect), show loading indicator
  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-600">Verifying session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-slate-50 px-4 py-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header / Admin Info Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
              Protected Admin Area
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Admin Dashboard
            </h1>
            {admin && (
              <p className="text-sm text-slate-600">
                Signed in as <span className="font-semibold text-slate-900">{admin.name || 'Administrator'}</span> ({admin.email})
              </p>
            )}
          </div>

          <button
            onClick={handleLogout}
            type="button"
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 shrink-0"
          >
            Sign Out
          </button>
        </div>

        {/* Success Banner */}
        {successBanner && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center justify-between shadow-sm animate-fade-in">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{successBanner}</span>
            </div>
            <button
              onClick={() => setSuccessBanner(null)}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Enquiries Section */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Client Enquiries
              </h2>
              <p className="text-xs text-slate-500">
                Data fetched from <code className="text-blue-600 font-mono">GET /api/enquiries</code>
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/60">
              Total: {enquiries.length}
            </span>
          </div>

          {/* State 1: Data Loading (Table Skeleton) */}
          {dataLoading && (
            <div className="space-y-4" aria-busy="true">
              <div className="overflow-x-auto border border-slate-200/80 rounded-xl shadow-sm">
                <table className="w-full text-left text-sm text-slate-600 border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200/80 text-xs uppercase font-semibold text-slate-500 tracking-wider">
                    <tr>
                      <th scope="col" className="px-6 py-3.5">Name</th>
                      <th scope="col" className="px-6 py-3.5">Email</th>
                      <th scope="col" className="px-6 py-3.5">Phone</th>
                      <th scope="col" className="px-6 py-3.5">Company</th>
                      <th scope="col" className="px-6 py-3.5">Service</th>
                      <th scope="col" className="px-6 py-3.5">Status</th>
                      <th scope="col" className="px-6 py-3.5">Date</th>
                      <th scope="col" className="px-6 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {[1, 2, 3, 4, 5].map((idx) => (
                      <tr key={idx} className="animate-pulse">
                        <td className="px-6 py-4">
                          <div className="h-4 bg-slate-200 rounded-md w-28" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-slate-200 rounded-md w-36" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-slate-200 rounded-md w-24" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-slate-200 rounded-md w-28" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-5 bg-slate-200 rounded-md w-32" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-6 bg-slate-200 rounded-lg w-20" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-slate-200 rounded-md w-20" />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <div className="h-6 bg-slate-200 rounded-lg w-12" />
                            <div className="h-6 bg-slate-200 rounded-lg w-10" />
                            <div className="h-6 bg-slate-200 rounded-lg w-14" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* State 2: Fetch Error */}
          {!dataLoading && fetchError && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{fetchError}</span>
              </div>
              <button
                onClick={fetchEnquiries}
                className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 font-semibold text-xs rounded-lg transition-colors shrink-0"
              >
                Retry
              </button>
            </div>
          )}

          {/* State 3: Empty State */}
          {!dataLoading && !fetchError && enquiries.length === 0 && (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-slate-800">No Enquiries Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No customer contact submissions have been recorded in the database yet.
              </p>
            </div>
          )}

          {/* Search, Service & Status Filter Toolbar */}
          {!dataLoading && !fetchError && enquiries.length > 0 && (
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-2">
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 flex-1">
                {/* Search Input */}
                <div className="relative flex-1 min-w-[240px] max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, email, phone, company..."
                    className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200/90 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Service Filter Select */}
                <div className="flex items-center gap-2 shrink-0">
                  <label htmlFor="service-filter" className="text-xs font-semibold text-slate-600 shrink-0">
                    Service:
                  </label>
                  <select
                    id="service-filter"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="px-3.5 py-2.5 bg-slate-50 border border-slate-200/90 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium cursor-pointer"
                  >
                    <option value="All Services">All Services</option>
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter Select */}
                <div className="flex items-center gap-2 shrink-0">
                  <label htmlFor="status-filter" className="text-xs font-semibold text-slate-600 shrink-0">
                    Status:
                  </label>
                  <select
                    id="status-filter"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3.5 py-2.5 bg-slate-50 border border-slate-200/90 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium cursor-pointer"
                  >
                    <option value="All Statuses">All Statuses</option>
                    {STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Combined Results Counter & Reset Action */}
              <div className="flex items-center gap-3 self-end lg:self-center">
                <div className="text-xs text-slate-500 font-medium">
                  Showing{' '}
                  <span className="font-semibold text-slate-900">
                    {totalFilteredCount === 0 ? '0' : `${startIndex + 1}–${endIndex}`}
                  </span>{' '}
                  of <span className="font-semibold text-slate-900">{totalFilteredCount}</span> enquiries
                  {enquiries.length > totalFilteredCount && (
                    <span className="text-slate-400 font-normal"> (filtered from {enquiries.length})</span>
                  )}
                </div>
                {isFilterActive && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          )}

          {/* State 4: Search/Filter Return Zero Matches */}
          {!dataLoading && !fetchError && enquiries.length > 0 && filteredEnquiries.length === 0 && (
            <div className="py-12 text-center space-y-3 border border-dashed border-slate-200 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-slate-800">No matching enquiries</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No enquiries match your current search and filter settings.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors inline-block mt-1"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* State 5: Responsive Admin Enquiry Table */}
          {!dataLoading && !fetchError && filteredEnquiries.length > 0 && (
            <div className="space-y-4">
              <div className="overflow-x-auto border border-slate-200/80 rounded-xl shadow-sm">
                <table className="w-full text-left text-sm text-slate-600 border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200/80 text-xs uppercase font-semibold text-slate-500 tracking-wider">
                    <tr>
                      <th scope="col" className="px-6 py-3.5">Name</th>
                      <th scope="col" className="px-6 py-3.5">Email</th>
                      <th scope="col" className="px-6 py-3.5">Phone</th>
                      <th scope="col" className="px-6 py-3.5">Company</th>
                      <th scope="col" className="px-6 py-3.5">Service</th>
                      <th scope="col" className="px-6 py-3.5">Status</th>
                      <th scope="col" className="px-6 py-3.5">Date</th>
                      <th scope="col" className="px-6 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {paginatedEnquiries.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-900 whitespace-nowrap">
                          {item.fullName || '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-slate-700">
                          {item.email || '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                          {item.phone || '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                          {item.companyName || '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.service ? (
                            <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                              {item.service}
                            </span>
                          ) : (
                            '—'
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="relative inline-block">
                            <select
                              value={item.status || 'Pending'}
                              onChange={(e) => handleStatusChange(item, e.target.value)}
                              disabled={updatingStatusId === item.id}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer disabled:opacity-50 ${
                                (item.status || 'Pending') === 'Pending'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                                  : (item.status || 'Pending') === 'Contacted'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                            {updatingStatusId === item.id && (
                              <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-lg">
                                <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleViewEnquiry(item.id)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold transition-colors"
                            >
                              View
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(item)}
                              className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenDeleteModal(item)}
                              className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100">
                <div className="text-xs text-slate-500 font-medium">
                  Page <span className="font-semibold text-slate-900">{currentPage}</span> of{' '}
                  <span className="font-semibold text-slate-900">{totalPages}</span>
                </div>

                {totalPages > 1 && (
                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    {/* Previous Page Button */}
                    <button
                      type="button"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
                    >
                      Previous
                    </button>

                    {/* Page Number Buttons */}
                    {getPaginationRange(currentPage, totalPages).map((item) => {
                      if (typeof item === 'string') {
                        return (
                          <span
                            key={item}
                            className="w-7 h-8 flex items-center justify-center text-xs text-slate-400 font-bold select-none"
                          >
                            •••
                          </span>
                        );
                      }
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setCurrentPage(item)}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                            currentPage === item
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}

                    {/* Next Page Button */}
                    <button
                      type="button"
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* View Details Modal */}
      {viewModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          onClick={handleCloseViewModal}
        >
          <div
            className="bg-white border border-slate-200/90 rounded-2xl shadow-xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                  #{selectedId}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Enquiry Details</h3>
                  <p className="text-xs text-slate-500">Fetched via GET /api/enquiries/{selectedId}</p>
                </div>
              </div>
              <button
                onClick={handleCloseViewModal}
                type="button"
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors text-sm font-semibold"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Details Skeleton */}
            {viewLoading && (
              <div className="space-y-6 animate-pulse" aria-busy="true">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                      <div className="h-3 bg-slate-200 rounded w-20" />
                      <div className="h-4 bg-slate-300 rounded w-32" />
                    </div>
                  ))}
                </div>

                {/* Message Content Placeholder */}
                <div className="space-y-2">
                  <div className="h-3 bg-slate-200 rounded w-28" />
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="h-3.5 bg-slate-200 rounded w-full" />
                    <div className="h-3.5 bg-slate-200 rounded w-4/5" />
                    <div className="h-3.5 bg-slate-200 rounded w-2/3" />
                  </div>
                </div>
              </div>
            )}

            {/* Modal Body: Error */}
            {!viewLoading && viewError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
                <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{viewError}</span>
              </div>
            )}

            {/* Modal Body: Details Content */}
            {!viewLoading && !viewError && viewEnquiry && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Full Name</span>
                    <span className="font-semibold text-slate-900">{viewEnquiry.fullName || '—'}</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email Address</span>
                    <span className="font-semibold text-slate-900">{viewEnquiry.email || '—'}</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone Number</span>
                    <span className="font-semibold text-slate-900">{viewEnquiry.phone || '—'}</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Company Name</span>
                    <span className="font-semibold text-slate-900">{viewEnquiry.companyName || '—'}</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Requested Service</span>
                    {viewEnquiry.service ? (
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                        {viewEnquiry.service}
                      </span>
                    ) : (
                      <span className="font-semibold text-slate-900">—</span>
                    )}
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Status</span>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold border ${
                        (viewEnquiry.status || 'Pending') === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : (viewEnquiry.status || 'Pending') === 'Contacted'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {viewEnquiry.status || 'Pending'}
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Submission Date</span>
                    <span className="font-semibold text-slate-900">
                      {viewEnquiry.createdAt
                        ? new Date(viewEnquiry.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : '—'}
                    </span>
                  </div>
                </div>

                {viewEnquiry.updatedAt && (
                  <div className="text-xs text-slate-400">
                    Last Updated:{' '}
                    {new Date(viewEnquiry.updatedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                )}

                {/* Message Content */}
                <div className="space-y-1.5">
                  <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Message Payload</span>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-sm whitespace-pre-wrap leading-relaxed">
                    {viewEnquiry.message || 'No message content provided.'}
                  </div>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={handleCloseViewModal}
                type="button"
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Details Modal */}
      {editModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => !editSubmitting && handleCloseEditModal()}
        >
          <div
            className="bg-white border border-slate-200/90 rounded-2xl shadow-xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                  #{editId}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Edit Enquiry</h3>
                  <p className="text-xs text-slate-500">Update payload for PUT /api/enquiries/{editId}</p>
                </div>
              </div>
              <button
                onClick={handleCloseEditModal}
                disabled={editSubmitting}
                type="button"
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors text-sm font-semibold disabled:opacity-50"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* API Error Banner */}
            {editApiError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
                <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{editApiError}</span>
              </div>
            )}

            {/* Edit Form */}
            <form onSubmit={handleUpdateEnquirySubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="edit-fullName" className="block text-xs font-semibold text-slate-700">
                    Full Name *
                  </label>
                  <input
                    id="edit-fullName"
                    type="text"
                    required
                    value={editFormData.fullName}
                    onChange={(e) => setEditFormData({ ...editFormData, fullName: e.target.value })}
                    disabled={editSubmitting}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      editFormErrors.fullName ? 'border-red-400 bg-red-50/50' : 'border-slate-300'
                    } text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors disabled:bg-slate-100`}
                  />
                  {editFormErrors.fullName && (
                    <p className="text-xs text-red-600 font-medium">{editFormErrors.fullName}</p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="edit-email" className="block text-xs font-semibold text-slate-700">
                    Email Address *
                  </label>
                  <input
                    id="edit-email"
                    type="email"
                    required
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    disabled={editSubmitting}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      editFormErrors.email ? 'border-red-400 bg-red-50/50' : 'border-slate-300'
                    } text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors disabled:bg-slate-100`}
                  />
                  {editFormErrors.email && (
                    <p className="text-xs text-red-600 font-medium">{editFormErrors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label htmlFor="edit-phone" className="block text-xs font-semibold text-slate-700">
                    Phone Number *
                  </label>
                  <input
                    id="edit-phone"
                    type="tel"
                    required
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    disabled={editSubmitting}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      editFormErrors.phone ? 'border-red-400 bg-red-50/50' : 'border-slate-300'
                    } text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors disabled:bg-slate-100`}
                  />
                  {editFormErrors.phone && (
                    <p className="text-xs text-red-600 font-medium">{editFormErrors.phone}</p>
                  )}
                </div>

                {/* Company Name */}
                <div className="space-y-1.5">
                  <label htmlFor="edit-companyName" className="block text-xs font-semibold text-slate-700">
                    Company Name *
                  </label>
                  <input
                    id="edit-companyName"
                    type="text"
                    required
                    value={editFormData.companyName}
                    onChange={(e) => setEditFormData({ ...editFormData, companyName: e.target.value })}
                    disabled={editSubmitting}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      editFormErrors.companyName ? 'border-red-400 bg-red-50/50' : 'border-slate-300'
                    } text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors disabled:bg-slate-100`}
                  />
                  {editFormErrors.companyName && (
                    <p className="text-xs text-red-600 font-medium">{editFormErrors.companyName}</p>
                  )}
                </div>
              </div>

              {/* Service Select */}
              <div className="space-y-1.5">
                <label htmlFor="edit-service" className="block text-xs font-semibold text-slate-700">
                  Service Interested In *
                </label>
                <select
                  id="edit-service"
                  required
                  value={editFormData.service}
                  onChange={(e) => setEditFormData({ ...editFormData, service: e.target.value })}
                  disabled={editSubmitting}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                    editFormErrors.service ? 'border-red-400 bg-red-50/50' : 'border-slate-300'
                  } text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors disabled:bg-slate-100`}
                >
                  <option value="" disabled>Select a service</option>
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {editFormErrors.service && (
                  <p className="text-xs text-red-600 font-medium">{editFormErrors.service}</p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="edit-message" className="block text-xs font-semibold text-slate-700">
                  Message *
                </label>
                <textarea
                  id="edit-message"
                  required
                  rows={4}
                  value={editFormData.message}
                  onChange={(e) => setEditFormData({ ...editFormData, message: e.target.value })}
                  disabled={editSubmitting}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                    editFormErrors.message ? 'border-red-400 bg-red-50/50' : 'border-slate-300'
                  } text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors disabled:bg-slate-100`}
                />
                {editFormErrors.message && (
                  <p className="text-xs text-red-600 font-medium">{editFormErrors.message}</p>
                )}
              </div>

              {/* Modal Actions Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  disabled={editSubmitting}
                  className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editSubmitting}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold rounded-xl transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 flex items-center gap-2"
                >
                  {editSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && deleteItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => !deleteSubmitting && handleCloseDeleteModal()}
        >
          <div
            className="bg-white border border-slate-200/90 rounded-2xl shadow-xl max-w-md w-full p-6 space-y-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Icon & Title */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Delete Enquiry</h3>
                <p className="text-xs text-slate-500">
                  Are you sure you want to delete enquiry <span className="font-semibold text-slate-900">#{deleteItem.id} ({deleteItem.fullName || 'Unnamed'})</span>?
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
              This action cannot be undone. The enquiry record will be permanently removed from the database via <code className="text-red-600 font-mono">DELETE /api/enquiries/{deleteItem.id}</code>.
            </p>

            {/* API Error Alert Banner */}
            {deleteApiError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium flex items-start gap-2.5">
                <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{deleteApiError}</span>
              </div>
            )}

            {/* Modal Actions Footer */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleCloseDeleteModal}
                disabled={deleteSubmitting}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleteSubmitting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-60 flex items-center gap-2"
              >
                {deleteSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Enquiry</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




