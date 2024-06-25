import React from 'react';

const SupersetEmbed = () => {
  const supersetUrl = 'https://109.123.235.25:8088/superset/dashboard/1/';

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <iframe
        src={supersetUrl}
        width="100%"
        height="100%"
        title="Superset Dashboard"
      ></iframe>
    </div>
  );
};

export default SupersetEmbed;
