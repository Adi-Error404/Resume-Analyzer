import { ResumeUploader } from "@/components/upload/ResumeUploader";

export default function UploadPage() {
  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-premium opacity-30 blur-3xl"></div>
      
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Analyze Your Resume</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Upload your resume and select your target company and role to get a comprehensive AI analysis and ATS score.
          </p>
        </div>
        
        <ResumeUploader />
      </div>
    </div>
  );
}
