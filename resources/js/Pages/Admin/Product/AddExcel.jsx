import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import SnackBar from '@/Components/SnackBar';
import { useState, useEffect } from 'react';

export default function AddExcel() {
    const { data, setData, post, processing, errors } = useForm({
        excel_file: null,
    });
    
    const pageProps = usePage().props;
    const flash = pageProps.flash || {}; 
    
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState('success');

    useEffect(() => {
        if (flash.success) {
            setSnackbarMessage(flash.success);
            setSnackbarType('success');
            setShowSnackbar(true);
        }
        if (flash.error) {
            setSnackbarMessage(flash.error);
            setSnackbarType('error');
            setShowSnackbar(true);
        }
        if (flash.warning) {
            setSnackbarMessage(flash.warning);
            setSnackbarType('warning');
            setShowSnackbar(true);
        }
        if (flash.info) {
            setSnackbarMessage(flash.info);
            setSnackbarType('info');
            setShowSnackbar(true);
        }
    }, [flash]);

    // Handle file upload errors from form
    useEffect(() => {
        if (errors && errors.excel_file) {
            setSnackbarMessage(errors.excel_file);
            setSnackbarType('error');
            setShowSnackbar(true);
        }
    }, [errors]);

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('excel_file', data.excel_file);

        post(route('products.import'), {
            data: formData,
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                // Reset file input after successful upload
                setData('excel_file', null);
                // Reset file input element
                const fileInput = document.querySelector('input[type="file"]');
                if (fileInput) {
                    fileInput.value = '';
                }
            },
            onError: (errors) => {
                if (errors && errors.excel_file) {
                    setSnackbarMessage(errors.excel_file);
                    setSnackbarType('error');
                    setShowSnackbar(true);
                }
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Import Products" />

            {/* Your SnackBar Component */}
            <SnackBar
                message={snackbarMessage}
                type={snackbarType}
                duration={5000}
                isVisible={showSnackbar}
                onClose={() => setShowSnackbar(false)}
            />

            <div className="max-w-xl mx-auto py-12">
                <h1 className="text-2xl font-bold mb-4 text-gray-900">Import Excel File</h1>

                <form onSubmit={submit} className="bg-white p-6 rounded-lg shadow border border-gray-200 space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Select Excel File
                        </label>
                        <input
                            type="file"
                            accept=".xlsx,.xls,.csv"
                            onChange={e => setData('excel_file', e.target.files[0])}
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-medium
                                file:bg-gradient-to-r file:from-[#F37D2F] file:to-[#FF9C4D] file:text-white
                                hover:file:from-[#E56D1F] hover:file:to-[#FF8B3D] cursor-pointer"
                        />
                        {data.excel_file && (
                            <p className="text-sm text-gray-600 mt-2">
                                Selected file: <span className="font-medium">{data.excel_file.name}</span>
                            </p>
                        )}
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                        <Link 
                            href={route('products.index')} 
                            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#F37D2F] focus:ring-offset-2 rounded-md p-2"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Products
                        </Link>

                        <button
                            type="submit"
                            disabled={processing || !data.excel_file}
                            className={`
                                inline-flex items-center px-6 py-3 rounded-md font-medium
                                transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F37D2F] focus:ring-offset-2
                                ${processing || !data.excel_file
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-[#F37D2F] to-[#FF9C4D] hover:from-[#E56D1F] hover:to-[#FF8B3D] text-white shadow-md hover:shadow transform hover:scale-[1.02]'
                                }
                            `}
                        >
                            {processing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    Import Products
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Instructions */}
                <div className="mt-8 p-6 bg-orange-50 border border-orange-100 rounded-lg">
                    <h3 className="text-lg font-semibold text-orange-800 mb-2">Instructions:</h3>
                    <ul className="text-sm text-orange-700 space-y-1">
                        <li>• Supported formats: .xlsx, .xls, .csv</li>
                        <li>• Make sure your file has proper column headers</li>
                        <li>• Maximum file size: 10MB</li>
                        <li>• You'll receive a confirmation when import is complete</li>
                        <li>• Don't import already uploaded file</li>
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}




















// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head, useForm, Link, usePage } from '@inertiajs/react';
// import SnackBar from '@/Components/SnackBar';
// import { useState, useEffect } from 'react';

// export default function AddExcel() {
//     const { data, setData, post, processing, errors } = useForm({
//         excel_file: null,
//     });
    
//     const { props } = usePage();
//     const flash = props.flash || {};
    
//     const [showSnackbar, setShowSnackbar] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarType, setSnackbarType] = useState('success');
//     const [importErrors, setImportErrors] = useState([]);
//     const [showErrorDetails, setShowErrorDetails] = useState(false);

//     // Handle ALL flash messages including errors (column mismatch, empty file, etc.)
//     useEffect(() => {
//         // Import row errors
//         const errorsList = props.import_errors || flash.import_errors;
//         if (errorsList && errorsList.length > 0) {
//             setImportErrors(errorsList);
//             setSnackbarMessage(`${errorsList.length} rows failed to import. Click for details.`);
//             setSnackbarType('error');
//             setShowSnackbar(true);
//             setShowErrorDetails(true);
//         }

//         // Success messages
//         if (flash.success) {
//             setSnackbarMessage(flash.success);
//             setSnackbarType('success');
//             setShowSnackbar(true);
//         }
        
//         // All error types (column mismatch, empty file, general errors)
//         if (flash.error) {
//             setSnackbarMessage(flash.error);
//             setSnackbarType('error');
//             setShowSnackbar(true);
//         }
        
//         if (flash.warning) {
//             setSnackbarMessage(flash.warning);
//             setSnackbarType('warning');
//             setShowSnackbar(true);
//         }
        
//         if (flash.info) {
//             setSnackbarMessage(flash.info);
//             setSnackbarType('info');
//             setShowSnackbar(true);
//         }
//     }, [flash, props.import_errors]);

//     // Handle file upload validation errors
//     useEffect(() => {
//         if (errors && errors.excel_file) {
//             setSnackbarMessage(errors.excel_file);
//             setSnackbarType('error');
//             setShowSnackbar(true);
//         }
//     }, [errors]);

//     const submit = (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('excel_file', data.excel_file);

//         // Reset states before new import
//         setImportErrors([]);
//         setShowErrorDetails(false);
//         setShowSnackbar(false);

//         post(route('products.import'), {
//             data: formData,
//             forceFormData: true,
//             preserveScroll: true,
//             onSuccess: () => {
//                 setData('excel_file', null);
//                 const fileInput = document.querySelector('input[type="file"]');
//                 if (fileInput) {
//                     fileInput.value = '';
//                 }
//             },
//             onError: (errors) => {
//                 if (errors && errors.excel_file) {
//                     setSnackbarMessage(errors.excel_file);
//                     setSnackbarType('error');
//                     setShowSnackbar(true);
//                 }
//             }
//         });
//     };

//     const handleCloseErrorDetails = () => {
//         setShowErrorDetails(false);
//         setTimeout(() => setImportErrors([]), 300);
//     };

//     return (
//         <AuthenticatedLayout>
//             <Head title="Import Products" />

//             {/* SnackBar - Shows ALL errors now */}
//             <SnackBar
//                 message={snackbarMessage}
//                 type={snackbarType}
//                 duration={8000}
//                 isVisible={showSnackbar}
//                 onClose={() => setShowSnackbar(false)}
//             />

//             {/* Error Details Modal */}
//             {showErrorDetails && importErrors.length > 0 && (
//                 <div className="fixed inset-0 z-[9998] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
//                     <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//                         <div 
//                             className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
//                             aria-hidden="true"
//                             onClick={handleCloseErrorDetails}
//                         />
//                         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
//                             <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                                 <div className="sm:flex sm:items-start">
//                                     <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
//                                         <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                                         </svg>
//                                     </div>
//                                     <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
//                                         <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
//                                             Import Errors ({importErrors.length})
//                                         </h3>
//                                         <div className="mt-4">
//                                             <div className="bg-red-50 rounded-lg p-4 max-h-96 overflow-y-auto">
//                                                 <ul className="list-disc list-inside space-y-2 text-sm">
//                                                     {importErrors.map((error, index) => (
//                                                         <li key={index} className="text-red-700">
//                                                             {error}
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             </div>
//                                             <p className="mt-4 text-sm text-gray-500">
//                                                 Please fix these errors and try importing again.
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                                 <button
//                                     type="button"
//                                     onClick={handleCloseErrorDetails}
//                                     className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F37D2F] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                                 >
//                                     Close
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <div className="max-w-xl mx-auto py-12">
//                 <h1 className="text-2xl font-bold mb-4 text-gray-900">Import Excel File</h1>

//                 <form onSubmit={submit} className="bg-white p-6 rounded-lg shadow border border-gray-200 space-y-6">
//                     <div className="space-y-2">
//                         <label className="block text-sm font-medium text-gray-700">
//                             Select Excel File
//                         </label>
//                         <input
//                             type="file"
//                             accept=".xlsx,.xls,.csv"
//                             onChange={e => setData('excel_file', e.target.files[0])}
//                             className="block w-full text-sm text-gray-500
//                                 file:mr-4 file:py-2 file:px-4
//                                 file:rounded-md file:border-0
//                                 file:text-sm file:font-medium
//                                 file:bg-gradient-to-r file:from-[#F37D2F] file:to-[#FF9C4D] file:text-white
//                                 hover:file:from-[#E56D1F] hover:file:to-[#FF8B3D] cursor-pointer"
//                         />
//                         {data.excel_file && (
//                             <p className="text-sm text-gray-600 mt-2">
//                                 Selected file: <span className="font-medium">{data.excel_file.name}</span>
//                             </p>
//                         )}
//                     </div>

//                     <div className="flex justify-between items-center pt-6 border-t border-gray-200">
//                         <Link 
//                             href={route('products.index')} 
//                             className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#F37D2F] focus:ring-offset-2 rounded-md p-2"
//                         >
//                             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                             </svg>
//                             Back to Products
//                         </Link>

//                         <button
//                             type="submit"
//                             disabled={processing || !data.excel_file}
//                             className={`
//                                 inline-flex items-center px-6 py-3 rounded-md font-medium
//                                 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F37D2F] focus:ring-offset-2
//                                 ${processing || !data.excel_file
//                                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                                     : 'bg-gradient-to-r from-[#F37D2F] to-[#FF9C4D] hover:from-[#E56D1F] hover:to-[#FF8B3D] text-white shadow-md hover:shadow transform hover:scale-[1.02]'
//                                 }
//                             `}
//                         >
//                             {processing ? (
//                                 <>
//                                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                     </svg>
//                                     Uploading...
//                                 </>
//                             ) : (
//                                 <>
//                                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                                     </svg>
//                                     Import Products
//                                 </>
//                             )}
//                         </button>
//                     </div>
//                 </form>

//                 {/* Instructions */}
//                 <div className="mt-8 p-6 bg-orange-50 border border-orange-100 rounded-lg">
//                     <h3 className="text-lg font-semibold text-orange-800 mb-2">Instructions:</h3>
//                     <ul className="text-sm text-orange-700 space-y-1">
//                         <li>• Supported formats: .xlsx, .xls, .csv</li>
//                         <li>• Required: Product Name, Manufacturer Name, Category, Condition, Part Number</li>
//                         <li>• Part numbers must be unique</li>
//                         <li>• Column headers are flexible (e.g., "price" or "product_price")</li>
//                         <li>• You'll see detailed errors for failed rows</li>
//                     </ul>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }
