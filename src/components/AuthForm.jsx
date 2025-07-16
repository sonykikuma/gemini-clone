import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const schema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  countryCode: z.string().min(1, "Select country code"),
});

const AuthForm = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [simulatedOtp, setSimulatedOtp] = useState("");
  const [countries, setCountries] = useState([]);
  const [userEnteredOtp, setUserEnteredOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: zodResolver(schema),
  // });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,idd"
        );
        const countryCodes = res.data
          .map((country) => ({
            name: country.name.common,
            code: country.idd?.root
              ? country.idd.root + (country.idd.suffixes?.[0] || "")
              : null,
          }))
          .filter((c) => c.code);

        setCountries(countryCodes);
      } catch (error) {
        console.error("Error fetching countries", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData?.verified) {
      navigate("/dashboard");
    }
  }, []);

  const onSubmit = (data) => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setSimulatedOtp(otp);

    setTimeout(() => {
      setOtpSent(true);
      toast.info(`Simulated OTP: ${otp}`, { autoClose: 2000 });

      // alert(`Simulated OTP: ${otp}`);
    }, 1000);
  };

  return (
    <>
      <h1 className="container shadow-lg py-3 rounded-4 text-primary">
        Gemini Clone
      </h1>
      <div className="container my-4 py-3">
        <h3>OTP Authentication</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Country Code</label>
            <select {...register("countryCode")} className="form-select">
              <option value="">Select</option>
              {countries.map((c, index) => (
                <option key={index} value={c.code}>
                  {c.name} ({c.code})
                </option>
              ))}
            </select>
            {errors.countryCode && (
              <small className="text-danger">
                {errors.countryCode.message}
              </small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input {...register("phone")} className="form-control" />
            {errors.phone && (
              <small className="text-danger">{errors.phone.message}</small>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Send OTP
          </button>
        </form>
        {otpSent && !otpVerified && (
          <div className="mt-3">
            <div className="mb-3">
              <label className="form-label">Enter OTP</label>
              <input
                className="form-control"
                value={userEnteredOtp}
                onChange={(e) => setUserEnteredOtp(e.target.value)}
              />
            </div>
            <button
              className="btn btn-success"
              onClick={() => {
                const { phone, countryCode } = getValues();

                if (userEnteredOtp === simulatedOtp) {
                  setOtpVerified(true);
                  localStorage.setItem(
                    "auth",
                    JSON.stringify({ verified: true, phone, countryCode })
                  );
                  toast.success("OTP Verified Successfully", {
                    autoClose: 2000,
                  });

                  // alert("OTP Verified Successfully");
                  navigate("/dashboard");
                } else {
                  toast.error("Invalid OTP", { autoClose: 2000 });
                }
              }}
            >
              Verify OTP
            </button>
          </div>
        )}
        {otpVerified && (
          <div className="alert alert-success mt-3">
            OTP Verified. You are authenticated.
          </div>
        )}
      </div>
    </>
  );
};

export default AuthForm;
