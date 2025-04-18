import { Route, Routes } from 'react-router-dom';

import CreateSecret from './createSecret/CreateSecret';
import DisplaySecret from './displaySecret/DisplaySecret';

export const Routing = () => {
  const oneClickLink = process.env.YOPASS_DISABLE_ONE_CLICK_LINK !== '1';
  return (
    <Routes>
      <Route path="/" element={<CreateSecret />} />
      {oneClickLink && (
        <Route path="/:format/:key/:password" element={<DisplaySecret />} />
      )}
      <Route path="/:format/:key" element={<DisplaySecret />} />
    </Routes>
  );
};
