
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AboutOurCompany from '@/Components/AboutOurCompany';
import MissionAndVision from '@/Components/MissionAndVision';
import CompanyDetails from '@/Components/CompanyDetails';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import React from 'react';
import AboutHero from '@/Components/AboutHero';

export default function About() {
    return (
        <>
            <AuthenticatedLayout>
                <Head title="About-Us" />
                
                <AboutHero />

                {/* About Our Company Section */}
                <AboutOurCompany />
                
                {/* Mission & Vision Section */}
                <MissionAndVision />
                
                {/* Company Details Section */}
                <CompanyDetails />

            </AuthenticatedLayout>
            <Footer />
        </>
    );
}