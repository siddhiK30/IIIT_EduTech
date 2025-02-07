import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';

const Page2 = () => {
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

      {/* Box 3 with Insights Animation */}
      <motion.div
        className='px-10 pt-7'
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <div className='w-full h-[45vh] border border-gray-400 rounded-2xl shadow-2xl bg-white p-6'>
          <h3 className='text-xl font-semibold mb-4'>Insights for Improvement</h3>
          <ul className='list-disc list-inside space-y-2'>
            <li>Focus on improving concepts in Physics for better performance.</li>
            <li>Maintain consistency in Biology to sustain recent progress.</li>
            <li>Work on time management during exams for Maths and Chemistry.</li>
            <li>Leverage additional resources for Marathi vocabulary improvement.</li>
            <li>Participate in group discussions to enhance understanding of core topics.</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Page2;
