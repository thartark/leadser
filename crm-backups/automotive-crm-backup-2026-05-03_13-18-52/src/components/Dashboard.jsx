import React from 'react';
import { Users, Car, DollarSign, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      <div className="bg-white p-4 rounded shadow"><Users className="text-blue-500" /> Leads: 24</div>
      <div className="bg-white p-4 rounded shadow"><Car className="text-green-500" /> Cars: 12</div>
      <div className="bg-white p-4 rounded shadow"><DollarSign className="text-yellow-500" /> Revenue: $5,420</div>
      <div className="bg-white p-4 rounded shadow"><TrendingUp className="text-purple-500" /> Growth: +18%</div>
    </div>
  );
}
