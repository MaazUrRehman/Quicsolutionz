import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import React, { useState } from 'react';
import {
    Mail, Phone, MessageSquare, Send, CheckCircle,
    FileText, Star, Shield, Clock, TrendingUp,
    Users, Package, ArrowRight, Briefcase,
    Globe, Award, ChevronRight, Zap, Sparkles,
    Check, AlertCircle, Target, DollarSign, Truck, HeadphonesIcon
} from 'lucide-react';

export default function RequestQuote() {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        fromEmail: '',
        subject: '',
        message: '',
        telephone: '',
    });

    const [activeField, setActiveField] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        post(route('sendDirectRequestQuote'), {
            preserveScroll: true,
            onSuccess: () => {
                setData({
                    fromEmail: '',
                    subject: '',
                    message: '',
                    telephone: '',
                });
            }
        });
    };

    const benefits = [
        { icon: Clock, text: "24-Hour Response", color: "orange", bg: "bg-orange-100" },
        { icon: Shield, text: "Best Price Guarantee", color: "green", bg: "bg-green-100" },
        { icon: Award, text: "Verified Suppliers", color: "purple", bg: "bg-purple-100" },
        { icon: Truck, text: "Global Shipping", color: "blue", bg: "bg-blue-100" }
    ];

    const tips = [
        { icon: Package, title: "Product Details", desc: "Include specific model numbers or requirements" },
        { icon: TrendingUp, title: "Quantity Needed", desc: "Volume affects pricing significantly" },
        { icon: DollarSign, title: "Target Price", desc: "Helps suppliers provide competitive offers" },
        { icon: Globe, title: "Location", desc: "Shipping costs vary by destination" }
    ];

    const testimonials = [
        { name: "Sarah Chen", company: "TechCorp Asia", rating: 5, comment: "Got 3 competitive quotes within 24 hours!" },
        { name: "Michael Rodriguez", company: "Global Imports LLC", rating: 5, comment: "Saved 30% on bulk orders through this platform" }
    ];

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Request Quote" />

                <div className="min-h-screen py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50">


                    {/* Main Content */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
                        <div className="grid lg:grid-cols-12 gap-8">
                            {/* Left Column - Form */}
                            <div className="lg:col-span-7">
                                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform hover:shadow-3xl transition-all duration-500">
                                    {/* Form Header with Gradient */}
                                    <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                                                    <FileText className="w-7 h-7 text-white" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold text-white">Request for Quotation</h2>
                                                    <p className="text-gray-300 text-sm mt-1">Fill in your requirements - All fields marked with * are required</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                                            <div className="w-1/3 h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
                                        </div>
                                    </div>

                                    <form onSubmit={submit} className="p-8 space-y-6">
                                        {/* Email Field */}
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Business Email <span className="text-orange-500">*</span>
                                            </label>
                                            <div className={`relative rounded-2xl border-2 transition-all duration-300 ${activeField === 'email'
                                                    ? 'border-orange-400 shadow-lg shadow-orange-100'
                                                    : errors.fromEmail
                                                        ? 'border-red-300 bg-red-50/50'
                                                        : 'border-gray-200 hover:border-orange-200'
                                                }`}>
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                                    <Mail className={`w-5 h-5 transition-colors duration-300 ${activeField === 'email' ? 'text-orange-500' : 'text-gray-400'
                                                        }`} />
                                                </div>
                                                <input
                                                    type="email"
                                                    value={data.fromEmail}
                                                    onChange={e => setData('fromEmail', e.target.value)}
                                                    onFocus={() => setActiveField('email')}
                                                    onBlur={() => setActiveField(null)}
                                                    placeholder="Enter your work email"
                                                    className="w-full bg-transparent pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                                                />
                                            </div>
                                            {errors.fromEmail && (
                                                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                    <AlertCircle className="w-4 h-4" />
                                                    {errors.fromEmail}
                                                </p>
                                            )}
                                        </div>

                                        {/* Subject Field */}
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Subject <span className="text-orange-500">*</span>
                                            </label>
                                            <div className={`relative rounded-2xl border-2 transition-all duration-300 ${activeField === 'subject'
                                                    ? 'border-orange-400 shadow-lg shadow-orange-100'
                                                    : errors.subject
                                                        ? 'border-red-300 bg-red-50/50'
                                                        : 'border-gray-200 hover:border-orange-200'
                                                }`}>
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                                    <MessageSquare className={`w-5 h-5 transition-colors duration-300 ${activeField === 'subject' ? 'text-orange-500' : 'text-gray-400'
                                                        }`} />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={data.subject}
                                                    onChange={e => setData('subject', e.target.value)}
                                                    onFocus={() => setActiveField('subject')}
                                                    onBlur={() => setActiveField(null)}
                                                    placeholder="e.g., Bulk order of office supplies"
                                                    className="w-full bg-transparent pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                                                />
                                            </div>
                                            {errors.subject && (
                                                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                    <AlertCircle className="w-4 h-4" />
                                                    {errors.subject}
                                                </p>
                                            )}
                                        </div>

                                        {/* Message Field */}
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Detailed Requirements <span className="text-orange-500">*</span>
                                            </label>
                                            <div className={`relative rounded-2xl border-2 transition-all duration-300 ${activeField === 'message'
                                                    ? 'border-orange-400 shadow-lg shadow-orange-100'
                                                    : errors.message
                                                        ? 'border-red-300 bg-red-50/50'
                                                        : 'border-gray-200 hover:border-orange-200'
                                                }`}>
                                                <textarea
                                                    rows={5}
                                                    value={data.message}
                                                    onChange={e => setData('message', e.target.value)}
                                                    onFocus={() => setActiveField('message')}
                                                    onBlur={() => setActiveField(null)}
                                                    placeholder="Please include:&#10;• Product specifications and quantities&#10;• Preferred timeline&#10;• Shipping destination&#10;• Quality requirements"
                                                    className="w-full bg-transparent px-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none resize-none"
                                                />
                                            </div>
                                            {errors.message && (
                                                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                    <AlertCircle className="w-4 h-4" />
                                                    {errors.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Telephone Field */}
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Phone Number <span className="text-gray-400 text-xs font-normal">(optional)</span>
                                            </label>
                                            <div className={`relative rounded-2xl border-2 transition-all duration-300 ${activeField === 'phone'
                                                    ? 'border-orange-400 shadow-lg shadow-orange-100'
                                                    : 'border-gray-200 hover:border-orange-200'
                                                }`}>
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                                    <Phone className={`w-5 h-5 transition-colors duration-300 ${activeField === 'phone' ? 'text-orange-500' : 'text-gray-400'
                                                        }`} />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={data.telephone}
                                                    onChange={e => setData('telephone', e.target.value)}
                                                    onFocus={() => setActiveField('phone')}
                                                    onBlur={() => setActiveField(null)}
                                                    placeholder="+1 (555) 000-0000"
                                                    className="w-full bg-transparent pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Success Message */}
                                        {recentlySuccessful && (
                                            <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-100 animate-slideDown">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-green-800 text-lg">Quote Request Sent!</h4>
                                                        <p className="text-green-600">Our team will respond within 24 hours</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-6 py-5 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 group relative overflow-hidden"
                                        >
                                            <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                            {processing ? (
                                                <span className="flex items-center justify-center gap-3">
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Processing Request...
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center gap-3">
                                                    Submit Quote Request
                                                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            )}
                                        </button>


                                    </form>
                                </div>
                            </div>

                            {/* Right Column - Enhanced Info Panel */}
                            <div className="lg:col-span-5 space-y-6">
                                {/* Quick Tips Card */}
                                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-2xl text-white">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center">
                                            <Zap className="w-6 h-6 text-orange-400" />
                                        </div>
                                        <h3 className="text-xl font-bold">Pro Tips for Best Quotes</h3>
                                    </div>

                                    <div className="space-y-4">
                                        {tips.map((tip, index) => (
                                            <div key={index} className="flex gap-3 group hover:bg-white/5 p-3 rounded-xl transition-all">
                                                <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                                                    <tip.icon className="w-5 h-5 text-orange-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-white mb-1">{tip.title}</h4>
                                                    <p className="text-sm text-gray-300">{tip.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA Card */}
                                <div className="bg-white rounded-3xl p-6 shadow-xl border border-orange-100 text-gray-900 relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-shadow duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    <div className="relative">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                                                <HeadphonesIcon className="w-6 h-6 text-orange-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg text-gray-900">Need Immediate Help?</h4>
                                                <p className="text-orange-600 text-sm">Our procurement experts are here</p>
                                            </div>
                                        </div>
                                        <a className="flex items-center justify-between rounded-xl px-4 py-3 border border-orange-200 hover:bg-orange-100 transition-colors ">
                                            <span className="font-semibold text-orange-600">+13038006160</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>
            </AuthenticatedLayout>
            <Footer />
        </>
    );
}