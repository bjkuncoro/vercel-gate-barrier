'use client'
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { Card, TabList, Tab } from '@tremor/react';
import React, { useEffect, useState } from 'react';
import MasterDataTableHistory from '../components/Molecules/MasterDataTableHistory';

const History = () => {
  const [tabView, setTabView] = useState('1');

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card className="px-2 pt-2 pb-3">
        <TabList defaultValue="1" onValueChange={(value) => setTabView(value)}>
          <Tab value="1" text="Kendaraan" icon={CalendarDaysIcon} />
        </TabList>
      </Card>
      {tabView === '1' && <MasterDataTableHistory />}
    </main>
  );
};

export default History;
