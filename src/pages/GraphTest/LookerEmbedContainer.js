import React, { useEffect } from 'react';
import { LookerEmbedSDK } from 'looker-sdk';

const LookerEmbedContainer = () => {
  useEffect(() => {
    // Initialize Looker Embed SDK
    LookerEmbedSDK.init('https://your-looker-instance.looker.com:19999', '/api/3.1/login/embed');

    // Embed the Looker graph
    const lookerContent = LookerEmbedSDK.createDashboardWithId('your_dashboard_id');
    lookerContent.appendTo('#looker-container');
  }, []);

  return <div id="looker-container" style={{ height: '600px' }}></div>;
};

export default LookerEmbedContainer;