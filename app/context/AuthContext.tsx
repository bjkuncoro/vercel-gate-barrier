'use client';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import ReqApi from '../service/reqApi';
import { usePathname, useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const AuthContext = createContext({
  isAuthenticated: false,
  login: (username: string, password: string) => {},
  logout: () => {},
  getMe: () => {},
  fetchCompany: () => {},
  fetchEmployee: () => {},
  fetchVehicle: () => {},
  upsertEmployee: (data: any) => {},
  upsertCompany: (data: any) => {},
  upsertVehicle: (data: any) => {},
  fetchEmployeeByCompanyId: (id: string) => {},
  checkRfid: (rfid: string) => {},
  loading: false,
  scanloading: false,
  userInfo: {
    id: '',
    name: '',
    username: '',
    role: '',
    company: '',
    company_id: '',
    image: '',
    email: ''
  },
  companyList: [],
  employeeList: [],
  vehicleList: []
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scanloading, setScanLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [companyList, setCompanyList] = useState<any>([]);
  const [employeeList, setEmployeeList] = useState<any>([]);
  const [vehicleList, setVehicleList] = useState<any>([]);
  const pathname = usePathname();
  const isPublic = pathname?.includes('/public') || pathname?.includes('/auth');

  useEffect(() => {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    if (token) {
      getMe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isPublic) {
      if (typeof window !== 'undefined') {
        if (!isAuthenticated && !localStorage.getItem('token')) {
          // router.push('/auth/sign-in');
        }
      }
    }
  }, [isAuthenticated, isPublic, router]);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVICE_API}/users/signin`,
        {
          username,
          password
        }
      );
      console.log(response.data);
      if (response.data.success) {
        setIsAuthenticated(true);
        console.log(response.data.token);
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', response.data.token);
        }
        return response.data;
      }
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Replace with your logout logic
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  };

  const getMe = async () => {
    setLoading(true);
    console.log('this will get me');
    try {
      const response = await ReqApi.get('/users/load');
      console.log(response.data);
      setUserInfo(() => ({ ...response.data }));
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompany = async () => {
    try {
      setLoading(true);
      const response = await ReqApi.get('/companies/list');
      if (response.data.length) {
        setCompanyList(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const response = await ReqApi.get('/employees/list');
      if (response.data.length) {
        setEmployeeList(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployeeByCompanyId = async (id: string) => {
    try {
      setLoading(true);
      const response = await ReqApi.get(`/employees/list/${id}`);
      if (response.data.length) {
        setEmployeeList(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicle = async () => {
    try {
      setLoading(true);
      const response = await ReqApi.get('/vehicles/list');
      if (response.data.length) {
        setVehicleList(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const upsertEmployee = async (data: any) => {
    try {
      setLoading(true);
      const response = await ReqApi.post('/employees/upsert', data);
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchEmployee();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const upsertCompany = async (data: any) => {
    try {
      setLoading(true);
      const response = await ReqApi.post('/companies/upsert', data);
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchCompany();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const upsertVehicle = async (data: any) => {
    try {
      setLoading(true);
      const response = await ReqApi.post('/vehicles/upsert', data);
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchVehicle();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const checkRfid = async (rfid: string) => {
    setScanLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVICE_API}/vehicles/check/${rfid}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setScanLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        getMe,
        userInfo,
        loading,
        scanloading,
        fetchCompany,
        fetchEmployee,
        fetchEmployeeByCompanyId,
        fetchVehicle,
        companyList,
        employeeList,
        vehicleList,
        upsertEmployee,
        upsertCompany,
        upsertVehicle,
        checkRfid
      }}
    >
      {children}
      <Toaster />
    </AuthContext.Provider>
  );
};
