import React, { useState } from "react";

const License = () => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
      <p className="mb-6">Last updated: May 15, 2023</p>
      <ol className="list-decimal ml-6 mb-6">
        <li>
          <h3 className="text-lg font-bold mb-2">Introduction</h3>
          <p>
            These Terms and Conditions govern your use of our voice cloning
            application. Please read these terms in full before you use this
            service. If you do not accept these Terms and Conditions, please do
            not use this service.
          </p>
        </li>
        <li>
          <h3 className="text-lg font-bold mb-2">Voice Cloning Service</h3>
          <p>
            As a paid member, you have access to our voice cloning service which
            allows you to generate and use the cloned voice for any commercial
            purpose royalty-free.
          </p>
        </li>
        <li>
          <h3 className="text-lg font-bold mb-2">Restrictions</h3>
          <p>
            The voice must be generated through our application. Any form of
            unauthorized distribution, transfer, or sub-licensing of the voice
            is strictly prohibited. You must not use a cloned voice to
            impersonate a real person. Any content generated with our service
            must be clearly marked as synthetic.
          </p>
        </li>
        <li>
          <h3 className="text-lg font-bold mb-2">Payment</h3>
          <p>
            Access to the voice cloning service requires a paid membership.
            Payment details will be collected upon registration and you will be
            charged as per the chosen plan. All payments are non-refundable.
          </p>
        </li>
        <li>
          <h3 className="text-lg font-bold mb-2">
            Changes to the Terms and Conditions
          </h3>
          <p>
            We may revise these Terms and Conditions at any time. Any changes
            will be posted on our website. It is your responsibility to check
            regularly to determine whether the Terms and Conditions have been
            changed. If you do not agree to the revised terms, you must stop
            using our service.
          </p>
        </li>
        <li>
          <h3 className="text-lg font-bold mb-2">Governing Law</h3>
          <p>
            These Terms and Conditions shall be governed by and construed in
            accordance with the law of Arizona, USA. Any dispute arising under
            these Terms and Conditions shall be subject to the exclusive
            jurisdiction of the courts of [Your Jurisdiction].
          </p>
        </li>
      </ol>
    </div>
  );
};

export default License;
