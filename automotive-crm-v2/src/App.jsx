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
  Reply, Forward, Archive, Flag, Bookmark, Paperclip, Image, Smile, Mic,
  Loader2, DollarSign as DollarIcon, Percent, ChartNoAxesCombined
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart as ReBarChart, Bar, 
  PieChart as RePieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, ComposedChart
} from 'recharts';

// Mock Data (simplified for this focused enhancement)
const salespeople = [
  { id: 1, name: "Sarah Chen", initials: "SC", leads: 47, units: 18, gross: 124500, closeRate: 38.3, color: "bg-indigo-500", email: "sarah.chen@autodeal.com", phone: "(555) 111-2222" },
  { id: 2, name: "Mike Rodriguez", initials: "MR", leads: 52, units: 24, gross: 187200, closeRate: 46.2, color: "bg-emerald-500", email: "mike.rodriguez@autodeal.com", phone: "(555) 222-3333" },
  { id: 3, name: "Jessica Williams", initials: "JW", leads: 38, units: 15, gross: 98300, closeRate: 39.5, color: "bg-amber-500", email: "jessica.williams@autodeal.com", phone: "(555) 333-4444" },
  { id: 4, name: "David Kim", initials: "DK", leads: 44, units: 21, gross: 156700, closeRate: 47.7, color: "bg-rose-500", email: "david.kim@autodeal.com", phone: "(555) 444-5555" },
  { id: 5, name: "Lisa Thompson", initials: "LT", leads: 41, units: 17, gross: 112400, closeRate: 41.5, color: "bg-cyan-500", email: "lisa.thompson@autodeal.com", phone: "(555) 555-6666" },
  { id: 6, name: "James Wilson", initials: "JW", leads: 35, units: 12, gross: 87600, closeRate: 34.3, color: "bg-purple-500", email: "james.wilson@autodeal.com", phone: "(555) 666-7777" },
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
  { id: 1, year: 2024, make: "Ford", model: "F-150", stock: "F24001", price: 58995, daysOnLot: 12, status: "Available", views: 245, inquiries: 12 },
  { id: 2, year: 2023, make: "Tesla", model: "Model Y", stock: "T23002", price: 49990, daysOnLot: 28, status: "Available", views: 189, inquiries: 8 },
  { id: 3, year: 2022, make: "BMW", model: "X5", stock: "B22003", price: 55995, daysOnLot: 45, status: "Pending", views: 156, inquiries: 5 },
  { id: 4, year: 2024, make: "Mercedes", model: "GLE", stock: "M24004", price: 72995, daysOnLot: 8, status: "Available", views: 312, inquiries: 18 },
  { id: 5, year: 2023, make: "Toyota", model: "Tundra", stock: "T23005", price: 62995, daysOnLot: 62, status: "In Recon", views: 98, inquiries: 3 },
  { id: 6, year: 2024, make: "Honda", model: "CR-V", stock: "H24006", price: 36995, daysOnLot: 5, status: "Available", views: 267, inquiries: 15 },
];

const serviceAppointments = [
  { id: 1, time: "9:00 AM", customer: "Robert Johnson", vehicle: "Honda Accord", service: "Oil Change", status: "In Progress", advisor: "Tom Brady" },
  { id: 2, time: "10:30 AM", customer: "Emily Davis", vehicle: "Toyota Camry", service: "Brake Inspection", status: "Waiting", advisor: "Sarah Lee" },
  { id: 3, time: "1:00 PM", customer: "Michael Brown", vehicle: "Ford Explorer", service: "Transmission Flush", status: "Scheduled", advisor: "Tom Brady" },
  { id: 4, time: "2:30 PM", customer: "Jessica Miller", vehicle: "Tesla Model 3", service: "Tire Rotation", status: "Scheduled", advisor: "Sarah Lee" },
  { id: 5, time: "4:00 PM", customer: "Daniel Wilson", vehicle: "BMW X3", service: "Engine Diagnostic", status: "Scheduled", advisor: "Tom Brady" },
];

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

// ============ ENHANCED CUSTOMER DATA ============
const customersData = [
  { 
    id: 1, 
    name: "Thomas Bennett", 
    email: "thomas.b@email.com", 
    phone: "(555) 123-4567", 
    address: "123 Main St, Chicago, IL 60601",
    since: "2023-06-15", 
    lifetimeValue: 65000, 
    status: "Active", 
    creditScore: 720,
    preferredContact: "Phone",
    bestTime: "Afternoon",
    birthday: "1985-03-12",
    occupation: "Construction Manager",
    source: "AutoTrader",
    householdIncome: 120000,
    notes: "Prefers Ford trucks, has a boat he needs to tow",
    vehicles: [
      { id: 1, year: 2024, make: "Ford", model: "F-150", trim: "Lariat", vin: "1FTFW1E85PKE12345", purchased: "2024-06-01", price: 58995, equity: 15000, status: "Current" },
      { id: 2, year: 2018, make: "Ford", model: "Explorer", trim: "Limited", vin: "1FM5K8D88JGA54321", purchased: "2018-09-10", sold: "2024-05-15", tradeValue: 12000, status: "Traded" }
    ],
    serviceHistory: [
      { id: 1, date: "2024-05-20", vehicle: "Ford F-150", service: "Oil Change", mileage: 5000, cost: 89.99, advisor: "Tom Brady" },
      { id: 2, date: "2024-03-10", vehicle: "Ford Explorer", service: "Brake Replacement", mileage: 45000, cost: 450, advisor: "Sarah Lee" }
    ]
  },
  { 
    id: 2, 
    name: "Rachel Cohen", 
    email: "rachel.c@email.com", 
    phone: "(555) 456-7890", 
    address: "789 Pine Rd, New York, NY 10001",
    since: "2023-11-20", 
    lifetimeValue: 75000, 
    status: "VIP", 
    creditScore: 740,
    preferredContact: "Email",
    bestTime: "Morning",
    birthday: "1990-07-23",
    occupation: "Attorney",
    source: "Facebook",
    householdIncome: 250000,
    notes: "Loves luxury vehicles, previous Mercedes owner",
    vehicles: [
      { id: 3, year: 2024, make: "Mercedes", model: "GLE", trim: "450 4MATIC", vin: "4JGFB4KBXRA123456", purchased: "2024-06-10", price: 72995, equity: 25000, status: "Current" },
      { id: 4, year: 2020, make: "BMW", model: "X5", trim: "xDrive40i", vin: "5UXCR6C09L9J78901", purchased: "2020-12-15", sold: "2024-05-20", tradeValue: 35000, status: "Traded" }
    ],
    serviceHistory: [
      { id: 3, date: "2024-06-01", vehicle: "Mercedes GLE", service: "New Vehicle Setup", mileage: 100, cost: 0, advisor: "Tom Brady" }
    ]
  },
  { 
    id: 3, 
    name: "Amanda Foster", 
    email: "amanda.f@email.com", 
    phone: "(555) 234-5678", 
    address: "456 Oak Ave, Los Angeles, CA 90001",
    since: "2024-01-10", 
    lifetimeValue: 55000, 
    status: "Active", 
    creditScore: 680,
    preferredContact: "Text",
    bestTime: "Evening",
    birthday: "1995-11-30",
    occupation: "Software Engineer",
    source: "Website",
    householdIncome: 160000,
    notes: "Tech enthusiast, interested in electric vehicles",
    vehicles: [
      { id: 5, year: 2023, make: "Tesla", model: "Model Y", trim: "Long Range", vin: "5YJYGDEE9PF123456", purchased: "2024-01-15", price: 49990, equity: 8000, status: "Current" }
    ],
    serviceHistory: [
      { id: 4, date: "2024-05-15", vehicle: "Tesla Model Y", service: "Winter Tire Installation", mileage: 8000, cost: 120, advisor: "Sarah Lee" }
    ]
  }
];

// Customer interactions timeline
const customerInteractions = {
  1: [
    { id: 1, date: "2024-06-15", type: "Call", description: "Discussed F-150 financing options", rep: "Sarah Chen", duration: "15 min", outcome: "Interested in 0% APR" },
    { id: 2, date: "2024-06-14", type: "Email", description: "Sent quote for F-150 Lariat", rep: "Sarah Chen", outcome: "Customer opened and reviewed" },
    { id: 3, date: "2024-06-10", type: "Test Drive", description: "Test drove F-150", rep: "Sarah Chen", duration: "30 min", outcome: "Loved the truck" },
    { id: 4, date: "2024-06-05", type: "Visit", description: "Browsed website - F-150 page", rep: "System", duration: "10 min", outcome: "Viewed inventory" },
  ],
  2: [
    { id: 5, date: "2024-06-15", type: "Appointment", description: "Test drive scheduled", rep: "David Kim", outcome: "Confirmed for June 17" },
    { id: 6, date: "2024-06-13", type: "Call", description: "Follow-up on GLE interest", rep: "David Kim", duration: "10 min", outcome: "Very interested, comparing with BMW" },
    { id: 7, date: "2024-06-10", type: "Email", description: "Sent GLE brochure", rep: "David Kim", outcome: "Opened immediately" },
    { id: 8, date: "2024-06-01", type: "Visit", description: "First website visit", rep: "System", duration: "20 min", outcome: "Viewed multiple luxury SUVs" },
  ],
  3: [
    { id: 9, date: "2024-06-14", type: "Email", description: "Sent Model Y information", rep: "Mike Rodriguez", outcome: "Responded with questions" },
    { id: 10, date: "2024-06-12", type: "Call", description: "Discussed financing and trade-in", rep: "Mike Rodriguez", duration: "20 min", outcome: "Considering options" },
    { id: 11, date: "2024-06-08", type: "Email", description: "Follow-up email", rep: "Mike Rodriguez", outcome: "Requested more photos" },
    { id: 12, date: "2024-06-01", type: "Visit", description: "Website visit - Model Y page", rep: "System", duration: "15 min", outcome: "Submitted inquiry" },
  ],
};

// ============ COMPONENTS ============
const StatusBadge = ({ status }) => {
  const config = {
    Hot: "bg-rose-100 text-rose-700", Warm: "bg-amber-100 text-amber-700", Cold: "bg-slate-100 text-slate-700",
    Available: "bg-emerald-100 text-emerald-700", Pending: "bg-indigo-100 text-indigo-700", Active: "bg-emerald-100 text-emerald-700",
    VIP: "bg-purple-100 text-purple-700", Traded: "bg-slate-100 text-slate-700", Current: "bg-emerald-100 text-emerald-700"
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config[status] || "bg-slate-100"}`}>{status}</span>;
};

const KpiCard = ({ title, value, change, icon: Icon, color, subtitle }) => (
  <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border hover:shadow-md transition-all">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        {change && <div className={`flex items-center gap-1 mt-2 text-xs ${change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>{change.startsWith('+') ? <TrendingUp size={12} /> : <TrendingDown size={12} />}<span>{change}</span></div>}
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
      </div>
      <div className={`p-3 rounded-lg ${color}`}><Icon size={20} className="text-white" /></div>
    </div>
  </div>
);

const Toast = ({ message, type, onClose }) => {
  useEffect(() => { const timer = setTimeout(onClose, 4000); return () => clearTimeout(timer); }, [onClose]);
  const colors = { success: "bg-emerald-500", error: "bg-rose-500", info: "bg-indigo-500" };
  return <div className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white ${colors[type]} animate-fade-in`}>{message}</div>;
};

const LeadDrawer = ({ lead, onClose, onAction }) => {
  if (!lead) return null;
  const initials = lead.name.split(' ').map(n => n[0]).join('');
  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl z-50 transform transition-transform border-l" style={{ animation: 'slide-in 0.3s ease-out' }}>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-5 border-b"><h2 className="text-xl font-semibold">Lead Details</h2><button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg"><X size={20} /></button></div>
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div className="flex items-center gap-4"><div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">{initials}</div><div><h3 className="text-lg font-semibold">{lead.name}</h3><div className="flex items-center gap-2 mt-1"><StatusBadge status={lead.status} /><span className="text-sm text-slate-500">Score: {lead.score}/100</span></div></div></div>
          <div className="space-y-3"><h4 className="font-medium text-sm text-slate-500 uppercase">Contact Info</h4><div className="flex items-center gap-2 text-sm"><Phone size={16} /><a href={`tel:${lead.phone}`}>{lead.phone}</a></div><div className="flex items-center gap-2 text-sm"><Mail size={16} /><a href={`mailto:${lead.email}`}>{lead.email}</a></div><div className="flex items-center gap-2 text-sm"><MapPin size={16} />{lead.location}</div></div>
          <div className="space-y-3"><h4 className="font-medium text-sm text-slate-500 uppercase">Vehicle Interest</h4><div className="bg-slate-50 rounded-lg p-3"><p className="font-medium">{lead.vehicle}</p><p className="text-sm text-slate-500 mt-1">Budget: ${lead.budget.toLocaleString()}</p></div></div>
          <div className="space-y-3"><h4 className="font-medium text-sm text-slate-500 uppercase">Quick Actions</h4><div className="grid grid-cols-2 gap-2"><button onClick={() => onAction("Call", lead)} className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 rounded-lg text-sm"><Phone size={14} /> Call</button><button onClick={() => onAction("Text", lead)} className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 rounded-lg text-sm"><MessageCircle size={14} /> Text</button><button onClick={() => onAction("Email", lead)} className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 rounded-lg text-sm"><Mail size={14} /> Email</button><button onClick={() => onAction("Appointment", lead)} className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 rounded-lg text-sm"><Calendar size={14} /> Set Appt</button></div></div>
        </div>
      </div>
    </div>
  );
};

// ============ ENHANCED CUSTOMER 360 PAGE ============
const Customer360Page = ({ onToast }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(customersData[0]);
  const [activeTab, setActiveTab] = useState("overview");
  
  const interactions = customerInteractions[selectedCustomer.id] || [];
  const vehicles = selectedCustomer.vehicles || [];
  const serviceHistory = selectedCustomer.serviceHistory || [];
  
  const getInteractionIcon = (type) => {
    switch(type) {
      case 'Call': return <Phone size={14} className="text-emerald-600" />;
      case 'Email': return <Mail size={14} className="text-indigo-600" />;
      case 'Appointment': return <Calendar size={14} className="text-purple-600" />;
      case 'Test Drive': return <Car size={14} className="text-amber-600" />;
      case 'Visit': return <Activity size={14} className="text-slate-600" />;
      default: return <MessageSquare size={14} className="text-slate-600" />;
    }
  };
  
  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "vehicles", label: "Vehicles", icon: Car },
    { id: "service", label: "Service History", icon: Wrench },
    { id: "timeline", label: "Timeline", icon: History },
    { id: "notes", label: "Notes", icon: FileText },
  ];
  
  const totalEquity = vehicles.reduce((sum, v) => sum + (v.equity || 0), 0);
  const totalSpent = vehicles.reduce((sum, v) => sum + (v.price || 0), 0);
  
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Customer 360° View</h2>
        <button onClick={() => onToast("Export customer data", "success")} className="flex items-center gap-2 text-indigo-600 text-sm"><Download size={14} /> Export</button>
      </div>
      
      {/* Customer Selector */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {customersData.map(customer => (
          <button
            key={customer.id}
            onClick={() => setSelectedCustomer(customer)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
              selectedCustomer.id === customer.id 
                ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20' 
                : 'bg-white dark:bg-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
              {customer.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="text-left">
              <p className="font-medium text-sm">{customer.name}</p>
              <p className="text-xs text-slate-500">LTV: ${customer.lifetimeValue.toLocaleString()}</p>
            </div>
          </button>
        ))}
      </div>
      
      {/* Customer Header Card */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold">{selectedCustomer.name}</h2>
              <StatusBadge status={selectedCustomer.status} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2"><Mail size={14} /> {selectedCustomer.email}</div>
                <div className="flex items-center gap-2"><Phone size={14} /> {selectedCustomer.phone}</div>
                <div className="flex items-center gap-2"><MapPin size={14} /> {selectedCustomer.address}</div>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2"><CreditCard size={14} /> Credit Score: {selectedCustomer.creditScore}</div>
                <div className="flex items-center gap-2"><Calendar size={14} /> Customer Since: {selectedCustomer.since}</div>
                <div className="flex items-center gap-2"><Briefcase size={14} /> {selectedCustomer.occupation}</div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onToast(`Calling ${selectedCustomer.name}...`, "info")} className="px-4 py-2 bg-white/20 rounded-lg text-sm flex items-center gap-2"><Phone size={14} /> Call</button>
            <button onClick={() => onToast(`Emailing ${selectedCustomer.name}...`, "info")} className="px-4 py-2 bg-white/20 rounded-lg text-sm flex items-center gap-2"><Mail size={14} /> Email</button>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border text-center">
          <Car size={24} className="mx-auto mb-2 text-indigo-500" />
          <p className="text-2xl font-bold text-indigo-600">{vehicles.length}</p>
          <p className="text-sm text-slate-500">Vehicles</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border text-center">
          <DollarSign size={24} className="mx-auto mb-2 text-emerald-500" />
          <p className="text-2xl font-bold text-emerald-600">${totalSpent.toLocaleString()}</p>
          <p className="text-sm text-slate-500">Total Spent</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border text-center">
          <TrendingUp size={24} className="mx-auto mb-2 text-amber-500" />
          <p className="text-2xl font-bold text-amber-600">${totalEquity.toLocaleString()}</p>
          <p className="text-sm text-slate-500">Total Equity</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border text-center">
          <History size={24} className="mx-auto mb-2 text-purple-500" />
          <p className="text-2xl font-bold text-purple-600">{interactions.length}</p>
          <p className="text-sm text-slate-500">Interactions</p>
        </div>
      </div>
      
      {/* Quick Info Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border flex items-center gap-3">
          <Star size={20} className="text-yellow-500" />
          <div><p className="text-xs text-slate-500">Preferred Contact</p><p className="font-medium">{selectedCustomer.preferredContact}</p></div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border flex items-center gap-3">
          <Clock size={20} className="text-blue-500" />
          <div><p className="text-xs text-slate-500">Best Time to Contact</p><p className="font-medium">{selectedCustomer.bestTime}</p></div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border flex items-center gap-3">
          <Target size={20} className="text-rose-500" />
          <div><p className="text-xs text-slate-500">Lead Source</p><p className="font-medium">{selectedCustomer.source}</p></div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex gap-1 border-b">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border">
              <h3 className="font-semibold mb-3">Customer Profile</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-slate-500">Birthday</p><p className="font-medium">{selectedCustomer.birthday}</p></div>
                <div><p className="text-sm text-slate-500">Household Income</p><p className="font-medium">${selectedCustomer.householdIncome.toLocaleString()}</p></div>
                <div><p className="text-sm text-slate-500">Occupation</p><p className="font-medium">{selectedCustomer.occupation}</p></div>
                <div><p className="text-sm text-slate-500">Lifetime Value</p><p className="font-medium">${selectedCustomer.lifetimeValue.toLocaleString()}</p></div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border">
              <h3 className="font-semibold mb-3">Notes</h3>
              <p className="text-sm text-slate-600">{selectedCustomer.notes}</p>
            </div>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-5 text-white">
              <div className="flex items-center gap-2 mb-2"><Sparkles size={16} /><span className="font-medium">AI Insight</span></div>
              <p className="text-sm">Based on this customer's vehicle history and equity position, they may be ready for an upgrade. Their {selectedCustomer.vehicles?.[0]?.year} {selectedCustomer.vehicles?.[0]?.make} {selectedCustomer.vehicles?.[0]?.model} has ${selectedCustomer.vehicles?.[0]?.equity?.toLocaleString()} in equity.</p>
            </div>
          </div>
        )}
        
        {activeTab === "vehicles" && (
          <div className="space-y-3">
            {vehicles.length === 0 ? (
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center text-slate-400 border">
                <Car size={40} className="mx-auto mb-2 opacity-50" />
                <p>No vehicles found</p>
              </div>
            ) : (
              vehicles.map(vehicle => (
                <div key={vehicle.id} className="bg-white dark:bg-slate-800 rounded-xl p-4 border hover:shadow-md transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}</h3>
                      <p className="text-xs text-slate-500 mt-1">VIN: {vehicle.vin}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        {vehicle.purchased && <span>Purchased: {vehicle.purchased}</span>}
                        {vehicle.sold && <span>Sold: {vehicle.sold}</span>}
                        {vehicle.tradeValue && <span>Trade Value: ${vehicle.tradeValue.toLocaleString()}</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-indigo-600">${vehicle.price?.toLocaleString()}</p>
                      <StatusBadge status={vehicle.status} />
                      {vehicle.equity > 0 && <p className="text-xs text-emerald-600 mt-1">Equity: ${vehicle.equity.toLocaleString()}</p>}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => onToast(`Viewing vehicle details`, "info")} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded text-sm">View Details</button>
                    <button onClick={() => onToast(`Schedule service for this vehicle`, "info")} className="px-3 py-1 bg-slate-100 rounded text-sm">Schedule Service</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        
        {activeTab === "service" && (
          <div className="space-y-3">
            {serviceHistory.length === 0 ? (
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center text-slate-400 border">
                <Wrench size={40} className="mx-auto mb-2 opacity-50" />
                <p>No service history</p>
              </div>
            ) : (
              serviceHistory.map(service => (
                <div key={service.id} className="bg-white dark:bg-slate-800 rounded-xl p-4 border hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{service.service}</p>
                      <p className="text-sm text-slate-500">{service.vehicle}</p>
                      <div className="flex gap-4 mt-1 text-xs text-slate-400">
                        <span>Mileage: {service.mileage.toLocaleString()}</span>
                        <span>Advisor: {service.advisor}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">${service.cost}</p>
                      <p className="text-xs text-slate-400">{service.date}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        
        {activeTab === "timeline" && (
          <div className="space-y-3">
            {interactions.length === 0 ? (
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center text-slate-400 border">
                <History size={40} className="mx-auto mb-2 opacity-50" />
                <p>No interactions yet</p>
              </div>
            ) : (
              interactions.map(interaction => (
                <div key={interaction.id} className="bg-white dark:bg-slate-800 rounded-xl p-4 border hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg">{getInteractionIcon(interaction.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{interaction.description}</p>
                          <p className="text-xs text-slate-500 mt-1">By: {interaction.rep}</p>
                          {interaction.outcome && <p className="text-xs text-emerald-600 mt-1">Outcome: {interaction.outcome}</p>}
                        </div>
                        <span className="text-xs text-slate-400">{interaction.date}</span>
                      </div>
                      {interaction.duration && <p className="text-xs text-slate-500 mt-1">Duration: {interaction.duration}</p>}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        
        {activeTab === "notes" && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border">
            <h3 className="font-semibold mb-3">Internal Notes</h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-sm">{selectedCustomer.notes}</p>
                <p className="text-xs text-slate-400 mt-1">Added by System</p>
              </div>
            </div>
            <div className="mt-4">
              <textarea rows={3} placeholder="Add a note..." className="w-full px-3 py-2 border rounded-lg text-sm resize-none"></textarea>
              <button onClick={() => onToast("Note added", "success")} className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">Add Note</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Placeholder for other pages to keep app working
const PlaceholderPage = ({ title, icon: Icon }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-6"><Icon size={40} className="text-white" /></div>
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="text-slate-500 mb-4">This feature is coming soon</p>
    <div className="px-4 py-2 bg-slate-100 rounded-full text-sm text-slate-500">In Development</div>
  </div>
);

const Dashboard = ({ onToast, onSelectLead }) => <PlaceholderPage title="Dashboard" icon={LayoutDashboard} />;
const LeadsPage = ({ onToast, onSelectLead }) => <PlaceholderPage title="Leads Management" icon={Users} />;
const PipelinePage = ({ onToast, onSelectLead }) => <PlaceholderPage title="Pipeline" icon={GitBranch} />;
const InventoryPage = ({ onToast }) => <PlaceholderPage title="Inventory" icon={Car} />;
const ReportsPage = ({ onToast }) => <PlaceholderPage title="Reports" icon={BarChart3} />;
const TeamPage = ({ onToast }) => <PlaceholderPage title="Team Leaderboard" icon={Trophy} />;
const AICoachPage = ({ onToast }) => <PlaceholderPage title="AI Coach" icon={Bot} />;
const InboxPage = ({ onToast }) => <PlaceholderPage title="Inbox" icon={InboxIcon} />;
const MarketingPage = ({ onToast }) => <PlaceholderPage title="Marketing" icon={Megaphone} />;
const SettingsPage = ({ onToast }) => <PlaceholderPage title="Settings" icon={Settings} />;

// Main App
const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("customers");
  const [selectedLead, setSelectedLead] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  
  useEffect(() => { if (darkMode) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark'); }, [darkMode]);
  
  const addToast = (message, type = "success") => { const id = Date.now(); setToasts(prev => [...prev, { id, message, type }]); };
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));
  
  const navigation = [
    { id: "customers", label: "Customer 360", icon: User, section: "MAIN" },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, section: "MAIN" },
    { id: "leads", label: "Leads", icon: Users, section: "SALES" },
    { id: "pipeline", label: "Pipeline", icon: GitBranch, section: "SALES" },
    { id: "inventory", label: "Inventory", icon: Car, section: "SALES" },
    { id: "reports", label: "Reports", icon: BarChart3, section: "ANALYTICS" },
    { id: "team", label: "Leaderboard", icon: Trophy, section: "ANALYTICS" },
    { id: "ai-coach", label: "AI Coach", icon: Bot, section: "ANALYTICS" },
    { id: "inbox", label: "Inbox", icon: InboxIcon, section: "MARKETING" },
    { id: "marketing", label: "Marketing", icon: Megaphone, section: "MARKETING" },
    { id: "settings", label: "Settings", icon: Settings, section: "SETTINGS" },
  ];
  
  const renderPage = () => {
    switch (currentPage) {
      case "customers": return <Customer360Page onToast={addToast} />;
      case "dashboard": return <Dashboard onToast={addToast} onSelectLead={setSelectedLead} />;
      case "leads": return <LeadsPage onToast={addToast} onSelectLead={setSelectedLead} />;
      case "pipeline": return <PipelinePage onToast={addToast} onSelectLead={setSelectedLead} />;
      case "inventory": return <InventoryPage onToast={addToast} />;
      case "reports": return <ReportsPage onToast={addToast} />;
      case "team": return <TeamPage onToast={addToast} />;
      case "ai-coach": return <AICoachPage onToast={addToast} />;
      case "inbox": return <InboxPage onToast={addToast} />;
      case "marketing": return <MarketingPage onToast={addToast} />;
      case "settings": return <SettingsPage onToast={addToast} />;
      default: return <Customer360Page onToast={addToast} />;
    }
  };
  
  const sections = ["MAIN", "SALES", "ANALYTICS", "MARKETING", "SETTINGS"];
  
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-slate-800 border-r transition-all duration-300 flex flex-col overflow-y-auto`}>
        <div className="p-5 border-b flex items-center justify-between">
          {!sidebarCollapsed && (
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">AutoDeal CRM</span>
              <p className="text-xs text-slate-500">Customer 360 Enhanced</p>
            </div>
          )}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1.5 hover:bg-slate-100 rounded-lg">
            <ChevronLeft size={18} className={sidebarCollapsed ? "rotate-180" : ""} />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-6">
          {sections.map(section => {
            const sectionItems = navigation.filter(item => item.section === section);
            if (sectionItems.length === 0) return null;
            return (
              <div key={section}>
                {!sidebarCollapsed && <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">{section}</p>}
                <div className="space-y-1">
                  {sectionItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentPage(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                        currentPage === item.id 
                          ? 'bg-indigo-50 text-indigo-600' 
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <item.icon size={20} />
                      {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
      </aside>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-slate-800 border-b px-6 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold">{navigation.find(n => n.id === currentPage)?.label || "Customer 360"}</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 text-sm border rounded-lg w-64" />
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 hover:bg-slate-100 rounded-lg">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 hover:bg-slate-100 rounded-lg">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border">
                  <div className="p-3 border-b"><p className="font-semibold">Notifications</p></div>
                  <div className="p-3"><p className="text-sm">Welcome to AutoDeal CRM</p><p className="text-xs text-slate-500">Just now</p></div>
                </div>
              )}
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">AD</div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{renderPage()}</main>
      </div>
      
      {selectedLead && <LeadDrawer lead={selectedLead} onClose={() => setSelectedLead(null)} onAction={(action, lead) => addToast(`${action} action for ${lead.name}`, "success")} />}
      {toasts.map(toast => <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />)}
    </div>
  );
};

export default App;
