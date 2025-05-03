import React from 'react'
import { useForm } from 'react-hook-form'
import { ShipWheelIcon } from "lucide-react";
import { useMutation } from '@tanstack/react-query';
import api from '../lib/axios';
import { Link, useNavigate } from 'react-router-dom';
import signpBanner from '../assets/images/signupbanner.png';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/operation/authOperaton';
import { useState } from 'react';

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isPending, setIsPending] = useState(false);
  const onSubmit = async(data) => {
    console.log(data);
    dispatch(signup(data, setIsPending, navigate));
  }

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* SIGNUP FORM - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>

          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join Streamify and start your language learning adventure!
                  </p>
                </div>

                <div className="space-y-3">
                  {/* FULLNAME */}
                  <div className="form-control no-outline w-full">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        className="input input-bordered w-full"
                        {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <p className="alert alert-error">
                        Full name is required
                      </p>
                    )}
                  </div>
                  {/* EMAIL */}
                  <div className="form-control no-outline w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@gmail.com"
                      className="input input-bordered w-full"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <p className="alert alert-error">
                        Email is required
                      </p>
                    )}
                  </div>
                  {/* PASSWORD */}
                  <div className="form-control no-outline w-full">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      className="input input-bordered w-full"
                      {...register("password", { required: true })}
                    />
                    <p className="text-xs opacity-70 mt-1">
                      Password must be at least 6 characters long
                    </p>
                    {errors.password && (
                      <p className="alert alert-error">
                        Password is required
                      </p>
                    )}
                  </div>

                  <div className="form-control no-outline">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox" className="checkbox checkbox-sm" required />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">terms of service</span> and{" "}
                        <span className="text-primary hover:underline">privacy policy</span>
                      </span>
                    </label>
                  </div>
                </div>

                <button className="btn btn-primary w-full" type="submit">
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src={signpBanner} alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage