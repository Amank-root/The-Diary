import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface VerificationEmailProps {
  url: string;
  name: string;
}

const VerificationEmailTemplate = ({ url, name }: VerificationEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Preview>Verify your email address to get started</Preview>
          <Container className="bg-white mx-auto my-[40px] px-[20px] py-[40px] rounded-[8px] shadow-sm max-w-[560px]">
            {/* Header Section */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[28px] font-bold text-gray-900 mb-[8px] m-0">
                Welcome, {name}!
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                Please verify your email address to complete your registration
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px] m-0">
                Thank you for signing up! We&apos;re excited to have you on
                board. To ensure the security of your account and enable all
                features, please verify your email address by clicking the
                button below.
              </Text>

              {/* Verification Button */}
              <Section className="text-center mb-[32px]">
                <Button
                  href={url}
                  className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border hover:bg-blue-700"
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 leading-[20px] m-0">
                This verification link will expire in 24 hours. If you
                didn&apos;t create an account, you can safely ignore this email.
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[32px]" />

            {/* Alternative Link Section */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 mb-[16px] m-0">
                If the button above doesn&apos;t work, you can also verify your
                email by copying and pasting this link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 break-all m-0">
                {url}
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                This email was sent to you because you signed up for an account.
                If you have any questions, please contact our support team.
              </Text>
              <Text className="text-[12px] text-gray-500 mt-[16px] m-0">
                © {new Date().getFullYear()} The Diary. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// VerificationEmailTemplate.PreviewProps = {
//   url: "https://example.com/verify-email?token=abc123xyz789",
//   name: "Brett",
// };

export default VerificationEmailTemplate;

// import React from "react";
// import {
//   Body,
//   Container,
//   Head,
//   Heading,
//   Hr,
//   Html,
//   Link,
//   Preview,
//   Section,
//   Text,
// } from "@react-email/components";

// interface VerificationEmailProps {
//   url: string;
//   name: string;
// }

// export const VerificationEmailTemplate = ({
//   url,
//   name,
// }: VerificationEmailProps) => {
//   return (
//     <Html>
//       <Head />
//       <Body style={main}>
//         <Preview>Verify your Email with Better Auth</Preview>
//         <Container style={container}>
//           <Heading style={heading}>Hi {name}!</Heading>
//           <Section style={buttonContainer}></Section>
//           <Text style={paragraph}>
//             Thank you for signing up! Please click the button below to verify your
//             email address and complete your registration.
//           </Text>
//           <Hr style={hr} />
//           <Link href={url} style={reportLink}>
//             Click here to verify your email address
//           </Link>
//         </Container>
//       </Body>
//     </Html>
//   );
// };

// VerificationEmailTemplate.PreviewProps = {
//   url: "https://example.com/verify-email",
//   name: "Brett",
// } as VerificationEmailProps;

// export default VerificationEmailTemplate;

// const main = {
//   backgroundColor: "#ffffff",
//   fontFamily:
//     '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
// };

// const container = {
//   margin: "0 auto",
//   padding: "20px 0 48px",
//   maxWidth: "560px",
// };

// const heading = {
//   fontSize: "24px",
//   letterSpacing: "-0.5px",
//   lineHeight: "1.3",
//   fontWeight: "400",
//   color: "#484848",
//   padding: "17px 0 0",
// };

// const paragraph = {
//   margin: "0 0 15px",
//   fontSize: "15px",
//   lineHeight: "1.4",
//   color: "#3c4149",
// };

// const buttonContainer = {
//   padding: "27px 0 27px",
// };

// const reportLink = {
//   fontSize: "14px",
//   color: "#b4becc",
// };

// const hr = {
//   borderColor: "#dfe1e4",
//   margin: "42px 0 26px",
// };
