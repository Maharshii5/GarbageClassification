import React from 'react';
import { BarChart3, Users, Leaf, TrendingUp } from 'lucide-react';

const Statistics: React.FC = () => {
  const stats = [
    {
      icon: BarChart3,
      number: '2.3M+',
      label: 'Items Classified',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      number: '45K+',
      label: 'Active Users',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Leaf,
      number: '89.7%',
      label: 'Accuracy Rate',
      color: 'from-green-500 to-lime-500'
    },
    {
      icon: TrendingUp,
      number: '156T',
      label: 'CO₂ Saved (kg)',
      color: 'from-orange-500 to-amber-500'
    }
  ];

  const categoryData = [
    { category: 'Organic', percentage: 32, color: 'bg-green-500', items: '736K' },
    { category: 'Plastic', percentage: 28, color: 'bg-blue-500', items: '644K' },
    { category: 'Paper', percentage: 18, color: 'bg-orange-500', items: '414K' },
    { category: 'Metal', percentage: 12, color: 'bg-gray-500', items: '276K' },
    { category: 'Glass', percentage: 7, color: 'bg-emerald-500', items: '161K' },
    { category: 'E-waste', percentage: 3, color: 'bg-purple-500', items: '69K' }
  ];

  return (
    <section id="statistics" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Platform Statistics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time insights into our global waste classification impact and user engagement.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Category Distribution */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Waste Category Distribution
          </h3>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Chart */}
            <div className="space-y-6">
              {categoryData.map((item, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 ${item.color} rounded-full`}></div>
                      <span className="font-semibold text-gray-700">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-800">{item.percentage}%</div>
                      <div className="text-sm text-gray-500">{item.items} items</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`${item.color} h-3 rounded-full transition-all duration-1000 ease-out group-hover:opacity-80`}
                      style={{ 
                        width: `${item.percentage}%`,
                        animationDelay: `${index * 100}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Insights */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
              <h4 className="text-xl font-bold text-gray-800 mb-4">Key Insights</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">
                    <strong>Organic waste</strong> represents the largest category, showing high 
                    composting potential in our user base.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">
                    <strong>Plastic items</strong> are the second most common, highlighting the 
                    need for better recycling education.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">
                    <strong>Paper and cardboard</strong> classification shows strong recycling 
                    awareness among users.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;