import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Car, Wrench, BarChart3, Settings, 
  ChevronLeft, Search, Bell, Sun, Moon, Phone, Mail, Calendar, 
  MessageSquare, X, Clock, TrendingUp, TrendingDown, Target, 
  AlertCircle, Info, Check, Filter, Activity, DollarSign, Download,
  GitBranch, User, History, PieChart, Bot, Shield, Megaphone, InboxIcon, 
  CheckSquare, Trophy, CalendarDays, FileText, Star, Eye, Edit,
  Trash2, Plus, Minus, Award, Medal, Crown, Zap, Rocket, MapPin, 
  Building, CreditCard, Heart, Star as StarIcon, MessageCircle, Truck,
  Package, ShoppingCart, Fuel, Gauge, Calendar as CalendarIcon, MoreVertical,
  LineChart, BarChart as BarChartIcon, TrendingUp as TrendingUpIcon,
  Sparkles, Brain, Lightbulb, MessageCircle as MessageCircleIcon, Send,
  Reply, Forward, Archive, Flag, Bookmark, Paperclip, Image, Smile, Mic
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart as ReBarChart, Bar, 
  PieChart as RePieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, ComposedChart, LineChart as ReLineChart, Line
} from 'recharts';

// Mock Data (keeping existing)
const salespeople = [
  { id: 1, name: "Sarah Chen", initials: "SC", leads: 47, units: 18, gross: 124500, closeRate: 38.3, color: "bg-indigo-500", email: "sarah.chen@autodeal.com", phone: "(555) 111-2222", deals: 18, revenue: 1245000, satisfaction: 4.8, streak: 12 },
  { id: 2, name: "Mike Rodriguez", initials: "MR", leads: 52, units: 24, gross: 187200, closeRate: 46.2, color: "bg-emerald-500", email: "mike.rodriguez@autodeal.com", phone: "(555) 222-3333", deals: 24, revenue: 1872000, satisfaction: 4.9, streak: 8 },
  { id: 3, name: "Jessica Williams", initials: "JW", leads: 38, units: 15, gross: 98300, closeRate: 39.5, color: "bg-amber-500", email: "jessica.williams@autodeal.com", phone: "(555) 333-4444", deals: 15, revenue: 983000, satisfaction: 4.6, streak: 5 },
  { id: 4, name: "David Kim", initials: "DK", leads: 44, units: 21, gross: 156700, closeRate: 47.7, color: "bg-rose-500", email: "david.kim@autodeal.com", phone: "(555) 444-5555", deals: 21, revenue: 1567000, satisfaction: 4.7, streak: 15 },
  { id: 5, name: "Lisa Thompson", initials: "LT", leads: 41, units: 17, gross: 112400, closeRate: 41.5, color: "bg-cyan-500", email: "lisa.thompson@autodeal.com", phone: "(555) 555-6666", deals: 17, revenue: 1124000, satisfaction: 4.5, streak: 3 },
  { id: 6, name: "James Wilson", initials: "JW", leads: 35, units: 12, gross: 87600, closeRate: 34.3, color: "bg-purple-500", email: "james.wilson@autodeal.com", phone: "(555) 666-7777", deals: 12, revenue: 876000, satisfaction: 4.4, streak: 1 },
];

const leadsData = [
  { id: 1, score: 92, name: "Thomas Bennett", phone: "(555) 123-4567", email: "thomas.b@email.com", vehicle: "2024 Ford F-150 Lariat", source: "AutoTrader", status: "Hot", rep: "Sarah Chen", lastActivity: "5m ago", budget: 65000, location: "Chicago, IL", interest: "Truck", stage: "new" },
  { id: 2, score: 78, name: "Amanda Foster", phone: "(555) 234-5678", email: "amanda.f@email.com", vehicle: "2023 Tesla Model Y", source: "Website", status: "Warm", rep: "Mike Rodriguez", lastActivity: "2h ago", budget: 55000, location: "Los Angeles, CA", interest: "SUV", stage: "contacted" },
  { id: 3, score: 45, name: "Marcus Webb", phone: "(555) 345-6789", email: "marcus.w@email.com", vehicle: "2022 BMW X5", source: "Cars.com", status: "Cold", rep: "Jessica Williams", lastActivity: "1d ago", budget: 48000, location: "Miami, FL", interest: "Luxury SUV", stage: "appointment" },
  { id: 4, score: 88, name: "Rachel Cohen", phone: "(555) 456-7890", email: "rachel.c@email.com", vehicle: "2024 Mercedes-Benz GLE", source: "Facebook", status: "Hot", rep: "David Kim", lastActivity: "15m ago", budget: 75000, location: "New York, NY", interest: "Luxury", stage: "demo" },
  { id: 5, score: 65, name: "Kevin Zhang", phone: "(555) 567-8901", email: "kevin.z@email.com", vehicle: "2023 Toyota Tundra", source: "Phone", status: "Warm", rep: "Sarah Chen", lastActivity: "1h ago", budget: 58000, location: "Seattle, WA", interest: "Truck", stage: "negotiating" },
  { id: 6, score: 35, name: "Danielle Russo", phone: "(555) 678-9012", email: "danielle.r@email.com", vehicle: "2024 Honda CR-V", source: "Walk-in", status: "Cold", rep: "Lisa Thompson", lastActivity: "3d ago", budget: 35000, location: "Dallas, TX", interest: "SUV", stage: "lost" },
  { id: 7, score: 95, name: "Brandon Hayes", phone: "(555) 789-0123", email: "brandon.h@email.com", vehicle: "2024 Chevrolet Corvette", source: "AutoTrader", status: "Hot", rep: "Mike Rodriguez", lastActivity: "2m ago", budget: 85000, location: "Las Vegas, NV", interest: "Sports Car", stage: "closed" },
  { id: 8, score: 72, name: "Olivia Martinez", phone: "(555) 890-1234", email: "olivia.m@email.com", vehicle: "2023 Lexus RX", source: "Website", status: "Warm", rep: "James Wilson", lastActivity: "3h ago", budget: 52000, location: "Denver, CO", interest: "Luxury SUV", stage: "contacted" },
];

const inventoryData = [
  { id: 1, year: 2024, make: "Ford", model: "F-150", trim: "Lariat", stock: "F24001", price: 58995, cost: 51200, daysOnLot: 12, status: "Available", views: 245, inquiries: 12, vin: "1FTFW1E85PKE12345", engine: "3.5L EcoBoost V6", mpg: "22", color: "Oxford White" },
  { id: 2, year: 2023, make: "Tesla", model: "Model Y", trim: "Long Range", stock: "T23002", price: 49990, cost: 46700, daysOnLot: 28, status: "Available", views: 189, inquiries: 8, vin: "5YJYGDEE9PF123456", engine: "Dual Motor Electric", mpg: "131 MPGe", color: "Midnight Silver" },
  { id: 3, year: 2022, make: "BMW", model: "X5", trim: "xDrive40i", stock: "B22003", price: 55995, cost: 52100, daysOnLot: 45, status: "Sold", views: 156, inquiries: 5, vin: "5UXCR6C09N9J12345", engine: "3.0L I6 Turbo", mpg: "23", color: "Mineral White" },
  { id: 4, year: 2024, make: "Mercedes", model: "GLE", trim: "450 4MATIC", stock: "M24004", price: 72995, cost: 67800, daysOnLot: 8, status: "Available", views: 312, inquiries: 18, vin: "4JGFB4KBXRA123456", engine: "3.0L I6 Turbo", mpg: "21", color: "Obsidian Black" },
  { id: 5, year: 2023, make: "Toyota", model: "Tundra", trim: "1794", stock: "T23005", price: 62995, cost: 58400, daysOnLot: 62, status: "Pending", views: 98, inquiries: 3, vin: "5TFLA5DB9PX123456", engine: "3.5L V6 Hybrid", mpg: "18", color: "Smoked Mesquite" },
  { id: 6, year: 2024, make: "Honda", model: "CR-V", trim: "Sport Touring", stock: "H24006", price: 36995, cost: 34100, daysOnLot: 5, status: "Available", views: 267, inquiries: 15, vin: "2HKRW2H93RH123456", engine: "1.5L Turbo", mpg: "34", color: "Radiant Red" },
];

const customersData = [
  { id: 1, name: "Thomas Bennett", email: "thomas.b@email.com", phone: "(555) 123-4567", address: "123 Main St, Chicago, IL", since: "2023-06-15", lifetimeValue: 65000, status: "Active", vehicle: "2024 Ford F-150", equity: 15000, lastService: "2024-05-20", creditScore: 720 },
  { id: 2, name: "Rachel Cohen", email: "rachel.c@email.com", phone: "(555) 456-7890", address: "789 Pine Rd, New York, NY", since: "2023-11-20", lifetimeValue: 75000, status: "Active", vehicle: "2024 Mercedes GLE", equity: 25000, lastService: "2024-06-01", creditScore: 740 },
  { id: 3, name: "Amanda Foster", email: "amanda.f@email.com", phone: "(555) 234-5678", address: "456 Oak Ave, Los Angeles, CA", since: "2024-01-10", lifetimeValue: 55000, status: "Active", vehicle: "2023 Tesla Model Y", equity: 8000, lastService: "2024-05-15", creditScore: 680 },
];

const customerInteractions = {
  1: [
    { id: 1, date: "2024-06-15", type: "Call", description: "Discussed F-150 financing options", rep: "Sarah Chen", duration: "15 min" },
    { id: 2, date: "2024-06-14", type: "Email", description: "Sent quote for F-150 Lariat", rep: "Sarah Chen", status: "Opened" },
    { id: 3, date: "2024-06-10", type: "Service", description: "Vehicle service appointment", rep: "Service Dept", status: "Completed" },
  ],
  2: [
    { id: 1, date: "2024-06-15", type: "Appointment", description: "Test drive scheduled", rep: "David Kim", status: "Confirmed" },
    { id: 2, date: "2024-06-13", type: "Call", description: "Follow-up on GLE interest", rep: "David Kim", duration: "10 min" },
  ],
  3: [
    { id: 1, date: "2024-06-14", type: "Email", description: "Sent Model Y information", rep: "Mike Rodriguez", status: "Opened" },
    { id: 2, date: "2024-06-12", type: "Call", description: "Discussed financing", rep: "Mike Rodriguez", duration: "20 min" },
  ],
};

const leadVolumeData = Array.from({ length: 30 }, (_, i) => ({ day: i + 1, leads: Math.floor(Math.random() * 25) + 8, conversions: Math.floor(Math.random() * 8) + 2 }));
const leadSourcesData = [
  { name: "Website", value: 38, color: "#4F46E5" },
  { name: "AutoTrader", value: 24, color: "#10B981" },
  { name: "Cars.com", value: 18, color: "#F59E0B" },
  { name: "Facebook", value: 12, color: "#F43F5E" },
  { name: "Phone", value: 5, color: "#8B5CF6" },
  { name: "Walk-in", value: 3, color: "#06B6D4" },
];
const monthlyGoals = [
  { month: "Jan", target: 15, actual: 14 },
  { month: "Feb", target: 15, actual: 16 },
  { month: "Mar", target: 18, actual: 17 },
  { month: "Apr", target: 20, actual: 22 },
  { month: "May", target: 22, actual: 21 },
  { month: "Jun", target: 25, actual: 24 },
];
const hotLeads = leadsData.filter(l => l.status === "Hot").slice(0, 5);
const recentActivities = [
  { id: 1, user: "Sarah Chen", action: "called", target: "Thomas Bennett", time: "5 min ago" },
  { id: 2, user: "Mike Rodriguez", action: "sent email to", target: "Amanda Foster", time: "15 min ago" },
  { id: 3, user: "David Kim", action: "closed deal with", target: "Rachel Cohen", time: "1 hour ago" },
  { id: 4, user: "Jessica Williams", action: "added note for", target: "Marcus Webb", time: "2 hours ago" },
];

// Campaign data
const campaignsData = [
  { id: 1, name: "Summer Clearance", type: "Email", sent: 2500, opens: 875, clicks: 425, conversions: 56, revenue: 245000, status: "Active", date: "2024-06-01" },
  { id: 2, name: "Test Drive Event", type: "SMS", sent: 1800, opens: 1404, clicks: 576, conversions: 72, revenue: 312000, status: "Active", date: "2024-06-05" },
  { id: 3, name: "Service Special", type: "Email", sent: 4200, opens: 1176, clicks: 504, conversions: 42, revenue: 126000, status: "Completed", date: "2024-05-15" },
  { id: 4, name: "Memorial Day Sale", type: "Both", sent: 3500, opens: 2100, clicks: 875, conversions: 105, revenue: 420000, status: "Completed", date: "2024-05-25" },
  { id: 5, name: "Equity Alert", type: "Email", sent: 1200, opens: 540, clicks: 240, conversions: 36, revenue: 198000, status: "Draft", date: null },
];

// Inbox messages
const messagesData = [
  { id: 1, from: "Thomas Bennett", fromEmail: "thomas.b@email.com", subject: "Question about F-150 financing", message: "Hi, I'm interested in the 2024 Ford F-150. Can you send me financing options?", date: "2024-06-15T10:30:00", read: false, thread: 1 },
  { id: 2, from: "Rachel Cohen", fromEmail: "rachel.c@email.com", subject: "Test drive confirmation", message: "Looking forward to the test drive tomorrow at 2pm!", date: "2024-06-15T09:15:00", read: false, thread: 2 },
  { id: 3, from: "Amanda Foster", fromEmail: "amanda.f@email.com", subject: "Model Y availability", message: "Is the Tesla Model Y still available? When can I see it?", date: "2024-06-14T16:45:00", read: true, thread: 3 },
  { id: 4, from: "Marcus Webb", fromEmail: "marcus.w@email.com", subject: "BMW X5 quote", message: "Can you send me a final quote on the 2022 BMW X5?", date: "2024-06-14T11:20:00", read: true, thread: 4 },
  { id: 5, from: "Kevin Zhang", fromEmail: "kevin.z@email.com", subject: "Tundra test drive", message: "I'd like to schedule a test drive for the Toyota Tundra this weekend.", date: "2024-06-13T14:00:00", read: true, thread: 5 },
];

// Thread replies
const threadReplies = {
  1: [
    { id: 1, from: "Thomas Bennett", message: "Hi, I'm interested in the 2024 Ford F-150. Can you send me financing options?", date: "2024-06-15T10:30:00", isCustomer: true },
  ],
  2: [
    { id: 1, from: "Rachel Cohen", message: "Looking forward to the test drive tomorrow at 2pm!", date: "2024-06-15T09:15:00", isCustomer: true },
  ],
  3: [
    { id: 1, from: "Amanda Foster", message: "Is the Tesla Model Y still available? When can I see it?", date: "2024-06-14T16:45:00", isCustomer: true },
    { id: 2, from: "Mike Rodriguez", message: "Yes, it's still available! You can come by anytime tomorrow between 10am-4pm.", date: "2024-06-14T17:00:00", isCustomer: false },
  ],
  4: [
    { id: 1, from: "Marcus Webb", message: "Can you send me a final quote on the 2022 BMW X5?", date: "2024-06-14T11:20:00", isCustomer: true },
    { id: 2, from: "Jessica Williams", message: "Here's your quote: $55,995 plus tax and fees. Let me know if you have questions!", date: "2024-06-14T11:35:00", isCustomer: false },
  ],
  5: [
    { id: 1, from: "Kevin Zhang", message: "I'd like to schedule a test drive for the Toyota Tundra this weekend.", date: "2024-06-13T14:00:00", isCustomer: true },
    { id: 2, from: "Sarah Chen", message: "Sure! How does Saturday at 11am work for you?", date: "2024-06-13T14:15:00", isCustomer: false },
    { id: 3, from: "Kevin Zhang", message: "Saturday at 11am sounds perfect. See you then!", date: "2024-06-13T14:20:00", isCustomer: true },
  ],
};

// Pipeline stages
const pipelineStages = [
  { id: "new", name: "New Lead", icon: "🌟", color: "bg-blue-100 text-blue-700" },
  { id: "contacted", name: "Contacted", icon: "📞", color: "bg-purple-100 text-purple-700" },
  { id: "appointment", name: "Appointment Set", icon: "📅", color: "bg-amber-100 text-amber-700" },
  { id: "demo", name: "Demo/Test Drive", icon: "🚗", color: "bg-indigo-100 text-indigo-700" },
  { id: "negotiating", name: "Negotiating", icon: "💰", color: "bg-orange-100 text-orange-700" },
  { id: "closed", name: "Closed Won", icon: "🏆", color: "bg-emerald-100 text-emerald-700" },
  { id: "lost", name: "Lost", icon: "❌", color: "bg-rose-100 text-rose-700" },
];

// Report data
const weeklySalesData = [
  { week: "Week 1", leads: 45, appts: 28, sales: 12, revenue: 589000 },
  { week: "Week 2", leads: 52, appts: 32, sales: 15, revenue: 752000 },
  { week: "Week 3", leads: 48, appts: 30, sales: 14, revenue: 698000 },
  { week: "Week 4", leads: 58, appts: 36, sales: 18, revenue: 895000 },
];

const sourceROIData = [
  { name: "Website", leads: 238, cost: 2856, revenue: 345000, roi: 120 },
  { name: "AutoTrader", leads: 156, cost: 2808, revenue: 243000, roi: 86 },
  { name: "Cars.com", leads: 112, cost: 1680, revenue: 189000, roi: 112 },
  { name: "Facebook", leads: 78, cost: 624, revenue: 98000, roi: 157 },
  { name: "Phone", leads: 32, cost: 160, revenue: 45000, roi: 281 },
  { name: "Walk-in", leads: 19, cost: 38, revenue: 28000, roi: 736 },
];

const repPerformanceData = salespeople.map(rep => ({
  name: rep.name.split(' ')[0],
  leads: rep.leads,
  sales: rep.units,
  revenue: rep.gross / 1000,
}));

// Status Badge Component
const StatusBadge = ({ status }) => {
  const config = {
    Hot: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
    Warm: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    Cold: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
    Available: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Sold: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
    Pending: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
    Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Draft: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
    Completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config[status] || "bg-slate-100"}`}>{status}</span>;
};

// KPI Card Component
const KpiCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border hover:shadow-md transition-all cursor-pointer">
    <div className="flex justify-between items-start">
      <div><p className="text-sm text-slate-500">{title}</p><p className="text-2xl font-bold mt-1">{value}</p>{change && (<div className={`flex items-center gap-1 mt-2 text-xs ${change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>{change.startsWith('+') ? <TrendingUp size={12} /> : <TrendingDown size={12} />}<span>{change}</span></div>)}</div>
      <div className={`p-3 rounded-lg ${color}`}><Icon size={20} className="text-white" /></div>
    </div>
  </div>
);

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => { const timer = setTimeout(onClose, 4000); return () => clearTimeout(timer); }, [onClose]);
  const colors = { success: "bg-emerald-500", error: "bg-rose-500", info: "bg-indigo-500" };
  return <div className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white ${colors[type]} animate-fade-in`}>{message}</div>;
};

// Lead Detail Modal
const LeadDetailModal = ({ lead, onClose, onAction }) => {
  if (!lead) return null;
  const initials = lead.name.split(' ').map(n => n[0]).join('');
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white dark:bg-slate-800 p-5 border-b flex justify-between items-center"><h2 className="text-xl font-semibold">Lead Details</h2><button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg"><X size={20} /></button></div>
        <div className="p-5 space-y-5">
          <div className="flex items-center gap-4"><div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">{initials}</div><div><h3 className="text-lg font-semibold">{lead.name}</h3><div className="flex items-center gap-2 mt-1"><StatusBadge status={lead.status} /><span className="text-sm text-slate-500">Score: {lead.score}/100</span></div></div></div>
          <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><h4 className="font-medium text-sm text-slate-500 uppercase">Contact Info</h4><div className="flex items-center gap-2 text-sm"><Phone size={14} className="text-slate-400" />{lead.phone}</div><div className="flex items-center gap-2 text-sm"><Mail size={14} className="text-slate-400" />{lead.email}</div><div className="flex items-center gap-2 text-sm"><MapPin size={14} className="text-slate-400" />{lead.location}</div></div><div className="space-y-2"><h4 className="font-medium text-sm text-slate-500 uppercase">Vehicle Interest</h4><p className="font-medium">{lead.vehicle}</p><p className="text-sm">Budget: ${lead.budget.toLocaleString()}</p><p className="text-sm">Interest: {lead.interest}</p></div></div>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-4 text-white"><div className="flex items-center gap-2 mb-2"><Bot size={16} /><span className="font-medium">AI Suggestion</span></div><p className="text-sm">This customer is showing high intent. Based on their activity, they are ready for a payment quote.</p><button className="mt-3 px-4 py-2 bg-white/20 rounded-lg text-sm">Send Quote</button></div>
          <div className="space-y-2"><h4 className="font-medium text-sm text-slate-500 uppercase">Quick Actions</h4><div className="grid grid-cols-2 gap-2"><button onClick={() => onAction("Call", lead)} className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 rounded-lg text-sm"><Phone size={14} /> Call</button><button onClick={() => onAction("Text", lead)} className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 rounded-lg text-sm"><MessageCircle size={14} /> Text</button><button onClick={() => onAction("Email", lead)} className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 rounded-lg text-sm"><Mail size={14} /> Email</button><button onClick={() => onAction("Appointment", lead)} className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 rounded-lg text-sm"><Calendar size={14} /> Set Appt</button></div></div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Page
const Dashboard = ({ onToast, onSelectLead }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <KpiCard title="New Leads Today" value="23" change="+12%" icon={Users} color="bg-indigo-500" />
      <KpiCard title="Appointments" value="18" change="+5" icon={Calendar} color="bg-emerald-500" />
      <KpiCard title="Deals MTD" value="47" change="+8" icon={Target} color="bg-amber-500" />
      <KpiCard title="Revenue MTD" value="$2.4M" change="+18%" icon={DollarSign} color="bg-rose-500" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border"><h3 className="font-semibold mb-4">Lead Volume Trend</h3><ResponsiveContainer width="100%" height={300}><AreaChart data={leadVolumeData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" /><YAxis /><Tooltip /><Area type="monotone" dataKey="leads" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.1} /></AreaChart></ResponsiveContainer></div>
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border"><h3 className="font-semibold mb-4">Lead Sources</h3><ResponsiveContainer width="100%" height={300}><RePieChart><Pie data={leadSourcesData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>{leadSourcesData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip /></RePieChart></ResponsiveContainer></div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border"><h3 className="font-semibold mb-4">Monthly Performance</h3><ResponsiveContainer width="100%" height={250}><ComposedChart data={monthlyGoals}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="target" fill="#4F46E5" name="Target" /><Bar dataKey="actual" fill="#10B981" name="Actual" /></ComposedChart></ResponsiveContainer></div>
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border"><h3 className="font-semibold mb-4 flex items-center justify-between"><span>Hot Leads Feed</span><span className="text-xs text-rose-500 animate-pulse">Live</span></h3><div className="space-y-3 max-h-[250px] overflow-y-auto">{hotLeads.map(lead => (<div key={lead.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg cursor-pointer" onClick={() => onSelectLead(lead)}><div className="flex-1"><div className="flex items-center gap-2"><p className="font-medium text-sm">{lead.name}</p><StatusBadge status={lead.status} /></div><p className="text-xs text-slate-500 mt-1">{lead.vehicle}</p><p className="text-xs text-slate-400 mt-1">{lead.lastActivity}</p></div><div className="flex gap-2"><button onClick={(e) => { e.stopPropagation(); onToast(`Calling ${lead.name}...`, "info"); }} className="p-2 bg-emerald-100 rounded-lg"><Phone size={14} className="text-emerald-600" /></button><button onClick={(e) => { e.stopPropagation(); onToast(`Texting ${lead.name}...`, "info"); }} className="p-2 bg-indigo-100 rounded-lg"><MessageCircle size={14} className="text-indigo-600" /></button></div></div>))}</div></div>
    </div>
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border"><h3 className="font-semibold mb-4 flex items-center gap-2"><Activity size={16} /> Recent Activity</h3><div className="space-y-2">{recentActivities.map(activity => (<div key={activity.id} className="flex items-center gap-2 text-sm p-2 bg-slate-50 dark:bg-slate-700/30 rounded-lg"><div className="p-1 bg-indigo-100 rounded-lg"><Activity size={12} className="text-indigo-600" /></div><span><span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span></span><span className="text-slate-400 ml-auto">{activity.time}</span></div>))}</div></div>
  </div>
);

// Leads Page
const LeadsPage = ({ onToast, onSelectLead }) => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedLead, setSelectedLead] = useState(null);
  const filteredLeads = leadsData.filter(lead => { if (filterStatus !== "all" && lead.status !== filterStatus) return false; if (search && !lead.name.toLowerCase().includes(search.toLowerCase())) return false; return true; });
  const stats = { total: leadsData.length, hot: leadsData.filter(l => l.status === "Hot").length, warm: leadsData.filter(l => l.status === "Warm").length, cold: leadsData.filter(l => l.status === "Cold").length };
  const handleAction = (action, lead) => { onToast(`${action} action for ${lead.name}`, "success"); };
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4"><div className="bg-white dark:bg-slate-800 rounded-xl p-4 border text-center"><p className="text-2xl font-bold text-indigo-600">{stats.total}</p><p className="text-sm text-slate-500">Total Leads</p></div><div className="bg-white dark:bg-slate-800 rounded-xl p-4 border text-center"><p className="text-2xl font-bold text-rose-600">{stats.hot}</p><p className="text-sm text-slate-500">Hot Leads</p></div><div className="bg-white dark:bg-slate-800 rounded-xl p-4 border text-center"><p className="text-2xl font-bold text-amber-600">{stats.warm}</p><p className="text-sm text-slate-500">Warm Leads</p></div><div className="bg-white dark:bg-slate-800 rounded-xl p-4 border text-center"><p className="text-2xl font-bold text-slate-600">{stats.cold}</p><p className="text-sm text-slate-500">Cold Leads</p></div></div>
      <div className="flex flex-wrap gap-3 items-center justify-between"><div className="flex gap-2"><select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border rounded-lg text-sm"><option value="all">All Status</option><option value="Hot">Hot</option><option value="Warm">Warm</option><option value="Cold">Cold</option></select><input type="text" placeholder="Search leads..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-3 py-2 border rounded-lg text-sm w-64" /></div><button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"><Filter size={16} /> Filter</button></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">{filteredLeads.map(lead => (<div key={lead.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all cursor-pointer" onClick={() => setSelectedLead(lead)}><div className="p-4"><div className="flex justify-between items-start mb-3"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">{lead.name.split(' ').map(n => n[0]).join('')}</div><div><p className="font-semibold text-sm">{lead.name}</p><div className="flex items-center gap-2 mt-0.5"><StatusBadge status={lead.status} /><span className="text-xs text-slate-400">{lead.lastActivity}</span></div></div></div><div className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs font-medium">Score: {lead.score}</div></div><div className="space-y-2 mb-3"><p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{lead.vehicle}</p><div className="flex items-center gap-2 text-xs text-slate-500"><MapPin size={12} /><span>{lead.location}</span></div><div className="flex items-center gap-2 text-xs text-slate-500"><DollarSign size={12} /><span>Budget: ${lead.budget.toLocaleString()}</span></div></div><div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-700"><button onClick={(e) => { e.stopPropagation(); handleAction("Call", lead); }} className="flex-1 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs flex items-center justify-center gap-1"><Phone size={12} /> Call</button><button onClick={(e) => { e.stopPropagation(); handleAction("Email", lead); }} className="flex-1 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs flex items-center justify-center gap-1"><Mail size={12} /> Email</button><button onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); }} className="flex-1 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-lg text-xs flex items-center justify-center gap-1"><Eye size={12} /> Details</button></div></div></div>))}</div>
      {selectedLead && <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} onAction={handleAction} />}
    </div>
  );
};

// Pipeline Page
const PipelinePage = ({ onToast, onSelectLead }) => {
  const [leads] = useState(leadsData);
  const [selectedLead, setSelectedLead] = useState(null);
  const handleAction = (action, lead) => { onToast(`${action} action for ${lead.name}`, "success"); };
  const stagesWithCounts = pipelineStages.map(stage => ({ ...stage, count: leads.filter(lead => lead.stage === stage.id).length, leads: leads.filter(lead => lead.stage === stage.id) }));
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center"><h2 className="text-xl font-semibold">Sales Pipeline</h2><div className="flex gap-2"><div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border"><span className="text-sm">Total Leads: <span className="font-bold text-indigo-600">{leads.length}</span></span></div><div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border"><span className="text-sm">Pipeline Value: <span className="font-bold text-emerald-600">$498K</span></span></div></div></div>
      <div className="flex gap-4 overflow-x-auto pb-4">{stagesWithCounts.map(stage => (<div key={stage.id} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 min-w-[220px]"><div className="flex items-center justify-between mb-3 px-2"><div className="flex items-center gap-2"><span className="text-lg">{stage.icon}</span><span className="font-medium text-sm">{stage.name}</span></div><span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-700">{stage.count}</span></div><div className="space-y-2">{stage.leads.length === 0 ? (<div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center text-slate-400 text-xs border border-dashed">No leads</div>) : (stage.leads.map(lead => (<div key={lead.id} className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm border cursor-pointer hover:shadow-md" onClick={() => setSelectedLead(lead)}><div className="flex justify-between items-start mb-1"><p className="font-medium text-sm">{lead.name}</p><StatusBadge status={lead.status} /></div><p className="text-xs text-slate-500 mb-2">{lead.vehicle.split(' ').slice(0,2).join(' ')}</p><div className="flex justify-between items-center"><div className="flex items-center gap-1"><div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-[8px] font-bold">{lead.rep.split(' ').map(n => n[0]).join('')}</div><span className="text-[10px] text-slate-400">{lead.rep.split(' ')[0]}</span></div><span className="text-[10px] font-medium text-indigo-600">${lead.budget.toLocaleString()}</span></div></div>)))}</div></div>))}</div>
      {selectedLead && <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} onAction={handleAction} />}
    </div>
  );
};

// Customer 360 Page
const Customer360Page = ({ onToast }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(customersData[0]);
  const interactions = customerInteractions[selectedCustomer.id] || [];
  const getTypeIcon = (type) => { switch(type) { case 'Call': return <Phone size={14} className="text-emerald-600" />; case 'Email': return <Mail size={14} className="text-indigo-600" />; case 'Appointment': return <Calendar size={14} className="text-purple-600" />; default: return <Activity size={14} className="text-slate-600" />; } };
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center"><h2 className="text-xl font-semibold">Customer 360 View</h2><button onClick={() => onToast("Export customer data", "success")} className="flex items-center gap-2 text-indigo-600 text-sm"><Download size={14} /> Export</button></div>
      <div className="flex gap-3 overflow-x-auto pb-2">{customersData.map(customer => (<button key={customer.id} onClick={() => setSelectedCustomer(customer)} className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${selectedCustomer.id === customer.id ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-200 hover:bg-slate-50'}`}><div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">{customer.name.split(' ').map(n => n[0]).join('')}</div><div className="text-left"><p className="font-medium text-sm">{customer.name}</p><p className="text-xs text-slate-500">LTV: ${customer.lifetimeValue.toLocaleString()}</p></div></button>))}</div>
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white"><div className="flex justify-between items-start flex-wrap gap-4"><div><div className="flex items-center gap-3 mb-2"><h2 className="text-2xl font-bold">{selectedCustomer.name}</h2><StatusBadge status={selectedCustomer.status} /></div><div className="space-y-1 text-sm opacity-90"><div className="flex items-center gap-2"><Mail size={14} /> {selectedCustomer.email}</div><div className="flex items-center gap-2"><Phone size={14} /> {selectedCustomer.phone}</div><div className="flex items-center gap-2"><MapPin size={14} /> {selectedCustomer.address}</div></div></div><div className="text-right"><p className="text-sm opacity-80">Customer Since</p><p className="text-lg font-semibold">{selectedCustomer.since}</p><p className="text-sm opacity-80 mt-2">Credit Score</p><p className="text-lg font-semibold">{selectedCustomer.creditScore}</p></div></div></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4"><div className="bg-white dark:bg-slate-800 rounded-xl p-4 border text-center"><Car size={24} className="mx-auto mb-2 text-indigo-500" /><p className="text-2xl font-bold text-indigo-600">1</p><p className="text-sm text-slate-500">Vehicle Owned</p><p className="text-xs text-slate-400 mt-1">{selectedCustomer.vehicle}</p></div><div className="bg-white dark:bg-slate-800 rounded-xl p-4 border text-center"><DollarSign size={24} className="mx-auto mb-2 text-emerald-500" /><p className="text-2xl font-bold text-emerald-600">${selectedCustomer.equity.toLocaleString()}</p><p className="text-sm text-slate-500">Est. Equity</p></div><div className="bg-white dark:bg-slate-800 rounded-xl p-4 border text-center"><History size={24} className="mx-auto mb-2 text-amber-500" /><p className="text-2xl font-bold text-amber-600">{interactions.length}</p><p className="text-sm text-slate-500">Total Interactions</p></div><div className="bg-white dark:bg-slate-800 rounded-xl p-4 border text-center"><Calendar size={24} className="mx-auto mb-2 text-purple-500" /><p className="text-2xl font-bold text-purple-600">{selectedCustomer.lastService}</p><p className="text-sm text-slate-500">Last Service</p></div></div>
      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border"><h3 className="font-semibold mb-3">Quick Actions</h3><div className="flex gap-3 flex-wrap"><button onClick={() => onToast("Calling " + selectedCustomer.name, "info")} className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm"><Phone size={14} /> Call</button><button onClick={() => onToast("Emailing " + selectedCustomer.name, "info")} className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm"><Mail size={14} /> Email</button><button onClick={() => onToast("Schedule service", "info")} className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm"><Calendar size={14} /> Schedule Service</button><button onClick={() => onToast("Vehicle equity report", "info")} className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-sm"><Car size={14} /> Equity Report</button></div></div>
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border"><h3 className="font-semibold mb-4 flex items-center gap-2"><History size={16} /> Recent Interactions</h3><div className="space-y-3">{interactions.map(interaction => (<div key={interaction.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"><div className="p-2 bg-white rounded-lg">{getTypeIcon(interaction.type)}</div><div className="flex-1"><p className="text-sm font-medium">{interaction.description}</p><div className="flex justify-between items-center mt-1"><span className="text-xs text-slate-500">By: {interaction.rep}</span><span className="text-xs text-slate-400">{interaction.date}</span></div></div></div>))}</div></div>
    </div>
  );
};

// Inventory Page
const InventoryPage = ({ onToast }) => {
  const [inventory, setInventory] = useState(inventoryData);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const filteredInventory = inventory.filter(item => { if (filterStatus !== "all" && item.status !== filterStatus) return false; if (search && !`${item.year} ${item.make} ${item.model}`.toLowerCase().includes(search.toLowerCase())) return false; return true; });
  const getDaysColor = (days) => { if (days < 30) return "text-emerald-600"; if (days < 60) return "text-amber-600"; return "text-rose-600"; };
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center"><h2 className="text-xl font-semibold">Inventory Hub</h2><button onClick={() => onToast("Add vehicle form opened", "info")} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"><Plus size={16} /> Add Vehicle</button></div>
      <div className="flex flex-wrap gap-3 items-center justify-between"><div className="flex gap-2"><select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border rounded-lg text-sm"><option value="all">All Status</option><option value="Available">Available</option><option value="Pending">Pending</option><option value="Sold">Sold</option><option value="In Recon">In Recon</option></select><input type="text" placeholder="Search by make/model..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-3 py-2 border rounded-lg text-sm w-64" /></div><div className="flex gap-2"><button className="px-3 py-2 bg-slate-100 rounded-lg text-sm">Filter</button><button className="px-3 py-2 bg-slate-100 rounded-lg text-sm"><Download size={14} /> Export</button></div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">{filteredInventory.map(vehicle => (<div key={vehicle.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all group"><div className="h-40 bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold relative">{vehicle.make} {vehicle.model}<div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${vehicle.status === "Available" ? "bg-emerald-400 animate-pulse" : vehicle.status === "Sold" ? "bg-slate-400" : "bg-amber-400"}`}></div></div><div className="p-4"><div className="flex justify-between items-start mb-2"><div><h3 className="font-semibold">{vehicle.year} {vehicle.make} {vehicle.model}</h3><p className="text-xs text-slate-500">Stock #{vehicle.stock} • Trim: {vehicle.trim}</p></div><StatusBadge status={vehicle.status} /></div><div className="flex justify-between items-center mb-3"><div><p className="text-xl font-bold text-indigo-600">${vehicle.price.toLocaleString()}</p><p className="text-xs text-slate-500">MSRP: ${(vehicle.price * 1.05).toLocaleString()}</p></div><div className="text-right"><p className={`text-sm font-bold ${getDaysColor(vehicle.daysOnLot)}`}>{vehicle.daysOnLot} days</p><p className="text-xs text-slate-500">on lot</p></div></div><div className="flex flex-wrap gap-2 mb-3 text-xs"><span className="px-2 py-1 bg-slate-100 rounded">{vehicle.engine.split(' ').slice(0,2).join(' ')}</span><span className="px-2 py-1 bg-slate-100 rounded">{vehicle.mpg} MPG</span><span className="px-2 py-1 bg-slate-100 rounded">{vehicle.color}</span></div><div className="flex gap-2"><button onClick={() => onToast(`Viewing ${vehicle.year} ${vehicle.make} ${vehicle.model}`, "info")} className="flex-1 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium">View Details</button><button onClick={() => onToast(`Matching leads for ${vehicle.make} ${vehicle.model}`, "success")} className="flex-1 py-2 bg-slate-100 rounded-lg text-sm">Match to Lead</button></div></div></div>))}</div>
    </div>
  );
};

// Reports Page
const ReportsPage = ({ onToast }) => {
  const [reportType, setReportType] = useState("weekly");
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center"><h2 className="text-xl font-semibold">Reports and Analytics</h2><button onClick={() => onToast("Export report", "success")} className="flex items-center gap-2 text-indigo-600 text-sm"><Download size={14} /> Export Report</button></div>
      <div className="flex gap-2 border-b pb-2"><button onClick={() => setReportType("weekly")} className={`px-4 py-2 text-sm font-medium rounded-lg ${reportType === "weekly" ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>Weekly Performance</button><button onClick={() => setReportType("sources")} className={`px-4 py-2 text-sm font-medium rounded-lg ${reportType === "sources" ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>Source ROI</button><button onClick={() => setReportType("reps")} className={`px-4 py-2 text-sm font-medium rounded-lg ${reportType === "reps" ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>Rep Performance</button></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4"><div className="bg-white dark:bg-slate-800 rounded-xl p-4 border"><p className="text-sm text-slate-500">Total Revenue MTD</p><p className="text-2xl font-bold text-emerald-600">$2.93M</p><p className="text-xs text-emerald-600 mt-1">+18% vs last month</p></div><div className="bg-white dark:bg-slate-800 rounded-xl p-4 border"><p className="text-sm text-slate-500">Total Leads</p><p className="text-2xl font-bold text-indigo-600">203</p><p className="text-xs text-emerald-600 mt-1">+12% vs last month</p></div><div className="bg-white dark:bg-slate-800 rounded-xl p-4 border"><p className="text-sm text-slate-500">Conversion Rate</p><p className="text-2xl font-bold text-amber-600">23.2%</p><p className="text-xs text-emerald-600 mt-1">+2.1% vs last month</p></div><div className="bg-white dark:bg-slate-800 rounded-xl p-4 border"><p className="text-sm text-slate-500">Avg Deal Size</p><p className="text-2xl font-bold text-purple-600">$48.5K</p><p className="text-xs text-emerald-600 mt-1">+5% vs last month</p></div></div>
      {reportType === "weekly" && (<div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border"><h3 className="font-semibold mb-4">Weekly Performance Trend</h3><ResponsiveContainer width="100%" height={350}><ComposedChart data={weeklySalesData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="week" /><YAxis yAxisId="left" /><YAxis yAxisId="right" orientation="right" /><Tooltip /><Legend /><Bar yAxisId="left" dataKey="leads" fill="#4F46E5" name="Leads" /><Bar yAxisId="left" dataKey="appts" fill="#10B981" name="Appointments" /><Line yAxisId="right" type="monotone" dataKey="sales" stroke="#F59E0B" name="Sales" strokeWidth={2} /></ComposedChart></ResponsiveContainer><div className="mt-4 p-4 bg-slate-50 rounded-lg"><p className="text-sm text-slate-600">📈 Insight: Week 4 showed the strongest performance with 18 sales and $895K in revenue. Continue the momentum with follow-up campaigns.</p></div></div>)}
      {reportType === "sources" && (<div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border"><h3 className="font-semibold mb-4">Lead Source ROI Analysis</h3><div className="overflow-x-auto"><table className="w-full"><thead className="bg-slate-50"><tr><th className="px-4 py-3 text-left text-xs">Source</th><th className="px-4 py-3 text-left text-xs">Leads</th><th className="px-4 py-3 text-left text-xs">Cost</th><th className="px-4 py-3 text-left text-xs">Revenue</th><th className="px-4 py-3 text-left text-xs">ROI</th></tr></thead><tbody className="divide-y">{sourceROIData.map(source => (<tr key={source.name} className="hover:bg-slate-50"><td className="px-4 py-3 font-medium">{source.name}</td><td className="px-4 py-3">{source.leads}</td><td className="px-4 py-3">${source.cost.toLocaleString()}</td><td className="px-4 py-3 text-emerald-600">${source.revenue.toLocaleString()}</td><td className="px-4 py-3 font-bold text-indigo-600">{source.roi}%</td></tr>))}</tbody></table></div><div className="mt-4 p-4 bg-slate-50 rounded-lg"><p className="text-sm text-slate-600">💡 Insight: Phone and Walk-in leads have the highest ROI at 281% and 736% respectively.</p></div></div>)}
      {reportType === "reps" && (<div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border"><h3 className="font-semibold mb-4">Rep Performance Ranking</h3><ResponsiveContainer width="100%" height={350}><ReBarChart data={repPerformanceData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis yAxisId="left" /><YAxis yAxisId="right" orientation="right" /><Tooltip /><Legend /><Bar yAxisId="left" dataKey="leads" fill="#4F46E5" name="Leads" /><Bar yAxisId="left" dataKey="sales" fill="#10B981" name="Sales" /><Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#F59E0B" name="Revenue (K)" strokeWidth={2} /></ReBarChart></ResponsiveContainer></div>)}
    </div>
  );
};

// Team Leaderboard Page
const TeamPage = ({ onToast }) => {
  const sortedReps = [...salespeople].sort((a, b) => b.units - a.units);
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center"><h2 className="text-xl font-semibold">Team Leaderboard</h2><button onClick={() => onToast("Export leaderboard", "success")} className="flex items-center gap-2 text-indigo-600 text-sm"><Download size={14} /> Export</button></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">{sortedReps.slice(0, 3).map((rep, idx) => (<div key={rep.id} className={`rounded-xl p-5 text-center border ${idx === 0 ? 'bg-gradient-to-br from-yellow-500 to-amber-600 text-white' : idx === 1 ? 'bg-gradient-to-br from-slate-400 to-slate-500 text-white' : 'bg-gradient-to-br from-amber-600 to-orange-700 text-white'}`}><div className="text-4xl mb-2">{idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}</div><div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold mx-auto mb-3">{rep.initials}</div><p className="font-bold text-lg">{rep.name}</p><p className="text-sm opacity-90">{rep.units} units sold</p><p className="text-sm opacity-90 mt-1">${(rep.gross/1000).toFixed(0)}K gross</p><div className="mt-3 inline-block px-3 py-1 bg-white/20 rounded-full text-xs">🔥 {rep.streak} week streak</div></div>))}</div>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border overflow-hidden"><div className="overflow-x-auto"><table className="w-full"><thead className="bg-slate-50"><tr><th className="px-4 py-3 text-left text-xs">Rank</th><th className="px-4 py-3 text-left text-xs">Rep</th><th className="px-4 py-3 text-left text-xs">Leads</th><th className="px-4 py-3 text-left text-xs">Units</th><th className="px-4 py-3 text-left text-xs">Gross</th><th className="px-4 py-3 text-left text-xs">Close %</th><th className="px-4 py-3 text-left text-xs">Streak</th></tr></thead><tbody className="divide-y">{sortedReps.map((rep, idx) => (<tr key={rep.id} className="hover:bg-slate-50"><td className="px-4 py-3 font-bold text-indigo-600">#{idx + 1}</td><td className="px-4 py-3 font-medium">{rep.name}</td><td className="px-4 py-3">{rep.leads}</td><td className="px-4 py-3 font-bold">{rep.units}</td><td className="px-4 py-3 text-emerald-600">${(rep.gross/1000).toFixed(0)}K</td><td className="px-4 py-3">{rep.closeRate}%</td><td className="px-4 py-3">🔥 {rep.streak} weeks</td></tr>))}</tbody></table></div></div>
    </div>
  );
};

// AI Coach Page
const AICoachPage = ({ onToast }) => {
  const [messages, setMessages] = useState([{ id: 1, role: "assistant", content: "Hello! I'm your AI Sales Coach. I can help you improve your closing rate, suggest next steps for leads, and provide sales tips. How can I help you today?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const getAIResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes("close rate") || q.includes("improve")) return "Based on your team's data, the top performers follow up within 5 minutes of lead submission. I recommend setting up automated SMS alerts for new leads.";
    if (q.includes("hot lead") || q.includes("priority")) return "Your hottest leads right now are Thomas Bennett and Brandon Hayes. Both have visited your website multiple times. I suggest calling them within the next hour.";
    if (q.includes("objection") || q.includes("price")) return "Common price objections can be handled by focusing on value rather than discount. Try: 'This vehicle holds its value 15% better than competitors over 3 years.'";
    return "Great question! Based on dealership best practices, I recommend focusing on your top 3 warm leads today. Would you like me to analyze which leads have the highest conversion probability?";
  };
  const handleSend = () => { if (!input.trim()) return; const userMsg = { id: Date.now(), role: "user", content: input }; setMessages(prev => [...prev, userMsg]); setInput(""); setLoading(true); setTimeout(() => { const aiMsg = { id: Date.now() + 1, role: "assistant", content: getAIResponse(input) }; setMessages(prev => [...prev, aiMsg]); setLoading(false); onToast("AI Coach responded", "info"); }, 800); };
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl shadow-sm border overflow-hidden">
      <div className="p-4 border-b bg-gradient-to-r from-indigo-500 to-purple-600 text-white"><div className="flex items-center gap-2"><Bot size={20} /><h2 className="font-semibold">AI Sales Coach</h2><span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Powered by Claude</span></div><p className="text-xs text-white/80 mt-1">Get personalized coaching, objection handling scripts, and lead insights</p></div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">{messages.map(msg => (<div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] p-3 rounded-xl ${msg.role === 'user' ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-slate-700'}`}><p className="text-sm">{msg.content}</p></div></div>))}{loading && (<div className="flex justify-start"><div className="bg-slate-100 p-3 rounded-xl"><Loader2 size={16} className="animate-spin" /></div></div>)}</div>
      <div className="p-4 border-t"><div className="flex gap-2"><input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask your AI Coach..." className="flex-1 px-3 py-2 border rounded-lg text-sm" /><button onClick={handleSend} className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"><Send size={16} /></button></div><div className="flex gap-2 mt-3 flex-wrap">{["How to improve close rate?", "Hot leads to prioritize?", "Handle price objections?"].map(s => (<button key={s} onClick={() => setInput(s)} className="px-2 py-1 bg-slate-100 rounded-full text-xs hover:bg-indigo-100">💡 {s}</button>))}</div></div>
    </div>
  );
};

// NEW: Unified Inbox Page
const InboxPage = ({ onToast }) => {
  const [messages, setMessages] = useState(messagesData);
  const [selectedMessage, setSelectedMessage] = useState(messagesData[0]);
  const [replyText, setReplyText] = useState("");
  const [filter, setFilter] = useState("all");
  
  const filteredMessages = messages.filter(msg => filter === "all" ? true : filter === "unread" ? !msg.read : true);
  const unreadCount = messages.filter(m => !m.read).length;
  
  const markAsRead = (id) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };
  
  const handleReply = () => {
    if (!replyText.trim()) return;
    const thread = threadReplies[selectedMessage.thread] || [];
    const newReply = { id: thread.length + 1, from: "AutoDeal Support", message: replyText, date: new Date().toISOString(), isCustomer: false };
    threadReplies[selectedMessage.thread] = [...thread, newReply];
    onToast("Reply sent", "success");
    setReplyText("");
  };
  
  const getThreadMessages = (threadId) => threadReplies[threadId] || [];
  
  return (
    <div className="flex gap-5 h-full">
      {/* Message List */}
      <div className="w-96 bg-white dark:bg-slate-800 rounded-xl shadow-sm border overflow-hidden flex flex-col">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-3"><h2 className="font-semibold">Messages</h2><div className="flex gap-2"><button onClick={() => setFilter("all")} className={`px-2 py-1 text-xs rounded ${filter === "all" ? "bg-indigo-100 text-indigo-600" : "bg-slate-100"}`}>All</button><button onClick={() => setFilter("unread")} className={`px-2 py-1 text-xs rounded ${filter === "unread" ? "bg-indigo-100 text-indigo-600" : "bg-slate-100"}`}>Unread ({unreadCount})</button></div></div>
          <div className="relative"><Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" /><input type="text" placeholder="Search messages..." className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm" /></div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y">
          {filteredMessages.map(msg => (
            <div key={msg.id} className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${selectedMessage?.id === msg.id ? 'bg-indigo-50' : ''} ${!msg.read ? 'border-l-4 border-l-indigo-500' : ''}`} onClick={() => { setSelectedMessage(msg); markAsRead(msg.id); }}>
              <div className="flex justify-between items-start mb-1"><p className={`font-medium ${!msg.read ? 'font-semibold' : ''}`}>{msg.from}</p><span className="text-xs text-slate-400">{new Date(msg.date).toLocaleDateString()}</span></div>
              <p className="text-sm text-slate-600 truncate">{msg.subject}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Message Detail */}
      {selectedMessage && (
        <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl shadow-sm border overflow-hidden flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-lg">{selectedMessage.subject}</h3>
            <div className="flex justify-between items-center mt-1"><div><p className="text-sm text-slate-600">From: {selectedMessage.from} &lt;{selectedMessage.fromEmail}&gt;</p><p className="text-xs text-slate-400">{new Date(selectedMessage.date).toLocaleString()}</p></div><div className="flex gap-2"><button onClick={() => onToast("Archive message", "info")} className="p-1.5 hover:bg-slate-100 rounded"><Archive size={16} /></button><button onClick={() => onToast("Flag message", "info")} className="p-1.5 hover:bg-slate-100 rounded"><Flag size={16} /></button></div></div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {getThreadMessages(selectedMessage.thread).map((reply, idx) => (
              <div key={idx} className={`flex ${reply.isCustomer ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[70%] p-3 rounded-lg ${reply.isCustomer ? 'bg-slate-100 dark:bg-slate-700' : 'bg-indigo-500 text-white'}`}>
                  <p className="text-sm">{reply.message}</p>
                  <p className="text-xs mt-1 opacity-70">{new Date(reply.date).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t"><div className="flex gap-2"><textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Type your reply..." className="flex-1 px-3 py-2 border rounded-lg text-sm resize-none" rows={2} /><button onClick={handleReply} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"><Send size={16} /></button></div></div>
        </div>
      )}
    </div>
  );
};

// NEW: Marketing Campaigns Page
const MarketingPage = ({ onToast }) => {
  const [campaigns, setCampaigns] = useState(campaignsData);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  
  const getStatusColor = (status) => {
    switch(status) {
      case "Active": return "bg-emerald-100 text-emerald-700";
      case "Completed": return "bg-slate-100 text-slate-700";
      case "Draft": return "bg-amber-100 text-amber-700";
      default: return "bg-slate-100";
    }
  };
  
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center"><h2 className="text-xl font-semibold">Marketing Campaigns</h2><button onClick={() => onToast("Create new campaign", "info")} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"><Plus size={16} /> New Campaign</button></div>
      
      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border text-center"><p className="text-2xl font-bold text-indigo-600">{campaigns.length}</p><p className="text-sm text-slate-500">Total Campaigns</p></div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border text-center"><p className="text-2xl font-bold text-emerald-600">{campaigns.filter(c => c.status === "Active").length}</p><p className="text-sm text-slate-500">Active Campaigns</p></div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border text-center"><p className="text-2xl font-bold text-amber-600">{Math.round(campaigns.reduce((sum, c) => sum + (c.opens / c.sent * 100), 0) / campaigns.filter(c => c.sent).length)}%</p><p className="text-sm text-slate-500">Avg Open Rate</p></div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border text-center"><p className="text-2xl font-bold text-purple-600">{Math.round(campaigns.reduce((sum, c) => sum + (c.clicks / c.sent * 100), 0) / campaigns.filter(c => c.sent).length)}%</p><p className="text-sm text-slate-500">Avg Click Rate</p></div>
      </div>
      
      {/* Campaign Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {campaigns.map(campaign => (
          <div key={campaign.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all cursor-pointer" onClick={() => setSelectedCampaign(campaign)}>
            <div className="p-5">
              <div className="flex justify-between items-start mb-3"><div><h3 className="font-semibold text-lg">{campaign.name}</h3><div className="flex items-center gap-2 mt-1"><span className="text-xs text-slate-500">{campaign.type}</span><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>{campaign.status}</span></div></div><Megaphone size={24} className="text-indigo-400" /></div>
              <div className="grid grid-cols-4 gap-2 text-center mb-4"><div><p className="text-lg font-bold">{campaign.sent.toLocaleString()}</p><p className="text-xs text-slate-500">Sent</p></div><div><p className="text-lg font-bold">{Math.round(campaign.opens / campaign.sent * 100)}%</p><p className="text-xs text-slate-500">Open</p></div><div><p className="text-lg font-bold">{Math.round(campaign.clicks / campaign.sent * 100)}%</p><p className="text-xs text-slate-500">Click</p></div><div><p className="text-lg font-bold">{campaign.conversions}</p><p className="text-xs text-slate-500">Sales</p></div></div>
              {campaign.revenue && <div className="p-2 bg-slate-50 dark:bg-slate-700/30 rounded-lg text-center"><p className="text-sm font-medium text-emerald-600">${campaign.revenue.toLocaleString()} Revenue</p></div>}
              <div className="flex gap-2 mt-4"><button onClick={(e) => { e.stopPropagation(); onToast(`Running campaign: ${campaign.name}`, "success"); }} className="flex-1 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm">Run Now</button><button onClick={(e) => { e.stopPropagation(); onToast(`Editing campaign: ${campaign.name}`, "info"); }} className="flex-1 py-2 bg-slate-100 rounded-lg text-sm">Edit</button></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedCampaign(null)}>
          <div className="bg-white dark:bg-slate-800 rounded-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-slate-800 p-5 border-b flex justify-between items-center"><h2 className="text-xl font-semibold">{selectedCampaign.name}</h2><button onClick={() => setSelectedCampaign(null)} className="p-1 hover:bg-slate-100 rounded-lg"><X size={20} /></button></div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4"><div><p className="text-sm text-slate-500">Type</p><p className="font-medium">{selectedCampaign.type}</p></div><div><p className="text-sm text-slate-500">Status</p><p className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedCampaign.status)}`}>{selectedCampaign.status}</p></div><div><p className="text-sm text-slate-500">Sent Date</p><p className="font-medium">{selectedCampaign.date || "Not sent yet"}</p></div><div><p className="text-sm text-slate-500">Total Sent</p><p className="font-medium">{selectedCampaign.sent.toLocaleString()}</p></div></div>
              <div><p className="text-sm text-slate-500 mb-2">Performance</p><div className="space-y-2"><div><div className="flex justify-between text-sm mb-1"><span>Open Rate</span><span className="font-medium">{Math.round(selectedCampaign.opens / selectedCampaign.sent * 100)}%</span></div><div className="w-full bg-slate-200 rounded-full h-2"><div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${selectedCampaign.opens / selectedCampaign.sent * 100}%` }}></div></div></div><div><div className="flex justify-between text-sm mb-1"><span>Click Rate</span><span className="font-medium">{Math.round(selectedCampaign.clicks / selectedCampaign.sent * 100)}%</span></div><div className="w-full bg-slate-200 rounded-full h-2"><div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${selectedCampaign.clicks / selectedCampaign.sent * 100}%` }}></div></div></div></div></div>
              {selectedCampaign.revenue && <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white text-center"><p className="text-sm opacity-90">Total Revenue Attributed</p><p className="text-3xl font-bold">${selectedCampaign.revenue.toLocaleString()}</p></div>}
              <div className="flex gap-3"><button onClick={() => onToast(`Duplicating ${selectedCampaign.name}`, "success")} className="flex-1 py-2 bg-indigo-600 text-white rounded-lg">Duplicate Campaign</button><button onClick={() => onToast(`Editing ${selectedCampaign.name}`, "info")} className="flex-1 py-2 bg-slate-100 rounded-lg">Edit Campaign</button></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Placeholder Pages
const PlaceholderPage = ({ title, icon: Icon }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-6"><Icon size={40} className="text-white" /></div>
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="text-slate-500 dark:text-slate-400 mb-4">This feature is coming soon</p>
    <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-slate-500">In Development</div>
  </div>
);

const DealsPage = () => <PlaceholderPage title="Deal Desking" icon={Target} />;
const EmailBuilderPage = () => <PlaceholderPage title="Email Builder" icon={Mail} />;
const ServicePage = () => <PlaceholderPage title="Service Drive" icon={Wrench} />;
const ServiceSchedulerPage = () => <PlaceholderPage title="Service Bay Scheduler" icon={CalendarDays} />;
const TasksPage = () => <PlaceholderPage title="Tasks and Organizer" icon={CheckSquare} />;
const AnalyticsPage = () => <PlaceholderPage title="Analytics Dashboard" icon={PieChart} />;
const CompliancePage = () => <PlaceholderPage title="Compliance Center" icon={Shield} />;
const SettingsPage = () => <PlaceholderPage title="Settings" icon={Settings} />;

// Main App
const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedLead, setSelectedLead] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  
  useEffect(() => { if (darkMode) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark'); }, [darkMode]);
  const addToast = (message, type = "success") => { const id = Date.now(); setToasts(prev => [...prev, { id, message, type }]); };
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));
  
  const navigation = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, section: "MAIN" },
    { id: "leads", label: "Leads", icon: Users, section: "SALES" },
    { id: "pipeline", label: "Pipeline", icon: GitBranch, section: "SALES" },
    { id: "customers", label: "Customer 360", icon: User, section: "SALES" },
    { id: "inventory", label: "Inventory", icon: Car, section: "SALES" },
    { id: "deals", label: "Deal Desking", icon: Target, section: "SALES" },
    { id: "marketing", label: "Campaigns", icon: Megaphone, section: "MARKETING" },
    { id: "inbox", label: "Inbox", icon: InboxIcon, section: "MARKETING" },
    { id: "email-builder", label: "Email Builder", icon: Mail, section: "MARKETING" },
    { id: "service", label: "Service Drive", icon: Wrench, section: "SERVICE" },
    { id: "service-scheduler", label: "Bay Scheduler", icon: CalendarDays, section: "SERVICE" },
    { id: "tasks", label: "Organizer", icon: CheckSquare, section: "SERVICE" },
    { id: "analytics", label: "Analytics", icon: PieChart, section: "ANALYTICS" },
    { id: "reports", label: "Reports", icon: BarChart3, section: "ANALYTICS" },
    { id: "team", label: "Leaderboard", icon: Trophy, section: "ANALYTICS" },
    { id: "ai-coach", label: "AI Coach", icon: Bot, section: "ANALYTICS" },
    { id: "compliance", label: "Compliance", icon: Shield, section: "COMPLIANCE" },
    { id: "settings", label: "Settings", icon: Settings, section: "SETTINGS" },
  ];
  
  const renderPage = () => {
    switch (currentPage) {
      case "dashboard": return <Dashboard onToast={addToast} onSelectLead={setSelectedLead} />;
      case "leads": return <LeadsPage onToast={addToast} onSelectLead={setSelectedLead} />;
      case "pipeline": return <PipelinePage onToast={addToast} onSelectLead={setSelectedLead} />;
      case "customers": return <Customer360Page onToast={addToast} />;
      case "inventory": return <InventoryPage onToast={addToast} />;
      case "reports": return <ReportsPage onToast={addToast} />;
      case "team": return <TeamPage onToast={addToast} />;
      case "ai-coach": return <AICoachPage onToast={addToast} />;
      case "inbox": return <InboxPage onToast={addToast} />;
      case "marketing": return <MarketingPage onToast={addToast} />;
      default: return <PlaceholderPage title={navigation.find(n => n.id === currentPage)?.label || "Page"} icon={LayoutDashboard} />;
    }
  };
  
  const sections = ["MAIN", "SALES", "MARKETING", "SERVICE", "ANALYTICS", "COMPLIANCE", "SETTINGS"];
  
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-slate-800 border-r transition-all duration-300 flex flex-col`}>
        <div className="p-5 border-b flex items-center justify-between">
          {!sidebarCollapsed && (<div><span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">AutoDeal CRM</span><p className="text-xs text-slate-500">Complete Dealership Suite</p></div>)}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1.5 hover:bg-slate-100 rounded-lg"><ChevronLeft size={18} className={sidebarCollapsed ? "rotate-180" : ""} /></button>
        </div>
        <nav className="flex-1 p-3 space-y-6 overflow-y-auto">
          {sections.map(section => {
            const sectionItems = navigation.filter(item => item.section === section);
            if (sectionItems.length === 0) return null;
            return (<div key={section}>{!sidebarCollapsed && (<p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">{section}</p>)}<div className="space-y-1">{sectionItems.map(item => (<button key={item.id} onClick={() => setCurrentPage(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${currentPage === item.id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-100'}`}><item.icon size={20} />{!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}</button>))}</div></div>);
          })}
        </nav>
      </aside>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-slate-800 border-b px-6 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold">{navigation.find(n => n.id === currentPage)?.label || "Dashboard"}</h1>
          <div className="flex items-center gap-4">
            <div className="relative"><Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" /><input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 text-sm border rounded-lg w-64" /></div>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 hover:bg-slate-100 rounded-lg">{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
            <div className="relative"><button onClick={() => setShowNotifications(!showNotifications)} className="p-2 hover:bg-slate-100 rounded-lg"><Bell size={18} /><span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span></button>{showNotifications && (<div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border"><div className="p-3 border-b"><p className="font-semibold">Notifications</p></div><div className="p-3"><p className="text-sm">Welcome to AutoDeal CRM</p><p className="text-xs text-slate-500">Just now</p></div></div>)}</div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">AD</div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{renderPage()}</main>
      </div>
      
      {selectedLead && <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} onAction={(action, lead) => addToast(`${action} action for ${lead.name}`, "success")} />}
      {toasts.map(toast => (<Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />))}
    </div>
  );
};

export default App;
