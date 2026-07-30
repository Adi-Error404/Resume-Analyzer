"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { AlertCircle, BrainCircuit, CheckCircle, Download, Loader2, Sparkles, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AtsScoreResult {
  overallScore: number;
  keywordScore: number;
  skillsScore: number;
  formattingScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  keywordDensity: number;
}

interface LLMFeedback {
  professionalSummary?: string;
  strengths?: string[];
  weaknesses?: string[];
  missingSkills?: string[];
  improvementSuggestions?: string[];
  careerAdvice?: string;
  interviewReadiness?: string;
  overallFeedback?: string;
}

export function DashboardView() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [scoreData, setScoreData] = useState<AtsScoreResult | null>(null);
  const [llmFeedback, setLlmFeedback] = useState<LLMFeedback | null>(null);

  useEffect(() => {
    const dataString = localStorage.getItem("resumeData");
    if (!dataString) {
      router.push("/upload");
      return;
    }

    try {
      const { text, companyId, roleId } = JSON.parse(dataString);
      
      const fetchAnalysis = async () => {
        try {
          // Fetch Score
          const scoreRes = await fetch("/api/score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resumeText: text, companyId, roleId })
          });
          
          if (!scoreRes.ok) throw new Error("Failed to calculate ATS score");
          const scoreResult = await scoreRes.json();
          setScoreData(scoreResult);

          // Fetch LLM Analysis
          const llmRes = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resumeText: text, companyName: companyId, roleName: roleId })
          });
          
          if (!llmRes.ok) throw new Error("Failed to get AI feedback");
          const llmResult = await llmRes.json();
          setLlmFeedback(llmResult);
          
        } catch (err: any) {
          setError(err.message || "An error occurred during analysis.");
        } finally {
          setLoading(false);
        }
      };

      fetchAnalysis();
    } catch (e) {
      router.push("/upload");
    }
  }, [router]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error || !scoreData || !llmFeedback) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <AlertCircle className="w-16 h-16 text-destructive" />
        <h2 className="text-2xl font-bold">Analysis Failed</h2>
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => router.push("/upload")}>Try Again</Button>
      </div>
    );
  }

  const chartData = [
    { name: "Score", value: scoreData.overallScore, fill: scoreData.overallScore > 75 ? "hsl(var(--primary))" : scoreData.overallScore > 50 ? "#eab308" : "hsl(var(--destructive))" }
  ];

  const breakdownData = [
    { name: "Keywords", score: scoreData.keywordScore },
    { name: "Skills", score: scoreData.skillsScore },
    { name: "Format", score: scoreData.formattingScore },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Resume Analysis</h1>
          <p className="text-muted-foreground">Here is how you stack up against the target role.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" /> Download PDF Report
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Scores */}
        <div className="space-y-8 lg:col-span-1">
          <Card className="glass shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-24 h-24" />
            </div>
            <CardHeader>
              <CardTitle>ATS Compatibility</CardTitle>
              <CardDescription>Your overall match score.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart 
                    cx="50%" cy="50%" 
                    innerRadius="70%" outerRadius="100%" 
                    barSize={20} 
                    data={chartData} 
                    startAngle={180} endAngle={0}
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar background dataKey="value" cornerRadius={10} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center -mt-24 mb-10">
                <span className="text-6xl font-extrabold tracking-tighter">{scoreData.overallScore}</span>
                <span className="text-2xl text-muted-foreground">/100</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Score Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={breakdownData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={70} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="score" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: AI Feedback & Keywords */}
        <div className="space-y-8 lg:col-span-2">
          <Card className="border-t-4 border-t-primary shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-primary" /> AI Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-foreground/90">
                {llmFeedback.professionalSummary || "No summary available."}
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-green-500/5 border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle className="w-5 h-5" /> Matched Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {scoreData.matchedKeywords.length > 0 ? scoreData.matchedKeywords.map((kw, i) => (
                    <Badge key={i} variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
                      {kw}
                    </Badge>
                  )) : (
                    <span className="text-muted-foreground text-sm">No specific target keywords matched.</span>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-destructive/5 border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <XCircle className="w-5 h-5" /> Missing Keywords
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {scoreData.missingKeywords.length > 0 ? scoreData.missingKeywords.map((kw, i) => (
                    <Badge key={i} variant="outline" className="border-destructive/30 text-destructive/80">
                      {kw}
                    </Badge>
                  )) : (
                    <span className="text-muted-foreground text-sm">Great job! No major keywords missing.</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Actionable Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {llmFeedback.improvementSuggestions?.map((suggestion, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs">
                      {i + 1}
                    </span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Overall Feedback & Interview Readiness</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-1">Interview Readiness</h4>
                <p className="text-muted-foreground">{llmFeedback.interviewReadiness}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Final Verdict</h4>
                <p className="text-muted-foreground">{llmFeedback.overallFeedback}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-48" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-8 lg:col-span-1">
          <Skeleton className="h-[350px] w-full rounded-xl" />
          <Skeleton className="h-[250px] w-full rounded-xl" />
        </div>
        <div className="space-y-8 lg:col-span-2">
          <Skeleton className="h-[150px] w-full rounded-xl" />
          <div className="grid md:grid-cols-2 gap-6">
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <Skeleton className="h-[200px] w-full rounded-xl" />
          </div>
          <Skeleton className="h-[250px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
