import React from 'react';
import { useForm } from 'react-hook-form';
import { toastHandler } from '../util/toastHandler';   
import api from '../lib/axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        console.log(data);
        const response = await toastHandler(api.post("/auth/change-password", data));
        if (response.status === 200) {
            navigate("/login");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-center">Change Password</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} placeholder="Enter your email" className="input input-bordered" />
                            {errors.email && <span>This field is required</span>}
                        </div>

                        <div className="form-control mt-2">
                            <label className="label">
                                <span className="label-text">OTP</span>
                            </label>
                            <input {...register("otp", { required: true, minLength: 6, maxLength: 6 })} placeholder="Enter OTP" className="input input-bordered" />
                            {errors.otp && <span>This field is required and must be 6 characters long</span>}
                        </div>

                        <div className="form-control mt-2">
                            <label className="label">
                                <span className="label-text">New Password</span>
                            </label>
                            <input {...register("password", { required: true, minLength: 4})} placeholder="Enter new password" className="input input-bordered" />
                            {errors.password && <span>This field is required and must be at least 8 characters long</span>}
                        </div>

                        <div className="form-control mt-4">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
