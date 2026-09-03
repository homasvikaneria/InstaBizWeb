'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
} from '@mui/material';

const serviceOptions = [
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

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      serviceInterestedIn: '',
      message: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSuccess(false);
    setApiError(null);

    const payload = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      companyName: data.companyName,
      service: data.serviceInterestedIn,
      message: data.message,
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let resData = null;
      try {
        resData = await response.json();
      } catch (parseErr) {
        // Safe fallback if server returns non-JSON body
      }

      if (response.ok && response.status === 201) {
        setIsSuccess(true);
        setApiError(null);
        reset();
      } else if (response.status === 400 && resData) {
        if (Array.isArray(resData.errors) && resData.errors.length > 0) {
          setApiError(resData.errors.join(' '));
        } else {
          setApiError(resData.message || 'Validation failed. Please check your entries.');
        }
      } else if (response.status === 500) {
        setApiError('Something went wrong while submitting your enquiry. Please try again.');
      } else {
        setApiError(
          (resData && resData.message) ||
            'Something went wrong while submitting your enquiry. Please try again.'
        );
      }
    } catch (err) {
      setApiError('Unable to connect to the server. Please try again later.');
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setApiError(null);
    reset();
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            Contact &amp; Enquiry
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Let&apos;s Talk About <span className="text-blue-400">Your Project</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Share your business requirements with InstaBizWeb. Our technology and digital solutions team is ready to help architect custom web applications, ERP/CRM tools, and process automation.
          </p>
        </div>
      </section>

      {/* Main Form & Supporting Section */}
      <section className="py-16 lg:py-24 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Technology Partner Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                  Project Discovery
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  How We Partner With Your Business
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Every software initiative at InstaBizWeb starts with understanding your specific commercial goals, operational workflows, and software requirements.
                </p>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    1. Requirements Review
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed pl-4">
                    Our team reviews your submission to understand your exact business needs and solution goals.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    2. Technical Consultation
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed pl-4">
                    We propose an appropriate tech stack, system architecture, and project outline tailored to your budget.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    3. Solution Proposal
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed pl-4">
                    You receive a clear roadmap covering development milestones, deliverables, and support terms.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                
                {/* Simple Success Message Banner */}
                {isSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-semibold flex items-center justify-between">
                    <span>Your enquiry has been submitted successfully! We will get back to you soon.</span>
                    <button
                      onClick={handleReset}
                      type="button"
                      className="text-xs font-normal underline text-emerald-800 hover:text-emerald-950 ml-4 shrink-0"
                    >
                      Fill Again
                    </button>
                  </div>
                )}

                {/* API Error Message Banner */}
                {apiError && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-sm font-medium flex items-center justify-between">
                    <span>{apiError}</span>
                    <button
                      onClick={() => setApiError(null)}
                      type="button"
                      className="text-xs font-normal underline text-red-800 hover:text-red-950 ml-4 shrink-0"
                    >
                      Dismiss
                    </button>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                  <div className="border-b border-slate-200/80 pb-4">
                    <h3 className="text-xl font-bold text-slate-900">Enquiry Form</h3>
                    <p className="text-xs text-slate-500">
                      All fields marked below are required for project analysis.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <TextField
                        {...register('fullName', {
                          required: 'Please enter your full name.',
                          minLength: { value: 2, message: 'Full name must be at least 2 characters.' },
                          maxLength: { value: 100, message: 'Full name cannot exceed 100 characters.' },
                        })}
                        id="fullName"
                        label="Full Name *"
                        variant="outlined"
                        fullWidth
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <TextField
                        {...register('email', {
                          required: 'Please enter your email address.',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Please enter a valid email address.',
                          },
                        })}
                        id="email"
                        type="email"
                        label="Email Address *"
                        variant="outlined"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone Number */}
                    <div>
                      <TextField
                        {...register('phone', {
                          required: 'Please enter your phone number.',
                          minLength: { value: 7, message: 'Phone number must be at least 7 characters.' },
                          maxLength: { value: 20, message: 'Phone number cannot exceed 20 characters.' },
                          pattern: {
                            value: /^[0-9+\-\s()]{7,20}$/,
                            message: 'Please enter a valid phone number.',
                          },
                        })}
                        id="phone"
                        type="tel"
                        label="Phone Number *"
                        variant="outlined"
                        fullWidth
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                      />
                    </div>

                    {/* Company Name */}
                    <div>
                      <TextField
                        {...register('companyName', {
                          required: 'Please enter your company name.',
                          minLength: { value: 2, message: 'Company name must be at least 2 characters.' },
                          maxLength: { value: 100, message: 'Company name cannot exceed 100 characters.' },
                        })}
                        id="companyName"
                        label="Company Name *"
                        variant="outlined"
                        fullWidth
                        error={!!errors.companyName}
                        helperText={errors.companyName?.message}
                      />
                    </div>
                  </div>

                  {/* Service Interested In Select */}
                  <div>
                    <Controller
                      name="serviceInterestedIn"
                      control={control}
                      rules={{ required: 'Please select a service.' }}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.serviceInterestedIn}>
                          <InputLabel id="service-select-label">
                            Service Interested In *
                          </InputLabel>
                          <Select
                            {...field}
                            labelId="service-select-label"
                            id="serviceInterestedIn"
                            label="Service Interested In *"
                          >
                            <MenuItem value="" disabled>
                              <em>Select a service</em>
                            </MenuItem>
                            {serviceOptions.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.serviceInterestedIn && (
                            <FormHelperText>
                              {errors.serviceInterestedIn.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                      )}
                    />
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <TextField
                      {...register('message', {
                        required: 'Please enter your message.',
                        minLength: { value: 10, message: 'Message must be at least 10 characters.' },
                        maxLength: { value: 1000, message: 'Message cannot exceed 1000 characters.' },
                      })}
                      id="message"
                      label="Message *"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.message}
                      helperText={errors.message?.message}
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      disabled={isSubmitting}
                      sx={{
                        py: 1.75,
                        backgroundColor: '#2563eb',
                        '&:hover': {
                          backgroundColor: '#1d4ed8',
                        },
                        borderRadius: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'none',
                        fontSize: '1rem',
                      }}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                    </Button>
                  </div>
                </form>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
