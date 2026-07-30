# AI Resume Analyzer

A full-stack, production-ready AI Resume Analyzer built with Next.js 15, Tailwind CSS, shadcn/ui, and Google Gemini API. This platform allows users to upload their resume, select a target company and role, and receive a comprehensive ATS score and AI-driven feedback to help them land their dream job.

## Features

- **Resume Upload & Parsing:** Supports PDF and DOCX file uploads (up to 10MB) with robust text extraction using `pdf-parse` and `mammoth`.
- **ATS Scoring Engine:** Calculates a 0-100 ATS compatibility score using rule-based algorithms, Keyword Density Analysis, and TF-IDF (Term Frequency-Inverse Document Frequency).
- **AI-Powered Feedback:** Integrates with the Google Gemini SDK to generate qualitative, human-like feedback on grammar, strengths, weaknesses, missing skills, and interview readiness.
- **Premium SaaS UI:** Features a sleek dark mode by default, glassmorphism effects, Framer Motion animations, and Recharts visualizations.
- **Predefined Profiles:** Contains specialized keyword profiles for top tech giants (Google, Microsoft, Amazon, etc.) and various job roles (SWE, Data Scientist, Product Manager, etc.).

## Architecture & Tech Stack

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion, Recharts.
- **Backend:** Next.js API Routes (`/api/upload`, `/api/score`, `/api/analyze`), Node.js.
- **NLP & AI:** `natural` (for NLP scoring), `@google/genai` (for qualitative analysis).

## Folder Structure

```
├── src
│   ├── app               # Next.js App Router (Pages & API Routes)
│   ├── components        # UI Components (shadcn, layout, dashboard, upload)
│   ├── constants         # Predefined Companies & Job Roles data
│   ├── services          # Core business logic (resumeParser.ts, nlp.ts)
│   └── lib               # Utility functions
├── public                # Static assets
└── package.json          # Dependencies & Scripts
```

## Installation

1. Clone the repository and navigate to the root directory.
2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env.local` file in the root directory and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

*Note: The Gemini API key is strictly used on the server-side (`/api/analyze`) and is never exposed to the frontend.*

## Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment on Vercel

This project is optimized for deployment on Vercel. 
1. Push your code to a GitHub repository.
2. Import the project in Vercel.
3. Add the `GEMINI_API_KEY` to the Environment Variables in the Vercel dashboard.
4. Deploy! No additional configuration is required.

## Future Improvements

- Implement user authentication using NextAuth.js.
- Store user analysis history using Prisma ORM and PostgreSQL.
- Add client-side PDF generation for downloading the analysis report (`jspdf` + `html2canvas`).
- Expand the predefined company and role profiles.

## License

MIT
