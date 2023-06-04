/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, TextInput } from '@tremor/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { login, loading, isAuthenticated } = useAuth();

  //generate all the data need to login form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    console.log(isAuthenticated);
    if(isAuthenticated){
      window.location.href = '/';
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    try {
      if (username === '' || password === '') {
        setError('Username or Password cannot be empty');
      } else {
        login(username, password);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <main className="h-full bg-white">
      <div className="flex flex-row h-full">
        <div className="flex basis-2/5 justify-center items-center p-4 pr-0">
          <div
            style={{ backgroundColor: '#c3212f' }}
            className="flex flex-col h-full w-full rounded-3xl p-12"
          >
            <div className="flex flex-col basis-1/6">
              <div className=" -mt-16 -ml-16">
                <Image
                  width={350}
                  height={100}
                  src={`/assets/images/pertamina-white.png`}
                  alt="illustration"
                />
              </div>
            </div>
            <div className="flex flex-col basis-3/6 justify-center">
              <span className="text-4xl text-orange-400 font-medium font-mono">
                Patra Niaga
              </span>
              <span className="text-7xl text-white font-semibold font-mono">
                Fuel Terminal Sintang
              </span>
              <span className="pr-12 text-white mt-10 text-xl font-mono">
                Welcome to the PT. Pertamina Patra Niaga Fuel Terminal Sintang
                Gate Barrier Management System. Let's explore and manage your
                Vehicle History at the Terminal.
              </span>
            </div>
            <div className="flex flex-col basis-2/5 justify-end">
              <div className="p-8 rounded-2xl bg-red-700 flex flex-col justify-center">
                <span className="text-white">
                  "Pertamina senantiasa memegang teguh komitmen untuk
                  menyediakan energi dan mengembangkan energi baru dan
                  terbarukan dalam rangka mendukung terciptanya kemandirian
                  energi nasional."
                </span>
                <div className="flex flex-row items-center mt-8">
                  <Image
                    width={50}
                    height={50}
                    src={`/assets/images/quote.png`}
                    alt="illustration"
                  />
                  <div className="flex flex-col justify-center ml-6">
                    <span className="text-xl text-yellow-400 font-mono">
                      Pertamina.com
                    </span>
                    <span className="text-md text-white italic">
                      official website pertamina
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col basis-3/5 p-4 px-36">
          <div className="flex flex-col mt-32">
            <span className="text-5xl font-semibold text-slate-500 font-mono">
              Sign In
            </span>
            <span className="text-slate-500 mt-8 text-lg">
              Masukan Username dan Password anda untuk masuk ke dalam sistem
            </span>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 mt-32">
              <p className="text-lg mb-1 font-normal text-slate-500">
                Username
              </p>
              <div className="">
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-14 px-4 w-full text-2xl rounded-lg border border-red-300 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg mb-1 font-medium text-slate-500">
                Password
              </p>
              <div className="">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 px-4 w-full text-2xl rounded-lg border border-red-300 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          <div>
            {error && (
              <div className="flex flex-row items-center justify-center mt-4">
                <span className="text-red-500 text-lg font-medium">
                  {error}
                </span>
              </div>
            )}
          </div>
          <div className="mt-8">
            <Button
              variant="primary"
              icon={CheckCircleIcon}
              size="xl"
              color="rose"
              loading={loading}
              loadingText="Memproses..."
              onClick={handleLogin}
            >
              <span className="px-4 text-xl font-medium">Sign In</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
