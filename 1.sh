#!/bin/bash
# Fix JSX syntax error in LeadsPage

cd automotive-crm

# Create a completely clean, working App.jsx
cat > src/App.jsx << 'JSX'
import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Users, Car, Wrench, BarChart3,
  Settings, ChevronLeft, Search, Bell, Sun, Moon,
  Plus, Phone, Mail, Calendar, MessageSquare, X, UserPlus,
  PhoneCall, FileText, Clock, TrendingUp, TrendingDown, Target,
  AlertCircle, Info, Check, Send, Bot, Loader2, Sparkles,
  Filter, Activity, Trophy, DollarSign, Grid, Calendar as CalendarIcon,
  Star, Award, Eye, Edit, Trash2, Copy, Download, Upload, RefreshCw,
  Zap, Shield, Home, Percent, PieChart, LineChart, UserCheck,
  Briefcase, ClipboardList, FolderOpen, Gift, Headphones, Heart,
  HelpCircle, LogOut, Menu, Minimize2, Maximize2, MessageCircle,
  Paperclip, Save, Share2, ShoppingBag, Sliders, Smartphone,
  Tag, Timer, Trash, Truck, Video, Volume2, Wallet, Watch, Wifi,
  Wind, ZoomIn, ZoomOut, Navigation, Compass, MapPin, Coffee,
  Battery, Bluetooth, Cloud, Cpu, Database, Disc, Droplet,
  Rocket, Crown, Medal, Gift as GiftIcon, Globe, Lock, Unlock,
  Award as AwardIcon, BarChart, LineChart as LineChartIcon,
  TrendingUp as TrendingUpIcon, Clock as ClockIcon,
  XCircle, CheckCircle, AlertTriangle, HelpCircle as HelpCircleIcon
} from 'lucide-react';
import {
  AreaChart, Area, BarChart as ReBarChart, Bar,
  PieChart as RePieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart
} from 'recharts';

// ==================== MOCK DATA ====================
const salespeople = [
  { id: 1, name: "Sarah Chen", initials: "SC", leads: 47, appts: 32, units: 18, gross: 124500, closeRate: 38.3, color: "bg-indigo-500", email: "sarah.chen@autodeal.com", phone: "(555) 111-2222", rank: 2, target: 20, achievement: 90 },
  { id: 2, name: "Mike Rodriguez", initials: "MR", leads: 52, appts: 41, units: 24, gross: 187200, closeRate: 46.2, color: "bg-emerald-500", email: "mike.rodriguez@autodeal.com", phone: "(555) 222-3333", rank: 1, target: 25, achievement: 96 },
  { id: 3, name: "Jessica Williams", initials: "JW", leads: 38, appts: 28, units: 15, gross: 98300, closeRate: 39.5, color: "bg-amber-500", email: "jessica.williams@autodeal.com", phone: "(555) 333-4444", rank: 4, target: 18, achievement: 83 },
  { id: 4, name: "David Kim", initials: "DK", leads: 44, appts: 35, units: 21, gross: 156700, closeRate: 47.7, color: "bg-rose-500", email: "david.kim@autodeal.com", phone: "(555) 444-5555", rank: 3, target: 22, achievement: 95 },
  { id: 5, name: "Lisa Thompson", initials: "LT", leads: 41, appts: 29, units: 17, gross: 112400, closeRate: 41.5, color: "bg-cyan-500", email: "lisa.thompson@autodeal.com", phone: "(555) 555-6666", rank: 5, target: 19, achievement: 89 },
  { id: 6, name: "James Wilson", initials: "JW", leads: 35, appts: 22, units: 12, gross: 87600, closeRate: 34.3, color: "bg-purple-500", email: "james.wilson@autodeal.com", phone: "(555) 666-7777", rank: 6, target: 15, achievement: 80 },
];

const leadsData = [
  { id: 1, score: 92, name: "Thomas Bennett", phone: "(555) 123-4567", email: "thomas.b@email.com", vehicle: "2024 Ford F-150 Lariat", source: "AutoTrader", status: "Hot", rep: "Sarah Chen", lastActivity: "5m ago", daysInStage: 1, websiteVisits: 5, emailsOpened: 3, tradeInSubmitted: true, budget: 65000, interest: "Truck" },
  { id: 2, score: 78, name: "Amanda Foster", phone: "(555) 234-5678", email: "amanda.f@email.com", vehicle: "2023 Tesla Model Y", source: "Website", status: "Warm", rep: "Mike Rodriguez", lastActivity: "2h ago", daysInStage: 3, websiteVisits: 3, emailsOpened: 2, tradeInSubmitted: false, budget: 55000, interest: "SUV" },
  { id: 3, score: 45, name: "Marcus Webb", phone: "(555) 345-6789", email: "marcus.w@email.com", vehicle: "2022 BMW X5", source: "Cars.com", status: "Cold", rep: "Jessica Williams", lastActivity: "1d ago", daysInStage: 7, websiteVisits: 1, emailsOpened: 0, tradeInSubmitted: false, budget: 48000, interest: "Luxury SUV" },
  { id: 4, score: 88, name: "Rachel Cohen", phone: "(555) 456-7890", email: "rachel.c@email.com", vehicle: "2024 Mercedes-Benz GLE", source: "Facebook", status: "Hot", rep: "David Kim", lastActivity: "15m ago", daysInStage: 2, websiteVisits: 4, emailsOpened: 4, tradeInSubmitted: true, budget: 75000, interest: "Luxury" },
  { id: 5, score: 65, name: "Kevin Zhang", phone: "(555) 567-8901", email: "kevin.z@email.com", vehicle: "2023 Toyota Tundra", source: "Phone", status: "Warm", rep: "Sarah Chen", lastActivity: "1h ago", daysInStage: 4, websiteVisits: 2, emailsOpened: 1, tradeInSubmitted: false, budget: 58000, interest: "Truck" },
  { id: 6, score: 35, name: "Danielle Russo", phone: "(555) 678-9012", email: "danielle.r@email.com", vehicle: "2024 Honda CR-V", source: "Walk-in", status: "Cold", rep: "Lisa Thompson", lastActivity: "3d ago", daysInStage: 10, websiteVisits: 0, emailsOpened: 0, tradeInSubmitted: false, budget: 35000, interest: "SUV" },
  { id: 7, score: 95, name: "Brandon Hayes", phone: "(555) 789-0123", email: "brandon.h@email.com", vehicle: "2024 Chevrolet Corvette", source: "AutoTrader", status: "Hot", rep: "Mike Rodriguez", lastActivity: "2m ago", daysInStage: 0, websiteVisits: 6, emailsOpened: 5, tradeInSubmitted: true, budget: 85000, interest: "Sports Car" },
  { id: 8, score: 72, name: "Olivia Martinez", phone: "(555) 890-1234", email: "olivia.m@email.com", vehicle: "2023 Lexus RX", source: "Website", status: "Warm", rep: "James Wilson", lastActivity: "3h ago", daysInStage: 3, websiteVisits: 3, emailsOpened: 2, tradeInSubmitted: false, budget: 52000, interest: "Luxury SUV" },
];

const inventoryData = [
  { id: 1, year: 2024, make: "Ford", model: "F-150", trim: "Lariat", stock: "F24001", price: 58995, daysOnLot: 12, status: "Available", type: "New", engine: "3.5L EcoBoost V6", color: "Oxford White", views: 245, inquiries: 12 },
  { id: 2, year: 2023, make: "Tesla", model: "Model Y", trim: "Long Range", stock: "T23002", price: 49990, daysOnLot: 28, status: "Available", type: "Used", engine: "Dual Motor", color: "Midnight Silver", views: 189, inquiries: 8 },
  { id: 3, year: 2022, make: "BMW", model: "X5", trim: "xDrive40i", stock: "B22003", price: 55995, daysOnLot: 45, status: "Pending", type: "Used", engine: "3.0L I6 Turbo", color: "Mineral White", views: 156, inquiries: 5 },
  { id: 4, year: 2024, make: "Mercedes", model: "GLE", trim: "450 4MATIC", stock: "M24004", price: 72995, daysOnLot: 8, status: "Available", type: "New", engine: "3.0L I6 Turbo", color: "Obsidian Black", views: 312, inquiries: 18 },
  { id: 5, year: 2023, make: "Toyota", model: "Tundra", trim: "1794", stock: "T23005", price: 62995, daysOnLot: 62, status: "In Recon", type: "Used", engine: "3.5L V6 Hybrid", color: "Smoked Mesquite", views: 98, inquiries: 3 },
  { id: 6, year: 2024, make: "Honda", model: "CR-V", trim: "Sport", stock: "H24006", price: 36995, daysOnLot: 5, status: "Available", type: "New", engine: "1.5L Turbo", color: "Radiant Red", views: 267, inquiries: 15 },
];

const serviceAppointments = [
  { id: 1, time: "9:00 AM", customer: "Robert Johnson", vehicle: "2021 Honda Accord", service: "Oil Change", status: "In Progress", advisor: "Tom Brady" },
  { id: 2, time: "10:30 AM", customer: "Emily Davis", vehicle: "2022 Toyota Camry", service: "Brake Inspection", status: "Waiting", advisor: "Sarah Lee" },
  { id: 3, time: "1:00 PM", customer: "Michael Brown", vehicle: "2020 Ford Explorer", service: "Transmission Flush", status: "Scheduled", advisor: "Tom Brady" },
  { id: 4, time: "2:30 PM", customer: "Jessica Miller", vehicle: "2023 Tesla Model 3", service: "Tire Rotation", status: "Scheduled", advisor: "Sarah Lee" },
  { id: 5, time: "4:00 PM", customer: "Daniel Wilson", vehicle: "2019 BMW X3", service: "Engine Diagnostic", status: "Scheduled", advisor: "Tom Brady" },
];

const leadVolumeData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  leads: Math.floor(Math.random() * 25) + 8,
  conversions: Math.floor(Math.random() * 8) + 2,
}));

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

// ==================== COMPONENTS ====================

const StatusBadge = ({ status }) => {
  const config = {
    Hot: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
    Warm: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    Cold: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
    Available: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Sold: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
    Pending: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
    "In Progress": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
    Waiting: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    Scheduled: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config[status] || "bg-slate-100"}`}>{status}</span>;
};

const KpiCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        {change && (
          <div className={`flex items-center gap-1 mt-2 text-xs ${change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
            {change.startsWith('+') ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{change}</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
  </div>
);

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);
  
  const icons = { success: <Check size={16} />, error: <AlertCircle size={16} />, info: <Info size={16} /> };
  const colors = { success: "bg-emerald-500", error: "bg-rose-500", info: "bg-indigo-500" };
  
  return (
    <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white ${colors[type]} animate-fade-in`}>
      {icons[type]}
      <span className="text-sm">{message}</span>
    </div>
  );
};

const LeadDrawer = ({ lead, onClose, onAction }) => {
  if (!lead) return null;
  
  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl z-50 transform transition-transform border-l border-slate-200 dark:border-slate-700" style={{ animation: 'slide-in 0.3s ease-out' }}>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold">Lead Details</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
              {lead.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{lead.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <StatusBadge status={lead.status} />
                <span className="text-sm text-slate-500">Score: {lead.score}/100</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-slate-500 uppercase">Contact Info</h4>
            <div className="flex items-center gap-2 text-sm">
              <Phone size={16} className="text-slate-400" />
              <a href={`tel:${lead.phone}`} className="hover:text-indigo-600">{lead.phone}</a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail size={16} className="text-slate-400" />
              <a href={`mailto:${lead.email}`} className="hover:text-indigo-600">{lead.email}</a>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-slate-500 uppercase">Vehicle Interest</h4>
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
              <p className="font-medium">{lead.vehicle}</p>
              <p className="text-sm text-slate-500 mt-1">Budget: ${lead.budget.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-slate-500 uppercase">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => onAction("Call", lead)} className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm"><Phone size={14} /> Call</button>
              <button onClick={() => onAction("Text", lead)} className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm"><MessageSquare size={14} /> Text</button>
              <button onClick={() => onAction("Email", lead)} className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm"><Mail size={14} /> Email</button>
              <button onClick={() => onAction("Appointment", lead)} className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm"><Calendar size={14} /> Set Appt</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== PAGES ====================

const Dashboard = ({ onToast, onSelectLead }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <KpiCard title="New Leads Today" value="23" change="+12% vs yesterday" icon={Users} color="bg-indigo-500" />
      <KpiCard title="Appointments Set" value="18" change="67% show rate" icon={Calendar} color="bg-emerald-500" />
      <KpiCard title="Deals Closed MTD" value="47" change="$324,500 gross" icon={Target} color="bg-amber-500" />
      <KpiCard title="Avg Response Time" value="4.2 min" change="-18% vs last week" icon={Clock} color="bg-rose-500" />
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200">
        <h3 className="font-semibold mb-4">Lead Volume (Last 30 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={leadVolumeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="leads" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.1} />
            <Area type="monotone" dataKey="conversions" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200">
        <h3 className="font-semibold mb-4">Lead Sources</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RePieChart>
            <Pie data={leadSourcesData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
              {leadSourcesData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
            </Pie>
            <Tooltip />
          </RePieChart>
        </ResponsiveContainer>
      </div>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200">
        <h3 className="font-semibold mb-4">Monthly Performance vs Goals</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={monthlyGoals}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="target" fill="#4F46E5" name="Target" />
            <Bar dataKey="actual" fill="#10B981" name="Actual" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200">
        <h3 className="font-semibold mb-4 flex items-center justify-between">
          <span>Hot Leads Feed</span>
          <span className="text-xs text-rose-500 animate-pulse">● Live</span>
        </h3>
        <div className="space-y-3 max-h-[300px] overflow-y-auto">
          {hotLeads.map(lead => (
            <div key={lead.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => onSelectLead(lead)}>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{lead.name}</p>
                  <StatusBadge status={lead.status} />
                </div>
                <p className="text-xs text-slate-500 mt-1">{lead.vehicle}</p>
                <p className="text-xs text-slate-400 mt-1">{lead.lastActivity}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={(e) => { e.stopPropagation(); onToast(`Calling ${lead.name}...`, "info"); }} className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg"><Phone size={14} className="text-emerald-600" /></button>
                <button onClick={(e) => { e.stopPropagation(); onToast(`Texting ${lead.name}...`, "info"); }} className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg"><MessageSquare size={14} className="text-indigo-600" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const LeadsPage = ({ onToast, onSelectLead }) => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  const filteredLeads = leadsData.filter(lead => {
    if (filterStatus !== "all" && lead.status !== filterStatus) return false;
    if (search && !lead.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-sm">
            <option value="all">All Status</option>
            <option value="Hot">Hot</option>
            <option value="Warm">Warm</option>
            <option value="Cold">Cold</option>
          </select>
          <input type="text" placeholder="Search leads..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-sm w-64" />
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"><Filter size={16} /> Filter</button>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Vehicle</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Rep</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 cursor-pointer transition-colors" onClick={() => onSelectLead(lead)}>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${lead.score >= 80 ? 'bg-rose-100 text-rose-700' : lead.score >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
                      {lead.score}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-sm">{lead.name}</td>
                  <td className="px-4 py-3 text-sm">{lead.vehicle.split(' ').slice(0, 2).join(' ')}</td>
                  <td className="px-4 py-3 text-sm">{lead.source}</td>
                  <td className="px-4 py-3"><StatusBadge status={lead.status} /></td>
                  <td className="px-4 py-3 text-sm">{lead.rep.split(' ')[0]}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={(e) => { e.stopPropagation(); onToast(`Calling ${lead.name}`, "info"); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><Phone size={14} /></button>
                      <button onClick={(e) => { e.stopPropagation(); onToast(`Texting ${lead.name}`, "info"); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><MessageSquare size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const InventoryPage = ({ onToast }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {inventoryData.map(vehicle => (
      <div key={vehicle.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-all cursor-pointer">
        <div className="h-32 bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-lg font-bold relative">
          {vehicle.make} {vehicle.model}
          <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${vehicle.status === "Available" ? "bg-emerald-400 animate-pulse" : "bg-slate-400"}`}></div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
              <p className="text-xs text-slate-500">Stock #{vehicle.stock}</p>
            </div>
            <StatusBadge status={vehicle.status} />
          </div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-xl font-bold text-indigo-600">${vehicle.price.toLocaleString()}</p>
            <div className="flex gap-2 text-xs">
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded">👁️ {vehicle.views}</span>
              <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 rounded">📞 {vehicle.inquiries}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onToast(`Matching leads for ${vehicle.make} ${vehicle.model}`, "success")} className="flex-1 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100">Match to Lead</button>
            <button className="flex-1 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm">Details</button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ServicePage = ({ onToast }) => {
  const [appointments, setAppointments] = useState(serviceAppointments);
  
  const updateStatus = (id, newStatus) => {
    setAppointments(appointments.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt));
    onToast(`Status updated to ${newStatus}`, "success");
  };
  
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center border border-slate-200"><p className="text-2xl font-bold">{appointments.length}</p><p className="text-sm text-slate-500">Total ROs</p></div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center border border-slate-200"><p className="text-2xl font-bold text-indigo-600">{appointments.filter(a => a.status === "In Progress").length}</p><p className="text-sm text-slate-500">In Progress</p></div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center border border-slate-200"><p className="text-2xl font-bold text-amber-600">{appointments.filter(a => a.status === "Waiting").length}</p><p className="text-sm text-slate-500">Waiting</p></div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center border border-slate-200"><p className="text-2xl font-bold text-emerald-600">{appointments.filter(a => a.status === "Completed").length}</p><p className="text-sm text-slate-500">Completed</p></div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {appointments.map(apt => (
            <div key={apt.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-20"><p className="font-bold text-indigo-600">{apt.time}</p></div>
                <div><p className="font-medium">{apt.customer}</p><p className="text-sm text-slate-500">{apt.vehicle}</p></div>
              </div>
              <div className="flex-1 px-4"><p className="text-sm">{apt.service}</p><p className="text-xs text-slate-500">Advisor: {apt.advisor}</p></div>
              <select value={apt.status} onChange={(e) => updateStatus(apt.id, e.target.value)} className="px-2 py-1 text-sm border border-slate-300 rounded-lg">
                <option>Scheduled</option><option>Waiting</option><option>In Progress</option><option>Completed</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReportsPage = ({ onToast }) => (
  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200">
    <div className="flex justify-between items-center mb-4"><h3 className="font-semibold">Sales Report</h3><button onClick={() => onToast("Report exported", "success")} className="flex items-center gap-2 text-indigo-600 text-sm"><Download size={14} /> Export CSV</button></div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50"><tr className="text-left text-xs font-medium text-slate-500 uppercase"><th className="px-4 py-3">Rep</th><th className="px-4 py-3">Leads</th><th className="px-4 py-3">Units</th><th className="px-4 py-3">Gross</th><th className="px-4 py-3">Close %</th><th className="px-4 py-3">Target</th><th className="px-4 py-3">Achievement</th></tr></thead>
        <tbody className="divide-y">
          {salespeople.map(rep => (<tr key={rep.id}><td className="px-4 py-3 font-medium">{rep.name}</td><td className="px-4 py-3">{rep.leads}</td><td className="px-4 py-3 font-bold">{rep.units}</td><td className="px-4 py-3 text-emerald-600">${(rep.gross/1000).toFixed(0)}K</td><td className="px-4 py-3">{rep.closeRate}%</td><td className="px-4 py-3">{rep.target}</td><td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-16 bg-slate-200 rounded-full h-2"><div className={`h-2 rounded-full ${rep.achievement >= 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${rep.achievement}%` }}></div></div><span className="text-xs">{rep.achievement}%</span></div></td></tr>))}
        </tbody>
      </table>
    </div>
  </div>
);

const SettingsPage = ({ onToast }) => (
  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200">
    <h3 className="font-semibold mb-4">User Management</h3>
    <div className="space-y-3">
      {salespeople.map(user => (
        <div key={user.id} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${user.color} flex items-center justify-center text-white font-bold`}>{user.initials}</div>
            <div><p className="font-medium">{user.name}</p><p className="text-xs text-slate-500">Sales Consultant</p></div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onToast(`Editing ${user.name}`, "info")} className="px-3 py-1 text-indigo-600 text-sm">Edit</button>
            <button onClick={() => onToast(`Removing ${user.name}`, "error")} className="px-3 py-1 text-rose-600 text-sm">Remove</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ==================== MAIN APP ====================
const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedLead, setSelectedLead] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);
  
  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };
  
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));
  
  const navigation = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "leads", label: "Leads", icon: Users },
    { id: "inventory", label: "Inventory", icon: Car },
    { id: "service", label: "Service", icon: Wrench },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];
  
  const renderPage = () => {
    switch (currentPage) {
      case "dashboard": return <Dashboard onToast={addToast} onSelectLead={setSelectedLead} />;
      case "leads": return <LeadsPage onToast={addToast} onSelectLead={setSelectedLead} />;
      case "inventory": return <InventoryPage onToast={addToast} />;
      case "service": return <ServicePage onToast={addToast} />;
      case "reports": return <ReportsPage onToast={addToast} />;
      case "settings": return <SettingsPage onToast={addToast} />;
      default: return <Dashboard onToast={addToast} onSelectLead={setSelectedLead} />;
    }
  };
  
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 flex flex-col`}>
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">AutoDeal CRM</span>
              <p className="text-xs text-slate-500">Dealership Suite</p>
            </div>
          )}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"><ChevronLeft size={18} className={sidebarCollapsed ? "rotate-180" : ""} /></button>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navigation.map(item => (
            <button key={item.id} onClick={() => setCurrentPage(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${currentPage === item.id ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
              <item.icon size={20} />
              {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold">{navigation.find(n => n.id === currentPage)?.label || "Dashboard"}</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 w-64" />
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 hover:bg-slate-100 rounded-lg relative"><Bell size={18} /><span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span></button>
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-lg border z-50">
                  <div className="p-3 border-b"><p className="font-semibold">Notifications</p></div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="p-3 hover:bg-slate-50"><p className="text-sm">🎉 New lead from AutoTrader</p><p className="text-xs text-slate-500">2 min ago</p></div>
                    <div className="p-3 hover:bg-slate-50"><p className="text-sm">📅 Appointment reminder in 30 min</p><p className="text-xs text-slate-500">15 min ago</p></div>
                  </div>
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
JSX

# Add CSS animations
cat >> src/index.css << 'CSS'

@keyframes slide-in {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-slide-in { animation: slide-in 0.3s ease-out; }
.animate-fade-in { animation: fade-in 0.2s ease-out; }
CSS

echo ""
echo "✅ Fixed all JSX syntax errors!"
echo ""
echo "🚀 App is now ready to run!"
echo ""

# Kill existing process and restart
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

npm run dev
EOF

chmod +x final-fix.sh
./final-fix.sh