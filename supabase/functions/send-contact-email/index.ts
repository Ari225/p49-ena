import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

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

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["communication@p49-ena.ci"],
      subject: `Nouveau message de contact: ${subject}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Envoyé depuis le formulaire de contact du site web</small></p>
      `,
    });

    // Send confirmation email to user
    const confirmationEmailResponse = await resend.emails.send({
      from: "P49 Contact <onboarding@resend.dev>",
      to: [email],
      subject: "Confirmation - Votre message a bien été reçu",
      html: `
        <h2>Merci pour votre message, ${name}!</h2>
        <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
        <p><strong>Votre message:</strong></p>
        <p><em>${message.replace(/\n/g, '<br>')}</em></p>
        <p>Cordialement,<br>L'équipe P49</p>
      `,
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