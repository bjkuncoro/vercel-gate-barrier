'use client';
import Image from 'next/image';
import { Badge, Divider, Icon } from '@tremor/react';
import React, { useState, useEffect, useRef } from 'react';
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
  BellAlertIcon,
  CheckCircleIcon
} from '@heroicons/react/24/solid';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

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
        <Badge size="xs" color={color} icon={CheckBadgeIcon}>
          {label}
        </Badge>
        <span>{value}</span>
      </div>
    </div>
  );
};

const ScannerPage = () => {
  const { checkRfid, scanloading } = useAuth();
  const [rfid, setrfid] = useState<string>('');
  const [step, setstep] = useState(1);
  const [truckData, settruckData] = useState<any>({
    kode_rfid: 'incididunt230',
    nopol_kendaraan: 'B 1013 DEF',
    lokasi_ft: 'Bandung',
    ket: 'nulla adipisicing qui adipisicing dolore',
    kategori: 'Category B',
    jumlah_kompartemen: 5,
    kap_liter: 413,
    nama_pemilik_perusahaan: 'Kristine Stevenson',
    jenis_produk: 'Product A',
    merk_kendaraan: 'Nissan',
    tahun_pembuatan: 2019,
    umur: 10,
    no_mesin: 'M158160414',
    no_type_seri_head_truck: 'officia845',
    no_rangka: 'R671978787',
    no_dok_uji_emisi: 'UD430473',
    hasil_uji_emisi: 'Fail',
    masa_berlaku_uji_emisi: '2023-06-23',
    no_stnk: 'STNK662',
    masa_berlaku_stnk: '2023-10-16',
    no_keur: 'KEUR776',
    masa_berlaku_keur: '2023-06-06',
    no_skt_spb: 'SKT104',
    masa_berlaku_skt_spb: '2023-08-15',
    no_ijin_masuk: 'IJIN937',
    nama_amt_i: 'Rosalie Carlson',
    nama_amt_ii: 'Colon Calderon',
    masa_berlaku_id_card_amt_1: '2023-11-24',
    masa_berlaku_id_card_amt_2: '2023-06-08',
    masa_berlaku_ijin_masuk: '2023-07-01',
    no_ijin_prinsip: 'IP862',
    no_surat_tera: 'ST145',
    masa_berlaku_tera: '2023-10-25',
    penanggung_jawab: 'Puckett Beard'
  });
  const [validationStatus, setvalidationStatus] = useState<any>(false);
  const [error, seterror] = useState<any>({ message: 'error' });
  const [valid, setvalid] = useState<any>({ message: 'valid' });
  const inputRef = useRef<HTMLInputElement>(null);

  const filterObjectByKeys = (obj: any, keys: any) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([key]) => keys.includes(key))
    );
  };

  const updatedObject = { ...truckData };
  const keysToKeep1 = [
    'lokasi_ft',
    'kap_liter',
    'no_mesin',
    'no_rangka',
    'no_dok_uji_emisi',
    'tahun_pembuatan',
    'merk_kendaraan',
    'umur',
    'jenis_produk'
  ];

  const keysToKeep2 = [
    'masa_berlaku_skt_spb',
    'masa_berlaku_keur',
    'masa_berlaku_stnk',
    'masa_berlaku_tera',
    'no_stnk',
    'no_keur',
    'no_skt_spb',
    'no_tera'
  ];

  const keysToKeep3 = ['nama_amt_i', 'nama_amt_ii'];

  const filteredData = filterObjectByKeys(updatedObject, keysToKeep1);
  const filteredData2 = filterObjectByKeys(updatedObject, keysToKeep2);
  const filteredData3 = filterObjectByKeys(updatedObject, keysToKeep3);

  useEffect(() => {
    inputRef.current?.focus();

    const handleCardScan = async (event: any) => {
      if (event.key === 'Enter') {
        const cardData = event.target.value;

        console.log('Card scanned:', cardData);
        if (!scanloading && rfid === '') {
          setrfid(cardData);
          // checkRfid(cardData).then((res: any) => {
          // });
          const res: any = await checkRfid(cardData);
          console.log(res);
          if (res.isError !== null) {
            seterror(res.isError);
          }
          if (res.validData !== null) {
            setvalid(res.validData);
          }
          if (res.status === 1) {
            setvalidationStatus(true);
          } else {
            setvalidationStatus(false);
          }
          settruckData(res.data);
          setrfid('');
          setstep(3);
          setTimeout(() => {
            console.log(inputRef);
            setstep(1);
            setTimeout(() => {
              const cardInput = document.getElementById('cardInput');
              cardInput?.addEventListener('keydown', handleCardScan);
              inputRef.current?.focus();
            }, 500);
          }, 45000);
        }
      }
    };

    // Attach the event listener to the appropriate input field or card reader
    const cardInput = document.getElementById('cardInput');
    cardInput?.addEventListener('keydown', handleCardScan);

    // Clean up the event listener when the component unmounts
    return () => {
      cardInput?.removeEventListener('keydown', handleCardScan);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scanloading) {
      setstep(2);
    }
  }, [scanloading]);

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

  const toReadableText = (str: any) => {
    return str
      .replace(/_+/g, ' ')
      .replace(/(?:^|\s)\S/g, function (match: any) {
        return match.toUpperCase();
      });
  };

  return (
    <main className="h-full">
      <div className="flex h-full flex-row">
        <div
          className={`flex basis-2/5 justify-center items-center ${
            step === 2
              ? 'bg-orange-200'
              : step === 3
              ? 'bg-green-300'
              : 'bg-red-300'
          } `}
        >
          <Image
            width={500}
            height={500}
            src={`/assets/images/${
              step === 2 ? 'step2' : step === 3 ? 'step3' : 'front'
            }.png`}
            alt="illustration"
          />
        </div>
        {step === 1 && (
          <div className="flex flex-col pl-20 pr-10 pt-72 basis-3/5">
            <span className="text-8xl text-slate-600 leading-tight ">
              Silahkan SCAN Kartu RFID anda pada Alat yang Tersedia
            </span>
            <div className="w-2/3 mt-12">
              <input
                ref={inputRef}
                type="text"
                disabled
                defaultValue={rfid}
                // onBlur={handleBlur}
                className=" h-20 px-4 w-full text-2xl rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="RFID CODE"
              />
              <input
                ref={inputRef}
                id="cardInput"
                // onBlur={handleBlur}
                defaultValue={rfid}
                type="text"
                style={{ height: '0px' }}
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col w-full justify-center items-center">
            <div className="animate-bounce flex flex-row justify-center items-center rounded-full bg-orange-300">
              <Image
                height={450}
                width={450}
                src="/assets/images/fuel-truck.png"
                alt="loading"
              />
            </div>
            <div className="flex items-center space-x-4 text-slate-400 mt-8">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10 0l3 2.647A7.962 7.962 0 0120 12h-4a7.963 7.963 0 01-2 5.291zM12 20c3.042 0 5.824-1.135 7.938-3l-2.647-3A7.963 7.963 0 0012 16V20zm0-8V4a7.963 7.963 0 00-5.291 2l2.647 3A7.962 7.962 0 0112 12zm-2-2a2 2 0 114 0 2 2 0 01-4 0z"
                />
              </svg>
              <span className="text-4xl font-mono">
                Memeriksa dan Memvalidasi Data...
              </span>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col w-full items-center py-10">
            <div className="flex w-full flex-row justify-start items-center px-10">
              <div className="animate-pulse flex flex-row justify-center items-center">
                <Image
                  height={350}
                  width={350}
                  src={`/assets/images/${
                    validationStatus ? 'delivery-truck' : 'warning'
                  }.png`}
                  alt="loading"
                />
              </div>
              <div className="flex flex-col pl-8">
                <span
                  className={`text-7xl font-mono font-semibold text-${
                    validationStatus ? 'green-400' : 'red-500'
                  }`}
                >
                  Validasi {validationStatus ? 'Sukses' : 'Gagal'}
                </span>
                <span className="text-xl">
                  Kode RFID {truckData?.kode_rfid}
                </span>
                <span className="text-3xl mt-4 text-slate-500">
                  {validationStatus
                    ? 'Gerbang Akan Terbuka dalam 5 Detik'
                    : 'Check kembali data anda'}
                </span>
                {validationStatus ? (
                  <div className="flex flex-col gap-3 mt-2">
                    {Object.entries(valid).map(
                      ([key, value]: [key: any, value: any]) => (
                        <div
                          key={key}
                          className="bg-blue-500 w-full rounded-lg flex flex-row justify-start item-center p-2 pr-4"
                        >
                          <Icon
                            size="lg"
                            icon={CheckCircleIcon}
                            color="yellow"
                          />
                          <div className="flex flex-col justify-center ml-2">
                            <span className="text-white text-2xl font-medium">
                              {value['message']}
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 mt-2">
                    {Object.entries(error).map(
                      ([key, value]: [key: any, value: any]) => (
                        <div
                          key={key}
                          className="bg-red-600 w-full rounded-lg flex flex-row justify-start item-center p-4"
                        >
                          <Icon size="lg" icon={BellAlertIcon} color="amber" />
                          <div className="flex flex-col justify-center ml-2">
                            <span className="text-white text-2xl font-semibold">
                              {value['message']}
                            </span>
                            <span className="text-white text-3xl font-medium">
                              {value['notes']}
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
                <div className="flex flex-row mt-4 gap-4">
                  <div className="flex flex-row p-4 bg-red-50 rounded-lg border-2 border-gray-200">
                    <div className="flex flex-col gap-3 justify-center">
                      <Badge size="xs" color={'red'} icon={CheckBadgeIcon}>
                        Transportir
                      </Badge>
                      <span className="text-4xl font-medium text-gray-800">
                        {truckData?.company_detail?.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row p-4 bg-red-50 rounded-lg border-2 border-gray-200">
                    <div className="flex flex-col gap-3 justify-center">
                      <Badge size="xs" color={'red'} icon={CheckBadgeIcon}>
                        No Polisi
                      </Badge>
                      <span className="text-4xl font-medium text-gray-800">
                        {truckData?.nopol_kendaraan}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-8 px-6">
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(filteredData2).map(([key, value]) => (
                  <DataItem
                    key={key}
                    label={toReadableText(key)}
                    color="green"
                    value={value}
                    icon={getIcon(key)}
                  />
                ))}
              </div>
              <Divider />
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(filteredData3).map(([key, value]) => (
                  <DataItem
                    key={key}
                    label={toReadableText(key)}
                    color="neutral"
                    value={value}
                    icon={getIcon(key)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ScannerPage;
