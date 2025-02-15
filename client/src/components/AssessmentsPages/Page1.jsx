import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';

const Page1 = () => {
  const pieData = [
    { name: 'Maths', value: 85 },
    { name: 'Physics', value: 78 },
    { name: 'Chemistry', value: 92 },
    { name: 'Biology', value: 74 },
    { name: 'Marathi', value: 88 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

  const lineData = [
    { month: 'Jan', score: 75 },
    { month: 'Feb', score: 78 },
    { month: 'Mar', score: 82 },
    { month: 'Apr', score: 85 },
    { month: 'May', score: 88 },
    { month: 'Jun', score: 90 },
    { month: 'Jul', score: 92 },
    { month: 'Aug', score: 94 },
    { month: 'Sep', score: 96 },
    { month: 'Oct', score: 98 },
    { month: 'Nov', score: 99 },
    { month: 'Dec', score: 100 },
  ];

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/reports/generate-pdf');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'student_progress_report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Failed to generate PDF', error);
    }
  };
  

  return (
    <div>
      <div className='flex px-10 pt-4 gap-10'>
        {/* Box 1 with Pie Chart Animation */}
        <motion.div
          className='w-1/2 h-[45vh] border border-gray-400 rounded-2xl shadow-2xl flex-col items-center justify-center bg-white'
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-xl text-center'>Subject Wise Performance</h2>
          <PieChart width={400} height={270}>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={30} />
          </PieChart>
        </motion.div>

        {/* Box 2 with Line Chart Animation */}
        <motion.div
          className='w-1/2 h-[45vh] border border-gray-400 rounded-2xl shadow-2xl flex-col items-center justify-center bg-white'
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className='text-xl text-center'>Monthly Test Scores</h2>
          <LineChart width={500} height={270} data={lineData} className='mt-3'>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#8884d8" />
          </LineChart>
        </motion.div>
      </div>

      <div className="p-6 grid grid-cols-3 gap-6">
        {/* Student Progress Card */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Student Progress</h2>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">On Track</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Mathematics</span>
                <span>75% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Science</span>
                <span>60% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>

            <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
              View Detailed Report
            </button>
          </div>
        </motion.div>

        {/* Learning Analytics Card */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-6">Learning Analytics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">85%</p>
              <p className="text-gray-600">Assignment Completion</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">92%</p>
              <p className="text-gray-600">Attendance Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">4.2</p>
              <p className="text-gray-600">Engagement Score</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">78%</p>
              <p className="text-gray-600">Quiz Average</p>
            </div>
          </div>
        </motion.div>

        {/* Actionable Alerts Card */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-4">Actionable Alerts</h2>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <p className="font-semibold">Warning:</p>
              <p>Math homework completion rate dropped below 80%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <p className="font-semibold">Success:</p>
              <p>Science quiz scores improved by 15%</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <p className="font-semibold">Danger:</p>
              <p>Reading assignments pending for 3 days</p>
            </div>
          </div>
        </motion.div>

        {/* Learning Timeline Card */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-4">Learning Timeline</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-600"></div>
              <div className="ml-4">
                <h3 className="font-semibold">Completed Algebra Module</h3>
                <p className="text-gray-600">Score: 92% - Excellent understanding of concepts</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-600"></div>
              <div className="ml-4">
                <h3 className="font-semibold">Started Science Project</h3>
                <p className="text-gray-600">Topic: Renewable Energy Sources</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-600"></div>
              <div className="ml-4">
                <h3 className="font-semibold">Reading Challenge</h3>
                <p className="text-gray-600">Finished 3 books this month</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skill Development Card */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-xl font-semibold mb-4">Skill Development</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Critical Thinking</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Problem Solving</span>
                <span>78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Communication</span>
                <span>92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recommended Activities Card */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <h2 className="text-xl font-semibold mb-4">Recommended Activities</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Interactive Math Practice</h3>
              <p className="text-gray-600">Focus on geometry concepts</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Reading Challenge</h3>
              <p className="text-gray-600">Complete chapter 5 with comprehension</p>
            </div>
          </div>
        </motion.div>
      </div>


    </div>
  );
};

export default Page1;



