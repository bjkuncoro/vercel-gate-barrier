'use client';
import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Icon, TextInput, Divider } from '@tremor/react';
import {
  PlusIcon,
  CommandLineIcon,
  PresentationChartBarIcon
} from '@heroicons/react/24/solid';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import moment from 'moment';
import ItemDialogCompany from '../Atoms/ItemDialogCompany';
import { useAuth } from '../../context/AuthContext';

const MasterDataTableHistory = () => {
  const { fetchHistory, historyList } = useAuth();
  const [ShowItemDialog, setShowItemDialog] = useState(false);
  const [selectedData, setselectedData] = useState<any>({});
  const [filterText, setFilterText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<any>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredItems);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    XLSX.writeFile(workbook, `${moment().format('YYYY-MM-DD')}.xlsx`);
  };

  const subHeaderComponentMemo = React.useMemo(() => {
    return (
      <div className="flex flex-row gap-2">
        <Button
          variant="primary"
          icon={PresentationChartBarIcon}
          size="lg"
          type="submit"
          onClick={() => exportToExcel()}
        >
          Export Data
        </Button>
        <TextInput
          name="filter"
          placeholder="Filter by No Polisi"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
    );
  }, [exportToExcel, filterText]);

  const titleType = 'History';
  const customStyles = {
    rows: {
      style: {
        minHeight: '72px' // override the row height
      }
    },
    headRow: {
      style: {
        backgroundColor: '#f7f7f7',
        paddingVertical: 8,
        paddingHorizontal: 6,
        marginTop: 4,
        marginBottom: 4,
        borderRadius: 10,
        borderBottomWidth: 0,
        fontWeight: 500,
        fontSize: 14,
        color: '#767982',
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px'
      }
    }
  };

  const columns = [
    {
      name: 'RFID Code',
      selector: (row: { rfid_code: any }) => row.rfid_code,
      sortable: true
    },
    {
      name: 'Waktu',
      selector: (row: any) => {
        const nopol = moment(row.createdAt).format('DD MMM YYYY HH:mm');
        return nopol;
      },
      sortable: true
    },
    {
      name: 'No Polisi',
      selector: (row: any) => {
        const nopol = row.nomor_polisi;
        return nopol;
      },
      sortable: true
    },
    {
      name: 'Status',
      cell: (row: any) => (
        <Badge color={row.status === 'success' ? 'blue' : 'red'}>
          {row.status}
        </Badge>
      )
    },
    {
      name: 'Notes',
      cell: (row: any) => (
        <div>
          {row.status === 'failed' ? (
            <div className="my-2">
              {Object.entries(JSON.parse(row.notes)).map(
                ([key, value]: [key: any, value: any]) => (
                  <div key={key}>• {value.message ? value.message : value}</div>
                )
              )}
            </div>
          ) : (
            // <div>{row.notes}</div>
            <div>{row.notes}</div>
          )}
        </div>
      )
    }
  ];

  useEffect(() => {
    console.log(filteredItems !== null);
    initData();
    return () => {
      console.log('clean Up');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (historyList.length) {
      const list: any = historyList
        .filter(
          (item: any) =>
            item.vehicle_detail &&
            item.vehicle_detail.nopol_kendaraan
              .toLowerCase()
              .includes(filterText.toLowerCase())
        )
        .map((item: any) => {
          const { vehicle_detail, ...rest } = item;
          return {
            ...rest,
            nomor_polisi: item.vehicle_detail.nopol_kendaraan
          };
        });
      setFilteredItems(list);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyList]);

  const initData = async () => {
    setLoading(true);
    try {
      await fetchHistory();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleSetShowItemDialog = async (
    val: boolean,
    selectedData: string | null = null
  ) => {
    setShowItemDialog(val);
    setselectedData(selectedData);
  };

  return (
    <div className="static">
      {/* <ItemDialogCompany
        show={ShowItemDialog}
        SetShowItemDialog={handleSetShowItemDialog}
        selectedData={selectedData}
      /> */}
      <Card className="mt-4">
        <div className="flex mb-8 flex-row justify-between">
          <div>
            <span className="text-xl text-gray-800">
              Master Data {titleType}
            </span>
            <p className="text-sm text-gray-600">Daftar {titleType} Terdata</p>
          </div>
          {/* <Button
            variant="secondary"
            icon={PlusIcon}
            loading={loading}
            size="sm"
            onClick={() => handleSetShowItemDialog(true)}
          >
            Tambah Data
          </Button> */}
        </div>
        {filteredItems === null && (
          <Card className="my-8 animate-pulse">
            <div className="flex gap-4">
              <div className="bg-slate-200 flex-auto h-3 rounded" />
              <div className="bg-slate-200 flex-auto h-3 rounded" />
              <div className="bg-slate-200 flex-auto h-3 rounded" />
            </div>
            <div className="bg-slate-200 flex-auto h-3 rounded mt-4" />
            <div className="flex gap-4 mt-4">
              <div className="bg-slate-200 flex-auto h-3 rounded" />
              <div className="bg-slate-200 flex-auto h-3 rounded" />
              <div className="bg-slate-200 flex-auto h-3 rounded" />
            </div>
            <div className="bg-slate-200 flex-auto h-3 rounded mt-4" />
          </Card>
        )}
        {filteredItems !== null && (
          <DataTable
            data={filteredItems}
            columns={columns}
            customStyles={customStyles}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
          />
        )}
      </Card>
      <style jsx global>{`
        body {
          overflow: ${ShowItemDialog ? 'hidden' : 'auto'};
        }
      `}</style>
    </div>
  );
};

export default MasterDataTableHistory;
