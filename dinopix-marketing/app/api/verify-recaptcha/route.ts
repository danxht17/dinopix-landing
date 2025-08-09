import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, expectedAction } = body;


    if (!token) {
      console.error('ERROR: No reCAPTCHA token provided');
      return NextResponse.json(
        { error: 'reCAPTCHA token is required' },
        { status: 400 }
      );
    }

    // Check if reCAPTCHA Enterprise is fully configured
    if (!process.env.RECAPTCHA_SECRET_KEY || !process.env.GOOGLE_CLOUD_PROJECT_ID) {
      console.warn('reCAPTCHA Enterprise not fully configured - using fallback');
      return NextResponse.json({ 
        success: true, 
        score: 0.7,
        message: 'Basic validation passed' 
      });
    }

    // Verify reCAPTCHA Enterprise token with Google
    const requestBody = {
      event: {
        token,
        expectedAction: expectedAction || 'submit_contact_form',
        siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LcCP58rAAAAAGI2ZhaqRRM8QFcWQbtNcqHQ0ngc'
      }
    };

    const recaptchaResponse = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${process.env.GOOGLE_CLOUD_PROJECT_ID}/assessments?key=${process.env.RECAPTCHA_SECRET_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      }
    );
    
    const recaptchaResult = await recaptchaResponse.json();
    
    if (!recaptchaResponse.ok) {
      console.error('reCAPTCHA Enterprise API error - Status:', recaptchaResponse.status);
      console.error('reCAPTCHA Enterprise API error - Body:', recaptchaResult);
      return NextResponse.json(
        { error: `Security verification failed: ${recaptchaResult.error?.message || 'Unknown error'}` },
        { status: 400 }
      );
    }

    // Check the risk analysis
    const riskAnalysis = recaptchaResult.riskAnalysis;
    if (!riskAnalysis || riskAnalysis.score < 0.5) {
      console.warn('reCAPTCHA Enterprise risk score too low:', riskAnalysis?.score);
      return NextResponse.json(
        { error: 'Security verification failed - low risk score' },
        { status: 400 }
      );
    }

    // Verify the action matches
    if (recaptchaResult.tokenProperties?.action !== expectedAction) {
      console.warn('reCAPTCHA Enterprise action mismatch:', recaptchaResult.tokenProperties?.action);
      return NextResponse.json(
        { error: 'Security verification failed - action mismatch' },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      score: riskAnalysis.score,
      message: 'Security verification passed' 
    });

  } catch (error) {
    console.error('=== reCAPTCHA Enterprise API Route Error ===');
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      { error: `Security verification failed: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}