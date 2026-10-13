import React, { useState } from 'react';
import { DotLottieReact, type DotLottie } from '@lottiefiles/dotlottie-react';

export const DotLottieCardStack: React.FC = () => {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <DotLottieReact
          src="https://lottie.host/00be252e-26f2-4019-b787-3f994a9cdf09/zZwyma7uL0.lottie"
          loop
          autoplay
          dotLottieRefCallback={setDotLottie}
        />
      </div>
    </div>
  );
};
