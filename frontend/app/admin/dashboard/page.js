'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, X, Inbox, Clock, PhoneCall, CheckCheck } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import {
  getEnquiriesApi,
  getEnquiryApi,
  updateEnquiryApi,
  deleteEnquiryApi,
} from '../../../lib/api';
import AdminShell from '../../../components/admin/AdminShell';
import Toolbar from '../../../components/admin/Toolbar';
import EnquiryTable, { EnquiryCards } from '../../../components/admin/EnquiryTable';
import Pagination from '../../../components/admin/Pagination';
import {
  TableSkeleton,
  EmptyState,
  NoResultsState,
  ErrorState,
} from '../../../components/admin/States';
import {
  ViewEnquiryDialog,
  EditEnquiryDialog,
  DeleteEnquiryDialog,
} from '../../../components/admin/EnquiryDialogs';
import {
  SERVICE_VALUES,
  PAGE_SIZE,
  ALL_SERVICES_LABEL,
  ALL_STATUSES_LABEL,
} from '../../../lib/adminConstants';

const EMPTY_FORM = {
  fullName: '',
  email: '',
  phone: '',
  companyName: '',
  service: '',
  message: '',
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const { token, admin, isAuthenticated, loading: authLoading, logout } = useAuth();

  const [enquiries, setEnquiries] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [successBanner, setSuccessBanner] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState(ALL_SERVICES_LABEL);
  const [selectedStatus, setSelectedStatus] = useState(ALL_STATUSES_LABEL);

  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewEnquiry, setViewEnquiry] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [viewError, setViewError] = useState(null);

  const [editId, setEditId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(EMPTY_FORM);
  const [editFormErrors, setEditFormErrors] = useState({});
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editApiError, setEditApiError] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);
  const [deleteApiError, setDeleteApiError] = useState(null);

  /** Any 401 from the API means the token is dead — sign out rather than retry. */
  const handleAuthFailure = useCallback(() => {
    logout();
    router.push('/admin');
  }, [logout, router]);

  const flash = useCallback((message) => {
    setSuccessBanner(message);
    setTimeout(() => setSuccessBanner(null), 5000);
  }, []);

  // Route protection.
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/admin');
    }
  }, [authLoading, isAuthenticated, router]);

  const fetchEnquiries = useCallback(async () => {
    if (!token) return;
    setDataLoading(true);
    setFetchError(null);
    try {
      const response = await getEnquiriesApi(token);
      setEnquiries(response.data || []);
    } catch (err) {
      if (err.status === 401) return handleAuthFailure();
      setFetchError(err.message || 'Failed to fetch enquiries. Please try again later.');
    } finally {
      setDataLoading(false);
    }
  }, [token, handleAuthFailure]);

  useEffect(() => {
    if (!authLoading && isAuthenticated && token) fetchEnquiries();
  }, [authLoading, isAuthenticated, token, fetchEnquiries]);

  // Any filter change returns to page 1.
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedService, selectedStatus]);

  const filteredEnquiries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return enquiries.filter((item) => {
      if (query) {
        const haystack = [
          item.fullName,
          item.email,
          item.phone,
          item.companyName,
          item.service,
          item.message,
          item.status,
        ];
        if (!haystack.some((field) => field && field.toLowerCase().includes(query))) {
          return false;
        }
      }
      if (selectedService !== ALL_SERVICES_LABEL) {
        if ((item.service || '').trim().toLowerCase() !== selectedService.trim().toLowerCase()) {
          return false;
        }
      }
      if (selectedStatus !== ALL_STATUSES_LABEL) {
        if (
          (item.status || 'Pending').trim().toLowerCase() !== selectedStatus.trim().toLowerCase()
        ) {
          return false;
        }
      }
      return true;
    });
  }, [enquiries, searchQuery, selectedService, selectedStatus]);

  const totalFilteredCount = filteredEnquiries.length;
  const totalPages = Math.max(1, Math.ceil(totalFilteredCount / PAGE_SIZE));

  // Deleting the last row on a page must not strand the user on an empty page.
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, totalFilteredCount);
  const paginatedEnquiries = filteredEnquiries.slice(startIndex, endIndex);

  const isFilterActive =
    searchQuery.trim() !== '' ||
    selectedService !== ALL_SERVICES_LABEL ||
    selectedStatus !== ALL_STATUSES_LABEL;

  const stats = useMemo(
    () => ({
      total: enquiries.length,
      pending: enquiries.filter((e) => (e.status || 'Pending') === 'Pending').length,
      contacted: enquiries.filter((e) => e.status === 'Contacted').length,
      resolved: enquiries.filter((e) => e.status === 'Resolved').length,
    }),
    [enquiries]
  );

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedService(ALL_SERVICES_LABEL);
    setSelectedStatus(ALL_STATUSES_LABEL);
    setCurrentPage(1);
  };

  /**
   * Inline status change. The PUT endpoint replaces the whole row, so the
   * untouched fields are sent back alongside the new status.
   */
  const handleStatusChange = async (item, newStatus) => {
    if (!token || !item || item.status === newStatus) return;
    setUpdatingStatusId(item.id);
    try {
      const response = await updateEnquiryApi(
        item.id,
        {
          fullName: item.fullName,
          email: item.email,
          phone: item.phone,
          companyName: item.companyName,
          service: item.service,
          message: item.message,
          status: newStatus,
        },
        token
      );
      if (response?.data) {
        setEnquiries((prev) => prev.map((e) => (e.id === item.id ? response.data : e)));
        flash(`Enquiry #${item.id} marked as “${newStatus}”.`);
      }
    } catch (err) {
      if (err.status === 401) return handleAuthFailure();
      setFetchError(err.message || 'Failed to update enquiry status.');
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const handleViewEnquiry = async (id) => {
    if (!token) return;
    setViewModalOpen(true);
    setViewLoading(true);
    setViewError(null);
    setViewEnquiry(null);
    try {
      const response = await getEnquiryApi(id, token);
      setViewEnquiry(response.data);
    } catch (err) {
      if (err.status === 401) return handleAuthFailure();
      setViewError(err.message || 'Failed to fetch enquiry details.');
    } finally {
      setViewLoading(false);
    }
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setViewEnquiry(null);
    setViewError(null);
  };

  const handleOpenEditModal = (item) => {
    setViewModalOpen(false);
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

  const handleEditFieldChange = (field, value) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
    setEditFormErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  /** Mirrors the server rules; the server still validates independently. */
  const validateEditForm = () => {
    const errors = {};
    const { fullName, email, phone, companyName, service, message } = editFormData;

    if (!fullName.trim()) errors.fullName = 'Full name is required.';
    else if (fullName.trim().length > 100)
      errors.fullName = 'Full name cannot exceed 100 characters.';

    if (!email.trim()) errors.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errors.email = 'Please enter a valid email address.';

    if (!phone.trim()) errors.phone = 'Phone number is required.';
    else if (!/^[0-9\s\-+()]{7,30}$/.test(phone.trim()))
      errors.phone = 'Please enter a valid phone number (7–30 characters).';

    if (!companyName.trim()) errors.companyName = 'Company name is required.';
    else if (companyName.trim().length > 150)
      errors.companyName = 'Company name cannot exceed 150 characters.';

    if (!service.trim()) errors.service = 'Please select a service.';
    else if (!SERVICE_VALUES.includes(service)) errors.service = 'Invalid service selection.';

    if (!message.trim()) errors.message = 'Message is required.';
    else if (message.trim().length > 2000)
      errors.message = 'Message cannot exceed 2000 characters.';

    setEditFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateEnquirySubmit = async (event) => {
    event.preventDefault();
    if (!validateEditForm() || !token || !editId) return;

    setEditSubmitting(true);
    setEditApiError(null);
    try {
      // `status` is intentionally omitted — the server keeps the existing value.
      const response = await updateEnquiryApi(
        editId,
        {
          fullName: editFormData.fullName.trim(),
          email: editFormData.email.trim(),
          phone: editFormData.phone.trim(),
          companyName: editFormData.companyName.trim(),
          service: editFormData.service.trim(),
          message: editFormData.message.trim(),
        },
        token
      );
      if (response?.data) {
        setEnquiries((prev) => prev.map((item) => (item.id === editId ? response.data : item)));
        flash(`Enquiry #${editId} updated.`);
        handleCloseEditModal();
      }
    } catch (err) {
      if (err.status === 401) return handleAuthFailure();
      setEditApiError(err.message || 'Failed to update enquiry.');
    } finally {
      setEditSubmitting(false);
    }
  };

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
      flash(`Enquiry #${deleteItem.id} deleted.`);
      handleCloseDeleteModal();
    } catch (err) {
      if (err.status === 401) return handleAuthFailure();
      setDeleteApiError(
        err.status === 404
          ? 'Enquiry could not be found. It may have already been deleted.'
          : err.message || 'Failed to delete enquiry. Please try again.'
      );
    } finally {
      setDeleteSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/admin');
  };

  // Session restore / redirect guard.
  if (authLoading || !isAuthenticated) {
    return (
      <div className="grid min-h-screen place-items-center bg-ink-50 px-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-300 border-t-accent-600" />
          <p className="text-sm text-ink-600">Verifying session…</p>
        </div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total', value: stats.total, icon: Inbox, tone: 'text-ink-700 bg-ink-100' },
    { label: 'Pending', value: stats.pending, icon: Clock, tone: 'text-amber-700 bg-amber-50' },
    {
      label: 'Contacted',
      value: stats.contacted,
      icon: PhoneCall,
      tone: 'text-accent-700 bg-accent-50',
    },
    {
      label: 'Resolved',
      value: stats.resolved,
      icon: CheckCheck,
      tone: 'text-emerald-700 bg-emerald-50',
    },
  ];

  return (
    <AdminShell
      admin={admin}
      onLogout={handleLogout}
      onRefresh={fetchEnquiries}
      refreshing={dataLoading}
    >
      {successBanner ? (
        <div
          role="status"
          className="mb-5 flex items-start gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
          <p className="flex-1 text-sm text-emerald-900">{successBanner}</p>
          <button
            type="button"
            onClick={() => setSuccessBanner(null)}
            aria-label="Dismiss notification"
            className="-my-0.5 grid h-6 w-6 place-items-center rounded text-emerald-700 transition-colors hover:bg-emerald-100"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      ) : null}

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-xl border border-ink-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-[0.06em] text-ink-500">
                {card.label}
              </span>
              <span className={`grid h-7 w-7 place-items-center rounded-md ${card.tone}`}>
                <card.icon className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-2 text-2xl font-semibold tabular-nums text-ink-950">
              {dataLoading ? '—' : card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-5">
        <Toolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedService={selectedService}
          onServiceChange={setSelectedService}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          isFilterActive={isFilterActive}
          onReset={handleResetFilters}
          resultCount={totalFilteredCount}
          totalCount={enquiries.length}
        />
      </div>

      {dataLoading ? (
        <TableSkeleton />
      ) : fetchError ? (
        <ErrorState message={fetchError} onRetry={fetchEnquiries} />
      ) : enquiries.length === 0 ? (
        <EmptyState />
      ) : totalFilteredCount === 0 ? (
        <NoResultsState onReset={handleResetFilters} />
      ) : (
        <>
          <EnquiryTable
            items={paginatedEnquiries}
            updatingStatusId={updatingStatusId}
            onStatusChange={handleStatusChange}
            onView={handleViewEnquiry}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteModal}
          />
          <EnquiryCards
            items={paginatedEnquiries}
            updatingStatusId={updatingStatusId}
            onStatusChange={handleStatusChange}
            onView={handleViewEnquiry}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteModal}
          />
          <div className="mt-5">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              endIndex={endIndex}
              totalCount={totalFilteredCount}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}

      <ViewEnquiryDialog
        open={viewModalOpen}
        onClose={handleCloseViewModal}
        enquiry={viewEnquiry}
        loading={viewLoading}
        error={viewError}
        onEdit={handleOpenEditModal}
      />

      <EditEnquiryDialog
        open={editModalOpen}
        onClose={handleCloseEditModal}
        enquiryId={editId}
        formData={editFormData}
        errors={editFormErrors}
        apiError={editApiError}
        submitting={editSubmitting}
        onChange={handleEditFieldChange}
        onSubmit={handleUpdateEnquirySubmit}
      />

      <DeleteEnquiryDialog
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        item={deleteItem}
        submitting={deleteSubmitting}
        apiError={deleteApiError}
        onConfirm={handleConfirmDelete}
      />
    </AdminShell>
  );
}
