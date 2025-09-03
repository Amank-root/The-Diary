import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from '@react-email/components';

interface ResetPasswordEmailProps {
    userEmail: string;
    resetLink: string;
    name: string;
}

const ResetPassword = ({ userEmail, resetLink, name }: ResetPasswordEmailProps) => {

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Text className="text-[24px] font-bold text-gray-900 m-0">
                Reset Your Password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                Hi {name},
              </Text>
              
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                We received a request to reset the password for your account associated with <strong>{userEmail}</strong>.
              </Text>
              
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px]">
                Click the button below to create a new password. This link will expire in 1 hours for security reasons.
              </Text>

              {/* Reset Button */}
              <Section className="text-center mb-[24px]">
                <Button
                  href={resetLink}
                  className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-medium no-underline box-border inline-block"
                >
                  Reset Password
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[16px]">
                If the button doesn&apos;t work, you can copy and paste this link into your browser:
              </Text>
              
              <Text className="text-[14px] text-blue-600 break-all mb-[24px]">
                {resetLink}
              </Text>

              {/* Security Notice */}
              <Section className="bg-yellow-50 border-l-[4px] border-yellow-400 p-[16px] mb-[24px]">
                <Text className="text-[14px] text-yellow-800 leading-[20px] m-0">
                  <strong>Security Notice:</strong> If you didn&apos;t request this password reset, please ignore this email. Your password will remain unchanged.
                </Text>
              </Section>

              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                For your security, we recommend choosing a strong password that includes:
              </Text>
              
              <Text className="text-[14px] text-gray-600 leading-[20px] ml-[16px] mb-[24px]">
                • At least 8 characters<br/>
                • A mix of uppercase and lowercase letters<br/>
                • Numbers and special characters
              </Text>

              <Text className="text-[16px] text-gray-700 leading-[24px]">
                If you have any questions or need assistance, please don&apos;t hesitate to contact our support team.
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[32px]" />

            {/* Footer */}
            <Section className="text-center">
              <Text className="text-[14px] text-gray-500 leading-[20px] mb-[8px]">
                Best regards,<br/>
                The Diary Team
              </Text>
              
              <Text className="text-[12px] text-gray-400 leading-[16px] m-0">
                123 Business Street, Suite 100<br/>
                New York, NY 10001<br/>
                {/* <br/> */}
                {/* <a href="#" className="text-gray-400 no-underline">Unsubscribe</a> | 
                <a href="#" className="text-gray-400 no-underline ml-[8px]">Privacy Policy</a> */}
                <br/>
                © {new Date().getFullYear()} The Diary. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// ResetPassword.PreviewProps = {
//   userEmail: "user@example.com",
//   resetLink: "https://yourapp.com/reset-password?token=abc123xyz789",
//   companyName: "YourApp",
// };

export default ResetPassword;