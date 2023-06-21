'use client';
import { Card, Metric, Text, Flex, Grid, Title, BarList } from '@tremor/react';
import Chart from './chart';
import { useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext';
// import moment from 'moment';

const website = [
  { name: '/home', value: 1230 },
  { name: '/contact', value: 751 },
  { name: '/gallery', value: 471 },
  { name: '/august-discount-offer', value: 280 },
  { name: '/case-studies', value: 78 }
];

const shop = [
  { name: '/home', value: 453 },
  { name: '/imprint', value: 351 },
  { name: '/shop', value: 271 },
  { name: '/pricing', value: 191 }
];

const app = [
  { name: '/shop', value: 789 },
  { name: '/product-features', value: 676 },
  { name: '/about', value: 564 },
  { name: '/login', value: 234 },
  { name: '/downloads', value: 191 }
];

const data = [
  {
    category: 'Website',
    stat: '10,234',
    data: website
  },
  {
    category: 'Online Shop',
    stat: '12,543',
    data: shop
  },
  {
    category: 'Mobile App',
    stat: '2,543',
    data: app
  }
];

const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

export default function PlaygroundPage() {
  const {
    fetchCompany,
    fetchHistory,
    fetchVehicle,
    companyList,
    historyList,
    vehicleList,
    fetchHistoryToday,
    fetchVehicleGroupBy
  } = useAuth();

  const [topDataCount, settopDataCount] = useState<any>([]);
  const [secondaryDataCount, setsecondaryDataCount] = useState<any>([]);
  const [historyToday, sethistoryToday] = useState<any>({ scanToday: 0 });

  useEffect(() => {
    (async () => {
      await fetchCompany();
      await fetchVehicle();
      // await fetchHistory();

      const todayHistory: any = await fetchHistoryToday();
      console.log(todayHistory);
      sethistoryToday(todayHistory);

      const vehicleCompany: any = await fetchVehicleGroupBy();
      console.log(vehicleCompany);

      const secondary = [
        {
          category: 'Total Sukses Masuk',
          stat: todayHistory.successCount,
          data: Object.entries(todayHistory.successScan).map(
            ([key, value]: [key: any, value: any]) => {
              return {
                name: key,
                value: value.length
              };
            }
          )
        },
        {
          category: 'Total Gagal Scan',
          stat: todayHistory.failCount,
          data: Object.entries(todayHistory.failScan).map(
            ([key, value]: [key: any, value: any]) => {
              return {
                name: key,
                value: value.length
              };
            }
          )
        },
        {
          category: 'Jumlah Mobil Perusahaan',
          stat: '',
          data: Object.entries(vehicleCompany).map(
            ([key, value]: [key: any, value: any]) => {
              return {
                name: key,
                value: value.length
              };
            }
          )
        }
      ];
      setsecondaryDataCount(secondary);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const topCount = [
      {
        title: 'Jumlah Mobil Tangki',
        metric: vehicleList.length,
        subtitle: 'Terdaftar'
      },
      {
        title: 'Jumlah Transportir',
        metric: companyList.length,
        subtitle: 'Terdaftar'
      },
      {
        title: 'Jumlah Scan Hari Ini',
        metric: historyToday?.scanToday,
        subtitle: `detail : ${historyToday?.todaySuccess} Sukses, ${historyToday?.todayFail} Gagal`
      }
    ];

    settopDataCount(topCount);
  }, [companyList, vehicleList, historyToday]);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid className="gap-6" numColsSm={2} numColsLg={3}>
        {topDataCount.map((item: any) => (
          <Card key={item.title}>
            <Flex alignItems="start">
              <Text>{item.title}</Text>
            </Flex>
            <Flex
              className="space-x-3 truncate"
              justifyContent="start"
              alignItems="baseline"
            >
              <Metric>{item.metric}</Metric>
              <Text className="truncate">{item.subtitle}</Text>
            </Flex>
          </Card>
        ))}
      </Grid>
      <Grid className="mt-8 gap-6" numColsSm={2} numColsLg={3}>
        {secondaryDataCount.map((item: any) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex
              className="space-x-2"
              justifyContent="start"
              alignItems="baseline"
            >
              <Metric>{item.stat}</Metric>
              <Text>Total data</Text>
            </Flex>
            <Flex className="mt-6">
              <Text>Transportir</Text>
              <Text className="text-right">Jumlah</Text>
            </Flex>
            <BarList
              className="mt-2"
              data={item.data}
              valueFormatter={dataFormatter}
            />
          </Card>
        ))}
      </Grid>
      <Chart />
    </main>
  );
}
