import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReplyEmailRequest {
  to: string;
  subject: string;
  replyMessage: string;
  originalMessage: string;
  senderName: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, replyMessage, originalMessage, senderName }: ReplyEmailRequest = await req.json();

    console.log("=== DEBUG INFO ===");
    console.log("Sending reply email to:", to);
    console.log("RESEND_API_KEY configured:", !!Deno.env.get("RESEND_API_KEY"));
    console.log("RESEND_API_KEY length:", Deno.env.get("RESEND_API_KEY")?.length || 0);

    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.error("RESEND_API_KEY not found in environment");
      return new Response(
        JSON.stringify({ 
          error: "Configuration error: RESEND_API_KEY not configured",
          debug: "Please add your Resend API key in the Supabase secrets"
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const resend = new Resend(apiKey);

    console.log("Attempting to send email...");
    const emailResponse = await resend.emails.send({
      from: "P49 <onboarding@resend.dev>",
      to: [to],
      subject: `Re: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Réponse à votre message - P49</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Notre réponse :</h3>
            <p style="color: #374151; line-height: 1.6;">${replyMessage}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px;">
            <h4 style="color: #6b7280; margin-top: 0; font-size: 14px;">Votre message original :</h4>
            <p style="color: #6b7280; font-size: 14px; line-height: 1.5;">${originalMessage}</p>
            <p style="color: #6b7280; font-size: 12px; margin-bottom: 0;"><strong>Envoyé par :</strong> ${senderName}</p>
          </div>
          
          <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #6b7280;">
            <p>Cordialement,<br>L'équipe P49</p>
          </div>
        </div>
      `,
    });

    console.log("Email response:", emailResponse);

    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      return new Response(
        JSON.stringify({ 
          error: `Email send failed: ${emailResponse.error.message}`,
          details: emailResponse.error
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Email sent successfully with ID:", emailResponse.data?.id);

    return new Response(JSON.stringify({
      success: true,
      emailId: emailResponse.data?.id,
      message: "Email sent successfully"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("=== CRITICAL ERROR ===");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    
    return new Response(
      JSON.stringify({ 
        error: `Server error: ${error.message}`,
        type: error.constructor.name,
        details: error.stack || 'No stack trace available'
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);