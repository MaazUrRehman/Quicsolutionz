<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Quote Request - {{ config('app.name', 'QuicSolutionz') }}</title>

    <style>
        body {
            font-family: 'Poppins', sans-serif;
            background: #f8f9fa;
            margin: 0;
            padding: 20px;
        }

        .email-container {
            max-width: 750px;
            margin: 0 auto;
            background: #ffffff;
            border: 1px solid #e6e6e6;
            border-radius: 10px;
            overflow: hidden;
        }

        .email-header {
            background: #000000;
            color: #ffffff;
            padding: 30px;
            text-align: center;
            border-bottom: 1px solid #e6e6e6;
        }

        .email-header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }

        .email-header p {
            margin-top: 8px;
            font-size: 14px;
            opacity: 0.9;
        }

        .email-content {
            padding: 30px;
        }

        .section {
            margin-bottom: 30px;
        }

        .section-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e6e6e6;
            color: #000;
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
            gap: 15px;
        }

        .info-item {
            background: #fafafa;
            padding: 15px;
            border: 1px solid #eaeaea;
            border-radius: 6px;
        }

        .info-label {
            font-size: 12px;
            font-weight: 600;
            color: #555;
            margin-bottom: 4px;
        }

        .info-value {
            font-size: 14px;
            font-weight: 500;
            color: #000;
        }

        .message-box {
            background: #f5f5f5;
            padding: 20px;
            border-radius: 6px;
            border: 1px solid #eaeaea;
        }

        .message-content {
            margin-top: 10px;
            white-space: pre-wrap;
            color: #333;
            line-height: 1.5;
        }

        .footer {
            background: #000000;
            padding: 25px;
            text-align: center;
            color: #ffffff;
            margin-top: 20px;
            font-size: 13px;
        }

        .footer p {
            margin: 6px 0;
            opacity: 0.8;
        }
    </style>
</head>
<body>

<div class="email-container">

    <!-- Header -->
    <div class="email-header">
        <h1>New Quote Request</h1>
        <p>A customer has submitted a quote request</p>
    </div>

    <!-- Content -->
    <div class="email-content">

        <!-- Sender Info -->
        <div class="section">
            <h2 class="section-title">Customer Information</h2>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Email Address</div>
                    <div class="info-value">{{ $data['fromEmail'] }}</div>
                </div>

                @if(!empty($data['telephone']))
                <div class="info-item">
                    <div class="info-label">Telephone</div>
                    <div class="info-value">{{ $data['telephone'] }}</div>
                </div>
                @endif
            </div>
        </div>

        <!-- Product Details - Only show if product name exists -->
        @if(!empty($data['product_name']))
        <div class="section">
            <h2 class="section-title">Product Details</h2>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Product Name</div>
                    <div class="info-value">{{ $data['product_name'] }}</div>
                </div>

                @if(!empty($data['manufacturer-name']))
                <div class="info-item">
                    <div class="info-label">Manufacturer</div>
                    <div class="info-value">{{ $data['manufacturer-name'] }}</div>
                </div>
                @endif

                @if(!empty($data['model_number']))
                <div class="info-item">
                    <div class="info-label">Model Number</div>
                    <div class="info-value">{{ $data['model_number'] }}</div>
                </div>
                @endif

                @if(!empty($data['part_number']))
                <div class="info-item">
                    <div class="info-label">Part Number</div>
                    <div class="info-value">{{ $data['part_number'] }}</div>
                </div>
                @endif
            </div>
        </div>
        @endif

        <!-- Message -->
        <div class="section">
            <h2 class="section-title">Customer Inquiry</h2>
            <div class="message-box">
                <div class="info-label">Subject</div>
                <strong>{{ $data['subject'] }}</strong>

                <div class="message-content">
                    {{ $data['message'] }}
                </div>
            </div>
        </div>

    </div>

    <!-- Footer -->
    <div class="footer">
        <p>This message was sent from {{ config('app.name', 'QuicSol') }}</p>
        <p>&copy; {{ date('Y') }} {{ config('app.name', 'QuicSol') }} • All rights reserved.</p>
    </div>

</div>

</body>
</html>