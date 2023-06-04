'use client';
import React, { useEffect, useState } from 'react';
import { Card, TabList, Tab } from '@tremor/react';
import MasterDataTable from '../components/Molecules/MasterDataTable';
import {
  BuildingOffice2Icon,
  TruckIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import MasterDataTableCompany from '../components/Molecules/MasterDataTableCompany';
import MasterDataTableEmployee from '../components/Molecules/MasterDataTableExployee';
import { useAuth } from '../context/AuthContext';
// import AuthGuard from '../components/AuthGuard';

const Page = () => {
  const { isAuthenticated, fetchCompany } = useAuth();
  const [tabView, setTabView] = useState('1');

  useEffect(() => {
    if (isAuthenticated) {
      fetchCompany();
      // fetchEmployee();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card className="px-2 pt-2 pb-3">
        <TabList defaultValue="1" onValueChange={(value) => setTabView(value)}>
          <Tab value="1" text="Kendaraan" icon={TruckIcon} />
          <Tab value="2" text="Perusahaan" icon={BuildingOffice2Icon} />
          <Tab value="3" text="Pengurus" icon={UserCircleIcon} />
        </TabList>
      </Card>
      {tabView === '1' && <MasterDataTable />}
      {tabView === '2' && <MasterDataTableCompany />}
      {tabView === '3' && <MasterDataTableEmployee />}
    </main>
  );
};

export default Page;
// export default AuthGuard(Page);
