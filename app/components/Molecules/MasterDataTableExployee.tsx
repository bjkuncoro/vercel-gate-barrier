'use client';
import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Icon, TextInput, Divider } from '@tremor/react';
import {
  PlusIcon,
  CommandLineIcon,
  PresentationChartBarIcon
} from '@heroicons/react/24/solid';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import moment from 'moment';
import ItemDialogEmployee from '../Atoms/ItemDialogEmployee';
import { useAuth } from '../../context/AuthContext';

const MasterDataTableEmployee = () => {
  const { fetchEmployee, loading, employeeList } = useAuth();
  const [ShowItemDialog, setShowItemDialog] = useState(false);
  const [selectedData, setselectedData] = useState<any>({});
  const [filterText, setFilterText] = useState<string>('');

  const filteredItems = employeeList.filter(
    (item: any) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );
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

  const titleType = 'Pemilik/Perusahaan';
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
      name: 'Nama',
      selector: (row: any) => row.name,
      sortable: true
    },
    {
      name: 'Jabatan',
      selector: (row: any) => row.position,
      sortable: true
    },
    {
      name: 'Asal Perusahaan',
      selector: (row: any) => row.company.name,
      sortable: true
    },
    {
      name: 'Manage',
      cell: (row: any) => (
        <Button
          variant="primary"
          icon={CommandLineIcon}
          size="lg"
          color="rose"
          onClick={() => handleSetShowItemDialog(true, row)}
        >
          Manage Data
        </Button>
      )
    }
  ];

  useEffect(() => {
    initData();
    return () => {
      console.log('clean Up');
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initData = async () => {
    try {
      fetchEmployee();
    } catch (error) {}
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
      <ItemDialogEmployee
        show={ShowItemDialog}
        SetShowItemDialog={handleSetShowItemDialog}
        selectedData={selectedData}
      />
      <Card className="mt-4">
        <div className="flex mb-8 flex-row justify-between">
          <div>
            <span className="text-xl text-gray-800">
              Master Data {titleType}
            </span>
            <p className="text-sm text-gray-600">Daftar {titleType} Terdata</p>
          </div>
          <Button
            variant="secondary"
            icon={PlusIcon}
            loading={loading}
            size="sm"
            onClick={() => handleSetShowItemDialog(true)}
          >
            Tambah Data
          </Button>
        </div>
        {loading && (
          <Card className="my-8 animate-pulse">
            <div className="flex gap-4">
              <div className="bg-slate-200 flex-auto h-3 rounded" />
              <div className="bg-slate-200 flex-auto h-3 rounded" />
              <div className="bg-slate-200 flex-auto h-3 rounded" />
            </div>
            <div className="bg-slate-200 flex-auto h-3 rounded mt-4" />
          </Card>
        )}
        {!loading && (
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

export default MasterDataTableEmployee;
