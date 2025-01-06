'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function CookieConsent({ onAccept }) {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)

  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cookie Consent</DialogTitle>
          <DialogDescription>
            We use cookies to enhance your browsing experience and store chat messages locally. By clicking "Accept", you agree to our use of cookies.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setShowPrivacyPolicy(true)}>Privacy Policy</Button>
          <Button onClick={onAccept}>Accept</Button>
        </DialogFooter>
      </DialogContent>
      {showPrivacyPolicy && (
        <Dialog open={showPrivacyPolicy} onOpenChange={setShowPrivacyPolicy}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Privacy Policy</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <p>At Karma-Pollinations, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we collect, use, and protect your information when you use our Karma-Pollinations chatbox.

                1. Data Collection: We collect and store your chat messages locally on your device using browser localStorage. This allows us to provide a seamless experience and maintain your conversation history.

                2. Cookie Usage: We use cookies to remember your preferences and consent choices. These cookies are essential for the proper functioning of our service.

                3. Data Usage: The information we collect is used solely to improve your experience with our chatbox. We do not sell or share your personal data with third parties.

                4. Data Protection: We implement appropriate technical and organizational measures to ensure the security of your personal data.

                5. User Rights: You have the right to access, rectify, or erase your personal data. You can clear your chat history at any time using the reset function.

                6. Changes to Policy: We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.

                By using our Karma-Pollinations chatbox, you agree to the collection and use of information in accordance with this policy. If you have any questions about this privacy policy, please contact us.
            </DialogDescription>
            <DialogFooter>
              <Button onClick={() => setShowPrivacyPolicy(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  )
}

