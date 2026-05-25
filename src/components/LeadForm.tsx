"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUp, Send, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  jobSeekerSchema,
  employerSchema,
  JobSeekerFormValues,
  EmployerFormValues
} from "@/schemas/formSchemas";
import { COUNTRIES, INDUSTRIES } from "@/constants";
import { useToast } from "./ui/toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

export function LeadForm() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState("seeker");
  const [isSubmittingSeeker, setIsSubmittingSeeker] = React.useState(false);
  const [isSubmittingEmployer, setIsSubmittingEmployer] = React.useState(false);
  const [seekerCvName, setSeekerCvName] = React.useState<string | null>(null);

  // Job Seeker Form hook
  const seekerForm = useForm<JobSeekerFormValues>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      preferredCountry: "",
      jobCategory: "",
      experience: "",
      message: ""
    }
  });

  // Employer Form hook
  const employerForm = useForm<EmployerFormValues>({
    resolver: zodResolver(employerSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      phone: "",
      email: "",
      industry: "",
      workersRequired: 1,
      location: "",
      message: ""
    }
  });

  // Listen for country pre-selection events
  React.useEffect(() => {
    const handlePreselect = (event: Event) => {
      const customEvent = event as CustomEvent<{ country: string }>;
      if (customEvent.detail && customEvent.detail.country) {
        // Set tab to seeker
        setActiveTab("seeker");
        // Set preferred country
        seekerForm.setValue("preferredCountry", customEvent.detail.country);
      }
    };

    window.addEventListener("preselect-country", handlePreselect);
    return () => window.removeEventListener("preselect-country", handlePreselect);
  }, [seekerForm]);

  // Seeker submit handler
  const onSeekerSubmit = async (data: JobSeekerFormValues) => {
    setIsSubmittingSeeker(true);
    try {
      // Simulate API latency
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      console.log("Job Seeker Lead Data Submitted Successfully:", {
        ...data,
        cvFileUploaded: seekerCvName || "No file uploaded"
      });

      toast({
        title: "Application Received!",
        description: `Thank you ${data.fullName}. Our career counselor will call you within 24 hours.`,
        type: "success"
      });

      seekerForm.reset();
      setSeekerCvName(null);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "An unexpected error occurred. Please try again later.",
        type: "error"
      });
    } finally {
      setIsSubmittingSeeker(false);
    }
  };

  // Employer submit handler
  const onEmployerSubmit = async (data: EmployerFormValues) => {
    setIsSubmittingEmployer(true);
    try {
      // Simulate API latency
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Employer Enquiry Data Submitted Successfully:", data);

      toast({
        title: "Requirement Submitted!",
        description: `Thank you ${data.contactPerson}. Our account manager will contact you with profiles shortly.`,
        type: "success"
      });

      employerForm.reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "An unexpected error occurred. Please try again later.",
        type: "error"
      });
    } finally {
      setIsSubmittingEmployer(false);
    }
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSeekerCvName(file.name);
      seekerForm.setValue("cvFile", file);
    }
  };

  return (
    <section id="for-employers" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(182,146,91,0.03),transparent)]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="text-xs font-bold text-[#B6925B] tracking-widest uppercase">
            Start Your Journey
          </div>
          <h2 id="lead-forms" className="text-3xl md:text-4xl font-display font-extrabold text-[#0B192C]">
            Submit Your Inquiry Today
          </h2>
          <p className="text-sm md:text-base text-slate-500 leading-relaxed font-sans">
            Ready to find your dream job abroad or recruit top-tier workforce? Select the appropriate form and send us your requirements.
          </p>
        </div>

        {/* Form Container */}
        <Tabs defaultValue="seeker" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 bg-slate-200/50 p-1.5 rounded-2xl w-full max-w-md">
              <TabsTrigger id="tab-seeker" value="seeker" className="rounded-xl">
                Job Seeker Form
              </TabsTrigger>
              <TabsTrigger id="tab-employer" value="employer" className="rounded-xl">
                Employer Enquiry
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-900/5">
            <AnimatePresence mode="wait">
              {/* Job Seeker Form Tab */}
              {activeTab === "seeker" ? (
                <motion.form
                  key="seeker-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={seekerForm.handleSubmit(onSeekerSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-sm font-semibold text-slate-700">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        error={!!seekerForm.formState.errors.fullName}
                        {...seekerForm.register("fullName")}
                      />
                      {seekerForm.formState.errors.fullName && (
                        <p className="text-xs text-red-500">{seekerForm.formState.errors.fullName.message}</p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="e.g. +91 9876543210"
                        error={!!seekerForm.formState.errors.phone}
                        {...seekerForm.register("phone")}
                      />
                      {seekerForm.formState.errors.phone && (
                        <p className="text-xs text-red-500">{seekerForm.formState.errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="johndoe@email.com"
                        error={!!seekerForm.formState.errors.email}
                        {...seekerForm.register("email")}
                      />
                      {seekerForm.formState.errors.email && (
                        <p className="text-xs text-red-500">{seekerForm.formState.errors.email.message}</p>
                      )}
                    </div>

                    {/* Preferred Country */}
                    <div className="space-y-2">
                      <label htmlFor="preferredCountry" className="text-sm font-semibold text-slate-700">
                        Preferred Country <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="preferredCountry"
                          className={`flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B192C] focus-visible:ring-offset-2 appearance-none cursor-pointer ${
                            seekerForm.formState.errors.preferredCountry ? "border-red-500" : ""
                          }`}
                          {...seekerForm.register("preferredCountry")}
                        >
                          <option value="">Select country...</option>
                          {COUNTRIES.map((c) => (
                            <option key={c.id} value={c.name}>
                              {c.flag} {c.name}
                            </option>
                          ))}
                        </select>
                        {/* Custom Select arrow */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          ▼
                        </div>
                      </div>
                      {seekerForm.formState.errors.preferredCountry && (
                        <p className="text-xs text-red-500">{seekerForm.formState.errors.preferredCountry.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Job Category */}
                    <div className="space-y-2">
                      <label htmlFor="jobCategory" className="text-sm font-semibold text-slate-700">
                        Job Category <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="jobCategory"
                        placeholder="e.g. Electrician, Nurse, Welder"
                        error={!!seekerForm.formState.errors.jobCategory}
                        {...seekerForm.register("jobCategory")}
                      />
                      {seekerForm.formState.errors.jobCategory && (
                        <p className="text-xs text-red-500">{seekerForm.formState.errors.jobCategory.message}</p>
                      )}
                    </div>

                    {/* Experience */}
                    <div className="space-y-2">
                      <label htmlFor="experience" className="text-sm font-semibold text-slate-700">
                        Years of Experience <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="experience"
                          className={`flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B192C] focus-visible:ring-offset-2 appearance-none cursor-pointer ${
                            seekerForm.formState.errors.experience ? "border-red-500" : ""
                          }`}
                          {...seekerForm.register("experience")}
                        >
                          <option value="">Select experience...</option>
                          <option value="fresher">Fresher / No Experience</option>
                          <option value="1-2 years">1 - 2 Years</option>
                          <option value="3-5 years">3 - 5 Years</option>
                          <option value="5-10 years">5 - 10 Years</option>
                          <option value="10+ years">10+ Years</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          ▼
                        </div>
                      </div>
                      {seekerForm.formState.errors.experience && (
                        <p className="text-xs text-red-500">{seekerForm.formState.errors.experience.message}</p>
                      )}
                    </div>
                  </div>

                  {/* CV Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 block">
                      Upload CV (PDF, DOCX) <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="border-2 border-dashed border-slate-200 hover:border-[#B6925B] transition-colors rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50 relative group">
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleCvChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                      />
                      {seekerCvName ? (
                        <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
                          <Check className="h-5 w-5 bg-emerald-100 p-0.5 rounded-full shrink-0" />
                          <span>{seekerCvName}</span>
                        </div>
                      ) : (
                        <>
                          <FileUp className="h-8 w-8 text-slate-400 mb-2 group-hover:scale-105 group-hover:text-[#B6925B] transition-all" />
                          <span className="text-sm text-slate-600 font-semibold">Click to select file</span>
                          <span className="text-xs text-slate-400 mt-1">Maximum file size: 5MB</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="seekerMessage" className="text-sm font-semibold text-slate-700">
                      Additional Message / Details
                    </label>
                    <Textarea
                      id="seekerMessage"
                      placeholder="Share any specific requests, preferred visa timelines, or licensing details..."
                      {...seekerForm.register("message")}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="accent"
                    className="w-full justify-center gap-2 h-12 shadow-lg shadow-[#B6925B]/10 cursor-pointer"
                    isLoading={isSubmittingSeeker}
                  >
                    <Send className="h-4 w-4" />
                    Submit Application
                  </Button>
                </motion.form>
              ) : (
                <motion.form
                  key="employer-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={employerForm.handleSubmit(onEmployerSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Company Name */}
                    <div className="space-y-2">
                      <label htmlFor="companyName" className="text-sm font-semibold text-slate-700">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="companyName"
                        placeholder="e.g. Al-Futtaim Construction"
                        error={!!employerForm.formState.errors.companyName}
                        {...employerForm.register("companyName")}
                      />
                      {employerForm.formState.errors.companyName && (
                        <p className="text-xs text-red-500">{employerForm.formState.errors.companyName.message}</p>
                      )}
                    </div>

                    {/* Contact Person */}
                    <div className="space-y-2">
                      <label htmlFor="contactPerson" className="text-sm font-semibold text-slate-700">
                        Contact Person <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="contactPerson"
                        placeholder="e.g. HR Manager / Owner"
                        error={!!employerForm.formState.errors.contactPerson}
                        {...employerForm.register("contactPerson")}
                      />
                      {employerForm.formState.errors.contactPerson && (
                        <p className="text-xs text-red-500">{employerForm.formState.errors.contactPerson.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone Number */}
                    <div className="space-y-2">
                      <label htmlFor="employerPhone" className="text-sm font-semibold text-slate-700">
                        Business Phone Number <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="employerPhone"
                        type="tel"
                        placeholder="e.g. +971 50 123 4567"
                        error={!!employerForm.formState.errors.phone}
                        {...employerForm.register("phone")}
                      />
                      {employerForm.formState.errors.phone && (
                        <p className="text-xs text-red-500">{employerForm.formState.errors.phone.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="employerEmail" className="text-sm font-semibold text-slate-700">
                        Business Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="employerEmail"
                        type="email"
                        placeholder="recruitment@company.com"
                        error={!!employerForm.formState.errors.email}
                        {...employerForm.register("email")}
                      />
                      {employerForm.formState.errors.email && (
                        <p className="text-xs text-red-500">{employerForm.formState.errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Industry dropdown */}
                    <div className="space-y-2">
                      <label htmlFor="industry" className="text-sm font-semibold text-slate-700">
                        Industry Sector <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="industry"
                          className={`flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B192C] focus-visible:ring-offset-2 appearance-none cursor-pointer ${
                            employerForm.formState.errors.industry ? "border-red-500" : ""
                          }`}
                          {...employerForm.register("industry")}
                        >
                          <option value="">Select industry...</option>
                          {INDUSTRIES.map((ind) => (
                            <option key={ind.id} value={ind.name}>
                              {ind.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          ▼
                        </div>
                      </div>
                      {employerForm.formState.errors.industry && (
                        <p className="text-xs text-red-500">{employerForm.formState.errors.industry.message}</p>
                      )}
                    </div>

                    {/* Workers required */}
                    <div className="space-y-2">
                      <label htmlFor="workersRequired" className="text-sm font-semibold text-slate-700">
                        Workers Needed <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="workersRequired"
                        type="number"
                        min="1"
                        placeholder="e.g. 50"
                        error={!!employerForm.formState.errors.workersRequired}
                        {...employerForm.register("workersRequired", { valueAsNumber: true })}
                      />
                      {employerForm.formState.errors.workersRequired && (
                        <p className="text-xs text-red-500">{employerForm.formState.errors.workersRequired.message}</p>
                      )}
                    </div>

                    {/* Country Location */}
                    <div className="space-y-2">
                      <label htmlFor="location" className="text-sm font-semibold text-slate-700">
                        Deploy Location / Country <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="location"
                        placeholder="e.g. Riyadh, Saudi Arabia"
                        error={!!employerForm.formState.errors.location}
                        {...employerForm.register("location")}
                      />
                      {employerForm.formState.errors.location && (
                        <p className="text-xs text-red-500">{employerForm.formState.errors.location.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="employerMessage" className="text-sm font-semibold text-slate-700">
                      Manpower Details & Requirements
                    </label>
                    <Textarea
                      id="employerMessage"
                      placeholder="Detail the technical credentials required, standard visa contracts, lodging provisions, or flight ticket terms..."
                      {...employerForm.register("message")}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full justify-center gap-2 h-12 shadow-lg shadow-slate-900/10 cursor-pointer"
                    isLoading={isSubmittingEmployer}
                  >
                    <Send className="h-4 w-4" />
                    Send Requirement
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
