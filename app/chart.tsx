'use client';

import { Card, AreaChart, Title, Text } from '@tremor/react';
import { useAuth } from './context/AuthContext';
import { useEffect, useState } from 'react';
import moment from 'moment';

const data = [
  {
    Month: 'Jan 21',
    Sales: 2890
  },
  {
    Month: 'Feb 21',
    Sales: 1890
  },
  {
    Month: 'Jan 22',
    Sales: 3890
  }
];

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export default function Chart() {
  const { fetchHistoryByLast } = useAuth();
  const [historyData, sethistoryData] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const data: any = await fetchHistoryByLast('10');

      const convData = data.map((i: any) => {
        return {
          date: moment(i.date).format('DD MMM YY'),
          Scanned: i.count,
        };
      });

      sethistoryData(convData);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="mt-8">
      <Title>Jumlah Masuk Mobil Tangki</Title>
      <Text>Data diambil berdasarkan jumlah scan yang terjadi pada gerbang</Text>
      <AreaChart
        className="mt-4 h-80"
        data={historyData}
        categories={['Scanned']}
        index="date"
        colors={['fuchsia']}
        // valueFormatter={valueFormatter}
      />
    </Card>
  );
}
