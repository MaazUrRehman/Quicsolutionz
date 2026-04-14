<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\RequestQuoteMail;

class MailController extends Controller
{
    function sendDirectRequestQuote(Request $request){
        
        $to="maazurrehman468@gmail.com";

        $validated = $request->validate([
            'fromEmail' => 'required|email',
            'telephone' => 'required|numeric',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        
        Mail::to($to)->send(new RequestQuoteMail($validated));
        return back()->with('success', 'Quote request sent successfully!');
    }


    function sendProductRequestQuote(Request $request){
        
        $to = "maazurrehman468@gmail.com";

        $validated = $request->validate([
            'fromEmail' => 'required|email',
            'telephone' => 'required|string|max:20', // Changed from numeric to string
            'productName' => 'required|string|max:255',
            'manufacturerName' => 'required|string|max:255',
            'modelNo' => 'required|string|max:255',
            'partNo' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        try {
            Mail::to($to)->send(new RequestQuoteMail($validated));
            return back()->with('success', 'Quote request sent successfully!');
        } catch (\Exception $e) {
            \Log::error('Email sending failed: ' . $e->getMessage());
            return back()->with('error', 'Failed to send quote request. Please try again.');
        }
    }

}
