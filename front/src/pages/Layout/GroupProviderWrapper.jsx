import { Outlet } from 'react-router-dom';
import { GroupProvider } from '../../util/GroupContext';

const GroupProviderWrapper = () => {
  return (
    <GroupProvider>
      <Outlet />
    </GroupProvider>
  );
};

export default GroupProviderWrapper;