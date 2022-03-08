import React, { useState } from 'react';
import './ChannelSelector.css';

function ChannelSelector() {
  const [channels, setChannels] = useState([
    'parking-lot',
    'random',
    'jokes',
  ]);
  const [selectedChannel, setSelectedChannel] = useState('parking-lot');

  function selectChannel(channelName) {
    setSelectedChannel(channelName);
  }

  return (
    <div className="ChannelSelector">
      <div className="ChannelSelector-channelHeader">All Channels</div>
      {
        channels.map((channelName, index) => (
          selectedChannel === channelName ? (
            <div key={index} className="ChannelSelector-channel ChannelSelector-channel--selected"># {channelName}</div>
          ) : (
            <div onClick={() => selectChannel(channelName)} key={index} className="ChannelSelector-channel"># {channelName}</div>
          )
        ))
      }
    </div>
  );
}

export default ChannelSelector;
