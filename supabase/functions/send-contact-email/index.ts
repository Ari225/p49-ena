import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";
import React from 'npm:react@18.3.1';
import { renderAsync } from 'npm:@react-email/components@0.0.22';
import { ContactEmail } from './_templates/contact-email.tsx';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactEmailRequest = await req.json();

    console.log("Sending contact email:", { name, email, subject });

    // Render admin email template
    const adminEmailHtml = await renderAsync(
      React.createElement(ContactEmail, {
        name,
        email,
        subject,
        message,
        isConfirmation: false,
      })
    );

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "P49 Contact <onboarding@resend.dev>",
      to: ["communication@p49-ena.ci"],
      subject: `Nouveau message de contact: ${subject}`,
      html: adminEmailHtml,
    });

    // Render confirmation email template
    const confirmationEmailHtml = await renderAsync(
      React.createElement(ContactEmail, {
        name,
        email,
        subject,
        message,
        isConfirmation: true,
      })
    );

    // Send confirmation email to user
    const confirmationEmailResponse = await resend.emails.send({
      from: "P49 Contact <onboarding@resend.dev>",
      to: [email],
      subject: "Confirmation - Votre message a bien été reçu",
      html: confirmationEmailHtml,
    });

    console.log("Emails sent successfully:", { adminEmailResponse, confirmationEmailResponse });

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Emails envoyés avec succès"
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);