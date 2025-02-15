import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
    Paperclip, MapPin, Image, Share2, Smile, List, 
    Settings, Camera, Download, Maximize, Sparkles,
    Zap, ChevronRight, Moon, Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { postBlog } from '../../actions/projectActions';

const Blogs = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [content, setContent] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [topics, setTopic] = useState('');
    const [blog, setBlog] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeSection, setActiveSection] = useState('read');

    const dispatch = useDispatch();
    const blogPost = useSelector((state) => state.blogPost);
    const { loading, success, error } = blogPost;

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://127.0.0.1:8000/blog/');
            setBlog(response.data);
        };
        fetchData();
    }, []);

    const handlePublish = () => {
        if (content.trim()) {
            const blogData = { title, author: name, keytopics: topics, content };
            dispatch(postBlog(blogData));
        }
    };

    const emojis = ['😊', '👍', '❤️', '🎉', '✨', '🔥', '💡', '📝'];

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
            {/* Header */}
            <motion.div 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
                <div className="relative z-10 px-6 py-12 text-center">
                    <motion.h1 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="text-6xl font-bold text-white mb-4"
                    >
                        Blog<span className="text-yellow-300">Space</span>
                    </motion.h1>
                    <p className="text-xl text-gray-200">Where ideas come to life</p>
                </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 my-8">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveSection('read')}
                    className={`px-6 py-3 rounded-full ${activeSection === 'read' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                    Read Blogs
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveSection('write')}
                    className={`px-6 py-3 rounded-full ${activeSection === 'write' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                    Write Blog
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-3 rounded-full bg-gray-200"
                >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.button>
            </div>

            <AnimatePresence mode="wait">
                {activeSection === 'read' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="px-6 py-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blog.map((post, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    key={index}
                                    className={`p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ${
                                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                                    }`}
                                >
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                            {post.author[0]}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{post.author}</h3>
                                            <p className="text-sm text-gray-500">{post.created_at}</p>
                                        </div>
                                    </div>
                                    <h2 className="text-xl font-bold mb-3">{post.title}</h2>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">{post.content.substring(0, 150)}...</p>
                                    <div className="flex items-center justify-between">
                                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm">
                                            {post.keytopics}
                                        </span>
                                        <motion.button
                                            whileHover={{ scale: 1.1, x: 5 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="text-blue-600"
                                        >
                                            <ChevronRight />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeSection === 'write' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="max-w-4xl mx-auto px-6 py-4"
                    >
                        <div className={`rounded-xl shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg mb-4 bg-gray-100 focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Blog Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg mb-4 bg-gray-100 focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Topics (comma-separated)"
                                value={topics}
                                onChange={(e) => setTopic(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg mb-4 bg-gray-100 focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="flex flex-wrap gap-2 mb-4">
                                {[Paperclip, Image, Camera, Smile, Settings].map((Icon, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.button>
                                ))}
                            </div>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write your story..."
                                className="w-full h-64 p-4 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handlePublish}
                                className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold flex items-center gap-2"
                            >
                                <Sparkles className="w-5 h-5" />
                                Publish
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Blogs;