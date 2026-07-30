"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, File, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

export function ResumeUploader() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [companies, setCompanies] = useState<{ id: string, name: string }[]>([]);
  const [roles, setRoles] = useState<{ id: string, name: string }[]>([]);

  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");

  useEffect(() => {
    // Fetch companies and roles
    fetch('/api/companies').then(res => res.json()).then(setCompanies);
    fetch('/api/jobroles').then(res => res.json()).then(setRoles);
  }, []);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (fileRejections.length > 0) {
      setError(fileRejections[0].errors[0].message || "Invalid file");
      return;
    }

    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10MB limit");
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file || !selectedCompany || !selectedRole) {
      setError("Please select a file, target company, and target role.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadProgress(30);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const errorData = await uploadRes.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const { text } = await uploadRes.json();
      setUploadProgress(60);

      // Save to localStorage or context so dashboard can use it
      localStorage.setItem("resumeData", JSON.stringify({
        text,
        companyId: selectedCompany,
        roleId: selectedRole
      }));

      setUploadProgress(100);

      // Artificial delay for smooth progress bar UX
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">

      {/* Settings Selection */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Target Company</label>
          <Select onValueChange={(value) => setSelectedCompany(value ?? '')} value={selectedCompany}>
            <SelectTrigger className="w-full h-12 bg-background/50 backdrop-blur">
              <SelectValue placeholder="Select a company" />
            </SelectTrigger>
            <SelectContent>
              {companies.map(c => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Target Role</label>
          <Select onValueChange={(val) => setSelectedRole(val || "")} value={selectedRole}>
            <SelectTrigger className="w-full h-12 bg-background/50 backdrop-blur">
              <SelectValue placeholder="Select a job role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map(r => (
                <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`glass-card p-12 text-center rounded-3xl border-2 border-dashed transition-all cursor-pointer ${isDragActive ? "border-primary bg-primary/5" : "border-border/50 hover:border-primary/50"
          } ${file ? "border-green-500/50 bg-green-500/5" : ""}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4">
          {file ? (
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
          ) : (
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <UploadCloud className="w-10 h-10 text-primary" />
            </div>
          )}

          <h3 className="text-2xl font-bold">
            {file ? "File Selected" : "Drag & drop your resume"}
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            {file ? file.name : "Supports PDF and DOCX files up to 10MB."}
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

      {isUploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Analyzing resume...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button
          size="lg"
          onClick={handleUpload}
          disabled={!file || !selectedCompany || !selectedRole || isUploading}
          className="w-full md:w-auto h-12 px-8 rounded-full shadow-lg"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            "Analyze Now"
          )}
        </Button>
      </div>

    </div>
  );
}
