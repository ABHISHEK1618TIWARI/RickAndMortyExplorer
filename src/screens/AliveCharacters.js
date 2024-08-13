// src/screens/AliveCharacters.js
import React from 'react';
import CharacterList from '../components/CharacterList';

export default function AliveCharacters() {
  return <CharacterList status="alive" />;
}

// src/screens/DeadCharacters.js
import React from 'react';
import CharacterList from '../components/CharacterList';

export default function DeadCharacters() {
  return <CharacterList status="dead" />;
}

// src/screens/AllCharacters.js
import React from 'react';
import CharacterList from '../components/CharacterList';

export default function AllCharacters() {
  return <CharacterList status="" />;
}
