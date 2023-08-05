import Navigation from '@/components/global/Navigation';
import type { PropsWithChildren } from 'react';
import DashboardNavigation from '@/components/dashboard/DashboardNavigation';
import MapRoot from '@/components/global/MapRoot';

export default ({ children }: PropsWithChildren) => {
  return (
    <div data-root>
      <Navigation />
      {children}
      <DashboardNavigation />
      <MapRoot />
    </div>
  );
};
