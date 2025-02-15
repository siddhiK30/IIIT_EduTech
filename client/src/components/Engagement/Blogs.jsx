// import React from 'react'

// const Blogs = () => {
//     return (
//         <div className='h-screen'>
//             <h1 className='text-5xl pt-10 px-10 pb-4 font-bold font-serif border-b-8'>Read Your <span className='text-sky-800'>Personalised</span> Blogs</h1>
//         </div>
//     )
// }

// export default Blogs

import React, { useEffect, useState } from 'react';
import moduleName from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RightArrow from '../../assests/arrow-right-double-fill.png';
import axios from 'axios'
import {
    Paperclip,
    MapPin,
    Image,
    Share2,
    Smile,
    List,
    Settings,
    Camera,
    Download,
    Maximize
} from 'lucide-react';
import { postBlog } from '../../actions/projectActions';

// const blogData = [
//     {
//         title: "Understanding React",
//         createdAt: "2023-10-01",
//         author: "John Doe",
//         description: "A comprehensive guide to learning React.js and its ecosystem.",
//         keytopics: "React.js"
//     },
//     {
//         title: "Tailwind CSS Tips",
//         createdAt: "2023-09-15",
//         author: "Jane Smith",
//         description: "Enhance your UI with these Tailwind CSS tips and tricks.",
//         keytopics: "Tailwind CSS"
//     },
//     {
//         title: "JavaScript Best Practices",
//         createdAt: "2023-08-20",
//         author: "Alice Johnson",
//         description: "Improve your JavaScript code with these best practices.",
//         keytopics: "JavaScript"
//     },
//     {
//         title: "JavaScript Best Practices",
//         createdAt: "2023-08-20",
//         author: "Alice Johnson",
//         description: "Improve your JavaScript code with these best practices.",
//         keytopics: "JavaScript"
//     },
//     {
//         title: "JavaScript Best Practices",
//         createdAt: "2023-08-20",
//         author: "Alice Johnson",
//         description: "Improve your JavaScript code with these best practices.",
//         keytopics: "JavaScript"
//     },
//     {
//         title: "JavaScript Best Practices",
//         createdAt: "2023-08-20",
//         author: "Alice Johnson",
//         description: "Improve your JavaScript code with these best practices.",
//         keytopics: "JavaScript"
//     },
//     {
//         title: "JavaScript Best Practices",
//         createdAt: "2023-08-20",
//         author: "Alice Johnson",
//         description: "Improve your JavaScript code with these best practices.",
//         keytopics: "JavaScript"
//     },
//     {
//         title: "JavaScript Best Practices",
//         createdAt: "2023-08-20",
//         author: "Alice Johnson",
//         description: "Improve your JavaScript code with these best practices.",
//         keytopics: "JavaScript"
//     },
//     {
//         title: "JavaScript Best Practices",
//         createdAt: "2023-08-20",
//         author: "Alice Johnson",
//         description: "Improve your JavaScript code with these best practices.",
//         keytopics: "JavaScript"
//     }

// ];


const Blogs = () => {
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsPaused(scrollTop > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const [content, setContent] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    const [title,setTitle]=useState('');
    const [name, setName] = useState('')
    const [topics,setTopic]=useState('')
    const [blog,setBlog]=useState([])

    const dispatch=useDispatch()

    const blogPost = useSelector((state) => state.blogPost);
    const { loading, success, error } = blogPost;

    const handleFileUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.click();
    };

    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.click();
    };

    const handleCameraClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'user';
        input.click();
    };

    const handleDownload = () => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'blog-post.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handlePublish = () => {
        if (content.trim()) {
            const blogData = { title, author: name, keytopics: topics, content };
            dispatch(postBlog(blogData));
        } else {
            alert('Please write something before publishing!');
        }
    };

    const emojis = ['😊', '👍', '❤️', '🎉', '✨', '🔥', '💡', '📝'];

    useEffect(()=>{
        const fetchData = async () => {
            const response = await axios.get('http://127.0.0.1:8000/blog/');
            setBlog(response.data)
        }
        fetchData();
    },[])


    return (
        <div className='h-full'>
            <h1 className='text-5xl pt-10 px-10 pb-4 font-bold font-serif border-b-8 text-center'>
                Read Your <span className='text-sky-800'>Personalised</span> Blogs
            </h1>
            <div className='flex overflow-x-hidden mt-10 border-b-8 pb-8'>
                <Link to={"/blogDetail"} className={`flex h-[300px] space-x-5 ${isPaused ? 'animate-marquee' : 'animate-marquee'}`}>
                    {blog.map((blog, index) => (
                        <div key={index} className='min-w-[300px] bg-white shadow-lg rounded-lg p-5'>
                            <h2 className='text-2xl font-bold pb-3'>{blog.title}</h2>
                            <p className='text-sm text-gray-500 pb-2'>By {blog.author} on {blog.created_at}</p>
                            <p className='text-sm text-gray-500'>KeyTopics: {blog.keytopics}</p>
                            <p className='mt-2'>{blog.content}</p>
                            <div className='flex justify-end items-end'>
                                <img src={RightArrow} alt="" className='w-[40px] h-[40px]' />
                            </div>
                        </div>
                    ))}
                </Link>
            </div>
            <div>
                <div className='text-5xl font-bold font-serif text-center pt-4'><span className='text-sky-800'>POST</span> your own Blog</div>
                <div className='w-[50vw] mx-auto'>
                    <label for="first_name" class="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Your Name</label>
                    <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>

                <div className='w-[50vw] mx-auto mt-2'>
                    <label for="first_name" class="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Key Topics of your Blog</label>
                    <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="topics" required value={topics} onChange={(e)=>setTopic(e.target.value)}/>
                </div>
                <div className='w-[50vw] mx-auto mt-2'>
                    <label for="first_name" class="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Title of your blog</label>
                    <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>

                <div className='flex justify-center mt-2'>
                    <div className="w-[70vw] bg-white rounded-lg shadow-lg p-4">
                        <div className="flex items-center gap-3 mb-4 border-b pb-3">
                            <button onClick={handleFileUpload} className="p-2 hover:bg-gray-100 rounded-lg">
                                <Paperclip className="w-5 h-5 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <MapPin className="w-5 h-5 text-gray-600" />
                            </button>
                            <button onClick={handleImageUpload} className="p-2 hover:bg-gray-100 rounded-lg">
                                <Image className="w-5 h-5 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <Share2 className="w-5 h-5 text-gray-600" />
                            </button>
                            <div className="relative">
                                <button
                                    onClick={() => setShowEmoji(!showEmoji)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <Smile className="w-5 h-5 text-gray-600" />
                                </button>
                                {showEmoji && (
                                    <div className="absolute top-full left-0 mt-2 p-2 bg-white shadow-lg rounded-lg grid grid-cols-4 gap-2">
                                        {emojis.map((emoji, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    setContent(prev => prev + emoji);
                                                    setShowEmoji(false);
                                                }}
                                                className="p-2 hover:bg-gray-100 rounded-lg"
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="h-6 w-px bg-gray-300 mx-2"></div>
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <List className="w-5 h-5 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <Settings className="w-5 h-5 text-gray-600" />
                            </button>
                            <button onClick={handleCameraClick} className="p-2 hover:bg-gray-100 rounded-lg">
                                <Camera className="w-5 h-5 text-gray-600" />
                            </button>
                            <button onClick={handleDownload} className="p-2 hover:bg-gray-100 rounded-lg">
                                <Download className="w-5 h-5 text-gray-600" />
                            </button>
                            <button onClick={toggleFullscreen} className="ml-auto p-2 hover:bg-gray-100 rounded-lg">
                                {isFullscreen ?
                                    <Minimize className="w-5 h-5 text-gray-600" /> :
                                    <Maximize className="w-5 h-5 text-gray-600" />
                                }
                            </button>
                        </div>

                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-64 resize-none border-0 focus:ring-0 text-gray-700 placeholder-gray-400"
                            placeholder="Write an article..."
                        />

                        <div className="flex justify-start mt-4">
                            <button
                                onClick={handlePublish}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Publish post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Blogs;

