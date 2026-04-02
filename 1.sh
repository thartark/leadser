#!/bin/bash
set -e

echo "🌌 DEALEROS - COMPLETE INSTALLATION 🌌"
echo "=============================================="

# Create dealeros folder if not exists
mkdir -p dealeros
cd dealeros

# Check if web app exists, if not create it
if [ ! -d "web" ]; then
  echo "📦 Creating Next.js app..."
  npx create-next-app@14 web --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
fi

cd web

echo "📦 Installing dependencies..."
npm install lucide-react clsx tailwind-merge class-variance-authority @prisma/client prisma @radix-ui/react-tabs

echo "🗄️ Setting up Prisma..."

# Create Prisma schema
mkdir -p prisma
cat > prisma/schema.prisma << 'EOF'
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  role          String    @default("SALESPERSON")
  avatar        String?
  createdAt     DateTime  @default(now())
  
  leads         Lead[]    @relation("AssignedLeads")
  interactions  Interaction[]
  tasks         Task[]
}

model Lead {
  id                String        @id @default(cuid())
  firstName         String
  lastName          String
  email             String?
  phone             String?
  vehicleInterest   String?
  source            String        @default("WEBSITE")
  status            String        @default("NEW")
  aiScore           Int           @default(0)
  scoreExplanation  String?       @db.Text
  timeInStage       DateTime      @default(now())
  lastContactAt     DateTime?
  assignedToId      String?
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt
  
  assignedTo        User?         @relation("AssignedLeads", fields: [assignedToId], references: [id])
  interactions      Interaction[]
  tasks             Task[]
}

model Interaction {
  id          String      @id @default(cuid())
  type        String
  direction   String?
  subject     String?
  content     String?     @db.Text
  duration    Int?
  leadId      String
  userId      String
  createdAt   DateTime    @default(now())
  
  lead        Lead        @relation(fields: [leadId], references: [id])
  user        User        @relation(fields: [userId], references: [id])
}

model Task {
  id          String      @id @default(cuid())
  title       String
  description String?     @db.Text
  dueDate     DateTime
  completed   Boolean     @default(false)
  leadId      String
  userId      String
  createdAt   DateTime    @default(now())
  
  lead        Lead        @relation(fields: [leadId], references: [id])
  user        User        @relation(fields: [userId], references: [id])
}
EOF

# Create seed file with 50 fake leads
mkdir -p prisma
cat > prisma/seed.ts << 'EOF'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const firstNames = ['Michael', 'Sarah', 'James', 'Emily', 'David', 'Jessica', 'Daniel', 'Lisa', 'Robert', 'Amanda']
const lastNames = ['Chen', 'Williams', 'Rodriguez', 'Davis', 'Brown', 'Jones', 'Miller', 'Garcia', 'Wilson', 'Martinez']
const vehicles = ['2024 Tesla Model 3', '2024 Ford F-150', '2024 BMW X5', '2024 Toyota Camry', '2024 Honda CR-V', '2024 Chevrolet Silverado', '2024 Mercedes C-Class', '2024 Audi Q5', '2024 Hyundai Tucson', '2024 Kia Telluride']
const sources = ['WEBSITE', 'PHONE', 'CHAT', 'REFERRAL', 'SOCIAL_MEDIA', 'WALK_IN']
const statuses = ['NEW', 'CONTACTED', 'APPOINTMENT_SET', 'TEST_DRIVE', 'NEGOTIATING', 'CLOSED_WON', 'CLOSED_LOST']

async function main() {
  console.log('🌱 Seeding database...')
  
  // Create a demo user
  const user = await prisma.user.upsert({
    where: { email: 'sarah.johnson@dealeros.com' },
    update: {},
    create: {
      email: 'sarah.johnson@dealeros.com',
      name: 'Sarah Johnson',
      role: 'SALESPERSON',
    },
  })
  
  // Create 50 fake leads
  for (let i = 0; i < 50; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const vehicle = vehicles[Math.floor(Math.random() * vehicles.length)]
    const source = sources[Math.floor(Math.random() * sources.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const score = Math.floor(Math.random() * 100)
    
    // Generate random date within last 30 days
    const daysAgo = Math.floor(Math.random() * 30)
    const createdAt = new Date()
    createdAt.setDate(createdAt.getDate() - daysAgo)
    
    // Generate random last contact date
    const lastContactAt = Math.random() > 0.3 ? new Date(createdAt.getTime() + Math.random() * 86400000 * 3) : null
    
    await prisma.lead.create({
      data: {
        firstName,
        lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
        phone: `(555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        vehicleInterest: vehicle,
        source,
        status,
        aiScore: score,
        scoreExplanation: score > 70 ? "Hot lead - multiple interactions, high engagement" : score > 40 ? "Warm lead - needs nurturing" : "Cold lead - requires re-engagement",
        timeInStage: createdAt,
        lastContactAt,
        assignedToId: user.id,
        createdAt,
      },
    })
  }
  
  // Create some interactions for each lead
  const leads = await prisma.lead.findMany()
  for (const lead of leads) {
    const numInteractions = Math.floor(Math.random() * 5)
    for (let i = 0; i < numInteractions; i++) {
      const types = ['CALL', 'EMAIL', 'SMS']
      const type = types[Math.floor(Math.random() * types.length)]
      const direction = Math.random() > 0.5 ? 'OUTBOUND' : 'INBOUND'
      const content = type === 'CALL' ? 'Discussed vehicle options and financing' : type === 'EMAIL' ? 'Sent pricing and availability' : 'Confirmed appointment time'
      
      await prisma.interaction.create({
        data: {
          type,
          direction,
          content,
          duration: type === 'CALL' ? Math.floor(Math.random() * 20) + 5 : null,
          leadId: lead.id,
          userId: user.id,
        },
      })
    }
  }
  
  console.log('✅ Seeded 50 leads with interactions!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
EOF

# Add seed to package.json
cat > package.json << 'EOF'
{
  "name": "@dealeros/web",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:seed": "prisma db seed",
    "postinstall": "prisma generate"
  },
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  },
  "dependencies": {
    "next": "14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.303.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "class-variance-authority": "^0.7.0",
    "@prisma/client": "^5.8.0",
    "@radix-ui/react-tabs": "^1.0.4"
  },
  "devDependencies": {
    "@types/node": "^20.10.6",
    "@types/react": "^18.2.46",
    "@types/react-dom": "^18.2.18",
    "typescript": "^5.3.3",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.33",
    "prisma": "^5.8.0",
    "ts-node": "^10.9.2"
  }
}
EOF

# Create .env.local
cat > .env.local << 'EOF'
DATABASE_URL="postgresql://postgres@localhost:5432/dealeros_dev"
EOF

echo ""
echo "=============================================="
echo "🔧 DATABASE SETUP"
echo "=============================================="

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
  echo "PostgreSQL not found. Installing via Homebrew..."
  brew install postgresql@14
  brew services start postgresql@14
fi

# Create database
echo "Creating database..."
createdb dealeros_dev 2>/dev/null || echo "Database already exists"

# Run Prisma commands
echo "Running Prisma migrations..."
npx prisma generate
npx prisma migrate dev --name init --create-only 2>/dev/null || echo "Migration already exists"
npx prisma migrate deploy

# Seed the database
echo "Seeding database with 50 leads..."
npx prisma db seed

# Create UI components (abbreviated - same as before)
echo "🎨 Creating UI components..."

# Button component
mkdir -p components/ui
cat > components/ui/button.tsx << 'EOF'
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'teal' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-navy text-white hover:bg-navy-light',
      teal: 'bg-teal text-white hover:bg-teal-dark',
      outline: 'border border-gray-200 bg-white hover:bg-gray-50',
      ghost: 'hover:bg-gray-100',
    }
    const sizes = {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 px-3 text-xs',
      lg: 'h-10 px-6',
      icon: 'h-9 w-9',
    }
    return (
      <button
        className={cn("inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all", variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
export { Button }
EOF

# Card component
cat > components/ui/card.tsx << 'EOF'
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-xl border bg-white shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-gray-500", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardDescription, CardContent }
EOF

# Badge component
cat > components/ui/badge.tsx << 'EOF'
import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'teal' | 'amber' | 'green'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    teal: 'bg-teal/10 text-teal',
    amber: 'bg-amber/10 text-amber',
    green: 'bg-green-100 text-green-800',
  }
  return <div className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", variants[variant], className)} {...props} />
}
export { Badge }
EOF

# Input component
cat > components/ui/input.tsx << 'EOF'
import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn("flex h-9 w-full rounded-lg border border-gray-200 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal", className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"
export { Input }
EOF

# Avatar component
cat > components/ui/avatar.tsx << 'EOF'
import * as React from "react"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full", className)} {...props} />
))
Avatar.displayName = "Avatar"

const AvatarFallback = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex h-full w-full items-center justify-center rounded-full bg-gray-100", className)} {...props} />
))
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarFallback }
EOF

# Tabs component
cat > components/ui/tabs.tsx << 'EOF'
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-500",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-teal data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
EOF

# Create lib/utils
mkdir -p lib
cat > lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
EOF

# Update tailwind config with custom colors
cat > tailwind.config.ts << 'EOF'
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0F1F3D', light: '#1A2D50', dark: '#081530' },
        teal: { DEFAULT: '#00C9A7', dark: '#00A88B' },
        amber: { DEFAULT: '#F59E0B', dark: '#D97706' },
      },
    },
  },
  plugins: [],
}
export default config
EOF

# Update globals.css
cat > app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
}

::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 3px; }
::-webkit-scrollbar-thumb { background: #00C9A7; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #0F1F3D; }
EOF

# Create the dashboard page (simplified)
mkdir -p app
cat > app/page.tsx << 'EOF'
"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Clock, Target, DollarSign, Sparkles, Phone, Mail, Calendar } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold">Welcome to DealerOS</h1><p className="text-gray-500">Your AI-powered dealership CRM</p></div>
      
      <Card className="border-l-4 border-l-teal bg-gradient-to-r from-teal/5 to-transparent">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="rounded-full bg-teal/10 p-2"><Sparkles className="h-5 w-5 text-teal" /></div>
            <div><h3 className="font-semibold">System Ready <Badge variant="teal">Connected</Badge></h3><p className="text-sm text-gray-600 mt-1">Database seeded with 50 leads. Ready to manage your pipeline!</p></div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Total Leads</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">50</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Hot Leads</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">18</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Conversion</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">24%</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Response Time</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">4.2min</div></CardContent></Card>
      </div>

      <div className="flex gap-4">
        <Button variant="teal"><Phone className="h-4 w-4 mr-2" />Log Call</Button>
        <Button variant="outline"><Mail className="h-4 w-4 mr-2" />Send Email</Button>
        <Button variant="outline"><Calendar className="h-4 w-4 mr-2" />Schedule</Button>
      </div>
    </div>
  )
}
EOF

# Create leads page
mkdir -p app/leads
cat > app/leads/page.tsx << 'EOF'
"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Filter, Phone, Mail } from "lucide-react"

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div><h1 className="text-3xl font-bold">Lead Pipeline</h1><p className="text-gray-500">Manage your leads</p></div>
        <Button variant="teal"><Plus className="h-4 w-4 mr-2" />Add Lead</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardContent className="p-4"><p className="font-medium">Michael Chen</p><p className="text-sm text-gray-500">2024 Tesla Model 3</p><Badge variant="teal" className="mt-2">Score 92</Badge><div className="flex gap-1 mt-2"><Button variant="ghost" size="icon"><Phone className="h-3 w-3" /></Button><Button variant="ghost" size="icon"><Mail className="h-3 w-3" /></Button></div></CardContent></Card>
        <Card><CardContent className="p-4"><p className="font-medium">Sarah Williams</p><p className="text-sm text-gray-500">2024 BMW X5</p><Badge variant="amber" className="mt-2">Score 78</Badge><div className="flex gap-1 mt-2"><Button variant="ghost" size="icon"><Phone className="h-3 w-3" /></Button><Button variant="ghost" size="icon"><Mail className="h-3 w-3" /></Button></div></CardContent></Card>
        <Card><CardContent className="p-4"><p className="font-medium">James Rodriguez</p><p className="text-sm text-gray-500">2024 Ford F-150</p><Badge variant="teal" className="mt-2">Score 95</Badge><div className="flex gap-1 mt-2"><Button variant="ghost" size="icon"><Phone className="h-3 w-3" /></Button><Button variant="ghost" size="icon"><Mail className="h-3 w-3" /></Button></div></CardContent></Card>
      </div>
    </div>
  )
}
EOF

# Create layout with sidebar
mkdir -p components/layout
cat > components/layout/Sidebar.tsx << 'EOF'
"use client"
import Link from "next/link"
import { LayoutDashboard, Target, Users, Settings } from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Leads", href: "/leads", icon: Target },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-navy text-white">
      <div className="flex h-16 items-center justify-center border-b border-navy-light">
        <h1 className="text-xl font-bold"><span className="text-teal">Dealer</span>OS</h1>
      </div>
      <nav className="p-3 space-y-1">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-navy-light">
            <item.icon className="h-4 w-4" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
EOF

cat > components/layout/TopBar.tsx << 'EOF'
"use client"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function TopBar() {
  return (
    <header className="fixed left-64 right-0 top-0 h-16 border-b bg-white">
      <div className="flex h-full items-center justify-between px-6">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search..." className="pl-9" />
        </div>
        <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
      </div>
    </header>
  )
}
EOF

cat > components/layout/AppLayout.tsx << 'EOF'
"use client"
import { Sidebar } from "./Sidebar"
import { TopBar } from "./TopBar"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />
      <TopBar />
      <main className="pl-64 pt-16">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
EOF

# Update root layout
cat > app/layout.tsx << 'EOF'
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppLayout } from "@/components/layout/AppLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DealerOS",
  description: "Automotive CRM",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  )
}
EOF

echo ""
echo "=============================================="
echo "✅ INSTALLATION COMPLETE!"
echo "=============================================="
echo ""
echo "🚀 Starting the dev server..."
echo ""
echo "Open http://localhost:3000 in your browser"
echo ""

npm run dev