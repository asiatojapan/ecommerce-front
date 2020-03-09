import React, {useState} from 'react';

const UserDetailsContext = React.createContext([{}, () => {}]);

const UserDetailsProvider = (props) => {
  const [state, setState] = useState({
    tracks: [
      {
        name: 'Lost Chameleon - Genesis',
      },
      {
        name: 'The Hipsta - Shaken Soda',
      },
      {
        name: 'Tobu - Such Fun',
      },
    ],
    currentTrackIndex: null,
    isPlaying: false,
  });
  return (
    <UserDetailsContext.Provider value={[state, setState]}>
      {props.children}
    </UserDetailsContext.Provider>
  );
}

export {UserDetailsContext, UserDetailsProvider };