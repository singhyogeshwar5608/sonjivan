import { useState, useEffect, useCallback } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  DollarSign,
  Users,
  Package,
  Loader2
} from 'lucide-react';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    activeUsers: 0,
    salesData: [],
    revenueData: [],
    topProducts: []
  });

  // Fetch analytics data
  const fetchAnalyticsData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Mock data based on time range
      const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 12;
      const mockSalesData = Array.from({ length: days }, (_, i) =>
        Math.floor(Math.random() * 1000) + 500 + (i * 50)
      );

      // Simulate a short delay for loading effect
      await new Promise(resolve => setTimeout(resolve, 300));

      setAnalyticsData({
        totalRevenue: mockSalesData.reduce((a, b) => a + b, 0),
        totalOrders: Math.floor(mockSalesData.length * 1.5),
        activeUsers: Math.floor(Math.random() * 500) + 1000,
        salesData: mockSalesData,
        revenueData: mockSalesData.map(sale => Math.floor(sale * 1.2)),
        topProducts: [
          { id: 1, name: 'Complete Blood Count (CBC)', sales: 1234, revenue: 45678, growth: 12.5 },
          { id: 2, name: 'Lipid Profile', sales: 987, revenue: 34567, growth: 8.2 },
          { id: 3, name: 'Thyroid Function Test', sales: 876, revenue: 29876, growth: 15.3 },
          { id: 4, name: 'Liver Function Test', sales: 765, revenue: 23456, growth: 10.1 },
          { id: 5, name: 'Kidney Function Test', sales: 654, revenue: 19876, growth: 7.5 }
        ]
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Set default data even if there's an error
      setAnalyticsData({
        totalRevenue: 125000,
        totalOrders: 450,
        activeUsers: 1250,
        salesData: [500, 750, 600, 900, 800, 650, 700],
        revenueData: [600, 900, 720, 1080, 960, 780, 840],
        topProducts: [
          { id: 1, name: 'Complete Blood Count (CBC)', sales: 1234, revenue: 45678, growth: 12.5 },
          { id: 2, name: 'Lipid Profile', sales: 987, revenue: 34567, growth: 8.2 },
          { id: 3, name: 'Thyroid Function Test', sales: 876, revenue: 29876, growth: 15.3 },
          { id: 4, name: 'Liver Function Test', sales: 765, revenue: 23456, growth: 10.1 },
          { id: 5, name: 'Kidney Function Test', sales: 654, revenue: 19876, growth: 7.5 }
        ]
      });
    } finally {
      setIsLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  const getDateLabels = () => {
    const labels = [];
    for (let i = 0; i < analyticsData.salesData.length; i++) {
      labels.push(`Day ${i + 1}`);
    }
    return labels;
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6 bg-gray-50 min-h-screen">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        
        {/* Time Range Selector */}
        <div className="flex flex-wrap gap-1 sm:gap-2 w-full sm:w-auto">
          {['week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-md border text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none ${
                timeRange === range
                  ? 'bg-primary text-white border-primary'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-48 sm:h-64 text-gray-500">
          <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin mr-2" />
          <span className="text-sm sm:text-base">Loading analytics...</span>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {/* Revenue Card */}
            <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs sm:text-sm font-medium text-gray-500">Total Revenue</h3>
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-primary" />
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">₹{analyticsData.totalRevenue.toLocaleString()}</div>
              <p className="text-xs sm:text-sm text-green-600 mt-1">+12.5% from last {timeRange}</p>
            </div>

            {/* Orders Card */}
            <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs sm:text-sm font-medium text-gray-500">Total Orders</h3>
                <Package className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-500" />
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">{analyticsData.totalOrders.toLocaleString()}</div>
              <p className="text-xs sm:text-sm text-green-600 mt-1">+8.2% from last {timeRange}</p>
            </div>

            {/* Users Card */}
            <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md sm:col-span-2 xl:col-span-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs sm:text-sm font-medium text-gray-500">Active Users</h3>
                <Users className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-green-500" />
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">{analyticsData.activeUsers.toLocaleString()}</div>
              <p className="text-xs sm:text-sm text-green-600 mt-1">+15.3% from last {timeRange}</p>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {/* Sales Chart */}
            <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Sales Overview</h2>
              <div className="h-48 sm:h-64 lg:h-80">
                <Bar
                  data={{
                    labels: getDateLabels(),
                    datasets: [
                      {
                        label: 'Sales',
                        data: analyticsData.salesData,
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        borderColor: 'rgb(59, 130, 246)',
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          font: {
                            size: window.innerWidth < 640 ? 9 : window.innerWidth < 1024 ? 10 : 12,
                          },
                        },
                      },
                      x: {
                        ticks: {
                          font: {
                            size: window.innerWidth < 640 ? 9 : window.innerWidth < 1024 ? 10 : 12,
                          },
                          maxRotation: window.innerWidth < 640 ? 45 : window.innerWidth < 1024 ? 30 : 0,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Revenue Trend */}
            <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Revenue Trend</h2>
              <div className="h-48 sm:h-64 lg:h-80">
                <Line
                  data={{
                    labels: getDateLabels(),
                    datasets: [
                      {
                        label: 'Revenue',
                        data: analyticsData.revenueData,
                        borderColor: 'rgb(34, 197, 94)',
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        tension: 0.4,
                        fill: true,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          font: {
                            size: window.innerWidth < 640 ? 9 : window.innerWidth < 1024 ? 10 : 12,
                          },
                        },
                      },
                      x: {
                        ticks: {
                          font: {
                            size: window.innerWidth < 640 ? 9 : window.innerWidth < 1024 ? 10 : 12,
                          },
                          maxRotation: window.innerWidth < 640 ? 45 : window.innerWidth < 1024 ? 30 : 0,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Order Distribution */}
            <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Order Distribution</h2>
              <div className="h-40 sm:h-48 lg:h-64">
                <Pie
                  data={{
                    labels: ['Completed', 'Pending', 'Cancelled'],
                    datasets: [
                      {
                        data: [65, 25, 10],
                        backgroundColor: [
                          'rgba(34, 197, 94, 0.8)',
                          'rgba(251, 191, 36, 0.8)',
                          'rgba(239, 68, 68, 0.8)',
                        ],
                        borderColor: [
                          'rgb(34, 197, 94)',
                          'rgb(251, 191, 36)',
                          'rgb(239, 68, 68)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          font: {
                            size: window.innerWidth < 640 ? 9 : window.innerWidth < 1024 ? 10 : 12,
                          },
                          padding: window.innerWidth < 640 ? 8 : window.innerWidth < 1024 ? 12 : 20,
                          usePointStyle: true,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md lg:col-span-2">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Top Products</h2>
              <div className="overflow-x-auto -mx-3 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="text-left py-2 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                        <th className="text-left py-2 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                        <th className="text-left py-2 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Growth</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {analyticsData.topProducts.map((product, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-2 sm:py-3 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm text-gray-900 font-medium">
                            <div className="truncate max-w-32 sm:max-w-48 lg:max-w-none" title={product.name}>
                              {product.name}
                            </div>
                          </td>
                          <td className="py-2 sm:py-3 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm text-gray-900">{product.sales}</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm text-gray-900 font-semibold">₹{product.revenue.toLocaleString()}</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm hidden sm:table-cell">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              product.growth > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {product.growth > 0 ? '+' : ''}{product.growth}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;