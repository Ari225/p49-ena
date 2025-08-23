import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface ContactEmailProps {
  name: string
  email: string
  subject: string
  message: string
  isConfirmation?: boolean
}

export const ContactEmail = ({
  name,
  email,
  subject,
  message,
  isConfirmation = false,
}: ContactEmailProps) => {
  const logoUrl = "https://acxjwosgugimmhfwdhks.supabase.co/storage/v1/object/public/media-files/logo-p49.png"

  if (isConfirmation) {
    return (
      <Html>
        <Head />
        <Preview>Confirmation - Votre message a bien été reçu</Preview>
        <Body style={main}>
          <Container style={container}>
            <Section style={header}>
              <Img
                src={logoUrl}
                width="120"
                height="60"
                alt="Logo P49"
                style={logo}
              />
            </Section>
            <Heading style={h1}>Merci pour votre message, {name}!</Heading>
            <Text style={text}>
              Nous avons bien reçu votre message concernant "{subject}" et nous vous répondrons dans les plus brefs délais.
            </Text>
            <Section style={messageSection}>
              <Text style={messageLabel}>Votre message :</Text>
              <Text style={messageContent}>{message}</Text>
            </Section>
            <Text style={text}>
              Cordialement,<br />
              L'équipe P49
            </Text>
            <Section style={footer}>
              <Text style={footerText}>
                Association P49 - École Nationale d'Administration
              </Text>
              <Text style={footerText}>
                Email : communication@p49-ena.ci
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    )
  }

  return (
    <Html>
      <Head />
      <Preview>Nouveau message de contact de {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Img
              src={logoUrl}
              width="120"
              height="60"
              alt="Logo P49"
              style={logo}
            />
          </Section>
          <Heading style={h1}>Nouveau message de contact</Heading>
          <Section style={infoSection}>
            <Text style={infoLabel}>Nom :</Text>
            <Text style={infoValue}>{name}</Text>
          </Section>
          <Section style={infoSection}>
            <Text style={infoLabel}>Email :</Text>
            <Text style={infoValue}>{email}</Text>
          </Section>
          <Section style={infoSection}>
            <Text style={infoLabel}>Sujet :</Text>
            <Text style={infoValue}>{subject}</Text>
          </Section>
          <Section style={messageSection}>
            <Text style={messageLabel}>Message :</Text>
            <Text style={messageContent}>{message}</Text>
          </Section>
          <Section style={footer}>
            <Text style={footerSmall}>
              Envoyé depuis le formulaire de contact du site web P49
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default ContactEmail

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  borderRadius: '8px',
  margin: '40px auto',
  padding: '40px',
  width: '600px',
}

const header = {
  textAlign: 'center' as const,
  marginBottom: '32px',
  paddingBottom: '20px',
  borderBottom: '2px solid #f0f0f0',
}

const logo = {
  margin: '0 auto',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 24px 0',
  textAlign: 'center' as const,
}

const text = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
}

const infoSection = {
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'flex-start',
}

const infoLabel = {
  color: '#666',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0',
  minWidth: '80px',
}

const infoValue = {
  color: '#333',
  fontSize: '14px',
  margin: '0',
}

const messageSection = {
  backgroundColor: '#f8f9fa',
  borderRadius: '6px',
  padding: '20px',
  margin: '24px 0',
}

const messageLabel = {
  color: '#666',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
}

const messageContent = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
  whiteSpace: 'pre-line' as const,
}

const footer = {
  borderTop: '1px solid #f0f0f0',
  marginTop: '32px',
  paddingTop: '20px',
  textAlign: 'center' as const,
}

const footerText = {
  color: '#666',
  fontSize: '14px',
  margin: '4px 0',
}

const footerSmall = {
  color: '#999',
  fontSize: '12px',
  margin: '0',
}