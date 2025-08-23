import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

    console.log("Sending reply email to:", to);

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

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-reply-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);