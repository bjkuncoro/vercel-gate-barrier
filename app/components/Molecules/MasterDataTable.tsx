'use client';
import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Icon, TextInput, Divider } from '@tremor/react';
import {
  PlusIcon,
  CommandLineIcon,
  CpuChipIcon,
  DocumentMagnifyingGlassIcon,
  FireIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  PlusCircleIcon,
  ListBulletIcon,
  UsersIcon,
  UserIcon,
  WrenchScrewdriverIcon,
  ClockIcon,
  CalendarDaysIcon,
  PresentationChartBarIcon,
  ArrowUpOnSquareStackIcon
} from '@heroicons/react/24/solid';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import ItemDialog from '../Atoms/ItemDialog';
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';
import * as XLSX from 'xlsx';
import moment from 'moment';
import { useAuth } from '../../context/AuthContext';
import ImportDialog from '../Atoms/ImportDialog';

const toReadableText = (str: any) => {
  return str.replace(/_+/g, ' ').replace(/(?:^|\s)\S/g, function (match: any) {
    return match.toUpperCase();
  });
};

const DataItem = ({
  label,
  value,
  color,
  icon
}: {
  label: string;
  value: any;
  color: any;
  icon: any;
}) => {
  return (
    <div className="flex flex-row p-2 rounded-lg border-2 border-gray-200">
      <div className="flex basis-1/4 justify-center items-center">
        <div
          className={`flex h-12 w-12 bg-${color}-100 rounded-full justify-center items-center`}
        >
          <Icon size="lg" icon={icon} color={color} />
        </div>
      </div>
      <div className="flex flex-col basis-3/4 gap-1 ml-2 pt-1 justify-center">
        <Badge size="xs" color={'cyan'} icon={CheckBadgeIcon}>
          {label}
        </Badge>
        <span
          className={`ml-2 text-${
            label === 'No Surat Tera' ? 'sm' : 'xl'
          } font-mono font-medium`}
        >
          {value ? value : '-'}
        </span>
      </div>
    </div>
  );
};

const ExpandedComponent: React.FC<any> = ({
  data,
  handleClick
}: {
  data: any;
  handleClick: any;
}) => {
  const keysToDelete = [
    'kode_rfid',
    'nopol_kendaraan',
    'lokasi_ft',
    'company_detail',
    'employee_detail',
    'kategori',
    'jumlah_kompartemen',
    'kap_liter',
    'nama_pemilik_perusahaan',
    'penanggung_jawab',
    'nama_amt_i',
    'nama_amt_ii',
    'createdAt',
    'updatedAt',
    'id',
    'company_id',
    'employee_id'
  ];

  const updatedObject = { ...data };

  keysToDelete.forEach((key) => {
    delete updatedObject[key];
  });

  const getIcon = (str: any) => {
    let icon;
    switch (str) {
      case 'no_mesin':
        icon = CpuChipIcon;
        break;

      case 'no_type_seri_head_truck':
        icon = Cog6ToothIcon;
        break;

      case 'no_rangka':
        icon = ShieldCheckIcon;
        break;

      case 'no_dok_uji_emisi':
        icon = DocumentMagnifyingGlassIcon;
        break;

      case 'no_stnk':
        icon = DocumentMagnifyingGlassIcon;
        break;

      case 'no_keur':
        icon = DocumentMagnifyingGlassIcon;
        break;

      case 'no_skt_spb':
        icon = DocumentMagnifyingGlassIcon;
        break;

      case 'no_ijin_masuk':
        icon = DocumentMagnifyingGlassIcon;
        break;

      case 'no_ijin_prinsip':
        icon = DocumentMagnifyingGlassIcon;
        break;

      case 'no_surat_tera':
        icon = DocumentMagnifyingGlassIcon;
        break;

      case 'jenis_produk':
        icon = ListBulletIcon;
        break;

      case 'nama_amt_i':
        icon = UserIcon;
        break;

      case 'nama_amt_ii':
        icon = UsersIcon;
        break;

      case 'merk_kendaraan':
        icon = WrenchScrewdriverIcon;
        break;

      case 'tahun_pembuatan':
        icon = ClockIcon;
        break;

      case 'umur':
        icon = CalendarDaysIcon;
        break;

      case 'masa_berlaku_uji_emisi':
        icon = ClockIcon;
        break;

      case 'masa_berlaku_stnk':
        icon = CalendarDaysIcon;
        break;

      case 'masa_berlaku_keur':
        icon = CalendarDaysIcon;
        break;

      case 'masa_berlaku_skt_spb':
        icon = CalendarDaysIcon;
        break;

      case 'masa_berlaku_ijin_masuk':
        icon = CalendarDaysIcon;
        break;

      case 'masa_berlaku_tera':
        icon = CalendarDaysIcon;
        break;

      case 'masa_berlaku_id_card_amt_1':
        icon = CalendarDaysIcon;
        break;

      case 'masa_berlaku_id_card_amt_2':
        icon = CalendarDaysIcon;
        break;

      case 'penanggung_jawab':
        icon = UserIcon;
        break;

      case 'hasil_uji_emisi':
        icon = CheckBadgeIcon;
        break;

      default:
        icon = PlusCircleIcon;
        break;
    }
    return icon;
  };

  return (
    <div className="flex flex-row py-8">
      <div className="grid grid-cols-2 gap-4 basis-2/3">
        {Object.entries(updatedObject).map(
          ([key, value]: [key: any, value: any]) => (
            <DataItem
              key={key}
              label={toReadableText(key)}
              color="blue"
              value={
                key.includes('masa_berlaku')
                  ? moment(new Date(value)).format('DD MMM YYYY')
                  : value
              }
              icon={getIcon(key)}
            />
          )
        )}
      </div>
      <div className="flex-col flex basis-1/3 pl-6 gap-3">
        <Button
          variant="primary"
          icon={CommandLineIcon}
          size="lg"
          color="rose"
          onClick={() => handleClick(true, data)}
        >
          Manage Data
        </Button>
        <Divider />
        <div className="flex flex-row p-2 bg-red-50 rounded-lg border-2 border-gray-200">
          <div className="flex flex-col basis-3/4 gap-3 ml-2 pt-1 justify-center">
            <Badge size="xs" color={'red'} icon={CheckBadgeIcon}>
              Penanggung Jawab
            </Badge>
            <span className="text-4xl font-medium text-gray-800">
              {data.employee_detail?data.employee_detail.name : 'Belum terdata'}
            </span>
          </div>
        </div>
        <div className="flex flex-row p-2 bg-red-50 rounded-lg border-2 border-gray-200">
          <div className="flex basis-1/4 justify-center items-center">
            <div
              className={`flex h-12 w-12 bg-red-100 rounded-full justify-center items-center`}
            >
              <Icon size="lg" icon={UserIcon} color={'red'} />
            </div>
          </div>
          <div className="flex flex-col basis-3/4 gap-3 ml-2 pt-1 justify-center">
            <Badge size="xs" color={'red'} icon={CheckBadgeIcon}>
              Nama AMT 1
            </Badge>
            <span className="text-xl font-medium text-gray-800">
              {data.nama_amt_i}
            </span>
          </div>
        </div>
        <div className="flex flex-row p-2 bg-red-50 rounded-lg border-2 border-gray-200">
          <div className="flex basis-1/4 justify-center items-center">
            <div
              className={`flex h-12 w-12 bg-red-100 rounded-full justify-center items-center`}
            >
              <Icon size="lg" icon={UsersIcon} color={'red'} />
            </div>
          </div>
          <div className="flex flex-col basis-3/4 gap-3 ml-2 pt-1 justify-center">
            <Badge size="xs" color={'red'} icon={CheckBadgeIcon}>
              Nama AMT 2
            </Badge>
            <span className="text-xl font-medium text-gray-800">
              {data.nama_amt_ii}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MasterDataTable = () => {
  const { fetchVehicle, loading, vehicleList } = useAuth();
  const [ShowItemDialog, setShowItemDialog] = useState(false);
  const [ShowImportDialog, setShowImportDialog] = useState(false);
  const [selectedData, setselectedData] = useState<any>({});
  const [filterText, setFilterText] = useState<string>('');

  const filteredItems = vehicleList.filter(
    (item: any) =>
      item.nopol_kendaraan &&
      item.nopol_kendaraan.toLowerCase().includes(filterText.toLowerCase())
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
          color="rose"
          icon={ArrowUpOnSquareStackIcon}
          size="lg"
          type="submit"
          onClick={() => setShowImportDialog(true)}
        >
          Import Data
        </Button>
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

  const titleType = 'Kendaraan';
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
      name: 'Kode RFID',
      selector: (row: any) => row.kode_rfid,
      sorttable: true
    },
    {
      name: 'NoPol',
      selector: (row: any) => row.nopol_kendaraan,
      sorttable: true
    },
    {
      name: 'Lokasi FT',
      selector: (row: any) => row.lokasi_ft,
      sorttable: true
    },
    {
      name: 'Kategori',
      selector: (row: any) => row.kategori,
      sorttable: true
    },
    {
      name: 'Jumlah Kompartemen',
      selector: (row: any) => row.jumlah_kompartemen,
      sorttable: true
    },
    {
      name: 'Kapasitas Tangki (Liter)',
      selector: (row: any) => row.kap_liter,
      sorttable: true
    },
    {
      name: 'Nama Pemilik/Perusahaan',
      selector: (row: any) => row.company_detail.name,
      sorttable: true
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
      fetchVehicle();
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
      <ItemDialog
        show={ShowItemDialog}
        SetShowItemDialog={handleSetShowItemDialog}
        selectedData={selectedData}
      />
      <ImportDialog
        show={ShowImportDialog}
        SetShowImportDialog={(val: any) => setShowImportDialog(val)}
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
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            expandableRowsComponentProps={{
              handleClick: handleSetShowItemDialog
            }}
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

export default MasterDataTable;
