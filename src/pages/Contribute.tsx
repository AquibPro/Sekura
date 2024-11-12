import React, { useState } from 'react';
import ContributeForm from '../components/ContributeForm';
import ThankYou from '../components/ThankYou';

export default function ContributePage() {
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmitSuccess = () => {
    setShowThankYou(true);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <ContributeForm onSubmitSuccess={handleSubmitSuccess} />
      {showThankYou && <ThankYou />}
    </div>
  );
}