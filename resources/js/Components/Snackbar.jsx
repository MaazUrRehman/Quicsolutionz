import { useEffect, useState } from 'react';

export default function SnackBar({ 
    message, 
    type = 'success', 
    duration = 1000,
    onClose, 
    isVisible 
}) {
    const [show, setShow] = useState(false);
    const [progress, setProgress] = useState(100); // Start from 100% and decrease to 0%

    useEffect(() => {
        if (isVisible) {
            setShow(true);
            setProgress(100); // Reset progress when snackbar becomes visible
            
            // Progress animation
            const progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev <= 0) {
                        clearInterval(progressInterval);
                        return 0;
                    }
                    return prev - (100 / (duration / 50)); // Update every 50ms
                });
            }, 50);

            const timer = setTimeout(() => {
                setShow(false);
                setTimeout(() => onClose?.(), 300);
            }, duration);

            return () => {
                clearTimeout(timer);
                clearInterval(progressInterval);
            };
        }
    }, [isVisible, duration, onClose]);

    if (!show) return null;

    const typeStyles = {
        success: {
            container: 'bg-white border-[#F37D2F] shadow-lg',
            icon: 'text-[#F37D2F]',
            text: 'text-gray-900',
            title: 'text-[#F37D2F] font-bold',
            progress: 'bg-[#F37D2F]'
        },
        error: {
            container: 'bg-white border-red-500 shadow-lg',
            icon: 'text-red-500',
            text: 'text-gray-800',
            title: 'text-red-600 font-bold',
            progress: 'bg-red-500'
        },
        warning: {
            container: 'bg-white border-yellow-500 shadow-lg',
            icon: 'text-yellow-500',
            text: 'text-gray-800',
            title: 'text-yellow-600 font-bold',
            progress: 'bg-yellow-500'
        },
        info: {
            container: 'bg-white border-blue-500 shadow-lg',
            icon: 'text-blue-500',
            text: 'text-gray-800',
            title: 'text-blue-600 font-bold',
            progress: 'bg-blue-500'
        },
    };

    const icons = {
        success: (
            <div className="p-2 bg-orange-50 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </div>
        ),
        error: (
            <div className="p-2 bg-red-50 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
        ),
        warning: (
            <div className="p-2 bg-yellow-50 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </div>
        ),
        info: (
            <div className="p-2 bg-blue-50 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
            </div>
        ),
    };

    const titles = {
        success: 'Success!',
        error: 'Error!',
        warning: 'Warning!',
        info: 'Info'
    };

    const currentStyle = typeStyles[type];

    return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
        <div className='absolute top-6 right-0 pointer-events-auto'>
            <div 
                className={`
                    relative flex items-start gap-4 p-6 rounded-lg border-l-4
                    min-w-96 max-w-md shadow-xl
                    transform transition-all duration-300 ease-in-out
                    ${currentStyle.container}
                    ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
                `}
            >
                {/* Icon */}
                <div className={`flex-shrink-0 mt-1 ${currentStyle.icon}`}>
                    {icons[type]}
                </div>
                
                {/* Content */}
                <div className="flex-1">
                    {/* Title and Message */}
                    <div className="mb-3">
                        <h3 className={`text-lg mb-1 ${currentStyle.title}`}>
                            {titles[type]}
                        </h3>
                        <p className={`text-sm leading-relaxed ${currentStyle.text}`}>
                            {message}
                        </p>
                    </div>

                    {/* Progress Loader */}
                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div 
                            className={`h-1.5 rounded-full transition-all duration-100 ease-out ${currentStyle.progress}`}
                            style={{ 
                                width: `${progress}%`,
                            }}
                        />
                    </div>
                </div>
                
                {/* Close Button */}
                <button
                    onClick={() => {
                        setShow(false);
                        setTimeout(() => onClose?.(), 300);
                    }}
                    className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F37D2F] focus:ring-offset-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
        
    </div>
);
}