<p align="center">
  <img src="https://raw.githubusercontent.com/Druky1/Lumos/main/static/logo.png" alt="Lumos Logo" width="150" />
</p>

## 🌟 Overview

Generate stunning thumbnails by overlaying customizable text onto your images—no design skills required!

🔗 Live Demo 
🤝 Contribute


## 🚀 Features

1. Instant Preview - See your thumbnail update in real-time as you type.
2. Custom Typography - Change font family, size, weight, color, and alignment.
3. Drag & Drop - Upload images by dragging them onto the canvas.
4. Responsive Export - Download your thumbnail in PNG or JPEG at HD resolutions.
5. Preset Library - Start from one of several professionally designed templates.
6. Undo/Redo History - Experiment freely, revert any change with a click.

## 🛠️ Tech Stack

### Frontend
- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui, magicui components
- RoughNotation
 
### Backend
- Next.js API Routes
- Next.js Server Actions
- Prisma ORM
- PostgreSQL (NeonDB)
- UploadThing
- NextAuth Authentication

### Development
- ESLint & Prettier
- TypeScript strict mode

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- UploadThing Storage Account
- pnpm (recommended) or npm


## 📦 Installation

1. Clone the repository
```bash
git clone https://github.com/Druky1/Lumos.git
```
2. Install the dependencies
```bash
cd Lumos
npm install
```
3. Set up environment variables
```bash
  cp .env or .env.local
```
4. Update `.env.local` or `.env` with your own credentials
   ```bash
   DATABASE_URL="postgresql://....."
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your_own_password"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GOOGLE_CALLBACK_URL="https://localhost:<port>/api/auth/callback/google"
   UPLOADTHING_TOKEN="your-uploadthing-token"
   ```
5. Run database migrations

```bash
npm prisma migrate dev
```
6. Start the project locally

```bash
npm run dev
pnpm dev
```

Voila! 😁, visit `http://localhost:3000` to see the app running!
   
## ⚙️ Usage

- Upload your base image (JPG, PNG, or GIF).
- Type your text to be placed on the image.
- Customize fonts, colors, effects, and layout.
- Export at up to 1920×1080 resolution for crisp thumbnails.

## 🌟 Roadmap 

- More font & template packs
- Batch export / zip download
- Social-media–sized presets (Instagram, TikTok)
- AI-powered text suggestions

Feel free to ⭐️ star the repo if you'd like to see these features!

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feat/YourIdea`)
3. Commit your changes (`git commit -m "feat: add amazing feature"`)
4. Push to your branch (`git push origin feat/YourIdea`)
5. Open a Pull Request


* Website: https://lumos-iota-sable.vercel.app/
* Email: official.spatra@gmail.com

<p align="center"> Made with ❤️ by Soumik Patra </p>
